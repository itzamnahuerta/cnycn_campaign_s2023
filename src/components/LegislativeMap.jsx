import React, {useState, useRef, useEffect} from 'react';
import '../styles/LegislativeMap.scss';
import * as d3 from 'd3';


import assemMap from '../data/assembly_HF.geojson';
import senateMap from '../data/senator_HF.geojson';


export default function LegislativeMap() {
    // Toggle between assembly or senate
    const [mapViz, setMapViz] = useState('assembly');

    const districtMaps = useRef(null);

    //  -- - - -- - - - -- - -- - -- -- -- - -- -- - -- - -- -


    // Chart Dimensions
    let bodyHeight = 550;
    let bodyWidth = 400;
    
    // Toggle on button click
    useEffect(() => {
        if(mapViz == 'assembly') {
            d3.json(assemMap).then(districtsMap)
        } else if(mapViz == 'senate') {
            d3.json(senateMap).then(districtsMap)
        }
    }, [mapViz])



    let districtsMap = mapInfo => {
        
        console.log('data:',mapInfo.features)

        let features = mapInfo.features;

        let body = d3.select(districtMaps.current)
            .attr('width', bodyWidth)
            .attr('height', bodyHeight)
            .attr('class','dmap_container')


        let projection = d3.geoMercator()
            .scale(50)
            .translate(bodyWidth/2, bodyHeight/2)
            .fitSize([bodyWidth,bodyHeight],mapInfo)
        

        let path = d3.geoPath()
            .projection(projection)


        let polygons = d3.select(districtMaps.current).selectAll('path').data(mapInfo.features);
        let ds = d3.select(districtMaps.current).selectAll('d').data(mapInfo.features);


        let map = body.selectAll('path')
            .data(features)
            .enter()
            .append('path')
            .attr('d',d => path(d))
        
        map.attr('fill','none')
            .merge(ds)
            .attr('height', bodyHeight)
            .attr('width', bodyWidth)
            .attr('stroke', 'grey')
        
        polygons.exit()
            .remove()
        ds.exit()
            .remove()

    }

  return (
    <section className="legis__map" >

        <div> Legislative</div>

        <div>
            <button 
                className="button"
                onClick={() => setMapViz('assembly')}> 
                Assembly Districts 
            </button>

            <button
                className='button'
                onClick={() => setMapViz('senate')}>
                Senate Districts 
            </button>
        </div>

        <svg  height='600' width='400'>
            <g  ref={districtMaps} transform="translate(-8,0)"></g>
        </svg>
        

    </section>
  )
}
