import React, {useState} from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BuildingsList from './pages/BuildingsList'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const array = [{name: 'ok'}, {name: "ok2"}, {name: "ok2"}, {name: "ok2"}, {name: "ok2"}, {name: "ok2"}, {name: "ok2"}, {name: "ok2"}]

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
      setIsOpen(!isOpen)
  }
  return (
    <Router>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/buildings' element={<BuildingsList/>} />
      </Routes>
    </Router>
  );
}

export default App;
