import React, { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyBuildings from './pages/MyBuildings'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { ToastProvider } from 'react-toast-notifications'


function App() {
  const [isOpen, setIsOpen] = useState(false);

  //show or hide sidebar
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <ToastProvider>
      <Router>
        <Navbar toggle={toggle} />
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/buildings' element={<MyBuildings />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
