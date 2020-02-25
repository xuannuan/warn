<template>
  <div class="top">
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item v-for="(item,index) in titles" :to="item.routeName" :key="index">{{item.name}}</el-breadcrumb-item>
</el-breadcrumb>
  </div>
</template>

<script>
export default {

  name: 'TopUser',

  data () {
    return {
    }
  },
  props:['titles'],//对象数组，{name:'',routerName:{path:'/路径名'}}
  created(){
    // console.log(this.titles);
  }

};
</script>

<style lang="css" scoped>
/*设置个人信息和账号信息里面的顶部栏*/
.top span{
  line-height: 40px;
}
.top span:first-child{
    padding-left: 20px;
}

</style>
