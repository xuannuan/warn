<template>
  <div class="mine">

    <!-- 头像背景图 -->
       <el-image
      style="width: 100%; height: 120px;overflow:hidden"
      :src="imageUrl"
      fit="cover"></el-image>
    <!-- 上传头像 -->
    <div class="me">
    <el-upload
       class="avatar-uploader headimg"
       action="https://jsonplaceholder.typicode.com/posts/"
       :show-file-list="false"
       :on-success="handleAvatarSuccess"
       :before-upload="beforeAvatarUpload">
       <el-avatar shape="square" :size="100" fit="cover" :src="imageUrl" class="avatar" v-if="imageUrl"></el-avatar>
       <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
       <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
     <el-button type="danger" class="share">分享瞬间</el-button>
    <el-button size="mini" round class="intruduce" v-if="!imageUrl">
        <router-link :to="{name:'message'}">
          加入岁月间？
        </router-link>
    </el-button>
    </div>

      <!-- 通过 value 属性来指定当前选中的标签页。v-model得值绑定的是name属性 -->
      <el-tabs v-model="activeName" @tab-click="handleClick"  type="card" :value="activeName">
    <el-tab-pane label="笔记" name="first">笔记{{activeName}}</el-tab-pane>
    <el-tab-pane label="收藏" name="second">收藏</el-tab-pane>
    <el-tab-pane label="关注" name="third">关注</el-tab-pane>
  </el-tabs>



  </div>
</template>

<script>
export default {

  name: 'Mine',

  data () {
    return {

      imageUrl: '',//头像图片
      activeName:'third',//tab栏切换
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
      // tab栏切换
      handleClick(){

      },

  },
};
</script>

<style lang="css" scoped>
.me{
  position: relative;
}


.headimg{
  position: relative;
  top: -40px;
  left:10px;
}

  .share{
    position: absolute;
    right: 20px;
    top: 10px;
  }
  .intruduce{
  background-color: #ccc;
  /*margin:0px 10px;*/
  position: absolute;
  left: -7px;
  /*因为button自带padding:7px*/
  bottom: 0px;
  }
</style>
