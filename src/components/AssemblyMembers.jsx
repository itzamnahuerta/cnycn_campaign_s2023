import React from 'react';
import '../styles/NYRepresentatives.scss';
import aData from '../data/Assembly_HomesFlipped.csv';
import assemblyImg from '../imgs/assembly_HF.png';
import * as d3 from 'd3';



// Chart Dimensions
const margin = {top: 20, right: 20, bottom: 10, left: 70};
const width = 350 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;

// Bar Chart
const barChart = (data) => {
    // console.log(" assembly data:", data);


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
    
    // Y Axis
    const y = d3.scaleBand()
    .range([0, height])
    .padding(0.3);

    // Add X Axis 
    const x = d3.scaleLinear()
        .range([0, width])
        .domain([0, max]);


    // Container for Bar Chart
    const container = d3.select('.vis__area')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 
        'translate(' + margin.left + ',' + margin.top + ')');

    y.domain(sortedData.map(d =>  d.districtName))


    // Create Background Bar
    let backgroundBar =  container.selectAll(null)
        .data(sortedData)
        .enter()
        .append('rect')
        .attr("fill", "rgba(91,91,91,0.03)")
        .attr("class", "barBackground")
        .attr('y', d => y(d.districtName) + 4)
        .attr("height", 2)
        .attr('width', function(d) {
            return x(1185)
        })
        .attr('rx', 2)  
        // .attr('transform',`translate(${margin.left + 5}, ${margin.top+ 10 })`);


        
    // Setting Bar Chart size 
    let bar = container.selectAll(null)
    .data(sortedData)
    .enter()
    .append('rect')
    .attr('class','bins')
    .attr('y', d =>  y(d.districtName))
    .attr('height',  y.bandwidth())
    .transition()
    .duration(2000)
    .delay(function(d, i) {
        return i * 100
        })
    .attr('fill', '#EB5F2A')
    .attr('width', d =>  x(d.homesFlipped))
    .attr('x',  0)
    .attr('rx', 6) 
        // .attr('transform',`translate(${margin.left + 5}, ${margin.top + 10})`);

    // Tooltip Container
    const tooltip = d3.select(".tooltip__container")
        .style('padding', '10px')
        .style('border-radius','20pt')
        .style('border', '3px solid #0F26A6')
        .style('background', 'rgba(213,210,203,0.8)')
        .style('width', '200px')
        .style('height','100px')
        .style('color', '#0F26A6') 
        .style('position', 'absolute')
        .style('display','none');

    d3.selectAll('.bins')
    .on('mouseover', (e,d) => {
        // bin hover color and stroke
        d3.select(e.target)
            .transition()
            .duration(200)
            .style('display','block')
            .style('z-index','1000')
            .attr('fill','#C7C8CA')
            .style('stroke','#0F26A6')
            .style('stroke-width','2px')
       
        // tool tip
        tooltip
            .transition()
            // .duration(500)
            .style('display','block')
            .style('z-index','1000')
            .style('visibility','visible')

        tooltip.html(`
            <div class='tooltip-wrapper'> 
                <div class='home-img'> </div>
                <div class='homes-flipped-text'> ${d.homesFlipped} </div>
                <div class='rep-wrapper'>
                <span id='rep_w__1'>Senate Represenative </span> <br/>
                <span id='rep_w__2'> ${d.memberName}</span>  
                </div>
            </div>`)
            .style('position', 'absolute')
            .style('top', e.pageY + 20 + 'px')
            .style('left', e.pageX + 5 + 'px')
            .style('font-size','8pt')
    })
    .on('mouseout', (e) => {
        d3.select(e.target)
            .transition()
            .duration(600)
            .attr('fill','#EB5F2A')
            .style('stroke','none')
            .style('stroke-width','0px')
        tooltip
            .style('visibility','hidden')
            .style('display','none')

    });

    let labels = container.selectAll(null)
        .data(sortedData)
        .enter()
        .append("text")
        .attr("y", function(d) {
        return y(d.districtName) + y.bandwidth() / 2;
        })
        .attr("x", -10)
        .attr("text-anchor", "end")
        .text(function(d) {
        return d.districtName
        })
        .style('fill','blue')
        .attr("filter","url(#background)")
        .attr("class", "axis")
        .style("font-size", "10px")
        ;


    // Maximum Number Label
    container
        .append("text")
        .attr("x", width + 5)
        .attr("y", (margin.top / 14))
        .attr("text-anchor", "end")
        .text("1,180")
        .style("font-size", "17px")
        .style("font-weight", "regular")
        .style('font-family','Helvetica')
        .attr("fill", "#EB5F2A");
    
    // Line Path for Maximum Home Flip
    let lineEnd = 260;
    let line = container.append('line')
        .attr("x1", lineEnd)
        .attr("x2", lineEnd)
        .attr("y1", 5)
        .attr("y2", height - 10)
        .attr("stroke-width", 2)
        .attr("stroke", "#364FD9")
        .attr("stroke-dasharray", "8,8");



    //exit
    d3
    .selectAll('.groups')
    .exit()
    .remove();
}

export default function AssemblyMembers() {

    // Render Data and Call BarChart Function
    d3.csv(aData).then(barChart)


  return (
    <section className='nyreps__vis__wrapper'>
        <div className='tooltip__container'></div>
        <svg className='vis__area' ></svg>
        <img src={assemblyImg} className='img__map' width={'35%'} /> 
    </section>
  )
}