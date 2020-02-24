
<template>
  <div class="goodsdetail">
  <!-- 要有一个根元素 -->
       <!-- 这个是购物车的图标-->
       <fixCar/>
  <!-- 轮播图组件 -->
  <MySwipper :url="url"/>
<div class="price">
  <h3 style="color:orange">￥{{goods.item.priceRange}}</h3>
  <h5>{{goods.item.title}}</h5>
  <span style="color:gray" class="fl">❤推荐{{goods.item.favouriteCount}}</span>
  <mt-button @click.native="tobuy = true" class="tr" type="danger">购物车</mt-button>
</div>

<div class="send">
  <span class="fl">发货</span>
  &nbsp;&nbsp;
  <span><img src="../../../static/img/root.jpg" height="20px" width="20px">{{goods.item.location}}</span>
  <span class="fr">月销{{goods.item.sellCount}}</span>
</div>

<div class="protention">
  <!-- 为了箭头在右侧 ，多写几个div-->
  <div class="fl" style="width: 90%">
  <span>保障</span>&nbsp;&nbsp;
  <span v-for="(item1,index) in goods.item.consumerProtection.serviceProtection.basicService.services" :key="index" style="color:#000">{{item1.name}} | </span>
  </div>
  <!-- 展开详细 -->
  <div class="fr">
  <h3  @click="actionSheet">></h3>
  <!-- 基本保障操作表，从屏幕下方移入。 -->
  <mt-actionsheet
  :actions="actions"
  v-model="sheetVisible">
  </mt-actionsheet>
  </div>
  </div>


<div class="choose">
  <div class="c">
  <span class="fl">选择&nbsp;&nbsp;颜色分类</span>
  <h5 class="fr" @click="tobuy = true">></h5>
  <!-- @click="SureBuy" -->
  </div>

<el-drawer
:with-header="false"
  :visible.sync="tobuy"
  :direction="direction"
  v-if="tobuy"
  >
  <!-- :before-close="handleClose"点击空白处关闭，但自定义关闭按钮，就不需要了 -->
  <!-- 购物车页面 -->
  <div class="bpic">
    <!-- 随下面的选择而变化 -->
    <img :src="changeUrl" style="width: 100px;height:100px;float:left">
    <h5 style="color:orange">￥{{goods.item.priceRange}}</h5>
    <p>库存{{goods.item.commentCount}}件</p>
    <p>已选{{changeTitle}}</p>
  </div>
  <div class="category">
    <ul>
      <li v-for="(item,index) in color" :key="index">
        <a href="javascript:void(0)" @click="choose(item.image,item.name)">
        <img :src="item.image" width="50px" height="50px" style="float:left">
        {{item.name}}
        </a>
      </li>
    </ul>
  </div>
   <div class="buy">
       <span class="fl">购买数量</span>
       <div class="fr">
         <button @click="jian">-</button>
         <!-- 要双向数据绑定 -->
         <input type="number" v-model="num" class="count">
         <button @click="add">+</button>
        </div>
   </div>
   <el-button type="danger" round @click="SureBuy" class="sure">确定</el-button>
   <!-- 小球的动画效果 ，加入JavaScript-钩子函数,小球进入之后-->
    <transition name="bounce" @after-enter="afterEnter">
    <span v-if="isExist" class="ball">{{num}}</span>
  </transition>
</el-drawer>

  <div class="p">
  <span class="fl">参数&nbsp;&nbsp;品牌&nbsp;型号...</span>
   <el-popover
  placement="left"
  width="100%"
  trigger="click" style="margin: 0">
  <table>
    <tr v-for="item in gridData">
      <td v-for="(value,key,index) in item">{{key}}</td>
      <td v-for="(value,key,index) in item">{{value}}</td>
    </tr>
  </table>
  <!-- 点击>就出现详情 -->
   <h5 class="fr" slot="reference">></h5>
</el-popover>
  </div>
</div>

<!-- 评论 -->
<div class="comment">
<span class="fl">宝贝评论</span>
<router-link :to="{name:'goods.comment',query:{id:goods.item.itemId}}" class="fr">全部评论></router-link>
</div>

<div class="troduce">
  <!-- v-html="goods.item.desc" 因为图片尺寸不对-->
<!-- 图片详情 -->
  <ul>
    <li  v-for="(item1,index) in goods.item.descImgs" :key="index">
      <img :src="item1" alt="" width="100%">
    </li>
  </ul>
</div>

</div>
</template>

