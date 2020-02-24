<template>
  <div class="password">
        <div class="top">
    <h2>账号设置</h2>
    <span @click="onSubmit">保存</span>
    </div>
    <div class="bg">
      <el-upload
       class="avatar-uploader img"
       action="https://jsonplaceholder.typicode.com/posts/"
       :show-file-list="false"
       :on-success="handleAvatarSuccess"
       :before-upload="beforeAvatarUpload">
         <em class="el-icon-edit"></em>

       <el-avatar v-if="userMessage.logintip==1" shape="square" :size="100" fit="cover" :src="userMessage.img" class="avatar" >
       </el-avatar>
       <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    </div>
    <!-- 提交表单 -->
   <el-form ref="form" :model="sizeForm" label-width="80px" size="medium">
  <el-form-item label="昵称">
    <el-input v-model="sizeForm.name" maxlength="8"></el-input>
  </el-form-item>
  <el-form-item label="旧密码">
    <el-input v-model="sizeForm.oldpsd" maxlength="8"></el-input>
  </el-form-item>
  <el-form-item label="新密码">
    <el-input v-model="sizeForm.newpsd" maxlength="8"></el-input>
  </el-form-item>
</el-form>

  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {

  name: 'Password',

  data () {
    return {
      sizeForm:{
        name:'',
        oldpsd:'',
        newpsd:''
      }
    }
  },
  computed:mapState([
    'userMessage'
    ]),
  methods:{
    //从本地上传图片当头像
      handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      onSubmit(){
        console.log("submit");
      }
  }
};
</script>

<style lang="css" scoped>
.message{
  width: 100%;
  background-color: #cccccc57;
}
.top{
  background-color: #fff;
  position: relative;
  line-height: 40px;
  font-size: 18px;
}
.top h2{
  text-align: center;
  /*margin-bottom: 20px;*/
}
.top span{
  color: #8cc5ff;
  position: absolute;
  right: 5px;
  top: -1px;
  font-size: 18px;
  padding-right: 10px;
}
.bg{
  width: 100%;
  height:150px;
  background-color: #cccccc47;
  position: relative;
}
.bg .img{
  width: 100px;height: 100px;
  margin: 0px auto;
  padding-top: 25px;
}
/*小图标*/
.bg em{
  position: absolute;
    top: 0;
    left: 0;
    font-size: 15px;
}
.el-form{
  background-color: #fff;
}
.exit{
  margin: 10px 35%;
}
</style>
