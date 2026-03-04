import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getWishlist, removeFromWishlist } from '../states/Wishlist/Action'
import { toast } from 'react-toastify'
import { Trash2 } from 'lucide-react'

const Wishlist = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { wishlist, loading } = useSelector(state => state.wishlist)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (user) {
      dispatch(getWishlist())
    } else {
      navigate('/auth')
    }
  }, [user, dispatch, navigate])

  const handleRemove = async (productId) => {
    try {
      await dispatch(removeFromWishlist(productId))
      toast.success('Removed from wishlist')
    } catch (error) {
      toast.error('Error removing from wishlist')
    }
  }

  const handleAddToCart = (product) => {
    // TODO: Implement add to cart
    toast.info('Add to cart coming soon')
  }

  if (loading) {
    return (
      <div className="pt-24 container mx-auto px-6 py-8">
        <div className="text-center text-gray-600">Loading wishlist...</div>
      </div>
    )
  }

  return (
    <div className="pt-24 container mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6">My Wishlist</h1>

      {!wishlist || wishlist.length === 0 ? (
        <div className="bg-white p-8 rounded text-center">
          <p className="text-gray-600 mb-4">Your wishlist is empty</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product, idx) => {
            if (!product) {
              console.warn('Skipping undefined wishlist entry', idx);
              return null;
            }
            return (
              <div
                key={product._id || product.id || idx}
                className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative">
                  <img
                    src={product.image || '/placeholder.png'}
                    alt={product.name || 'product'}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 truncate">
                    {product.name || 'Unnamed item'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description || ''}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold text-green-600">
                      ${(product.price || 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-semibold"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(product._id || product.id)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default Wishlist
