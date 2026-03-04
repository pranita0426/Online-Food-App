import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCart, removeFromCart, updateQty, clearCart } from '../utils/cart'
import { createPaymentLink } from '../states/Payment/Action'
import { toast } from 'react-toastify'

const Cart = () => {
  const [items, setItems] = useState(getCart())
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    const h = () => setItems(getCart())
    window.addEventListener('cartChanged', h)
    return () => window.removeEventListener('cartChanged', h)
  }, [])

  const handleRemove = (id) => {
    removeFromCart(id)
    setItems(getCart())
  }

  const changeQty = (id, q) => {
    if (q < 1) return
    updateQty(id, q)
    setItems(getCart())
  }

  const total = items.reduce((s,i)=>s + (i.price * (i.qty||1)), 0)

  const handleCheckout = async () => {
    if (!user) {
      toast.warn('Please login to checkout')
      navigate('/auth')
      return
    }

    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    try {
      setLoading(true)
      // TODO: Create order first, then get payment link
      // For now, we'll show a placeholder
      toast.info('Checkout feature coming soon')
      // await dispatch(createPaymentLink(orderId))
    } catch (error) {
      toast.error('Error processing checkout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 container mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-gray-600 bg-white p-8 rounded text-center">
          <p>Your cart is empty.</p>
          <button onClick={() => navigate('/menu')} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map(it => (
              <div key={it.id} className="flex items-center bg-white p-4 rounded shadow">
                <img src={it.image} alt={it.name} className="w-24 h-20 object-cover rounded" />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{it.name}</div>
                    <div className="font-semibold">${(it.price).toFixed(2)}</div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={()=>changeQty(it.id, (it.qty||1)-1)} className="px-2 py-1 border hover:bg-gray-100">-</button>
                    <div className="px-3 py-1 border">{it.qty||1}</div>
                    <button onClick={()=>changeQty(it.id, (it.qty||1)+1)} className="px-2 py-1 border hover:bg-gray-100">+</button>
                    <button onClick={()=>handleRemove(it.id)} className="ml-4 text-sm text-red-600 hover:text-red-800">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="bg-white p-6 rounded shadow h-fit sticky top-24">
            <div className="font-semibold mb-4 text-lg">Order Summary</div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Savings</span>
                <span>-$0.00</span>
              </div>
              <div className="border-t pt-2 mt-2"></div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-4">Taxes and delivery calculated at checkout.</div>
            <div className="flex flex-col gap-2">
              <button 
                onClick={handleCheckout} 
                disabled={loading}
                className="bg-green-600 text-white px-4 py-3 rounded font-semibold hover:bg-green-700 disabled:bg-gray-400"
              >
                {loading ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              <button 
                onClick={()=>{ clearCart(); setItems(getCart()) }} 
                className="px-4 py-2 rounded border hover:bg-gray-50"
              >
                Clear cart
              </button>
              <button 
                onClick={() => navigate('/menu')} 
                className="px-4 py-2 rounded border text-blue-600 hover:bg-blue-50"
              >
                Continue Shopping
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default Cart
