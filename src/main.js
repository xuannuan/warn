// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 入口文件
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
//引入vuex仓库，还要在实例中挂载
import store from './store'


// 配置axios,每一个文件对axios发起请求，要挂载到vue实例化对象上
Vue.prototype.$axios=Axios;
//基本地址
// Axios.defaults.baseURL='https://api03.6bqb.com/xhs/';


// 引入mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);
// 全局引入样式，公司项目建议不要全局引入，占内存，建议有序引入
import 'mint-ui/lib/style.css'
// 引入element-ui
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';

//引入图片查看器，查看放大图
import VuePreview from 'vue2-preview'
Vue.use(VuePreview);//内部会运行Vue.component('vue2-preview',{})的组件

//引入rem适配移动端方案还有一个在build的utils.js中配置
import 'lib-flexible/flexible.js';

// 引入时间库
import Moment from 'moment';
// 时间显示是中文
// Moment.locale('zh-ch');
Moment.lang('zh-cn');

//自定义全局时间过滤器
Vue.filter('coverTime',function(data,formatStr){//data要格式化时间，formatStr要格式化的格式
  // return Moment(data).format(formatStr);
  return Moment(data, formatStr).fromNow();
})


//控制显示字数
Vue.filter('Tolength',function(str,num){
  //如果字符串小于num，则原型返回
  if(str.length<=num){
    return str;
  }
  // 否则截取长度为num的字符串
  else{
    return str.substr(0,num-1)+'...'
  }
});

//axios拦截器在请求或响应被 then 或 catch 处理前拦截它们。
// 添加请求拦截器，在数据加载完前加loading动画
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //加载提示框
    Mint.Indicator.open({
      text: 'Loading...'
    });
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
var myInterceptor =Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //关闭加载框
    Mint.Indicator.close();
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
//移除拦截器
// Axios.interceptors.request.eject(myInterceptor);

//引入自己写的全局css样式
import '../static/css/global.css'
//引入字体图标的css,在toast中使用自定义图标
// 若需在文字上方显示一个 icon 图标，可以将图标的类名作为 iconClass 的值传给 Toast（图标需自行准备）
import '../static/iconfont/iconfont.css'
import '../static/iconfont/iconfont.js'

//注册全局的导航栏子组件
import TopBar from '@/components/comment/TopBar'
Vue.component(TopBar.name,TopBar);//(自定义组件名，TopBar.vue的组件名)
//注册信息设置顶部栏
import TopUser from '@/components/comment/TopUser'
Vue.component(TopUser.name,TopUser);

// 注册全局搜索子组件
import Search from '@/components/comment/Search'
Vue.component(Search.name,Search);

//注册全局的轮播图子组件
import MySwipper from '@/components/comment/MySwipper'
Vue.component(MySwipper.name,MySwipper);

//注册全局购物车组件
import fixCar from '@/components/comment/fixCar'
Vue.component(fixCar.name,fixCar);

Vue.config.productionTip = false

// 将bus总线对象挂载到vue实例上
import EventBus from './router/EventBus'
Vue.prototype.$bus=EventBus;

import Time from '@/router/time'
import UserTool from '@/router/UserTool'
//注册全局路由守卫，进行路由权限控制
router.beforeEach((to,from,next)=>{
      //判断是否登录,在index.js的path中设置meta:{auto:true}
      if(to.meta.auto){
          if(UserTool.getUser().userName){
            next();//如果本地存储有用户信息放行,UserTool.getUser()
            console.log(UserTool.getUser());
          }
          else{
            next({
              path:'/login',
              query: { redirect: to.fullPath }
            })

          }
      }//meta为false，就是已经登陆，就不需要跳转登陆页面
      else{//必须有else
        //必須要有next（）方法進行放行
          next();
      }
  });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //挂载vuex仓库
  store,
  components: { App },
  template: '<App/>'
})
