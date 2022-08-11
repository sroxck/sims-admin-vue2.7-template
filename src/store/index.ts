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

