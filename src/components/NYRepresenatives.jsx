import React, {Component, useEffect, useState} from 'react'
import '../styles/NYRepresentatives.scss'
import axios from 'axios'
import aData from '../data/assemblyDF_Mem_HomesFlipped.csv'


export default function NYRepresentatives() {

    // function that accepts any data as an argument 
    const fetchText = async(data) => { // asynchronous call puts a request and wait to some time for a result
        const response = await fetch(data) // returns a promise, could be pending or resolved (succeed or fails), await could only be used inside a async function
        return await response.text() // takes a response stream (the text), and reads it to completion, and returns a long string
    }

    // parsing csv data from the function above
    fetchText(aData).then(text => {

        const assemblyMembers =  d3.csvParse(text) // d3.csvParse takes a csv string & return an array of objects, each object represent one row of each table
        console.log(assemblyMembers.length + 'rows') // how many rows does the dataset have
        console.log('dataset:',assemblyMembers) // entire dataset 
    })

    // define dimensions of svg
    const svgWidth = 500;  // width of entire svg
    const svgHeight = 200; // height of svg
    const textWidth = 115; // width of text section
    const textGutter = 10; // text/bar spacing
    const barMargin = 5; // bottom margin for bars
    const defaultColor = '#6497ea'; // default bar color
    const altColor = '#bc4545'; // alternative bar color




    return (

    
    <section className='ny_representatives'>
        <h1> Homes Flipped in New York City 2017 - 2021 by State Legislative District </h1>
        <svg></svg>

    </section>
  )
}
