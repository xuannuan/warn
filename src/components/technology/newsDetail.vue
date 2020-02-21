<template>
  <div class="newsDetail">
    <TopBar title="科技空间" />
    <!-- 跳转是在自己设计的路由内跳转 -->
    <!-- 因为文章获取的只能是地址，不是json数据，所以只能连接方式 -->
    <!-- iframe 元素会创建包含另外一个文档的内联框架（即行内框架） -->
    <iframe :src="srcUrl" frameborder='0' height='1024px' width='100%'
    scrolling='yes' seamless></iframe>
  </div>
</template>

<script>
export default {

  name: 'newsDetail',

  data () {
    return {
      id:'',
      srcUrl:'',

    }
  },
  created(){
    this.id=this.$route.query.id;
    console.log(this.id);
    this.srcUrl="https://36kr.com/p/"+this.id;
  }
};
</script>

<style lang="css" scoped>

</style>
