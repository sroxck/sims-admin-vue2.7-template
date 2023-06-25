import { MessageBox, Message } from 'element-ui'
export function alertMsg(type,msg) {
   	Message({
      message: msg,
      type: type,
        duration: type == 'error' ? 2000 : 2000
    })
}