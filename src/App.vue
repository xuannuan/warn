<template>
  <div id="app">
    <!-- 引入mint-ui的导航栏 -->
    <mt-header fixed title="岁月间" style="background-color: #343a4029;color: #000;font-size: 20px">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="goBack()" style="outline-style: none"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!-- 内容展示模块 -->
    <!-- vue的动画效果 -->
    <transition name="slide-fade">
    <router-view/>
    </transition>

    <!-- 底部栏 固定，fixed默认是false-->
    <mt-tabbar :fixed="fixed" v-model="selected" style="z-index: 1001">
      <!-- 要绑定数据就要v-bind指令，缩写：里面绑定的id用来获取点击的元素 -->
      <mt-tab-item v-for="(item,index) in bars" :key="item.id"
      :id="item.routerName.name">
         <router-link :to="item.routerName" style="width: 100%,height:100%" >
          <span :class="{'el-icon-view':index==0,'el-icon-reading':index==1,'el-icon-s-promotion':index==2,'el-icon-goods':index==3,'el-icon-user':index==4}"></span>
          <!-- 扩大a的范围，点击识别范围更广，用户体验感更好 -->
        <!-- 引入字体图标js方式，SVG 符号引入是现代浏览器未来主流的图标引入方式 -->
         <!-- <svg class="icon" aria-hidden="true" style="width: 30px;height: 40px">
            <use :xlink:href="item.imgSrc"></use>
        </svg> -->
        <p>{{item.title}}</p>
      </router-link>
      </mt-tab-item>

    </mt-tabbar>



  </div>
</template>

<script>
//命名路由要用对象表达式
var bar=[
{id:1,title:'言.享',imgSrc:'#icon-plant-',routerName:{name:'life',params:{categoryTitle:'旅行'}}},
{id:2,title:'勤.学',imgSrc:'#icon-plant-1',routerName:{name:'technology'}},
{id:3,title:'',imgSrc:'',routerName:{name:'publish'}},
{id:4,title:'碎.巷',imgSrc:'#icon-plant-2',routerName:{name:'shop',params:{categoryTitle:'手表',page:1}}},
{id:5,title:'吾',imgSrc:'#icon-plant-3',routerName:{name:'mine'}}
]
// 载入js
import GoodsTool from '@/router/GoodsTool'
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
      // console.log(newk,oldk);
      console.log(this.selected);//相当于newk跳转的新路由，命名路由
      // 通过命名路由对路由进行跳转，关键
      this.$router.push({name:this.selected});
    }
  },
  methods:{
    goBack(){
    this.$router.go(-1);
  }
  },
  created(){

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

  height: 60px;
}

.mint-tab-item a span{
   font-size: 20px;
  /*给元素改变字号就可以改变字体图标的尺寸*/
  line-height: 30px;
}
.mint-tab-item a:hover{
  color: #fff;
}


</style>
