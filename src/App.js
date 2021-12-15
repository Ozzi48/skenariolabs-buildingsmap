import React, {useState} from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyBuildings from './pages/MyBuildings'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { ToastProvider } from 'react-toast-notifications'

const array = [{name: 'ok'}, {name: "ok2"}, {name: "ok2"}, {name: "ok2"}, {name: "ok2"}, {name: "ok2"}, {name: "ok2"}, {name: "ok2"}]

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
      setIsOpen(!isOpen)
  }
  return (
    <ToastProvider>
    <Router>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/buildings' element={<MyBuildings/>} />
      </Routes>
    </Router>
    </ToastProvider>
  );
}

export default App;
