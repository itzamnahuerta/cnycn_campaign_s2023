import React ,{useEffect, useState, useRef} from 'react'
import '../styles/NYRepresentatives.scss';
import aData from '../data/Assembly_HomesFlipped.csv';
import sData from '../data/Senate_HomesFlipped.csv';
import * as d3 from 'd3';

import assemblyImg from '../imgs/assembly_HF.png'
import senateImg from '../imgs/senate_HF.png' 


export default function NYRepresenatives() {

    //  -- - - -- - - - -- - -- - -- -- -- - -- -- - -- - -- -


    // Toggle between assembly or senate
    const [isActive, setActive] = useState('false');


    // Toggle Class Function

    const toggleClass = () => {
        setActive(!isActive)
    }

    //  -- - - -- - - - -- - -- - -- -- -- - -- -- - -- - -- -
    // SVG Ref Selector 
    const d3Container = useRef(null);

    // Chart Dimensions
    const margin = {top: 10, right: 90, bottom: 10, left: 100};
    const width = 420 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    //  -- - - -- - - - -- - -- - -- -- -- - -- -- - -- - -- -
    // useEffect(() => {
    //     if(barViz == 'assembly') {
    //         d3.csv(aData).then(assemblyBarChart)

    //     } else if(barViz == 'senate') {
    //         d3.csv(sData).then(senateBarChart)
            
    //     }
    // }, [barViz])

    //  -- - - -- - - - -- - -- - -- -- -- - -- -- - -- - -- -

    // Bar Chart
    const assemblyBarChart = (data) => {
        console.log(" assembly data:", data);


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
        
        // Add X Axis widthScale
        const x = d3.scaleLinear()
            .domain([0, max])
            .range([0, width]);

        // Position of where the bar should be in the screen
        const y = d3.scaleBand()
            .range([0, height])
            .domain(sortedData.map(d =>  d.districtName))
            .padding(0.3);


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

        // Setting Bar Chart size 
        graph
            .append('rect')
            .transition()
            .duration(200)
            .attr('fill', 'blue')
            .attr('width', d =>  x(d.homesFlipped))
            .attr('height',  y.bandwidth())
            .attr('x',  0)
            .attr('y', d => y(d.districtName))
            .attr('class','bar')  
            .attr('transform',`translate(${margin.left}, ${margin.top})`);

        // Tooltip Container
        const tooltip = d3.select(".tooltip__container")
            .style('position', 'absolute')
            .style('z-index', '10')
            .style('visibility', 'hidden')
            .style('padding', '10px')
            .style('border-radius','25pt')
            .style('background', 'rgba(235,95,42,0.8)')
            .style('color', 'white');

        d3.selectAll('rect')
        .on('mouseover', (e,d) => {
            d3.select(e.target).transition().attr('fill','#F5AA8F')
            tooltip
                .html(`<div>  ${d.homesFlipped} homes flipped in </br> ${d.memberName}'s District </div> `)
                .style('display', 'absolute')
                .style('visibility', 'visible')
                .style('top', e.pageY + 10 + 'px')
                .style('left', e.pageX + 10 + 'px')
        })
        .on('mouseout', (e) => {
        d3.select(e.target).transition().attr('fill','blue')
     
        });


    

        //  Member Text
        graph.append('text')
            .attr('x', function(d) { return x(d.homesFlipped) + margin.left + 20 })
            .attr('y', function(d) {return y(d.districtName ) + margin.top})
            .attr('fill','#0F26A6')
            .style("font-size", "10px")
            .style('font-weight','bold')
            .attr("dy", ".9em")
            .attr('class', 'mem__info')
            .text(function (d) {return  d.districtName }); 

        //exit
        d3.selectAll('.groups').exit()
        .remove();
    }


    // Senate Bar Chart
    const senateBarChart = (data) => {
        console.log("senate data:", data);


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
        
        // Add X Axis widthScale
        const x = d3.scaleLinear()
            .domain([0, max])
            .range([0, width]);

        // Position of where the bar should be in the screen
        const y = d3.scaleBand()
            .range([0, height])
            .domain(sortedData.map(d =>  d.districtName))
            .padding(0.3);

        // Updating rects and text data 
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

        // Setting Bar Chart size 
        graph
            .append('rect')
            .transition()
            .duration(200)
            .attr('fill', 'blue')
            .attr('width', d =>  x(d.homesFlipped))
            .attr('height',  y.bandwidth())
            .attr('x',  0)
            .attr('y', d => y(d.districtName))
            .attr('class','bar')  
            .attr('transform',`translate(${margin.left}, ${margin.top})`);

        // Tooltip Container
        const tooltip = d3.select(".tooltip__container")
            .style('position', 'absolute')
            .style('z-index', '10')
            .style('visibility', 'hidden')
            .style('padding', '10px')
            .style('border-radius','25pt')
            .style('background', 'rgba(235,95,42,0.8)')
            .style('color', 'white');

        d3.selectAll('rect')
        .on('mouseover', (e,d) => {
            d3.select(e.target).transition().attr('fill','#F5AA8F')
            tooltip
                .html(`<div>  ${d.homesFlipped} homes flipped in </br> ${d.memberName}'s District </div> `)
                .style('display', 'absolute')
                .style('visibility', 'visible')
                .style('top', e.pageY + 10 + 'px')
                .style('left', e.pageX + 10 + 'px')
        })
        .on('mouseout', (e) => {
        d3.select(e.target).transition().attr('fill','blue')
     
        });


    

        //  Member Text
        graph.append('text')
            .attr('x', function(d) { return x(d.homesFlipped) + margin.left + 20 })
            .attr('y', function(d) {return y(d.districtName ) + margin.top})
            .attr('fill','#0F26A6')
            .style("font-size", "10px")
            .style('font-weight','bold')
            .attr("dy", ".9em")
            .attr('class', 'mem__info')
            .text(function (d) {return  d.districtName }); 

        //exit
        graph.exit()
        .remove();

        d3.selectAll('.groups').exit()
        .remove();
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
                    onClick={toggleClass}> 
                    Assembly Districts 
                </button>

                <button
                    className='button'
                    onClick={toggleClass}>
                    Senate Districts 
                </button>
            </div>
            <p id="ny__reps__note"> &nbsp; Click or hover over the chart to see the number of flips in each district &nbsp;</p>
            </div>
    
            <div className='tooltip__container'></div>

            <div className={isActive ? "active" : "inactive"}>

                {isActive ? assemblyBarChart : senateBarChart}

                <svg className='vis__area' ref={d3Container}>
                </svg>
\
             </div>
        </div>






    </section>
  )
}