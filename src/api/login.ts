import {type login } from "@/types";
import { request } from "@/utils/index";
export function apiLogin(data:login):string{
  if(data.account == 'admin' && data.password == '123456'){
    return '12312319054019450190'
  }else{
    return ''
  }
} 
export function api_getList(params: any) {
  return request({
    url: '/table/list',
    method: 'post',
    params
  })
}

