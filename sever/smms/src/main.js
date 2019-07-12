import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/reset.css'   //引入重置样式
import  './assets/css/common.css'  //引入公用样式

import ElementUI from 'element-ui'; // 引入JS组件
import 'element-ui/lib/theme-chalk/index.css'; // 引入css样式

// import axios from 'axios'; //引入axios
// import qs from 'qs'   //引入qs

// // 再vue原型上挂在axios
// Vue.prototype.axios = axios
// //再vue原型上挂在qs
// Vue.prototype.qs = qs

Vue.use( ElementUI )   //注册ElementUI

// 引入本地存储的封装
import local from '@/utils/local'

// 路由守卫，拦截所有路由
router.beforeEach( (to, from, next) => {
  //获取token
  const token = local.get('key')
  //判断
  if(token){   //如果有token ， 那么就放行
    next()   //放行
  } else {
    if(to.path === '/login'){  //如果去的时登陆页面，就放行
      next()
    } else {  //如果去的不是登陆页面，那么就跳到登陆页面
      next({path:'/login'})
    }
  }
})

Vue.config.productionTip = false   //阻止生产提示

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
