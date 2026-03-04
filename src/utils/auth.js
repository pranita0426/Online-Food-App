// keep keys in sync with auth actions
const TOKEN_KEY = 'jwt'
const USER_KEY = 'user'

export function setAuth(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
  const s = localStorage.getItem(USER_KEY)
  return s ? JSON.parse(s) : null
}

export function updateUser(patch) {
  const u = getUser() || {}
  const updated = { ...u, ...patch }
  localStorage.setItem(USER_KEY, JSON.stringify(updated))
  return updated
}

export function isLoggedIn() {
  return !!getToken()
}
