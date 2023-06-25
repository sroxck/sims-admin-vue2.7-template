/*
 * @Author: sroxck
 * @Date: 2023-05-29 10:31:09
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-25 10:19:09
 * @Description: 
 */
import { apiLogin } from '@/api/login'
import { login } from '@/types'
import { Message } from 'element-ui'
import { defineStore } from 'pinia'
import { useAppStore } from './app'
import { postFun } from '@/api/common'
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useLoginStore = defineStore('login', {
  // other options...
  state: () => {
    return {
      token: '',
      userInfo:'',
    }
  },
  actions: {
    login(data:any) {
      const appStore = useAppStore()
      return new Promise(async (resolve, reject) => {
        const token = await apiLogin(data) as any
        console.log(token,'token')
        if(token.status != 200) {
          // reject()
          Message.error('登录失败')
        }else{
          this.token = token.data.token
          this.userInfo = token.data
          resolve(token)
          Message.success('登录成功')
          appStore.catchList.push({
            title: '首页',
            fullPath: '/home',
          })
        }
      })
    }
  }
})
