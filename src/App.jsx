// ...existing code...
import React from 'react'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import Header from './Component/Header'
import Login from './Pages/Login'
import Home from './Pages/Home'
import  Footer  from './Component/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
