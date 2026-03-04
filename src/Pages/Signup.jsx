import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { setAuth } from '../utils/auth'
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from 'react-icons/fa'

const foodIcons = ['🍕', '🍔', '🍟', '🥤', '🌮', '🍩']

const FloatingIcon = ({ icon, delay, size, top, left, duration, rotate, opacity }) => (
  <div
    style={{
      top: `${top}%`,
      left: `${left}%`,
      fontSize: `${size}px`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      transform: `rotate(${rotate}deg)`,
      opacity,
      textShadow: '2px 2px 6px rgba(0,0,0,0.3)',
    }}
    className="absolute animate-float-diagonal select-none pointer-events-none"
  >
    {icon}
  </div>
)

const Signup = () => {
  const [form, setForm] = useState({ name: '', surname: '', mobile: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const text = await res.text()
      let data = null
      try {
        data = text ? JSON.parse(text) : null
      } catch (parseErr) {
        console.error('Failed to parse JSON response:', parseErr, 'raw:', text)
        throw new Error(res.ok ? 'Invalid server response' : (res.statusText || 'Signup failed'))
      }
      if (!res.ok) throw new Error((data && data.message) || res.statusText || 'Signup failed')
      setAuth(data.jwt, data.user)
      navigate('/profile')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-orange-400 to-yellow-200 overflow-hidden px-4 py-12">
      {/* Floating food icons */}
      {foodIcons.map((icon, i) => (
        <FloatingIcon
          key={i}
          icon={icon}
          delay={Math.random() * 5}
          size={20 + Math.random() * 30}
          top={Math.random() * 80}
          left={Math.random() * 90}
          duration={10 + Math.random() * 10}
          rotate={Math.random() * 360}
          opacity={0.5 + Math.random() * 0.5}
        />
      ))}

      {/* Signup Card */}
      <div
        className={`relative z-10 max-w-md w-full bg-white p-8 rounded-lg shadow-2xl transform transition-all duration-700 ${
          fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create an account</h2>

        {error && (
          <div role="alert" className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div className="grid grid-cols-2 gap-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="First name"
              required
              className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
            <input
              name="surname"
              value={form.surname}
              onChange={handleChange}
              placeholder="Last name"
              required
              className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
          </div>
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            required
            className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
            className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          />
          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              required
              className="px-4 py-2 border rounded-lg w-full pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transform transition-all duration-200 ${
              loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:scale-105'
            }`}
          >
            {loading ? 'Creating...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-medium hover:underline transition-colors duration-200">
            Log in
          </Link>
        </p>
      </div>

      {/* Floating animation keyframes */}
      <style>
        {`
          @keyframes float-diagonal {
            0% { transform: translate(0,0) rotate(0deg); }
            50% { transform: translate(20px, -30px) rotate(180deg); }
            100% { transform: translate(0,0) rotate(360deg); }
          }
          .animate-float-diagonal {
            animation: float-diagonal linear infinite;
          }
        `}
      </style>
    </div>
  )
}

export default Signup
