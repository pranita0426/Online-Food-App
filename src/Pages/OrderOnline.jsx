import React, { useEffect, useState } from 'react'
import { menuItems, categories } from '../Data/menuData'
import { addToCart, getCart } from '../utils/cart'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const OrderOnline = ()=>{
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState(getCart())
  const [restaurantsList, setRestaurantsList] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    const handler = ()=> setCart(getCart())
    window.addEventListener('cartChanged', handler)
    return ()=> window.removeEventListener('cartChanged', handler)
  },[])

  useEffect(() => {
    // fetch restaurants from backend
    axios.get('http://localhost:8585/api/v1/restaurants')
      .then(res => setRestaurantsList(res.data))
      .catch(err => console.warn('could not fetch restaurants', err));
  }, [])

  const filtered = menuItems.filter(item=>{
    if(selectedCategory !== 'All' && item.category !== selectedCategory) return false
    if(query && !item.name.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  const handleAdd = (item)=>{
    addToCart(item)
    setCart(getCart())
    const t = document.createElement('div')
    t.textContent = `${item.name} added to cart`
    t.className = 'fixed right-4 bottom-4 bg-green-600 text-white px-4 py-2 rounded shadow'
    document.body.appendChild(t)
    setTimeout(()=> t.remove(), 1600)
  }

  const subtotal = cart.reduce((s,i)=> s + i.price * i.qty, 0)

  return (
    <div className="pt-24 container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Order Online</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 bg-white p-4 rounded shadow">
          <div className="mb-4">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search dishes or restaurants" className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <div className="font-semibold mb-2">Categories</div>
            <ul className="space-y-1 text-sm">
              <li>
                <button onClick={()=>setSelectedCategory('All')} className={`w-full text-left ${selectedCategory==='All'?'font-bold':''}`}>All</button>
              </li>
              {categories.map(c=> (
                <li key={c}>
                  <button onClick={()=>setSelectedCategory(c)} className={`w-full text-left ${selectedCategory===c?'font-bold':''}`}>{c}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <div className="font-semibold mb-2">Nearby Restaurants</div>
            <ul className="text-sm space-y-2">
              {restaurantsList.slice(0,5).map(r=> (
                <li key={r._id || r.id} className="flex items-center gap-2">
                  {r.image && <img src={r.image} alt={r.name} className="w-10 h-10 object-cover rounded" />}
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.cuisine} {r.address && `• ${r.address}`}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(item=> (
              <div key={item.id} className="bg-white rounded shadow overflow-hidden">
                <div className="flex">
                  <img src={item.image} alt={item.name} className="w-32 h-32 object-cover" />
                  <div className="p-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="text-green-600 font-bold">₹{item.price.toFixed(2)}</div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={()=>handleAdd(item)} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
                      <button onClick={()=>navigate(`/product/${item.id}`)} className="px-3 py-1 border rounded">Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside className="lg:col-span-1 bg-white p-4 rounded shadow">
          <div className="font-semibold">Your Cart</div>
          <div className="mt-2 space-y-2">
            {cart.length===0 && <div className="text-sm text-gray-500">Cart is empty</div>}
            {cart.map(i=> (
              <div key={i.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{i.name}</div>
                  <div className="text-sm text-gray-500">{i.qty} × ₹{i.price.toFixed(2)}</div>
                </div>
                <div className="font-semibold">₹{(i.qty * i.price).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-3">
            <div className="flex justify-between"><div className="font-medium">Subtotal</div><div className="font-bold">₹{subtotal.toFixed(2)}</div></div>
            <div className="mt-3">
              <button onClick={()=>navigate('/cart')} className="w-full bg-green-600 text-white py-2 rounded">View Cart / Checkout</button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}

export default OrderOnline