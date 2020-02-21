import Vue from 'vue'
import Router from 'vue-router'
// 引入模块，自定义组件
import Life from '@/components/life/PhotosList'
import Technology from '@/components/technology/NewsList'
import Shop from '@/components/shop/Goods'
import Mine from '@/components/mine/Mine'
import Publish from '@/components/publish/Publish'
//以上是底部栏模块
// import NewsList from '@/components/news/NewsList'
import NewsDetail from '@/components/technology/NewsDetail'
// import PhotosList from '@/components/photo/PhotosList'
import PhotosDetail from '@/components/life/PhotosDetail'
// import Goods from '@/components/Goods/Goods'
import GoodsDetail from '@/components/shop/GoodsDetail'
import GoodsComment from '@/components/shop/GoodsComment'
import Car from '@/components/shop/Car'




// 使用vue-router插件,相当于Vue.prototype.$route=Router;
Vue.use(Router)

// 根据匹配路由规则，加载对应的组件
export default new Router({
  routes: [
    {
      //动态路由匹配
      path: '/life/:categoryTitle',
      name: 'life',//命名路由
      component: Life
    }, {
      path: '/technology',
      name: 'technology',//命名路由
      component:Technology
    }, {
      path: '/publish',
      name: 'publish',//命名路由
      component: Publish
    }, {
      path: '/shop/:categoryTitle/:page',
      name: 'shop',//命名路由
      component: Shop
    },
     {
      path: '/mine',
      name: 'mine',//命名路由
      component: Mine
    },
    //以上是底部栏的路由设置
    //新闻列表
    {
      path:'/news/detail',
      name:'detail',
      component:NewsDetail
    },
    //图文分享
    {
      //query,?id=
      path:'/photos/detail',
      name:'photos.detail',
      component:PhotosDetail
    },
    //商品列表
    {
      //query,?id=
      path:'/goods/detail',
      name:'goods.detail',
      component:GoodsDetail
    },
    {
      //query,?id=
      path:'/goods/comment',
      name:'goods.comment',
      component:GoodsComment
    },
    //购物车
    {
       path:'/shop/car',
      name:'shop.car',
      component:Car
    }
  ]
})
