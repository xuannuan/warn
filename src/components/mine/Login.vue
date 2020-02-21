<template>
  <div class="login">
     <form>
      <label>用户名：</label>
      <input type="text" name="" v-model="name"><br/>
      <label>密码：</label>
      <input type="password" name="" v-model="password "><br/>
      <input type="button" name="" value="登录" @click="login">
    </form>
    <div>反馈：{{errorTip}}</div>
  </div>
</template>

<script>
export default {

  name: 'Login',

  data () {
    return {
      name:'',//用户名
      password :'',//密码
      errortip:'',//boolean值
      errorTip:'',//登录成功失败提示
    }
  },
  methods:{
    login(){
        //前端验证数据
        if(!this.name || !this.password){   //若任意一个参数为空，则返回并提示错误
          this.errortip=true;
          this.errorTip='账号或密码有误';
          return;
         }
       //直接把参数写在post头部，还有好几种写法，区别不大
        this.$axios.post('/api/user.php',{
          Name:this.name,
          userPwd:this.password})//用户名和密码将转为json传到后台接口
          .then(response => {
          let res = response.data;  //用res承接返回后台的json文件(像使用数组那样)
            console.log('login的值'+res);
       if(res.status>0){   //显示登录结果
           console.log('登录成功');
           this.errortip=true;
           this.errorTip='登录成功';
         }else {
           console.log('登录失败');
           this.errortip=true;
           this.errorTip='登录失败';

         }
        })
        }
  }
};
</script>

<style lang="css" scoped>
</style>
