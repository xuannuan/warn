<template>
  <div class="login">
     <el-alert
    :title="errorTip"
    type="error"
    :closable="false"
    v-if="errortip"
    show-icon>
    </el-alert>
    <h2>登录岁月间</h2>
     <form class="Tologin">
      <label>用户名：</label>
      <input type="text" name="" v-model="name"><br/>
      <label>密码：</label>
      <input type="password" name="" v-model="password "><br/>
      <router-link :to="{name:'message.register'}">
      没有账号？去注册
      </router-link>
       <el-button  type="danger"  @click="login" class="btn">登录</el-button>
    </form>

    <!-- <div>反馈：{{errorTip}}</div> -->
  </div>
</template>

<script>
export default {

  name: 'Login',

  data () {
    return {
      name:'',//用户名或手机号
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
          this.errorTip='请输入账号';
          return;
         }
       //直接把参数写在post头部，还有好几种写法，区别不大
       //使用自编写的PHP后端语言连接数据库，打开地址http://localhost:8085/ToUser/checkUser.php(首先要打开wampserver服务器)
        this.$axios.post('/api/UserLogin.php',{
          Name:this.name,
          userPwd:this.password
          })//用户名和密码将转为json传到后台接口
          .then(response => {
          let res = response.data;  //用res承接返回后台的json文件(像使用数组那样)
            console.log('login的值'+res);
          if(res.status>0){   //显示登录结果
           console.log('登录成功');
           this.$router.push({name:'mine'});//跳转页面
           this.errortip=true;
           this.errorTip='登录成功';
           //传值
           this.$bus.$emit('sendUser',(this.name,this.password));


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
.login h2{
  margin: 10px auto;
  text-align: center;
  color:#ccc;
}
.Tologin{
  margin-top: 50%;
}

label{
      display: inline-block;
    width: 100px;
    margin-bottom: 15px;
    /* height: 30px; */
    text-align: center;
    font-size: 18px;
    color: #7f7d7d;
}
input{
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 50%;
    height: 30px;
}
.btn{
      margin: 10px 40%;
}
.Tologin a{
  float: right;
  color: #888585;
    padding-right: 12%;
}
</style>
