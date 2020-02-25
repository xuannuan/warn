<template>
  <div class="mine">

    <!-- 头像背景图 -->
      <el-image
      style="width: 100%; height: 120px;overflow:hidden"
      :src="userMessage.img"
      fit="cover">
      </el-image>
    <div class="me">
      <!-- 上传头像 -->
      <router-link :to="{name:'install.message'}" >
       <el-avatar shape="square" :size="100" fit="cover" :src="userMessage.img" class="headimg"></el-avatar>
     </router-link>
      <h3 v-if="userMessage.logintip">{{userMessage.name}}</h3>
     <el-button type="danger" class="share" >
      <router-link :to="{name:'publish'}">
     分享瞬间
   </router-link>
   </el-button>

    <el-button size="mini" round class="intruduce">
        <router-link :to="{name:'register'}" v-if="userMessage.logintip!=1">
          加入岁月间？
        </router-link>
        <router-link :to="{name:'install.message'}" v-if="userMessage.logintip==1">
          <span v-if="!userMessage.myself">一句话介绍自己？</span>
          <span v-else>{{userMessage.myself}}</span>
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
    color: #3a414f;
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
  background-color: #cccccc40;
  /*margin:0px 10px;*/
  position: absolute;
  left: -7px;
  /*因为button自带padding:7px*/
  bottom: 0px;
  }
</style>
