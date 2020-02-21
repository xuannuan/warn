<template>
  <div class="message">
    <div class="top">
    个人资料
    <span @click="onSubmit">保存</span>
    </div>
    <div class="bg">
      <el-upload
       class="avatar-uploader img"
       action="https://jsonplaceholder.typicode.com/posts/"
       :show-file-list="false"
       :on-success="handleAvatarSuccess"
       :before-upload="beforeAvatarUpload">
       <el-avatar shape="square" :size="100" fit="cover" :src="imageUrl" class="avatar" v-if="imageUrl"></el-avatar>
       <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    </div>
    <!-- 提交表单 -->
   <el-form ref="form" :model="sizeForm" label-width="80px" size="medium">
  <el-form-item label="昵称">
    <el-input v-model="sizeForm.name" maxlength="8"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-input v-model="sizeForm.sex"></el-input>
  </el-form-item>
   <el-form-item label="破蛋日">
      <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="星座">
    <el-input v-model="sizeForm.star"></el-input>
  </el-form-item>
  <el-form-item label="兴趣">
    <el-input v-model="sizeForm.intrsting"></el-input>
  </el-form-item>
  <el-form-item label="职业">
    <el-input v-model="sizeForm.work"></el-input>
  </el-form-item>
  <el-form-item label="个性签名">
    <el-input
  type="textarea"
  maxlength="30"
  :autosize="{ minRows: 1, maxRows: 3}"
  placeholder="一句话介绍一下你自己？"
  v-model="sizeForm.sign">
</el-input>
  </el-form-item>
</el-form>

    <el-button type="primary" class="exit" @click="open">退出登录</el-button>

  </div>
</template>

<script>
export default {

  name: 'Message',

  data () {
    return {
      imageUrl:'',
      sizeForm:{
        name:'',
        date:'',
      }
    }
  },
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

      // 提交表单
      onSubmit(){
         console.log('submit!');
      },
      open() {
        this.$alert('确定退出登录？',  {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }

  }
};
</script>

<style lang="css" scoped>
.message{
  width: 100%;overflow: scroll;
}
.top{
  position: relative;
  line-height: 40px;
  font-size: 18px;
  text-align: center;
}
.top span{
  color: #8cc5ff;
  position: absolute;
  right: 5px;
  font-size: 18px;
}
.bg{
  width: 100%;
  height:150px;
  background-color: #ccc;
}
.bg .img{
  width: 100px;height: 100px;
  margin: 0px auto;
  padding-top: 25px;
}
.exit{
  margin: 10px 35%;
}
</style>
