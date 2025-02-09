import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Signup from './pages/Signup/Signup.jsx';
import Login from './pages/Login/Login.jsx';
import RegHome from './pages/RegHome/RegHome.jsx'
import Subscribe from './pages/Subscribe/Subscribe.jsx'
import Success from './pages/Success/Success.jsx';
import Cancel from './pages/Cancel/Cancel.jsx';
import Error from './pages/Error/Error.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/regHome' element={<RegHome/>}></Route>
        <Route path='/subscribe' element={<Subscribe/>}></Route>
        <Route path='/success' element={<Success/>}></Route>
        <Route path='/cancel' element={<Cancel/>}></Route>
        <Route path='*' element={<Error/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
