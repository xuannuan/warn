<template>
  <div class="swipe">
    <mt-swipe style="width: 100%">
      <!-- 图文分享详情、具体商品详情、首页（注意要把imgs范围大的放最后，不然会开始循环imgs，后面的<img>就无法识别） -->
      <mt-swipe-item v-for="(item1,index) in imgs.images_list||imgs.images||imgs" :key="index">
        <img :src="item1.image||item1.url||item1" style="width: 100%;height: 100%" >
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {

  name: 'MySwipper',

  data () {
    return {
      imgs:[]
    }
  },
  props:['url'],
  created(){
    this.$axios.get(this.url)
    .then((res)=>{
      //res.data.data.item具体商品详情
      this.imgs=res.data.data.item||res.data.data;
      //图片分享详情地址有点，自己的json不行，后面的数据api可以
    })
    .catch((err)=>{
      console.log("获取轮播图信息错误",err);
    })

  }
};
</script>

<style lang="css" scoped>
</style>
