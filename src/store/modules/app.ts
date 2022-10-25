import { defineStore } from "pinia";
import { RouteConfig } from "vue-router";
type appConfig = {
  isCollapsed: boolean,
  isActive:string,
  currentRoute:any,
  catchList: Record<string,any>[],
  routerList:any[]
}
export const useAppStore = defineStore('app',{
  
  state:()=>{
    const res:appConfig={
      isCollapsed: false,
      isActive:'',
      currentRoute:'',
      catchList: [],
      routerList:[]
    }
    return  res
  }
})
