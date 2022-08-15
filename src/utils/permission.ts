// import router from "@/router";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css"; // progress bar style
// NProgress.configure({ showSpinner: false }); // NProgress Configuration
// import { constantRouter } from "@/router/constantRouter";

// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   const whiteList = ["/login"];
//   const hasToken = true;
//   if (hasToken) {
//     if (to.path === "/login") {
//       next({ path: "/" });
//     } else {
//       const roleName = 'admin'
//       getMenuByRole(roleName)
//       next()
//     }

//     NProgress.done();

//   } else {
//     if (whiteList.includes(to.path)) {
//       next();
//     } else {
//       next({path:'/login'});
//     }
//     NProgress.done();
//   }
// });
// function getMenuByRole(role:any){
//   return constantRouter
// }
// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done();
// });
