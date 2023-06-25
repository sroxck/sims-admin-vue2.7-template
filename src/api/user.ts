/*
 * @Author: sroxck
 * @Date: 2023-06-25 09:42:56
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-25 10:01:28
 * @Description: 
 */
import request from '@/utils/request'
// import request1 from '@/utils/request copy'

export function login(data) {
  return request({
    url: '/cebp-dwh/api/user/login', // url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function login11(data) {
  return request({
    url: '/cebp-dwh/api/phoneBinding/login', // url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}
/** 无密码登录 */
export function testLogin(data) {
  return request({
    url: '/cebp-dwh/api/test/login', // url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/cebp-dwh/user/info',
    method: 'get',
    headers: { 'Authorization': token }, // 这个地方是因为我需要给http请求协议加上一个请求头
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/cebp-dwh/api/user/logout',
    method: 'get'
  })
}
/** 获取验证码 */
export function captcha() {
  return request({
    url: '/api/captcha',
    method: 'get'
  })
}
// ukey 登录
export function ukeyLogin(data) {
  return request({
    url: '/cebp-dwh/api/usbKeyBinding/login',
    method: 'post', data
  })
}
/** 令牌服务 */
export function tokenRefresh(data) {
  return request({
    url: '/cebp-dwh/api/auth/refresh/token',
    method: 'post',
    data
  })
}
/** 获取导航 */
export function getAuthMenu(data) {
  return request({
    url: '/cebp-dwh/api/menu/listbyuserid',
    method: 'post',
    data
  })
}
