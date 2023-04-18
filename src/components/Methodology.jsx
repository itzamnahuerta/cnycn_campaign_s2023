import React from 'react'
import '../styles/Methodology.scss'

import prattLogo from '../imgs/PrattCenter_logo_black.png'
import cnycn from '../imgs/cnycn_logo_black.png'

export default function Credits() {
  return (
    <section className='method__container'>


      <div className='m1'>
        <h1 className='m1__child'> <span>About <br/>this Data </span></h1>
      </div>


      <div className='m2'>
        <p> These maps and tables represent sales of 1-3 family houses, coops, and condos sold within 2 years of purchase, as recorded in the NYC Department of Finance's land records database, ACRIS, as analyzed by the Center for New York City Neighborhoods and Pratt Center for Community Development in March 2023. </p>
        </div>


      <div className='m3__wrapper'>
        <div className='m3'>
          <h3 id="notes__title"> Notes</h3>

          <p className="m3__child">Data for Staten Island is not contained in ACRIS and as such is not included here.<br/> <br/>For homes purchased in 2021, this data does not include all homes flipped within two years, given that this analysis was conducted before the end of 2023.</p>
        </div>
      </div>

      <div className='m4__wrapper'>
        <div className='m4'>
          <p> Analysis and visualizations prepared in March 2023 by Pratt Center and Center for NYC Neighborhoods </p>
          <img id='prattlogo' src={prattLogo} />
          <img id='cnyclogo' src={cnycn} />  
        </div>
      </div>



    </section>
  )
}
