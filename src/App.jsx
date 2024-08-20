import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import About from './components/Form'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login'
import { Dashboard } from './components/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
