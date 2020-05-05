<template>
  <div class="about">
    <img src="../../../static/img/ice.jpg" height="80px" width="80px">
    <div class="content">
      <p>细赏人间烟火色，闲看万物岁月长</p>
      <p>岁月间，属于你的生活分享平台</p>
      <p>去感受时光穿梭的痕迹</p>
    </div>

  </div>
</template>

<script>
export default {

  name: 'About',

  data () {
    return {

    }
  }
};
</script>

<style lang="css" scoped>
.about{
  height: 500px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
}
img{
  border-radius: 10px;
}
p{
  font-size: 20px;
}
.content{
  margin: 20px;
}
</style>
