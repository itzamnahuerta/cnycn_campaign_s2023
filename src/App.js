
import './App.scss';
import About from './components/About.jsx';
import NYRepresenatives from './components/NYRepresenatives.jsx';
import Title from './components/Title';
import DensityMap from './components/DensityMap';


function App() {
  window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  }, false);
  
  return (
    <section>
      <div className="progress"></div>

      <div className="page__wrap">
      <Title/>
      <About/>
      <DensityMap/>
      <NYRepresenatives/>
      </div>
    </section>
  );
}

export default App;
