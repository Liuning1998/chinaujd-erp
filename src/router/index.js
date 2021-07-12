import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'


Vue.use(Router)
//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch(err => err);
};
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject);
  }
  return originalReplace.call(this, location).catch(err => err);
};


// 刷新防止vuex丢失
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'));
  store.commit('set_name', sessionStorage.getItem('name'));
  store.commit('set_userId', sessionStorage.getItem('userId'));
}

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import("@/components/Login")
    },
    {
      path: '/index',
      component: () => import("@/components/Home"),
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: () => import("@/views/index/Index"),
          name: '/welcome'
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = store.state.token;
    if (['', null].includes(token)) {
      // next('/login');
      next();
    } else {
      next();
    }
  }
});
export default router
