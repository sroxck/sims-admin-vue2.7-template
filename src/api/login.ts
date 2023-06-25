import {type login } from "@/types";
import { request } from "@/utils/index";
import { postFun } from "./common";
export async function apiLogin(data:any){
  const res = await postFun('/api/login/password', {
    "userName": data.username,
    "userPassword": data.password,
    "captcha": data.captcha,
    "captchaToken": data.captchaToken,
  })
  return res
} 
export function api_getList(params: any) {
  return request({
    url: '/table/list',
    method: 'post',
    params
  })
}

