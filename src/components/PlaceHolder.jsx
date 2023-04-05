import React, {Component, useEffect, useState} from 'react';
import '../styles/NYRepresentatives.scss';
import aData from '../data/assemblyDF_Mem_HomesFlipped.csv';
import sData from '../data/senatorMem_HomesFlipped.csv'
import * as d3 from 'd3';



export default function NYRepresenatives() {

    // States for Datsets
    const [assemblyData, setAssemblyData] = useState(null) // will have an object 
    const [senateData, setSenateData] = useState(null)

    const [vizType, setVizType] = useState(null)

    // Function that accepts any data and state where the string object is stored
    const fetchText = async(data, stateName) => { // asynchronous call puts a request and wait to some time for a result

        fetch(data)
            .then((res) => {
                if(res.ok){
                    return res.text()
                }
                throw new Error('Server says bad response')
            })
            .then((res) => stateName(res))
            .catch((err) => console.log(err))
    }

    // Fetching and storing data to state
    fetchText(aData, setAssemblyData)
    fetchText(sData, setSenateData)
    
    useEffect(() => {
        showViz()
    },[vizType])

    // console.log(assemblyData)
    const showViz =() => {
        if(vizType == 'assembly'){

        // Parsing the data to CSV and saving it to a variable
        let data = d3.csvParse(assemblyData); // d3.csvParse takes a csv string & return an array of objects, each object represent one row of each table  


        // Chart Dimensions
        const margin = {top: 20, right: 30, bottom: 40, left: 140};
        const width = 370 - margin.left - margin.right;
        const height = 750;


        // Formatting the data
        data.forEach(d => {
            d.gbat_assemblyDistrict = d.gbat_assemblyDistrict;
            d.homesFlipped = +d.homesFlipped;
            d.memberName = d.memberName;
        })

        // Sorting data by Homes Flipped and saving to a new variable
        let sortedData = data.sort(function(a,b){
            return d3.descending(a.homesFlipped,
                    b.homesFlipped)
            })
        
        // Create SVG
        const svg = d3.select('.vis')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', 
                        'translate(' + margin.left + ',' + margin.top + ')')
            
        
        // Maximum number in homes flipped 
        const max = d3.max(sortedData, d => d.homesFlipped)
        
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
                    .domain(sortedData.map(d =>  d.memberName  ))
                    .padding(0.2) 
            
        svg.append('g')
            .call(d3.axisLeft(y))
            .style('margin-top',34)
            // .style('color' ,'orange')

        // Bars
        svg.selectAll('rects')
            .data(sortedData)
            .enter()
            .append('rect')
            .attr('x', x(0))
            .attr('y', function(d) {return y(d.memberName)})
            .attr('width', function(d) {return x(d.homesFlipped)})
            .attr("height", y.bandwidth() )
            .attr("fill", "#69b3a2")
        }else if(vizType == 'senate'){

        // Parsing the data to CSV and saving it to a variable
        let senate = d3.csvParse(senateData); // d3.csvParse takes a csv string & return an array of objects, each object represent one row of each table  


        // Chart Dimensions
        const margin = {top: 20, right: 30, bottom: 40, left: 140};
        const width = 370 - margin.left - margin.right;
        const height = 750;

        // Formatting the data
        senate.forEach(d => {
            d.gbat_stateSenatorialDistrict = d.gbat_stateSenatorialDistrict;
            d.homesFlipped = +d.homesFlipped;
            d.memberName = d.memberName;
        })

        // Sorting data by Homes Flipped and saving to a new variable
        let sortedData = senate.sort(function(a,b){
            return d3.descending(a.homesFlipped,
                    b.homesFlipped)
            })
        

        // Create SVG
        const svg = d3.select('.vis')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', 
                        'translate(' + margin.left + ',' + margin.top + ')')
                    
        // Maximum number in homes flipped 
        const max = d3.max(sortedData, d => d.homesFlipped)
        
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
                    .domain(sortedData.map(d =>  d.memberName  ))
                    .padding(0.2) 

        svg.append('g')
        .call(d3.axisLeft(y))
        .style('margin-top',34)
        // .style('color' ,'orange')

        // Bars
        svg.selectAll('rects')
            .data(sortedData)
            .enter()
            .append('rect')
            .attr('x', x(0))
            .attr('y', function(d) {return y(d.memberName)})
            .attr('width', function(d) {return x(d.homesFlipped)})
            .attr("height", y.bandwidth() )
            .attr("fill", "#69b3a2")        

        console.log("senate",senate)
        }

    }


  return (
    <section className="ny__reps">
        <h1> Homes Flipped in New York City 2017 - 2021 by State Legislative District </h1>

        <div >
            <button 
                className="button"
                onClick={() => setVizType('assembly')}> 
                Assembly Districts 
            </button>

            <button
                className='button'
                onClick={()=> setVizType('senate')}>
                Senate Districts 
            </button>
        </div>


        <div className='vis' > </div>
        
    </section>
  )
}
