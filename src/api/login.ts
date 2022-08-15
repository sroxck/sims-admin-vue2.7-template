import { login } from "@/types";
import { require } from "@/utils/index";
export function apiLogin(data:login):string{
  if(data.account == 'admin' && data.password == '123456'){
    return '12312319054019450190'
  }else{
    return ''
  }
} 