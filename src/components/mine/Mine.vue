<template>
  <div class="mine">

    <!-- 头像背景图 -->
       <el-image
      style="width: 100%; height: 120px;overflow:hidden"
      :src="userMessage.img"
      fit="cover"></el-image>
    <div class="me">
      <!-- 上传头像 -->
      <router-link :to="{name:'message'}">
       <el-avatar shape="square" :size="100" fit="cover" :src="userMessage.img" class="headimg"></el-avatar>
     </router-link>
      <h3 v-if="userMessage.logintip">{{userMessage.name}}</h3>
     <el-button type="danger" class="share">分享瞬间</el-button>

    <el-button size="mini" round class="intruduce">
        <router-link :to="{name:'message.login'}" v-if="!userMessage.logintip">
          加入岁月间？
        </router-link>
        <router-link :to="{name:'message'}" v-if="userMessage.logintip">
          一句话介绍一下自己？
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
import UserTool from '@/router/UserTool'
import {mapState} from 'vuex'
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
     //获取vuex的store仓库里的状态state数据
    //注意是数组形式，vuex官网上有介绍
  computed:mapState([
      'userMessage',
    ]),
  created(){
    console.log(this.userMessage);
    //把用户信息传入vuex仓库,因为可用用户名或号码当做账号,所以先都传进去，跳转mine页面后查询得到该用户信息
    this.$store.dispatch('setUserMessage',{
      name:UserTool.getUser().userName,
      tele:UserTool.getUser().userTele,
      password:UserTool.getUser().userPassWord,
      logintip:UserTool.getUser().userLoginTip//登录提示
    });
    //账号：用户名或电话号码
    let user=this.userMessage.name||this.userMessage.tele;
    console.log(user);
    //必须post提交获取信息验证获取查询成功的数据库信息
    this.$axios.post('/api/checkUser.php',{
      Name:user,
      userPwd:this.userMessage.password
    })
    .then(res=>{
      console.log(res);//{id: "31704569", telephone: "15327399764", name: "赖小姐", password: "lcy111", img: ""}
     //把用户信息传入vuex仓库,覆盖之前的登录的账号密码属性
     this.$store.dispatch('setUserMessage',{
      name:res.data.name,
      tele:res.data.telephone,
      password:res.data.password,
      id:res.data.id,
      img:res.data.img,
      logintip:UserTool.getUser().userLoginTip
    });


    })
    .catch(err=>{
      console.log("获取数据库连接失败",err);
    })
  }
};
</script>

<style lang="css" scoped>
.me{
  position: relative;
}
.me h3{
    position: absolute;
    top: -30px;
    left: 120px;
    color: #7a7e86;
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
