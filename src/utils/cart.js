const CART_KEY = 'qb_cart'

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]')
  } catch (e) {
    return []
  }
}

export function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event('cartChanged'))
}

export function addToCart(item, qty = 1) {
  const cart = getCart()
  const found = cart.find(i => i.id === item.id)
  if (found) {
    found.qty = (found.qty || 1) + qty
  } else {
    cart.push({ ...item, qty })
  }
  setCart(cart)
  return cart
}

export function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id)
  setCart(cart)
  return cart
}

export function updateQty(id, qty) {
  const cart = getCart()
  const it = cart.find(i => i.id === id)
  if (it) {
    it.qty = qty
    if (it.qty <= 0) return removeFromCart(id)
  }
  setCart(cart)
  return cart
}

export function clearCart() {
  setCart([])
}

export function cartCount() {
  return getCart().reduce((s, i) => s + (i.qty || 0), 0)
}
