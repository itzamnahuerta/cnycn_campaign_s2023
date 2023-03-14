import React from 'react';
import '../styles/About.scss';

export default function About() {
  return (
    <section>
        <div className='about__overview' id='a-c1'> 

            <h1 className='child' id='a_item_1'> How Real Estate Speculators are Targeting New York City's Most Affordable Neighborhoods </h1>

            <p className='child' id='a_item_2'>Predatory house-flipping, which drives up housing costs, is a citywide issue concentrated in districts identified in the charts and maps below. The Protect Our Homes and Communities, Stop Predatory Housing Speculation Act of 2023 (S1569/A1023) would tax the profits on properties resold by professional investors within two years of purchase. <br/> <br/> These tables represent sales of 1-3 family houses, coops, and condos sold within 2 years of purchase, as recorded in the NYC Department of Finance’s land records database, ACRIS, as analyzed by the Center for New York City Neighborhoods (CNYCN) and Pratt Center for Community Development. Districts with no homes flipped are not listed in the graphs, but are displayed on the maps.

            <p id='a_item_3'> Note: ACRIS does not contain data for Staten Island.</p>
            </p>
            
        </div>

        <div className='about__stat'>
            <h4 className='child' > There were a total of</h4>

            <div id='about__num__container'>
                <h2 className='child' id='about__num' >14,016 </h2>
            </div>
            
            <h4 className='child' >homes flipped between 2017 - 2021 </h4>
        </div>
    </section>
  )
}
