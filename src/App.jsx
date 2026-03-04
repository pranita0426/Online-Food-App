import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes  } from 'react-router-dom'
import Header from './Component/Header'
import Dashboard from './Admin/dashboard/Dashboard'
import Products from './Admin/Products'
import AdminRestaurants from './Admin/Restaurants'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import Home from './Pages/Home'
import  Footer  from './Component/Footer'
import Menu from './Pages/Menu'
import OrderOnline from './Pages/OrderOnline'
import About from './Pages/About'
import Restaurants from './Pages/Restaurants'
import Cart from './Pages/Cart'
import Wishlist from './Pages/Wishlist'
import Product from './Pages/Product'
import Contact from './Pages/Contact'
import AuthPage from './Pages/AuthPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './Admin/Layout'
import ProtectedRoutes from './Component/ProtectedRoutes'
import { restoreAuth } from './States/AUTH/Action';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // try to rehydrate session if jwt & user are stored
    dispatch(restoreAuth());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path='/auth' element={<AuthPage/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/menu' element={<Menu/>} />
        <Route path='/order' element={<OrderOnline/>} />
        <Route path='/restaurants' element={<Restaurants/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
        <Route path='/product/:id' element={<Product/>} />

        <Route path='/contact' element={<Contact/>} />

        <Route path='/about' element={<About/>} />

        {/* ================================================================ */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        <Route path='/admin/*' element={
          <ProtectedRoutes requiredRole="ADMIN">
            <Layout />
          </ProtectedRoutes>
        } >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="restaurants" element={<AdminRestaurants />} />
        </Route>


      
      </Routes>
    <Footer/>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
    </>
  )
}

export default App
