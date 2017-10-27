const TokenKey = 'user_token'
export default {
  getToken() {
    return window.sessionStorage.getItem(TokenKey)
  },
  setToken(token) {
    return window.sessionStorage.setItem(TokenKey, token)
  },
  removeToken() {
    return window.sessionStorage.removeItem(TokenKey)
  }
}
