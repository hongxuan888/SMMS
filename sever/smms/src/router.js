import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    // 配置登陆页面路由
    { path:'/', redirect:'/login' },  //根目录重定向到login页面
    { path:'/login',component: () => import ('./views/Login/Login.vue') },
    //配置首页路由
    { path:'/home' , component: () => import ('./views/Home/Home.vue'),   //父组件
    redirect:'/home/systeminfo',
    children:[
      // 子路由
      { path:'/home/accountadd' , component: () => import ('./views/AccountAdd/AccountAdd.vue')},
      { path:'/home/accountmansge' , component: () => import ('./views/AccountManage/AccountManage.vue')},
      { path:'/home/goodsadd', component: () => import ('./views/GoodsAdd/GoodsAdd.vue')},
      { path:'/home/goodsmanage' , component: () => import ('./views/GoodsManage/GoodsManage.vue')},
      { path:'/home/passwordmodify' , component: () => import ('./views/PasswordModify/PasswordModify.vue')},
      { path:'/home/selltotal' , component: () => import ('./views/SellTotal/SellTotal.vue')},
      { path:'/home/stocktotal' , component: () => import ('./views/StockTotal/StockTotal.vue')},
      { path:'/home/systeminfo' , component: () => import ('./views/SystemInfo/SystemInfo.vue')},
      { path:'/home/inventorymanage' , component: () => import ('./views/InventoryManage/InventoryManage.vue')},
      { path:'/home/inventoryadd' , component: () => import ('./views/InventoryAdd/InventoryAdd.vue')},
      { path:'/home/commoditygetoutwarehouse' , component: () => import ('./views/commodityGetOutWarehouse/commodityGetOutWarehouse.vue')},
      { path:'/home/commoditysendback' , component: () => import ('./views/commoditySendBack/commoditySendBack.vue')},
      { path:'/home/selllist' , component: () => import ('./views/sellList/sellList.vue')},
      { path:'/home/personal' , component: () => import ('./views/Personal/personal.vue')},
      
    ]
    }
   
  ]
})
