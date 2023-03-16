import React, {Component, useEffect, useState} from 'react';
import '../styles/NYRepresentatives.scss';
import aData from '../data/assemblyDF_Mem_HomesFlipped.csv';
import * as d3 from 'd3';

export default function NYRepresentatives() {
    useEffect(() => {


        // function that accepts any data as an argument 
        const fetchText = async(data) => { // asynchronous call puts a request and wait to some time for a result
            const response = await fetch(data) // returns a promise, could be pending or resolved (succeed or fails), await could only be used inside a async function
            return await response.text() // takes a response stream (the text), and reads it to completion, and returns a long string
        }

        // calling the function above and passing the data to be parsed and visualized 
        fetchText(aData).then(showData)

    })


    function showData(data){

        // Parsing the data to CSV and saving it to a variable
        let assemblyMembers = d3.csvParse(data) // d3.csvParse takes a csv string & return an array of objects, each object represent one row of each table


        // Chart Dimensions
        const margin = {top: 20, right: 30, bottom: 40, left: 140};
        const width = 370 - margin.left - margin.right;
        const height = 750;

        // Making sure my data is an object
        // console.log("data:",assemblyMembers )


        // Retrieving Columns/Features from DataFrame
        assemblyMembers.forEach(d => {
            d.gbat_assemblyDistrict = d.gbat_assemblyDistrict;
            d.homesFlipped = +d.homesFlipped;
            d.memberName = d.memberName;
        })


        // Sorting data by Homes Flipped and saving to a new variable
        let assemblyData = assemblyMembers.sort( function(a,b) {return d3.descending(a.homesFlipped, b.homesFlipped) } )


        // Create SVG
        const svg = d3.select('#assembly')
                        .append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append('g')
                        .attr('transform', 
                            'translate(' + margin.left + ',' + margin.top + ')')
 
        // Maximum number in homes flipped 
        const max = d3.max(assemblyData, d => d.homesFlipped)

        // Add x axis 
        const x = d3.scaleLinear()
                    .domain([0, max])
                    .range([0, width])
        svg.append('g')
            .attr('transform', 'translate(0' + height + ')')
            // .call(d3.axisBottom(x))
            .selectAll('text')
            // .attr('transform', 'translate(-10, 0)rotate(-45)')
            .style('text-anchor', 'end')
            

       
        // add y axis
        const y = d3.scaleBand()
                    .range([0, height])
                    .domain(assemblyData.map(d =>  d.memberName  ))
                    .padding(0.2) 
            
        svg.append('g')
            .call(d3.axisLeft(y))
            .style('margin-top',34)
            // .style('color' ,'orange')
        
        // bars
        svg.selectAll('rects')
            .data(assemblyData)
            .enter()
            .append('rect')
            .attr('x', x(0))
            .attr('y', function(d) {return y(d.memberName)})
            .attr('width', function(d) {return x(d.homesFlipped)})
            .attr("height", y.bandwidth() )
            .attr("fill", "#69b3a2")
    }

    function showAssembly(){
        console.log("heeeeeyyyyyaaaurrrrrrr")
    }



    return (
    <section className='ny__reps'>

        <h1> Homes Flipped in New York City 2017 - 2021 by State Legislative District </h1>
        <button onClick={showAssembly}>Assembly District  </button>
        <button >Senate District </button>
   
        <div id='assembly'> </div>
    </section>
  )
}
