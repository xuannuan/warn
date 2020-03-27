<template>
  <!-- 全局的导航栏子组件 -->
  <div class="topbar">
    <mt-button class="el-icon-arrow-left" @click='Goback' style="background-color: #fff;border:none"></mt-button>
    <!-- <router-link :to="{name:people}"> -->
    <img :src="srcURL" height="40px">
    <!-- </router-link> -->
    <span class="desc_title">
      <!-- 父子组件传值 （父-》子）-->
      &nbsp;&nbsp;{{title}}
    </span>
  </div>
</template>

<script>
export default {

  name: 'TopBar',
  props:['title','srcURL'],
  data () {
    return {

    }
  },
  methods:{
    Goback(){
      this.$router.go(-1);//往前退
    }
  }
};
</script>

<style lang="css" scoped>
.topbar span,button{
  font-size: 16px;
  vertical-align: top;
  line-height: 40px;
}
img{
  border-radius: 50%;
}
</style>
