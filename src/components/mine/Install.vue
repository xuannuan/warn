<template>
  <div class="install">
    <h2>设置</h2>
    <ul>
      <li v-for="list in lists">
        <router-link :to="list.routeName">{{list.name}}</router-link>
      </li>
    </ul>
    <ul class="id">
      <li>
        <el-button type="text" @click="dialog = true">注销账号</el-button>
      </li>
      <li>
        <!-- 点退出直接退出，不用确定 -->
        <el-button type="text" @click="del">退出登录</el-button>
      </li>
    </ul>
  <el-dialog
  :visible.sync="dialog"
  width="50%"
  center>
  <span>从此萧郎是路人？</span>
  <span slot="footer" class="dialog-footer">
    <el-button size="mini" type="primary"  @click="dialog = false">
      留下
    </el-button>
    <el-button size="mini" type="info" @click="destroy">相忘</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
// 变量要放在export抛出外面
var list=[{name:'个人信息',routeName:{name:'install.message'}},
            {name:'账号信息',routeName:{name:'install.password'}},
            {name:'关于岁月间',routeName:{name:'install.about'}},
            {name:'隐私政策',routeName:{name:'install.secret'}}];
  import UserTool from '@/router/UserTool'
  import {mapState} from 'vuex'
export default {
  name: 'Install',
  data () {
    return {
      dialog:false,
      lists:list
    }
  },
  computed:mapState([
    'userMessage'
    ]),
  methods:{
    //退出登录
    del(){
    UserTool.addUser({});//直接把{}空对象放进去就清空本地存储和vuex仓库
    this.$store.dispatch('setUserMessage',{});
    this.$router.push({name:'login'});
    },
    //注销账号，要操作数据库进行删除这一行数据信息
    destroy(){
    this.dialog = false;
      this.$axios.post('/api/deleteUser.php',{
        tele:UserTool.getUser().userTele
      })
      .then(res=>{
        console.log(res.data);//=1则删除成功
        //然后删除浏览器上的本地数据并返回到登录页面
        if(res.data.status==1){
        this.del();

        }
      })
      .catch(err=>{
        console.log('连接PHP进行删除数据库失败',err);
      })
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

.id li{
  margin-top: 20px;
}

.install ul li a{
  font-size: 16px;
}
.id li button{
  color: gray;
}

</style>
