import { apiLogin } from '@/api/login'
import { login } from '@/types'
import { Message } from 'element-ui'
import { defineStore } from 'pinia'
import { useAppStore } from './app'
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useLoginStore = defineStore('login', {
  // other options...
  state: ()=>{
    return {
      token:''
    }
  },
  actions:{
    login(data:login){
    const appStore = useAppStore()
      
      return new Promise((resolve, reject) => {
        const token = apiLogin(data)
        if(token == '') {
          // reject()
          Message.error('登录失败')
        }else{
          this.token = token
          resolve(token)
          Message.success('登录成功')
          appStore.catchList.push({
            title: '首页',
            fullPath: '/',
          })
        }
      })
    }
  }
})
