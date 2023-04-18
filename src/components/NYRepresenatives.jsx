import React ,{useEffect, useState, useRef} from 'react'
import '../styles/NYRepresentatives.scss';
import aData from '../data/Assembly_HomesFlipped.csv';
import sData from '../data/Senate_HomesFlipped.csv';
import * as d3 from 'd3';

import assemblyImg from '../imgs/assembly_HF.png'
import senateImg from '../imgs/senate_HF.png' 


export default function NYRepresenatives() {

    // Toggle between assembly or senate
    const [barViz, setBarViz] = useState('assembly');


    const d3Container = useRef(null);


    //  -- - - -- - - - -- - -- - -- -- -- - -- -- - -- - -- -


    // Chart Dimensions
    const margin = {top: 5, right: 50, bottom: 5, left: 30};
    const width = 300 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;


    useEffect(() => {
        if(barViz == 'assembly') {
            d3.csv(aData).then(assemblyBar)

        } else if(barViz == 'senate') {
            d3.csv(sData).then(assemblyBar)
        }
    }, [barViz])

    // Assembly Bar Chart
    const assemblyBar = (data) => {
        // console.log("assembly data:", data);

        // Formatting the data
        data.forEach(d => {
            d.districtName = d.districtName;
            d.homesFlipped = +d.homesFlipped;
            d.memberName = d.memberName;
        })

        // Sorting data by Homes Flipped and saving to a new variable
        let sortedData = data.sort(function(a,b){
            return d3.descending(a.homesFlipped, b.homesFlipped);
        })

        // Maximum number in homes flipped 
        const max = d3.max(sortedData, d => d.homesFlipped);
        
        // Add X Axis
        const widthScale = d3.scaleLinear()
        .domain([0, max])
        .range([0, width]);

        // Position of where the bar should be in the screen
        const positionScale = d3.scaleBand()
        .range([0, height])
        .domain(sortedData.map(d =>  d.memberName))
        .padding(0.1);
        
        // Tooltip Container
        const tooltip = d3.select(".tooltip__container")
            .style('position', 'absolute')
            .style('z-index', '10')
            .style('visibility', 'hidden')
            .style('padding', '10px')
            .style('border-radius','25pt')
            .style('background', 'rgba(235,95,42,0.8)')
            .style('color', 'white');

        const u = d3.selectAll('rect').data(data)
        const t = d3.selectAll('text').data(data)

        // Container for Bar Chart
        const container = d3.select(d3Container.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        

        // Selecting all the rects and joining it with our data, one rect for each member in our data
        let graph = container
            .selectAll('g')
            .data(sortedData)
            .enter()
            .append('g')
            .attr('class','groups');
        

        // District and Assembly Member Text
        graph.append('text')
            .merge(t) 
            .attr('x', function(d) {return widthScale(d) })
            .attr('y', function(d) {return positionScale(d.memberName) * 3 + 10 })
            .attr('fill','blue')
            .style("font-size", "10px")
            .attr("dy", ".5em")
            .attr('class', 'mem__info')
            .text(function (d) {return  d.districtName + ' - ' + d.memberName});



        // Setting Bar Chart size 
        graph
            .append('rect')
            .merge(u) 
            .attr('fill', 'blue')
            .attr("width", 0)
            .attr('height', positionScale.bandwidth())
            .attr('y', d => positionScale(d.memberName) * 3 + 20)
            .attr('class','bar')  
            .transition()
            .duration(1600)
            .attr('width', d => widthScale(d.homesFlipped))

        d3.selectAll('rect')
            .on('mouseover', (e,d) => {
                d3.select(e.target).transition().attr('fill','rgba(205, 209, 228)')
                tooltip
                    .html(`<div>  ${d.homesFlipped} </div> `)
                    .style('display', 'absolute')
                    .style('visibility', 'visible')
                    .style('top', e.pageY + 10 + 'px')
                    .style('left', e.pageX + 10 + 'px')
            })
            .on('mouseout', (e) => {
            d3.select(e.target).transition().attr('fill','blue')
                
            })

        //exit
        u.exit()
        .transition()
        .duration(300)
        .remove()
        t.exit()
        .transition()
        .duration(300)
        .remove()
    }





  return (

    <section className="ny__reps">

        <div className='nyr__1'>
            <h1 id='nyr__head'>How many homes were flipped in your district? </h1> <br/><br/>
            <span id='nyr__subhead'>Homes flipped in NYC, 2017 - 2021 <br/>by State Legislative District </span>
        </div>


        <div className='nyr__2'>
            <div className='nyr__3'>
            <div className="ny__reps__btns">
                <button 
                    className="button"
                    id='btn-left'
                    onClick={() => setBarViz('assembly')}> 
                    Assembly Districts 
                </button>

                <button
                    className='button'
                    onClick={() => setBarViz('senate')}>
                    Senate Districts 
                </button>
            </div>
            <p id="ny__reps__note"> &nbsp; Click or hover over the chart to see the number of flips in each district &nbsp;</p>
            </div>
    
            <div className='tooltip__container'></div>

            <div className='nyr__4'>
                <svg className='vis__area' ref={d3Container}></svg>
            
                {barViz == 'assembly' ? 
                    <img src={assemblyImg} className='img__map' />  : 
                    <img src={senateImg} className='img__map' /> }
             </div>
        </div>






    </section>
  )
}