
import './App.scss';
import About from './components/About.jsx';
import NYRepresenatives from './components/NYRepresenatives.jsx';
import LegislativeMap from './components/LegislativeMap';

import DensityMap from './components/DensityMap';


function App() {
  return (
    <div>
      <About/>
      <DensityMap/>
      <NYRepresenatives/>

      {/* <LegislativeMap/> */}
    </div>
  );
}

export default App;
