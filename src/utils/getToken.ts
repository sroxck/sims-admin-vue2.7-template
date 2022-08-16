import { useLoginStore } from "@/store/modules/login";

export function getToken(){
  const store = useLoginStore()  
  return store.token
}