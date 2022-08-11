import { PiniaPluginContext } from "pinia";
import { toRaw } from "vue";
type Options = {
  key:string,
  needKeepId?:string[]
}

const piniaPlugin = (options: Options) => {
  const { key, needKeepId = [] } = options
  return (context: PiniaPluginContext) => {
    const { store } = context
    console.log(toRaw(store.$state),'toRaw(store.$state)');
    
    console.log(JSON.stringify(toRaw(store.$state)),'toRaw(store.$state))');

    const data = JSON.parse(localStorage.getItem(`${key ?? "pinia"}-${store.$id}`) as string)
    if (needKeepId.length === 0) {
      console.log(JSON.stringify(toRaw(store.$state)),'toRaw(store.$state))');
      
      store.$subscribe(() => {
        localStorage.setItem(`${key ?? "pinia"}-${store.$id}`, JSON.stringify(toRaw(store.$state)))
      })
    } else {
      needKeepId.includes(store.$id) &&
        store.$subscribe(() => {
          localStorage.setItem(`${key ?? "pinia"}-${store.$id}`, JSON.stringify(toRaw(store.$state)))
        })
    }

    return {
      ...data,
    }
  }
}

export default piniaPlugin
