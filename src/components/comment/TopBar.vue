<template>
  <!-- 全局的导航栏子组件 -->
  <div class="topbar">
    <h2 @click='Goback' class="icon"><&nbsp;&nbsp;</h2>
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

.topbar span{
  font-size: 16px;
  vertical-align: top;
}
.topbar .icon{
  float:left;
}

</style>
