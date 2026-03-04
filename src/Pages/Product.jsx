import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { menuItems } from '../Data/menuData'
import { addToCart } from '../utils/cart'
import { addToWishlist, removeFromWishlist } from '../states/Wishlist/Action'
import { Heart } from 'lucide-react'
import { toast } from 'react-toastify'

const Product = ()=>{
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { wishlist } = useSelector(state => state.wishlist)
  const { user } = useSelector(state => state.auth)
  const [isInWishlist, setIsInWishlist] = useState(false)
  
  const item = menuItems.find(i => String(i.id) === String(id))
  if(!item) return <div className="pt-24 container mx-auto px-6">Item not found</div>

  const handleAdd = ()=>{
    addToCart(item)
    toast.success(`${item.name} added to cart`)
  }

  const handleWishlist = async () => {
    if (!user) {
      toast.warn('Please login to add to wishlist')
      navigate('/auth')
      return
    }
    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(item.id))
        setIsInWishlist(false)
        toast.info(`${item.name} removed from wishlist`)
      } else {
        await dispatch(addToWishlist(item.id))
        setIsInWishlist(true)
        toast.success(`${item.name} added to wishlist`)
      }
    } catch (error) {
      toast.error('Error updating wishlist')
    }
  }

  return (
    <div className="pt-24 container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded shadow p-6">
          <img src={item.image} alt={item.name} className="w-full h-80 object-cover rounded" />
          <h1 className="text-2xl font-semibold mt-4">{item.name}</h1>
          <div className="text-gray-600 mt-2">{item.description}</div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xl font-bold">${item.price.toFixed(2)}</div>
            <div className="flex gap-2">
              <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add to cart</button>
              <button onClick={handleWishlist} className="px-4 py-2 rounded border hover:bg-gray-100">
                <Heart size={20} />
              </button>
              <button onClick={()=>navigate('/cart')} className="px-4 py-2 rounded border hover:bg-gray-100">Checkout</button>
            </div>
          </div>
        </div>

        <aside className="bg-white p-4 rounded shadow">
          <div className="font-semibold mb-4">Product Details</div>
          <div className="text-sm text-gray-600 mb-2">Category: {item.category}</div>
          <div className="text-sm text-gray-600 mb-2">Vegetarian: {item.veg ? 'Yes' : 'No'}</div>
          <div className="text-sm text-gray-600 mb-2">Price: ${item.price.toFixed(2)}</div>
          <div className="mt-6 pt-4 border-t">
            <button onClick={handleWishlist} className="w-full py-2 px-4 border border-gray-300 rounded text-red-500 hover:bg-red-50">
              {isInWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Product
