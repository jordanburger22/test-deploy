import { useState, useContext } from 'react'
import './App.css'
import Login from './components/Login'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/userContext'
import Home from './components/Home'
import Header from './components/Header'

function App() {

  const { token } = useContext(UserContext)
  return (
    <>
    {token && <Header />}
      <Routes>
        <Route path='/' element={token ? <Navigate to= "/home" /> : <Login />} />

        <Route path='/home' element= {!token ? <Navigate to= "/" /> : <Home />} />

      </Routes>
    </>
  )
}

export default App
