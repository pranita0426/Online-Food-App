import React, { useState, useMemo } from 'react'
import { restaurants } from '../Data/menuData'

const Restaurants = () => {
  const [q, setQ] = useState('')
  const [cuisine, setCuisine] = useState('')

  const visible = useMemo(() => {
    return restaurants.filter(r => {
      if (cuisine && r.cuisine !== cuisine) return false
      if (!q) return true
      const s = q.toLowerCase()
      return r.name.toLowerCase().includes(s) || r.cuisine.toLowerCase().includes(s) || r.location.toLowerCase().includes(s)
    })
  }, [q, cuisine])

  const cuisines = Array.from(new Set(restaurants.map(r => r.cuisine)))

  return (
    <div className="container mx-auto px-6 py-12 pt-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Restaurants</h1>
        <div className="flex gap-2">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search restaurants or cuisine..." className="px-3 py-2 rounded border" />
          <select value={cuisine} onChange={(e)=>setCuisine(e.target.value)} className="px-3 py-2 rounded border">
            <option value="">All Cuisines</option>
            {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visible.map(r => (
          <div key={r.id} className="bg-white rounded shadow overflow-hidden">
            <img src={r.image} alt={r.name} className="w-full h-44 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{r.name}</h3>
                <div className="text-sm text-gray-600">{r.rating} ★</div>
              </div>
              <div className="text-sm text-gray-500">{r.cuisine} · {r.location}</div>
              <div className="mt-3 flex justify-end">
                <a href="/menu" className="text-green-600">View menu</a>
              </div>
            </div>
          </div>
        ))}
        {visible.length === 0 && <div className="col-span-full text-center text-gray-500">No restaurants found.</div>}
      </div>
    </div>
  )
}

export default Restaurants
