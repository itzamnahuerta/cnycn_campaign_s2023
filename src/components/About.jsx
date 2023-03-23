import React from 'react';
import {Animator , 
  ScrollContainer, 
  ScrollPage, 
  Sticky, 
  Zoom,
  batch,
  Fade,
  MoveOut,
  StickyIn,
  FadeIn,
  ZoomIn,
  Move,
  MoveIn
} from 'react-scroll-motion';
import '../styles/About.scss';

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn())
const FadeUp = batch(Fade(), Sticky(), Move())

export default function About() {
  return (
    <ScrollContainer>
    <ScrollPage page={0}>
      <div className='section__1' >
      <Animator  animation={batch( Sticky(), Fade(), MoveOut(0, -200)) } >
          <h1 className='s1__title'>How Real Estate Speculators are Targeting New York City's Most Affordable Neighborhoods</h1>
      </Animator>
      </div>
    </ScrollPage>

    <ScrollPage className="section__2" page={1}>
          <Animator animation={MoveIn(-400, 200)} >
            <h2 id='s2__overview'>
              Predatory house-flipping, which drives up housing costs, is a citywide issue concentrated in districts identified in the charts and maps below. The Protect Our Homes and Communities, Stop Predatory Housing Speculation Act of 2023 (S1569/A1023) would tax the profits on properties resold by professional investors within two years of purchase. <br/> <br/> These tables represent sales of 1-3 family houses, coops, and condos sold within 2 years of purchase, as recorded in the NYC Department of Finance’s land records database, ACRIS, as analyzed by the Center for New York City Neighborhoods (CNYCN) and Pratt Center for Community Development. Districts with no homes flipped are not listed in the graphs, but are displayed on the maps.
            <p id='s2__note'> 
            Note: ACRIS does not contain data for Staten Island.
            </p>
            </h2> 
          </Animator>
      </ScrollPage>

      <ScrollPage page={2} className='section__3'>

        <Animator animation={MoveIn(-1000,0)}>
          <h4 className='child' id='e1'> There were a total of</h4> 
        </Animator>
        <Animator animation={MoveIn(1000,0)}>
          <h2 className='child' id='e2' >14,016 </h2> 
        </Animator>
        <Animator animation={MoveIn(-1000,0)}> 
          <h4 className='child' id='e3'>homes flipped between 2017-2021 </h4> 
        </Animator>

      </ScrollPage>

    </ScrollContainer>


  )
}