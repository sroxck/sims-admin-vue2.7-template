/*
 * @Author: sroxck
 * @Date: 2023-05-29 10:31:09
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-25 10:20:18
 * @Description: 
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useLoginStore } from "@/store/modules/login";

import { MessageBox, Message } from 'element-ui'
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 请求拦截器
service.interceptors.request.use(

  config => {
    const loginStore = useLoginStore()
    console.log(loginStore,'loginStore')
    if (loginStore.token) {
      // 让每个请求携带token
      // ['Authorization'] 是自定义标题键
      // 请根据实际情况修改
        config.headers['Authorization'] = loginStore.token
    }
 
    // console.log(1)
    return config
  },
  error => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log(res,'res')
    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 500 || res.code === 502 ) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload()
          // })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
