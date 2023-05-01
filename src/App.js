import React from 'react';
import { Routes, Route } from "react-router-dom";
// import { HashLink as Link } from 'react-router-hash-link';
import './App.scss';
import About from './components/About.jsx';
import BarChart from './components/BarChart'
import Title from './components/Title';

import Methodology from './components/Methodology';

function App() {


  return (
    <section>
      <div className="progress"></div>
      <Title/>
      <About/>
      {/* <BarChart/> */}
      <Methodology/>
      
      {/* <Routes>
        <Route path='/home' element={<Title/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/ny_state_leg' element={<BarChart/>} />
      </Routes> */}

    </section>
  );
}

export default App;
