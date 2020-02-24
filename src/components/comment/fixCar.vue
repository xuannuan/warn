<template>
    <div class="car">
      <router-link :to="{name:'shop.car'}" class="el-icon-shopping-cart-2">
       <!-- 这个是购物车的图标-->
         <mt-badge size="small" color="#8cc5ff" class="carBall">{{pickNum}}</mt-badge>
       </router-link>
    </div>
</template>

<script>
import GoodsTool from '../../router/GoodsTool'
export default {

  name: 'fixCar',

  data () {
    return {
      num:''
    }
  },
  computed:{
    pickNum(){
      return this.$store.state.goodsNum;
    }
  },
  methods:{
    changeGoodsNum(){
      this.$store.dispatch('changeGoodsNum',num);
    }
  },
  created(){
     //使用bus绑定购物数量事件，接受从加入购物车的值
    // this.$bus.$on('sendPickNum',(data)=>{
    //   this.pickNum+=data;
    // });
     // 当页面进行刷新，商品数量保留，调用GoodsTool.getTotalCount()方法获取总数量
    this.$store.dispatch('changeGoodsNum',GoodsTool.getTotalCount());


  }
};
</script>

<style lang="css" scoped>
/*购物车图标*/
div.car{
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 44px;
    right: 5px;
    background-color: #fff;
}
.car a{
  width: 100%;
  font-size: 30px;
  color: #8cc5ff;
  text-align: center;
  padding-top: 10px;
}
.carBall {
    position: absolute;
    top: -9px;
    right: 0px;
}
</style>
