import router, { useRouter } from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({ showSpinner: false }); // NProgress Configuration
import { asyncRouterMap, routeListS } from "@/router";
import { getToken } from "./getToken";
import { useAppStore } from "@/store";
let rome = false;
router.beforeEach((to, from, next) => {
  NProgress.start();
  const whiteList = ["/login"];
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (rome) {
        next();
      } else {
        const roleName = "admin";
        const menu = getMenuByRole(roleName);
        router.addRoutes(menu);
        const appStore = useAppStore();
        appStore.routerList = [...asyncRouterMap, ...routeListS];
        rome = true;
        next({ ...(to as any), replace: true });
      }
    }
    NProgress.done();
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next({ path: "/login" });
    }
    NProgress.done();
  }
});
function getMenuByRole(role: any) {
  
  return asyncRouterMap;
}
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
