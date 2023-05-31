import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';

function App() {
  return (
    <div>
     <Routes>
        <Route path='/' element={<LandingPage/>}/>
     </Routes>
    </div>
  );
}

export default App;