<script>
// 载入js
import GoodsTool from '@/router/GoodsTool'
export default {

  name: 'GoodsDetail',

  data () {
    let that=this;
    return {
      goods:{},
      actions:[],//对于操作框
      sheetVisible: false,//默认不显示
      gridData:[],//对于参数提示框
      color:[],
      tobuy:false,
      direction: 'btt',//从底部上滑
      num:0,//加入购物车的单个商品数量
      changeUrl:'',
      changeTitle:'',
      url:'../../../static/data/满天星手表.json',//轮播图组件传值
      isExist:false,//默认动态小球隐藏
      // pickNum:0,//购物车所有商品的数量
    }
  },
  methods: {
    //点击选中物品，更新大图和名字
    choose(image,name){
      this.changeUrl=image;
      this.changeTitle=name;
  },
    actionSheet(){
      this.sheetVisible=true;
    },
    //小球进入之后隐藏
    afterEnter(){
      this.isExist=false;
      this.tobuy=false;//让购物车页面隐藏
       // 当数量为0时就不触发提示加入购物车成功动画
       if(parseInt(this.num)!=0){
      //触发bus绑定的事件，给App.vue的购物数量传值
       // this.$bus.$emit('sendPickNum',parseInt(this.num));
       this.$store.dispatch('addGoodsNum',this.num);

       //调用js添加到购物车页面的数据，保存到本地数据方法
       // id:this.goods.item.itemId,
       GoodsTool.addGoods({
        title:this.goods.item.title,
        price:this.goods.item.priceRange,
        id:this.$route.query.id,
        num:parseInt(parseInt(this.num)),//因为number类型的input返回值是string
        img:this.changeUrl,//更新的图片
        category:this.changeTitle//更新的名字
       });

      //提示加入购物车成功
      this.$toast({
        message:"加入购物车成功",
        iconClass:'iconfont icon-plant-1'
      });
    }
    },
    // 点击确定加入购物车后
    SureBuy(){
      // 当数量为0时就不触发动画，但就不会触发afterEnter就不会关闭页面,所以加上else情况
        if(parseInt(this.num)!=0){
         this. isExist=true;//小球显示
         this.index++;
       }else{
         this.tobuy=false;//让购物车页面隐藏
       }
    },

    jian(){
      // 对数量进行控制，不能为负数
      if(parseInt(this.num)>0){
        this.num--;
      }else{
        this.num=0;
      }
    },
    add(){
      this.num++;
    }
  },
  created(){
    this.$axios.get('../../../static/data/满天星手表.json')
    //https://api03.6bqb.com/taobao/detail?apikey=5F3779A028E404694FC192684E80B7C3&itemid=’+${id}
    .then((res)=>{
       this.goods=res.data.data;// 是一个对象
       //动态添加操作表的参数actions数组中[{name:'',method:''}]
    this.actions=this.goods.item.consumerProtection.serviceProtection.basicService.services;
    let that=this;
    this.actions.forEach((item1,index)=>{
     item1.method=function(){
      //此时的this只想this.actions[index]，所以用that
          that.$messagebox({
            title: '提示',
            message: this.desc[0],
          });
      };
    })
    //产品参数
    this.gridData=this.goods.item.groupProps[0].基本信息;
    //加入购物车,颜色分类
    this.color=this.goods.item.props[0].values;

    this.changeUrl=this.color[0].image;//初始化加入购物车页面的大图和名字
    this.changeTitle=this.color[0].name;
    // console.log(this.color);

    })
    .catch((err=>{
        console.log("商品详情加载失败",err);
    }))
  }

};
</script>

<style lang="css" scoped>

/*对轮播图*/
.swipe{
  height: 200px;
}

.tr{
  float: right;
  width: 100px;
  font-size: 20px;
  height: 30px;
}
.sure{
  width: 100%;
  position: absolute;
  bottom: 5px;
  height: 40px;
}
.bpic,.category,.buy{
  overflow: hidden;
  margin: 10px;
}
.category ul li{
float:left;
text-align: center;
background-color: #e9ecefeb;
border-radius: 5px;
line-height: 50px;
margin: 10px ;
}

.goodsdetail{
  background-color: #e9ecefeb;
}
.price{
  overflow: hidden;
  padding:10px 10px;
  background-color: #fff;
}
.send,.protention,.choose,.comment{
  margin:10px 0;
  padding:10px 10px;
  background-color: #fff;
  overflow: hidden;
  /*清除浮动*/
}
.c,.p{
  overflow: hidden;
  /*清除浮动*/
}
span{color: gray;}
.troduce{
  width: 100%;
  overflow-x:scroll;
}

.fr button,.count{
  text-align: center;
  display: inline-block;
  width: 30px;
  height: 20px;
  outline: none;
  /*为什么在全局css写了，没起作用，要在这里写*/
  border: none;
  background-color: #ccc;
}
.ball{
  position: absolute;
  right: 50px;bottom: 65px;
  width: 20px;height: 20px;
  background-color: #8cc5ff;
  border-radius: 20px;
  text-align: center;
}


/*定义bounce-in的动画效果*/
@keyframes bounce-in {
  0% {
    transform: translate3d(0,0,0);
  }
  25% {
    transform: translate3d(10px,-25px,0);
  }
  50% {
    transform: translate3d(25px,0px,0);
  }
  75% {
    transform: translate3d(35px,25px,0);
  }
  100% {
    transform: translate3d(45px,50px,0);
  }
}
/*小球动漫transition的类名*/
.bounce-enter-active {
  /*给0.5s时间让小球完成动画效果*/
  animation: bounce-in 0.5s;
}
/*https://cn.vuejs.org/v2/guide/transitions.html#CSS-动画*/
.bounce-leave {
  /*小球离开隐藏*/
  opacity: 0;
}

</style>
