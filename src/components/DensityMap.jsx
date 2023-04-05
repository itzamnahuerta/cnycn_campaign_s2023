import React from 'react'
import densityMapImg from '../imgs/density_HF.png'

import '../styles/DensityMap.scss';

export default function DensityMap() {
  return (
    <div className='density__container'>
    <h2> NEIGHBORHOODS MOST AFFECTED BY HOMES BEING FLIPPED </h2>
    <img src={densityMapImg} id='density__map' />
    </div>
  )
}
