import React, { useEffect, useState } from 'react'
import { api } from '../config/apiConfig';
import { toast } from 'react-toastify'

const Restaurants = () => {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ name: '', cuisine: '', address: '', image: '' })

  const fetch = async () => {
    try {
      const { data } = await api.get('/api/v1/restaurants');
      setList(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetch() }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/api/v1/restaurant', form);
      toast.success('Restaurant added')
      setForm({ name: '', cuisine: '', address: '', image: '' })
      fetch()
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Manage Restaurants</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block mb-1">Cuisine</label>
          <input name="cuisine" value={form.cuisine} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1">Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>

      <hr className="my-8" />
      <h3 className="text-xl font-semibold mb-4">Existing Restaurants</h3>
      <ul className="space-y-2">
        {list.map(r => (
          <li key={r._id} className="border p-3 rounded">
            <div className="font-semibold">{r.name}</div>
            <div className="text-sm text-gray-600">{r.cuisine} {r.address && `• ${r.address}`}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Restaurants
