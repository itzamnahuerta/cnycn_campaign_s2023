import React from 'react';
import '../styles/About.scss';

// boorughs
import nyc_outline from '../imgs/nyc_outline_1.svg';

import queens from '../imgs/boroughs/queens.svg'
import brooklyn from '../imgs/boroughs/brooklyn.svg'
import bronx from '../imgs/boroughs/bronx.svg'
import manhattan from '../imgs/boroughs/manhattan.svg'

export default function About() {

  return (
    <React.Fragment>
    <section className='about__container__1'>


      <div id='a1'>
       <h1>What is Predatory House-Flipping?</h1>
      </div>

      <div id='a2'>
        <h1> Predatory house-flipping is when a professional investor buys a home and resells it for a quick profit, driving up housing costs citywide and especially in low-income communities of color.</h1>
        <button id='btn__maps'> Jump to District Maps </button>
      </div>

      <img id='nyc__img' src={nyc_outline} />
    </section>

    <section className='about__container__2'>
        <h1 id='b1'>To combat this speculation and keep homes affordable, the <a href='https://www.nysenate.gov/legislation/bills/2023/s1569'  target="_blank">Protect Our Homes and Communities, Stop Predatory Housing Speculation Act of 2023 <span id='bill'>(S1569/A1023)</span></a>&nbsp; 
        would tax the profits on properties resold by professional investors within two years of purchase. </h1>
    </section>

    <section className='about__container__3'>
      <div className='a_c_3_wrapper'>

        <h1 id='c1'> There were a total of <br/>
          <span id='flips_total'> 14,016</span> <br/> homes flipped in New York City between 2017 - 2021 
        </h1>

  
        <h1 className='c3__title'> Percentage of total homes flipped citywide, by borough </h1>
        
        <div className='c3__child' id='c2'>
          <h1>Queens</h1>
          <img id='queensImg' src={queens}/>
        </div>

        <div className='c3__child' id='c3'>
          <h1> Brooklyn</h1>
          <img  id='bkImg' src={brooklyn}/>
        </div>

        <div className='c3__child' id='c4'>
          <h1>Bronx</h1>
          <img  id='bxImg' src={bronx}/>
        </div>

        <div className='c3__child' id='c5'>
          <h1>Manhattan</h1>
          <img  id='manImg' src={manhattan}/>
        </div>


        <h1 className='c3__child__num' id='c6'> 47% </h1>

        <h1 className='c3__child__num' id='c7'> 29% </h1>

        <h1 className='c3__child__num' id='c8'> 17% </h1>

        <h1 className='c3__child__num' id='c9'> 6% </h1>
      </div>
    </section>

    </React.Fragment>


  )
}