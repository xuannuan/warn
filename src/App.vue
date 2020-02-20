<template>
  <div id="app">
    <!-- 引入mint-ui的导航栏 -->
    <mt-header fixed title="暖团" style="background-color: #343a4029;color: #000;font-size: 20px">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="goBack()" style="outline-style: none"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!-- 内容展示模块 -->
    <!-- vue的动画效果 -->
    <transition name="slide-fade">
    <router-view/>
    </transition
    <!-- 底部栏 固定，fixed默认是false-->
    <mt-tabbar :fixed="fixed" v-model="selected" style="z-index: 1001">
      <!-- 要绑定数据就要v-bind指令，缩写： -->
      <mt-tab-item v-for="(item,index) in bars" :key="item.id" :id="item.routerName.name">
        <!-- 引入字体图标js方式，SVG 符号引入是现代浏览器未来主流的图标引入方式 -->
        <mt-badge size="small" color="#20c99763" v-if="index==2" class="carBall">{{pickNum}}</mt-badge>
         <svg class="icon" aria-hidden="true" style="width: 30px;height: 40px">
            <use :xlink:href="item.imgSrc"></use>
        </svg>
        <!-- <img slot="icon" :src="item.imgSrc" > -->
        {{item.title}}
      </mt-tab-item>

    </mt-tabbar>



  </div>
</template>

<script>
//命名路由要用对象表达式
var bar=[
{id:1,title:'首页',imgSrc:'#icon-plant-',routerName:{name:'home'}},
{id:2,title:'小世界',imgSrc:'#icon-plant-1',routerName:{name:'vip'}},
{id:3,title:'购物车',imgSrc:'#icon-plant-2',routerName:{name:'car'}},
{id:4,title:'搜索',imgSrc:'#icon-plant-3',routerName:{name:'search'}}
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
      pickNum:0
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
    //使用bus绑定购物数量事件，接受从加入购物车的值
    this.$bus.$on('sendPickNum',(data)=>{
      this.pickNum+=data;
    });
    // 当页面进行刷新，商品数量保留，调用GoodsTool.getTotalCount()方法获取总数量
    this.pickNum= GoodsTool.getTotalCount();
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
.carBall{
  position: absolute;
      top: 3px;
    left: 20px;
}

</style>
