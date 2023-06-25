/**
 ** @Author: Jingdongdong
 ** @Date: 2022-01-13 14:13:47
 ** @LastEditTime: 2022-03-11 15:03:38
 ** @LastEditors: Jingdongdong
 ** @Description:
 **/
import request from '@/utils/require'
import { getToken } from '@/utils/auth' // get token from cookie

/* 表格*/
export function getList(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
/* post请求*/
export function postFun(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
export function postFileFun(url, data) {
  return request({
    url: url,
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export function postBlobFun(url, data) {
  return request({
    url: url,
    method: 'post',
    data,
    responseType: 'blob'
  })
}
export function getBlobFun(url, data) {
  return request({
    url: url,
    method: 'get',
    data,
    responseType: 'blob'
  })
}
/* post请求 (携带 header) */
export function postHeaderFun(url, data, headers) {
  return request({
    url: url,
    method: 'post',
    data,
    headers: headers
  })
}
/* get请求*/
export function getFun(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
/* formData请求*/
export function formDataFun(url, params) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data' // multipart/form-data;boundary=--xxxxxxx   application/json
    },
    url: url,
    method: 'post',
    params
  })
}
export function getTokenFun(url, data, token, subid) {
  console.log(token)
  localStorage.removeItem(location.host + 'cebpdwh/subId')
  return request({
    headers: {
      Authorization: token,
      subid: subid
    },
    url: url,
    method: 'post',
    data
  })
}

export function getTokenFunBlob(url, data, token, subid) {
  console.log(token)
  localStorage.removeItem(location.host + 'cebpdwh/subId')
  return request({
    headers: {
      Authorization: token,
      subid: subid
    },
    url: url,
    method: 'post',
    data,
    responseType: 'blob'
  })
}
