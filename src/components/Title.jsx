import React from 'react'
import '../styles/Title.scss'
import nycHomesImg from '../imgs/nyc__homes.svg'

export default function Title() {
  return (
    <section className='title__container'>    
      <div className='t__wrapper'>
        <img id='nyc_homes_img'  src={nycHomesImg} />
        <h1 id='t1'>
        See where speculators are flipping homes across New York City.
        </h1>
      </div>
    </section>
  )
}
