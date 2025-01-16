import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import PublicationDetails from './Components/PublicationDetails/PublicationDetails';

function App() {
  return (
    <BrowserRouter>
    {/* <Navbar /> */}
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/publication/:id" element={<PublicationDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;