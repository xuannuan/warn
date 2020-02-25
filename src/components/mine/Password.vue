<template>
  <div class="password">
    <TopUser :titles="titles"/>

    <!-- 提交表单 -->
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldpsd">
    <el-input type="password" v-model="ruleForm.oldpsd" maxlength="8"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="psd_more">
    <el-input type="password" v-model="ruleForm.psd_more" autocomplete="off"></el-input>
  </el-form-item>
  <el-button type="primary" @click="submitForm('ruleForm')"
  class="save" >保存</el-button>
</el-form>


  </div>
</template>

<script>
import {mapState} from 'vuex'
import UserTool from '@/router/UserTool'
export default {

  name: 'Password',
  computed:mapState([
    'userMessage'
    ]),
  data () {
    var checkOldPsd=function(rule,value,callback){
      if(!value){
        return callback(new Error("请输入旧密码"));
      }
      else if(value!=UserTool.getUser().userPassWord){
        return callback(new Error("密码错误"));
      }
      else{
        callback();
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
          else if(this.ruleForm.psd_more!==''){
          this.$refs.ruleForm.validateField('psd_more');
        }
       callback();
    }

    };
    var checkagain=(rule,value,callback)=>{
      if(!value){
        return callback(new Error("请再次确认密码"))
      }else if(value!=this.ruleForm.pass){
        callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    };
    return {
      titles:[{name:'我的',routeName:{path:'/mine'}},
      {name:'设置',routeName:{path:'/install'}},
      {name:'账号设置',routeName:{path:'/install/password'}}
      ],
      ruleForm:{
        oldpsd:'',
        pass:'',
        psd_more:''
      },
      rules:{
        oldpsd:[{validator:checkOldPsd,trigger:'blur'}],
        pass:[{validator:checkpsd,trigger:'blur'}],
        psd_more:[{validator:checkagain,trigger:'blur'}]
      }
    }
  },

 methods:{
 submitForm(formName) {
this.$refs[formName].validate((valid) => {
  if (valid) {
  this.$axios.post('/api/updatePsd.php',{
  tel:this.userMessage.tele,
  psd:this.ruleForm.pass//更改后的密码
  })
  .then(res=>{
  let tip=res.data.status;//注册提示，成功返回1，否则0
  console.log(res.data);
  if(tip==1){
    //弹出框提示(可自动关闭)
    const h = this.$createElement;
    this.$notify({
    message: h('i', { style: 'color: teal'},'修改成功'),
    type: 'success'
    });
  }
  })
  .catch(err=>{
  console.log('获取连接PHP失败',err);
  })
  }
else {
this.$notify.error({
message: '修改失败'
});
return false;
}
});
}
  }
};
</script>

<style lang="css" scoped>

.save{
  width: 40%;margin: 10px 30%;color: #FFF;
    background-color: #8cc5ff;font-size: 16px;
    border-color: #8cc5ff;
}
</style>
