<template>
    <div class="car">
      <router-link :to="{name:'shop.car'}" class="el-icon-shopping-cart-2">
       <!-- 这个是购物车的图标-->
         <mt-badge size="small" color="#8cc5ff" class="carBall">{{pickNum}}</mt-badge>
       </router-link>
    </div>
</template>

<script>
import Time from '../../router/time'
export default {

  name: 'fixCar',

  data () {
    return {
    }
  },
  computed:{
    pickNum(){
      return this.$store.state.goodsNum;
    }
  },

  created(){
    //当页面进行刷新会清空，要想商品数量保留则调用获取总数量重新赋值
   Time.getGoodsNum(this.$store.state.userMessage.tele);
  }
};
</script>

<style lang="css" scoped>
/*购物车图标*/
.car{
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
