<template>
  <div class="register">
    <h2>注册账号</h2>
    <!-- 手机号注册 -->
  <el-form :model="telForm" ref="telForm" label-width="10%" class="demo-ruleForm" :rules="rules"  status-icon>
    <!-- label-width="10%"为label的宽 -->
  <el-form-item prop="tel" >
  <el-input  v-model="telForm.tel" placeholder="手机号" style="width: 90%;"></el-input>
  </el-form-item>
  <el-form-item prop="name">
    <el-input v-model="telForm.name" placeholder="昵称" maxlength="8" style="width:90%"></el-input>
  </el-form-item>
   <el-form-item prop="psd">
     <el-input  type="password" v-model="telForm.psd" placeholder="密码(字母开头大于6位的字母数字_)" style="width: 90%"></el-input>
   </el-form-item>
   <el-form-item prop="psd_again">
     <el-input  type="password" v-model="telForm.psd_again" placeholder="再次确认密码" style="width: 90%"></el-input>
   </el-form-item>

  <el-button type="danger" @click="submitForm('telForm')" style="width: 80%;margin: 10px 10%;">提交</el-button>
</el-form>
  </div>
</template>

<script>
export default {

  name: 'Register',

  data () {

    var checkTel=(rule,value,callback)=>{
      if(!value){
        return callback(new Error("电话号码不为空"))
      }else{
         var reg=/^1[3456789]\d{9}$/;
         //电话号码以1开头，第二位只能以3456789的十一位数字
        if(!reg.test(value)){
          callback(new Error("请输入有效的电话号码"))
        }else{
          callback();
        }
      }
    };
    var checkname=(rule,value,callback)=>{
      if(!value){
        return callback(new Error("请填写昵称"))
      }else{
        return callback();
      }
    };
    var checkpsd=(rule,value,callback)=>{

      if(!value){
        return callback(new Error("请输入密码"))
      }
      else{
        var rege=/^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
        if(!rege.test(value)){
          callback(new Error("请设计必须以字母开头，仅包含字母和数字，至少六位数字的密码"));
        }
          else if(this.telForm.psd_again!==''){
          this.$refs.telForm.validateField('psd_again');
        }
       callback();
    }

    };
    var checkagain=(rule,value,callback)=>{
      if(!value){
        return callback(new Error("请再次确认密码"))
      }else if(value!=this.telForm.psd){
        callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    };
    return {
       telForm: {
          tel:'',
          name:'',
          psd:'',
          psd_again:''
        },
        rules:{
          tel:[{validator:checkTel,trigger:'blur'}],
          name:[{validator:checkname,trigger:'blur'}],
          psd:[{validator:checkpsd,trigger:'blur'}],
          psd_again:[{validator:checkagain,trigger:'blur'}],
        },
    }
  },

  methods:{
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/insertUser.php',{
            tel:this.telForm.tel,
            name:this.telForm.name,
            psd:this.telForm.psd
          })
          .then(res=>{
            let tip=res.data.status;//注册提示，成功返回1，否则0
          if(tip==1){
            //弹出框提示(可自动关闭)
            const h = this.$createElement;
           this.$notify({
            message: h('i', { style: 'color: teal'},'岁月间欢迎小主'),
             type: 'success',
             showClose: false
            });
          this.$router.push({name:'message.login'});
        }//跳转到登录页面
      else{
           this.$notify.error({
            message: '该号码已注册，请返回登录'
            });
      }
   })
   .catch(err=>{
     console.log('获取连接PHP失败',err);
   })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  }
};
</script>

<style lang="css" scoped>
.register h2{
  margin: 10px auto;
  text-align: center;
  color:#ccc;
}

</style>
