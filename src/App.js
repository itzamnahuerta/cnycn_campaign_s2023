import React from 'react';
import './App.scss';
import About from './components/About.jsx';
import Title from './components/Title';
import Methodology from './components/Methodology';

function App() {
  return (
    <section>
      <div className="progress"></div>
      <Title/>
      <About/>
      <Methodology/>
    </section>
  );
}

export default App;
