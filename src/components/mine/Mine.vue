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
      <router-link :to="{name:'login'}" v-if="userMessage.logintip!=1" class="headimg">
       <el-avatar shape="square" :size="100" fit="cover" :src="userMessage.img" ></el-avatar>
     </router-link>
     <router-link :to="{name:'install.message'}" v-else class="headimg">
       <el-avatar shape="square" :size="100" fit="cover" :src="userMessage.img" ></el-avatar>
     </router-link>
      <h3 v-if="userMessage.logintip">{{userMessage.name}}</h3>
    <el-button size="mini" round class="share">
        <router-link :to="{name:'login'}" v-if="userMessage.logintip!=1">
          加入岁月间？
        </router-link>
        <router-link :to="{name:'install.message'}" v-else>
          <span v-if="!userMessage.myself">一句话介绍自己？</span>
          <span v-else>{{userMessage.myself}}</span>
        </router-link>
    </el-button>
    </div>

      <!-- 通过 value 属性来指定当前选中的标签页。v-model得值绑定的是name属性 -->
      <el-tabs v-model="activeName" @tab-click="handleClick"  type="card" :value="activeName"     style="background: #cccccc17">
    <el-tab-pane label="笔记" name="first">
      <ul class="note">
         <li v-if="objp">
          <router-link :to="{name:'photos.detail',params:{categoryTitle:'最新发布'},query:{id:starNote.note_id}}">
            <img :src="starNote_img[0]" width="100%" height="200px">
          </router-link>
          <p>
            <span style="font-size: 16px">{{starNote.title}}</span><br/>
            <span>{{starNote.content | Tolength(10)}}</span>
          </p>
        </li>
        <li v-for="(item,index) in note" :key="item.id" v-else>
          <router-link :to="{name:'photos.detail',params:{categoryTitle:'最新发布'},query:{id:item.note_id}}">
            <img :src="note_img[index]" width="100%" height="200px">
          </router-link>
          <p>
            <span style="font-size: 16px">{{item.title}}</span><br/>
            <span>{{item.content | Tolength(10)}}</span>
          </p>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="收藏" name="second">
       <ul class="note">
        <!-- 当今有一条收藏 -->
        <li v-if="obj">
          <router-link :to="{name:'photos.detail',params:{categoryTitle:'最新发布'},query:{id:starNote.note_id}}">
            <img :src="starNote_img[0]" width="100%" height="200px">
          </router-link>
          <p>
            <span style="font-size: 16px">{{starNote.title | Tolength(10)}}}</span><br/>
          </p>
        </li>
        <!-- 有多条用户发布笔记的收藏 -->
        <li v-for="(item,index) in starNote" :key="item.id" v-else>
          <router-link :to="{name:'photos.detail',params:{categoryTitle:'最新发布'},query:{id:item.note_id}}">
            <img :src="starNote_img[index]" width="100%" height="200px">
          </router-link>
          <p>
            <span style="font-size: 16px">{{item.title | Tolength(10)}}</span><br/>
          </p>
        </li>
        <!-- 数据api收藏的笔记 -->
        <li v-for="(item,index) in no" :key="item.id">
          <router-link :to="{name:'photos.detail',params:{categoryTitle:'旅行'},query:{id:item.id}}">
            <img v-lazy="item.image_info.original" width="100%" height="200px">
          </router-link>
          <p>
            <span style="font-size: 16px">{{item.title | Tolength(10)}}</span><br/>
          </p>

        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>

  </div>
</template>

<script>
import UserTool from '@/router/UserTool'
import {mapState} from 'vuex'
import Time from '@/router/time'
export default {

  name: 'Mine',

  data () {
    return {
      imageUrl: '',//头像图片
      activeName:'first',//tab栏切换
      note:[],//发布的笔记
      note_img:[],
      starNote:[],//收藏的笔记
      no:[],//数据API收藏的笔记
      starNote_img:[],
      obj:'',
      objp:''
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
     //获取数据库的用户发布的笔记,通过用户账号进行查询
    this.$axios.post('/api/checkNoteIT.php',{
      tele:this.userMessage.tele,
      caozuo:"tele"
    })
    .then(res=>{
      if(res.data instanceof Object){
        this.objp=true;
          this.note=res.data;
          let reg=/[-]{3}/;
       if(reg.test(this.note.img)){
          this.note_img=this.note.img.split("---");
        }
        else{
          this.note_img.push(this.note.img);
        }
      }
      else{
        this.objp=false;
       //将多个对象转化为数组
        this.note=Time.ToArray(res.data);
       //处理图片格式，有的是一张，有的是多张
      this.note_img=Time.hasImgs(res.data);
      }
    })
    .catch(err=>{
      console.log(err);
    })

    //获取收藏的笔记
    this.$axios.post('/api/checkStar.php',{
      tele:this.userMessage.tele
    })
    .then(res=>{
      //只收藏了一条笔记
      if(res.data instanceof Object){
        this.obj=true;
        this.starNote=res.data;
        let reg=/[-]{3}/;
        if(reg.test(this.starNote.img)){
        this.starNote_img=this.starNote.img.split("---");
        }
        else{
          this.starNote_img.push(this.starNote.img);
        }
      }
      //收藏多条笔记
      else{
        this.obj=false;
        this.starNote=Time.ToArray(res.data);
      this.starNote_img=Time.hasImgs(res.data);
      }
    })
    .catch(err=>{
      console.log(err);
    })

    this.$axios.post('/api/checkApiStar.php',{
      tele:this.userMessage.tele
      })
    .then(res=>{
      let ids=Time.ToArray(res.data);//对象数组形式的note_id列表
      let a=[];
      ids.forEach((item,index)=>{
        a.push(item.note_id);
      })
      for(let k=0;k<3;k++){
      this.$axios.get('../../../static/data/图片旅行'+k+'.json')
      .then(r=>{
        for (var i = 0; i < r.data.data.length; i++) {
          if(a.indexOf(r.data.data[i].id)!=-1){
            this.no.push(r.data.data[i]);
          }
        }

      })
    }

    })//then

    .catch(err=>{
      console.log(err);
    })

  }//created
};
</script>

<style lang="css" scoped>
.me{
  position: relative;
  height: 80px;
  /*让下面tab栏上移动*/
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
    left:130px;
    top: 30px;
  }

  .note li{
    float: left;
    width: 46%;
    background-color: #fff;
    margin: 10px 2%;
    border-radius: 4px;
  }
  .note li p{
    padding:5px 10px;
  }
</style>
