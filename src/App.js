import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Menswear from './Components/Menswear';
import WomensWear from './Components/WomensWear';

function App() {
  return (
    <div>
     <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route  path='/mens-wear' element={<Menswear/>}/>
        <Route  path='/womens-wear' element={<WomensWear/>}/>
     </Routes>
    </div>
  );
}

export default App;
