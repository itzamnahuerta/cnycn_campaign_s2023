import React ,{useEffect, useState, useRef} from 'react'
import '../styles/NYRepresentatives.scss';
import sData from '../data/Senate_HomesFlipped.csv';
import senateImg from '../imgs/senate_HF.png' ;
import * as d3 from 'd3';

    // Chart Dimensions
    const margin = {top: 10, right: 90, bottom: 10, left: 100};
    const width = 420 - margin.left - margin.right;
    const height = 750 - margin.top - margin.bottom;


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
        console.log("the max",max)
        
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
        const container = d3.select('.vis__area')
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


        // Create Background Bar
        let backgroundBar = graph.selectAll(null)
            .data(sortedData)
            .enter()
            .append('rect')
            .attr("fill", "rgba(91,91,91,0.03)")
            .attr("class", "barBackground")
            .attr('y', d => y(d.districtName) + 10)
            .attr("height", 5)
            .attr('width', function(d) {
                return x(2140)
            })
            .attr('rx', 2)  
            .attr('transform',`translate(${margin.left + 5}, ${margin.top + 10})`);
        backgroundBar
            .style('opacity',0.2)

        // Setting Bar Chart size 
        let bar = graph.selectAll(null)
            .data(sortedData)
            .enter()
            .append('rect')
            .attr('class','bins')
            .transition()
            .duration(200)
            .attr('fill', '#EB5F2A')
            .attr('width', d =>  x(d.homesFlipped))
            .attr('height',  y.bandwidth())
            .attr('x',  0)
            .attr('y', d => y(d.districtName))
            .attr('rx', 6)  
            .attr('transform',`translate(${margin.left + 5}, ${margin.top + 10})`);


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
                .style('stroke-width','3px')
           
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
                .style('top', e.pageY - 10 + 'px')
                .style('left', e.pageX + 35 + 'px')
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


        let axisLabels = graph.append('g')
            .call(d3.axisLeft(y).tickSize(0))
            .attr("transform", `translate(${margin.left}, ${margin.top + 10})`)
            .style("font-size", "12px")
            .style("font-weight", "light")
            .style('color','white')
            .style("stroke", "none")
            .style('font-family','San Francisco')
            .attr("filter","url(#background)")
            .attr("class", "axis");

        
        d3.selectAll(".tick").each(function(d,i){
        var tick = d3.select(this),
        text = tick.select('text'),
        bBox = text.node().getBBox();
        tick.insert('rect', ':first-child')
        .attr('x', bBox.x - 3)
        .attr('y', bBox.y - 3)
        .attr('height', bBox.height + 6)
        .attr('width', bBox.width + 5)
        .style('fill', '#0F26A6');
        })

        // Remove Y axis default line
        d3.selectAll("path,line").remove();

        // Maximum Number Label
        graph
            .append("text")
            .attr("x", width + 125)
            .attr("y", (margin.top / 3) * 5)
            .attr("text-anchor", "end")
            .text("2,140")
            .style("font-size", "17px")
            .style("font-weight", "regular")
            .style('font-family','Helvetica')
            .attr("fill", "#EB5F2A");

        // Line Path for Maximum Home Flip
        let lineEnd = 337;
        let line = graph.append('line')
            .attr("x1", lineEnd)
            .attr("x2", lineEnd)
            .attr("y1", 30)
            .attr("y2", height + 10)
            .attr("stroke-width", 2)
            .attr("stroke", "#364FD9")
            .attr("stroke-dasharray", "8,8");
            

        //exit
        d3
        .selectAll('.groups')
        .exit()
        .remove();
    } 


export default function SenateMembers() {

    // Render Data and Call BarChart Function
    d3.csv(sData).then(barChart)

  return (
    <section className='nyreps__vis__wrapper'>
        <div className='tooltip__container'></div>
        <svg className='vis__area' ></svg>
        <img src={senateImg} className='img__map'  width={'35%'}/> 
    </section>

  )
}