import { defineStore } from "pinia";
type appConfig = {
  isCollapsed: boolean,
  isActive:string,
  catchList: Record<string,any>[]
}
export const useAppStore = defineStore('app',{
  
  state:()=>{
    const res:appConfig={
      isCollapsed: false,
      isActive:'',
      catchList: []
    }
    return  res
  }
})