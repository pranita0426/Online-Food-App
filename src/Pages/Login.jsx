import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

const AuthPage = () => {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    mobile: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50)
    return () => clearTimeout(timer)
  }, [mode])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const url = mode === 'login'
        ? '/api/v1/auth/login'
        : '/api/v1/auth/signup'

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const text = await res.text()
      let data = null

      try {
        data = text ? JSON.parse(text) : null
      } catch (parseErr) {
        console.error('JSON parse error:', parseErr)
        throw new Error('Invalid server response')
      }

      if (!res.ok) {
        throw new Error((data && data.message) || res.statusText || 'Request failed')
      }

      setAuth(data.jwt, data.user)

      alert(mode === 'login' ? 'Login successful 🎉' : 'Account created 🎉')

      navigate('/profile')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-orange-400 to-yellow-200 overflow-hidden px-4 py-12">

      {/* Floating Icons */}
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

      {/* Auth Card */}
      <div
        className={`relative z-10 max-w-md w-full p-8 rounded-2xl backdrop-blur-lg bg-white/80 border border-white/40 shadow-2xl transform transition-all duration-700 ${
          fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {mode === 'login' ? 'Welcome Back!' : 'Create an Account'}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">

          {/* Name fields */}
          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-2">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="First name"
                required
                className="px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
              <input
                name="surname"
                value={form.surname}
                onChange={handleChange}
                placeholder="Last name"
                required
                className="px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          {/* Mobile */}
          {mode === 'signup' && (
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              type="tel"
              pattern="[0-9]{10}"
              required
              className="px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
            />
          )}

          {/* Email */}
          <input
            autoFocus
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
            className="px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
          />

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              minLength={6}
              required
              className="px-4 py-2 border rounded-lg w-full pr-10 focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
              loading
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-linear-to-r from-green-500 to-emerald-600 hover:scale-105 hover:shadow-lg'
            }`}
          >
            {loading
              ? mode === 'login'
                ? 'Logging in...'
                : 'Creating...'
              : mode === 'login'
              ? 'Log in'
              : 'Sign up'}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6 space-y-3">
          <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50 transition">
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50 transition">
            <FaFacebookF className="text-blue-600" />
            Continue with Facebook
          </button>
        </div>

        {/* Switch Mode */}
        <p className="mt-6 text-center text-sm text-gray-600">
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login')
              setForm({ email: '', password: '', name: '', surname: '', mobile: '' })
              setError('')
            }}
            className="text-green-600 font-medium hover:underline"
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>

      {/* Animation */}
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

export default AuthPage
