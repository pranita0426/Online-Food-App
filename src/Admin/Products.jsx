import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct } from '../states/Product/Action'
import { toast } from 'react-toastify'

const Products = () => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setForm(f => ({ ...f, image: files[0] }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      toast.error('Name, price and category required');
      return;
    }
    try {
      const data = new FormData();
      Object.keys(form).forEach(k => {
        if (form[k] !== null && form[k] !== '') {
          data.append(k, form[k]);
        }
      });
      await dispatch(createProduct(data));
      toast.success('Product created');
      setForm({ name: '', description: '', price: '', category: '', image: null });
    } catch (err) {
      toast.error('Failed: ' + err.message);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Manage Products</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1">Price</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1">Category</label>
            <input name="category" value={form.category} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
        </div>
        <div>
          <label className="block mb-1">Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  )
}

export default Products
