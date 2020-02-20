<template>
  <!-- 全局的导航栏子组件 -->
  <div class="topbar">
    <h5 @click='Goback' class="icon"><&nbsp;&nbsp;</h5>
    <img :src="srcURL" height="40px">
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
.topbar{
  /*background-color:rgba(0,0,0,0.1);*/
  line-height: 40px;

}
.topbar .icon{
  line-height: 40px;
  float:left;
}
/*.topbar .desc_title{
  text-align: center;
}*/
</style>
