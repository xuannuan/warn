<template>
  <div id="app">
    <!-- 引入mint-ui的导航栏 -->
    <mt-header fixed title="岁月间" style="background-color: #343a4029;color: #000;font-size: 20px">
      <router-link to="/" slot="left">
        <mt-button class="el-icon-back" @click="goBack()" style="outline-style: none;font-size:25px;color: #fff;"></mt-button>
      </router-link>
      <!-- 用户头像 -->
      <mt-button slot="right">
      <router-link :to="{name:'login'}" v-if="userMessage.logintip!=1">
      <el-avatar icon="el-icon-user-solid" :size="40" >
       </el-avatar>
      </router-link>

        <!-- v-if="!hsrc"根据登录状态显示头像 -->
      <router-link :to="{name:'install'}" v-if="userMessage.logintip==1">
      <el-avatar :size="40" >
          <img :src="userMessage.img"/>
      </el-avatar>
      </router-link>
      </mt-button>
    </mt-header>

    <!-- 内容展示模块 -->
    <!-- vue的动画效果 mode="out-in"前面一个过渡完在进行下一个-->
    <div class="con">
      <transition name="slide-fade" mode="out-in">
         <router-view />
         <!-- 加key属性进行路由改变页面改变，防止页面缓存无法加载跳转 -->
        <!-- <router-view :key="this.$route.path"></router-view> -->
      </transition>
    </div>


    <!-- 底部栏 固定，fixed默认是false-->
    <mt-tabbar :fixed="fixed" v-model="selected" style="z-index: 1001">
      <!-- 要绑定数据就要v-bind指令，缩写：里面绑定的id用来获取点击的元素 -->
      <mt-tab-item v-for="(item,index) in bars" :key="item.id"
      :id="item.routerName.name">
         <router-link :to="item.routerName" style="width: 100%,height:100%" >
          <span :class="{'el-icon-view':index==0,'el-icon-reading':index==1,'el-icon-s-promotion':index==2,'el-icon-goods':index==3,'el-icon-user':index==4}"></span>
        <!-- <p>{{item.title}}</p> -->
      </router-link>
      </mt-tab-item>

    </mt-tabbar>

  </div>
</template>

<script>
//命名路由要用对象表达式
var bar=[
{id:1,title:'言.享',routerName:{name:'life',params:{categoryTitle:'旅行'}}},
{id:2,title:'勤.学',routerName:{name:'technology'}},
{id:3,title:'',routerName:{name:'publish'}},
{id:4,title:'碎.巷',routerName:{name:'shop',params:{categoryTitle:'手表',page:1}}},
{id:5,title:'吾',routerName:{name:'mine'}}
]
// 载入js
import GoodsTool from '@/router/GoodsTool'
import UserTool from '@/router/UserTool'
import {mapState} from 'vuex'
export default {
  name: 'App',
  data(){
    return{
      selected:'',
      bars:bar,
      fixed:'fixed',
    }
  },
  watch:{
    selected:function(newk,oldk){
     // console.log(this.selected);//相当于newk跳转的新路由，命名路由
      // 通过命名路由对路由进行跳转，关键
      this.$router.push({name:this.selected});
    }
  },
  methods:{
    goBack(){
    this.$router.go(-1);
  }
  },
  computed:mapState([
    'userMessage'//获取vuex的store仓库
    ]),
  created(){

  },
  mounted(){
    //在主页面存vuex，解决刷新后，vuex中store清空分页面内的依靠state的数据加载不出，因为刷新过后vuex会格式化，所以主页面重新加载获取从本地存储sessionStorage传入vuex仓库
     this.$store.dispatch('setUserMessage',{
      name:UserTool.getUser().userName,
      tele:UserTool.getUser().userTele,
      password:UserTool.getUser().userPassWord,
      id:UserTool.getUser().userId,
      img:UserTool.getUser().userImg,
      logintip:UserTool.getUser().userLoginTip
    });
     // console.log(this.userMessage);
     // console.log(this.$route.path);

  }
};
</script>

<style>

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
/*a标签*/
.mint-tab-item{
  position: relative;
}

.nickname{
    position: relative;
    top: -15px;
    right: 0;
    color: #fff;
}


.mint-tab-item a span{
   font-size: 20px;
  /*给元素改变字号就可以改变字体图标的尺寸*/
  line-height: 30px;
}
.mint-tab-item a:hover{
  color: #fff;
}

.con{
  width: 100%;height: 100%;
  overflow: hidden;
  margin-bottom:58px;
  padding-bottom: 58px;
}
</style>
