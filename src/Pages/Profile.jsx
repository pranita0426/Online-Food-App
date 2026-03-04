import React, { useEffect, useState } from 'react'
import { getToken, clearAuth } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../States/AUTH/Action';

const Profile = () => {
  const [user, setUser] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken()
      if (!token) {
        navigate('/login')
        return
      }
      try {
        const res = await fetch('/api/v1/user/profile', { headers: { Authorization: `Bearer ${token}` } })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to load')
        setUser(data)
        setPhotoPreview(data.photo || null)
      } catch (err) {
        setError(err.message)
      } finally { setLoading(false) }
    }
    fetchProfile()
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser());
    clearAuth()
    window.dispatchEvent(new Event('authChanged'))
    navigate('/')
  }

  const handlePhotoSelect = (e) => {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    setPhotoFile(f)
    const reader = new FileReader()
    reader.onload = () => setPhotoPreview(reader.result)
    reader.readAsDataURL(f)
  }

  const handleSavePhoto = async () => {
    const token = getToken()
    if (!token) {
      alert('Not authenticated')
      return
    }
    if (!photoFile) {
      alert('Please choose an image file first')
      return
    }
    const fd = new FormData()
    fd.append('photo', photoFile)

    try {
      const res = await fetch('/api/v1/user/update', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to update')
      const { updateUser } = await import('../utils/auth')
      updateUser(data.user)
      window.dispatchEvent(new Event('authChanged'))
      setUser(data.user)
      alert('Profile photo updated')
    } catch (err) {
      console.error(err)
      alert(err.message || 'Failed to save photo')
    }
  }

  const handleRemovePhoto = async () => {
    const token = getToken()
    if (!token) {
      alert('Not authenticated')
      return
    }
    try {
      const res = await fetch('/api/v1/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ removePhoto: true })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to remove')
      const { updateUser } = await import('../utils/auth')
      updateUser(data.user)
      window.dispatchEvent(new Event('authChanged'))
      setUser(data.user)
      setPhotoPreview(null)
      alert('Profile photo removed')
    } catch (err) {
      console.error(err)
      alert(err.message || 'Failed to remove photo')
    }
  }

  if (loading) return <div className="pt-24 container mx-auto px-6">Loading...</div>
  if (error) return <div className="pt-24 container mx-auto px-6 text-red-600">{error}</div>

  return (
    <div className="pt-24 container mx-auto px-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            <img src={photoPreview || user.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name} {user.surname}</h2>
            <div className="text-sm text-gray-600">{user.email}</div>
            <div className="text-sm text-gray-600">{user.mobile}</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Update Profile Photo</label>
            <input type="file" accept="image/*" onChange={handlePhotoSelect} />
            <div className="flex gap-2 mt-2">
              <button onClick={handleSavePhoto} className="px-3 py-2 rounded bg-green-600 text-white">Save Photo</button>
              <button onClick={handleRemovePhoto} className="px-3 py-2 rounded border">Remove Photo</button>
            </div>
          </div>
          <h3 className="font-semibold mb-2">Account</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div>Joined: {new Date(user.createdAt).toLocaleDateString()}</div>
            <div>Role: {user.role || 'Customer'}</div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={()=>navigate('/')} className="px-4 py-2 rounded border">Home</button>
          <button onClick={handleLogout} className="px-4 py-2 rounded bg-red-600 text-white">Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
