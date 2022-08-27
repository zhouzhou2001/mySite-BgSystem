import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

//路由前置守卫
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  // const hasToken = getToken()

  const hasGetUserInfo = store.getters.user;

  // login鉴权
  if (to.meta.auth) {
    //需要鉴权
    if (hasGetUserInfo) {
      //有用户信息
      next();
    } else {
      //没有用户信息
      const hasToken = localStorage.getItem("adminUser");
      if (hasToken) {
        // 有token并验证有效性
        try {
          await store.dispatch("user/getInfo");
          next();
        } catch (error) {
          await store.dispatch("user/resetToken");
          Message.error("登录过期，请重新登录");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      } else {
        // 没有token
        next(`/login?redirect=${to.path}`);
      }
    }
    NProgress.done();
  } else {
    //不需要鉴权
    if (to.path === "/login" && hasGetUserInfo) {
      //导航到login页面并且有用户信息
      next({ path: "/" });
    } else {
      //不是导航到login页面
      next();
    }
    NProgress.done();
  }

  //   if (hasToken) {
  //     if (to.path === '/login') {
  //       // if is logged in, redirect to the home page
  //       next({ path: '/' })
  //       NProgress.done()
  //     } else {
  //       const hasGetUserInfo = store.getters.name
  //       if (hasGetUserInfo) {
  //         next()
  //       } else {
  //         try {
  //           // get user info
  //           await store.dispatch('user/getInfo')

  //           next()
  //         } catch (error) {
  //           // remove token and go to login page to re-login
  //           await store.dispatch('user/resetToken')
  //           Message.error(error || 'Has Error')
  //           next(`/login?redirect=${to.path}`)
  //           NProgress.done()
  //         }
  //       }
  //     }
  //   } else {
  //     /* has no token*/

  //     if (whiteList.indexOf(to.path) !== -1) {
  //       // in the free login whitelist, go directly
  //       next()
  //     } else {
  //       // other pages that do not have permission to access are redirected to the login page.
  //       next(`/login?redirect=${to.path}`)
  //       NProgress.done()
  //     }
  //   }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
