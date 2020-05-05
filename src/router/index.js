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

// 以下是用户信息和关于项目解说模块
import Login from '@/components/mine/Login'
import Register from '@/components/mine/Register'
import Install from '@/components/mine/Install'
import Message from '@/components/mine/Message'
import Password from '@/components/mine/Password'
import Secret from '@/components/mine/Secret'
import About from '@/components/mine/About'


// 使用vue-router插件,相当于Vue.prototype.$route=Router;
Vue.use(Router)

// 根据匹配路由规则，加载对应的组件
export default new Router({

  routes: [
  {
    path:'/',
    redirect:'/life/旅行'//将初始页面重定向
  },
    {
      //动态路由匹配
      path: '/life/:categoryTitle',
      name: 'life',//命名路由
      component: Life,
      meta:{keepAlive:true}//需要缓存的视图组件
    }, {
      path: '/technology',
      name: 'technology',//命名路由
      component:Technology,
      meta:{keepAlive:true}
    }, {
      path: '/publish',
      name: 'publish',//命名路由
      component: Publish,
      meta:{auto:true}//路由元信息
    }, {
      // path: '/shop/:categoryTitle/:page',
      path: '/shop/:categoryTitle',
      name: 'shop',//命名路由
      component: Shop,
      meta:{keepAlive:true}
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
      //先params后query,?id=
      path:'/photos/detail/:categoryTitle',
      name:'photos.detail',
      component:PhotosDetail
    },
    //商品列表
    {
      //query,?id=
      path:'/goods/detail',
      name:'goods.detail',
      component:GoodsDetail,
      meta:{keepAlive:true}
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
      component:Car,
      meta:{auto:true}
    },
    //用户信息
    {
      path:'/install',
      name:'install',
      component:Install
    },
    {
      path:'/install/message',
      name:'install.message',
      component:Message,
      meta:{auto:true}//路由元信息
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/install/password',
      name:'install.password',
      component:Password,
      meta:{auto:true}//路由元信息
    },{
      path:'/install/secret',
      name:'install.secret',
      component:Secret
    },{
      path:'/install/about',
      name:'install.about',
      component:About
    }
  ]
});


