<template>
  <div class="install">
    <h2>设置</h2>
    <ul>
      <li v-for="list in lists">
        <router-link :to="list.routeName">{{list.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// 变量要放在export抛出外面
var list=[{name:'个人信息',routeName:{name:'install.message'}},
            {name:'账号信息',routeName:{name:'install.password'}},
            {name:'关于岁月间',routeName:{name:'message'}},
            {name:'隐私政策',routeName:{name:'/'}},
            {name:'注销账号',routeName:{name:'/'}},
            {name:'退出登录',routeName:{name:'/'}}];
export default {
  name: 'Install',
  data () {
    return {
      lists:list
    }
  }
};
</script>

<style lang="css" scoped>
.install{
  background:#cccccc4f;
}
.install h2{
  line-height: 50px;
  padding-left: 10px;
  /*text-align: center;*/
  margin-bottom: 20px;
  background-color: #fff;
}
.install ul li{
  width:100%;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  background-color: #fff;
  border: none;
}

.install ul li:nth-child(5){
  margin-top: 20px;
}

.install ul li a{
  font-size: 16px;
}
</style>
