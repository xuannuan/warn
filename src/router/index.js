import Vue from 'vue'
import Router from 'vue-router'
// 引入模块，自定义组件
import Home from '@/components/home/Home'
import Car from '@/components/car/Car'
import Vip from '@/components/vip/Vip'
import Search from '@/components/search/Search'
import NewsList from '@/components/news/NewsList'
import NewsDetail from '@/components/news/NewsDetail'
import PhotosList from '@/components/photo/PhotosList'
import PhotosDetail from '@/components/photo/PhotosDetail'
import Goods from '@/components/Goods/Goods'
import GoodsDetail from '@/components/Goods/GoodsDetail'
import GoodsComment from '@/components/Goods/GoodsComment'





// 使用vue-router插件,相当于Vue.prototype.$route=Router;
Vue.use(Router)

// 根据匹配路由规则，加载对应的组件
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',//命名路由
      component: Home
    }, {
      path: '/car',
      name: 'car',//命名路由
      component: Car
    }, {
      path: '/search',
      name: 'search',//命名路由
      component: Search
    }, {
      path: '/vip',
      name: 'vip',//命名路由
      component: Vip
    },
    //新闻列表
    {
      path:'/news/list',
      name:'news.list',
      component:NewsList
    },
    {
      path:'/news/detail',
      name:'detail',
      component:NewsDetail
    },
    //图文分享
    {
      //动态路由匹配
      path:'/photos/list/:categoryTitle',
      name:'photos.list',
      component:PhotosList
    },{
      //query,?id=
      path:'/photos/detail',
      name:'photos.detail',
      component:PhotosDetail
    },
    //商品列表
    {
      //动态路由匹配
      path:'/goods/list/:categoryTitle/:page',
      name:'goods.list',
      component:Goods
    },
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
       path:'/car',
      name:'car',
      component:Car
    }
  ]
})
