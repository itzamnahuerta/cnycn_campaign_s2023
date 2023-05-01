import React from 'react';

// import d3 barchart components
import SenateMembers from './SenateMembers';
import AssemblyMembers from './AssemblyMembers';



export default function BarChart() {

    // Toggle between assembly or senate
    const [buttons, setButtons] = React.useState(true);

  return (
    <section className="ny__reps">

        <div className='nyr__1'>
            <h1 id='nyr__head'>How many homes were flipped in your district? </h1> <br/><br/>
            <span id='nyr__subhead'>Homes flipped in NYC, 2017 - 2021 <br/>by State Legislative District </span>
        </div>


        <div className='nyr__2'>
            <div className='nyr__3'>
                <div className="ny__reps__btns">
                    <button 
                        className="button"
                        id='btn-left'
                        onClick={() => setButtons(true)} 
                        type='button'> 
                        Assembly Districts 
                    </button>

                    <button
                        className='button'
                        onClick={() => setButtons(false)}
                        type='button'>
                        Senate Districts 
                    </button>
                </div>
                <p id="ny__reps__note"> &nbsp; Click or hover over the chart to see the number of flips in each district &nbsp;</p>
            </div>
    
            <div className='tooltip__container'></div>

            <div className='nyr__4' >
                {buttons === true && <AssemblyMembers/> }
                {buttons === false && <SenateMembers/>}
            </div>
        </div>
    </section>
  )
}
