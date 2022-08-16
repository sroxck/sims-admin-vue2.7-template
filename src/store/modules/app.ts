import { defineStore } from "pinia";
import { RouteConfig } from "vue-router";
type appConfig = {
  isCollapsed: boolean,
  isActive:string,
  catchList: Record<string,any>[],
  routerList:any[]
}
export const useAppStore = defineStore('app',{
  
  state:()=>{
    const res:appConfig={
      isCollapsed: false,
      isActive:'',
      catchList: [],
      routerList:[]
    }
    return  res
  }
})