import Vue from "vue";
import { createPinia, PiniaVuePlugin  } from "pinia";
export { storeToRefs } from "pinia";
Vue.use(PiniaVuePlugin);
export const store = createPinia();
export * from "./modules/test";
