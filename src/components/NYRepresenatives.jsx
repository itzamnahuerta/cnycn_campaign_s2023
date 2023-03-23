import React ,{useEffect, useState, useRef} from 'react'
import '../styles/NYRepresentatives.scss';
import aData from '../data/Assembly_HomesFlipped.csv';
import sData from '../data/Senate_HomesFlipped.csv';
import * as d3 from 'd3';


export default function NYRepresenatives() {
    // State Containers for Datsets
    const [assemblyData, setAssemblyData] = useState(null);
    const [senateData, setSenateData] = useState(null);
    const [barViz, setBarViz] = useState('assembly');


    const d3Container = useRef(null);


    //  -- - - -- - - - -- - -- - -- -- -- - -- -- - -- - -- -


    // Chart Dimensions
    const margin = {top: 20, right: 50, bottom: 40, left: 30};
    const width = 300 - margin.left - margin.right;
    const height = 600;



    useEffect(() => {
        if(barViz == 'assembly') {
            d3.csv(aData).then(assemblyBar)
        } else if(barViz == 'senate') {
            d3.csv(sData).then(senateBar)
        }
    }, [barViz])

    // Assembly Bar Chart
    const assemblyBar = (data) => {
        console.log("assembly data:", data)

        // Formatting the data
        data.forEach(d => {
            d.assemblyDistrict = d.assemblyDistrict;
            d.homesFlipped = +d.homesFlipped;
            d.memberName = d.memberName;
        })

        // Sorting data by Homes Flipped and saving to a new variable
        let sortedData = data.sort(function(a,b){
            return d3.descending(a.homesFlipped,
                    b.homesFlipped)
            })

        // Maximum number in homes flipped 
        const max = d3.max(sortedData, d => d.homesFlipped)
        
        // Add X Axis
        const widthScale = d3.scaleLinear()
        .domain([0, max])
        .range([0, width])

        // Position of where the bar should be in the screen
        const positionScale = d3.scaleBand()
        .range([0, height])
        .domain(sortedData.map(d =>  d.memberName))
        .padding(0.3) 
        

        // Container for Bar Chart
        const container = d3.select(d3Container.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


        // Selecting all the rects and joining it with our data, one rect for each member in our data
        let g = container
            .selectAll('g')
            .data(sortedData)
            .enter()
            .append('g')

        // Homes Flipped Text
        g.append('text')
        .attr('x', function(d) {return widthScale(d.homesFlipped) + 6})
        .attr('y', function(d) {return positionScale(d.memberName) + 4})
        .attr('fill','black')
        .style("font-size", "10px")
        .attr("dy", ".35em")
        .text(function (d) {return d.homesFlipped})

        g.append('text')
            .attr('x', function(d) {return 10 - widthScale(d.homesFlipped) })
            .attr('y', function(d) {return positionScale(d.memberName) + 20})
            .attr('fill','black')
            .style("font-size", "9px")
            .attr("dy", ".35em")
            .text(function (d) {return  d.assemblyDistrict + ' - ' + d.memberName})

        // Setting Bar Chart size 
        let bars = g
            .append('rect')
            .attr('fill', 'blue')
            .attr('width', d => widthScale(d.homesFlipped))
            .attr('height', positionScale.bandwidth())
            .attr('y', d => positionScale(d.memberName))
    
        bars.exit().remove();


        
      
    }



    const senateBar = (data) => {
        console.log("senate data: ",data)
        const svg = d3.select(d3Container.current);
    }




  return (

    <section className="ny__reps">
        <h1> Homes Flipped in New York City 2017 - 2021 by State Legislative District </h1>

        <div>
            <button 
                className="button"
                onClick={() => setBarViz('assembly')}> 
                Assembly Districts 
            </button>

            <button
                className='button'
                onClick={() => setBarViz('senate')}>
                Senate Districts 
            </button>
        </div>

        <svg ref={d3Container}></svg>

    </section>
  )
}
