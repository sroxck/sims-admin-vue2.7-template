import Cookies from 'js-cookie'

const TokenKey = location.host + '/cebpdwh/Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
/**获取localstorage 的值 */
export function getUserInfo() {
  return JSON.parse(window.localStorage.getItem(location.host +'/cebpdwh'+'/userInfo'))
}

