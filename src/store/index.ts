/*
 * @Author: sroxck
 * @Date: 2023-05-29 10:31:09
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-25 10:19:23
 * @Description: 
 */
import Vue from "vue";
import { createPinia, PiniaVuePlugin  } from "pinia";
import piniaPlugin from "./plugins/piniaPlugin";
export { storeToRefs } from "pinia";
Vue.use(PiniaVuePlugin);
export const store = createPinia();
store.use(
  piniaPlugin({
    key: "pinia",
    // needKeepId:
  })
)
export * from "./modules/test";
export * from "./modules/app";
export * from "./modules/settings";
export * from "./modules/login";

