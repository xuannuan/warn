<template>
<div class="photosdetail">
  <!-- 必须要v-if，且变量要不一样的变量名，不然会覆盖 -->
  <TopBar :title="name" :srcURL="srcURL" v-if="imgs.title"/>
  <TopBar :title="Nname" :srcURL="NsrcURL" v-else/>

   <video controls='controls' width='100%' height="400px" v-if="imgs.video_info">
          <source :src="imgs.video_info.url" type="" alt='no'>
    </video>
    <div class='swipe' v-else>
      <!-- 如果换回数据api就可以用轮播图组件 -->
      <!-- <MySwipper :url="url"/> -->
      <!-- 自定义的json，只能这样，因为imgs是数组中的一个对象元素 -->
    <mt-swipe  :auto="4000" style="width:100%;height:400px" v-if="imgs.images_list">
      <mt-swipe-item v-for='(pic,index) in imgs.images_list' :key='index'  :preview-src-list="imgsList">
        <el-image  :src="pic.url" :preview-src-list="imgsList"></el-image>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 如果是数据api里面的就有v-if="imgs.images_list"，否则就是新发布的笔记进行PHP连接查询 -->
    <mt-swipe  :auto="4000" style="width:100%;height:400px" v-else>
      <mt-swipe-item v-for='(pic,index) in note_imgs' :key='index'  :preview-src-list="note_imgs">
        <el-image  :src="pic" :preview-src-list="note_imgs" fit="cover"  style="width: 100%; height: 400px"></el-image>
      </mt-swipe-item>
    </mt-swipe>

    </div>

    <div class="content" v-if="imgs.title">
      <h4>{{imgs.title}}</h4>
    <p>{{imgs.desc}}</p>
  </div>
  <div class="content" v-else>
      <h4>{{note.title}}</h4>
    <p>{{note.content}}</p>
  </div>

<div class="control">
  <input type="text" placeholder="请发表评论" width="40%" v-model="talk" @click="drawer = true">
  <el-button @click="drawer = true"><span><i class='el-icon-chat-dot-square'></i>{{count}}</span></el-button>
   <el-checkbox v-model="checked"><span @click="Tostar"><i class="el-icon-star-off"></i>{{note_star}}</span></el-checkbox>
   <el-checkbox-button v-model="checkedLike"><span style="top: 0;" @click="ToLike"><i class="el-icon-magic-stick"></i>{{note_like}}</span></el-checkbox-button>
</div>
<el-drawer
  :visible.sync="drawer"
  direction="btt"
  :with-header="false"
  >
   <div class="comment">
      <p class="count">共{{count}}条评论</p>
      <input type="text" width="80%" placeholder="发送评论" v-model="talk" id="comment">
      <button class="el-icon-upload2" @click="sub" :plain="true"></button>

    <!-- 对于评论 -->
    <ul>
      <li v-for="(item,index) in comments" :key="index">

        <div class="l">
        <a href="javascript:void(0)">
        <img :src="item.img||item.user.images" alt="user" width="40px" height="40px">&nbsp;&nbsp;
        <span>{{item.nickname||item.user.nickname}}</span>
        </a>
        <!-- 点击评论内容进行提交评论 -->
        <label for="comment">{{item.content}}</label>
        </div>
        <div class="r">
          <a @click="toCountF(index)">♥</a>
         <span> {{item.like_count}}</span>
        </div>
          <!-- 不过要先写好评论，点击即可提交，在评论中再评论 -->
         <ul class="inside">
            <li v-for="(item,index1) in comments[index].sub_comments" :key="index1">
              <div class="l">
                  <a href="javascript:void(0)">
                  <img :src="item.user.images" alt="user" width="30px" height="30px">&nbsp;&nbsp;
                  <span style="font-size: 14px;color:#9e9e9e">{{item.user.nickname}}</span>
                  </a>
                  <!-- 用label标签的for属性连接input的id -->
                  <label style="color:#9e9e9e" for="comment">{{item.content}}</label>
                  </div>
                  <div class="r">
                    <a @click="toCountS(index,index1)">♥</a>
                    <span>{{item.like_count}}</span>
                  </div>
            </li>
              </ul>
          </li>
        </ul>
    </div>
</el-drawer>


</div>
</template>

<script>
import {mapState} from 'vuex';
import Time from '@/router/time';
import Moment from 'moment';

export default {

  name: 'PhotosDetail',

  data () {
    return {
      checkedLike:true,
      checked:false,
      drawer: false,
      name:'',
      srcURL:'',
      Nname:'',
      NsrcURL:'',
      id:'',
      imgs:[],//数据api的笔记详情
      note:{},//新发布的笔记详情
      note_imgs:[],
      imgsList:[],//遍历图片
      comments:[],
      count:'',//评论总数
      talk:'',
      note_like:'',//笔记点赞数
      note_star:''//笔记收藏数
    }
  },
  computed:mapState([
    'userMessage'
    ]),
  methods:{

    //收藏操作
    Tostar(){
      console.log(this.checked);
    //为true，会进行删除操作
      if(this.checked===true){
      //在点一下删除
      this.$axios.post('/api/deleteStar.php',{
        note_id:this.id
      })
      .then(res=>{
        console.log(res.data);
         if(this.note_like>0){//点赞数不能为负数
      Time.updateStar(this.id,"star","-");
      this.note_star--;
      }
      })
      .catch(err=>{
        console.log("删除收藏失败",err);
      });

    }//if
      //false时，会高亮显示
    else{
      this.$axios.post('/api/insertStar.php',{
        tele:this.userMessage.tele,
        note_id:this.id
      })
      .then(res=>{
        console.log(res.data);
        //如果插入成功，收藏数加1
      Time.updateStar(this.id,"star","+");
      this.note_star++;
      })
      .catch(err=>{
        console.log("收藏失败",err);
      });
     }
    },
    //笔记点赞操作
    ToLike(){
      if(this.checkedLike===true){
     Time.updateStar(this.id,"like","+");
     this.note_like++;
   }else{
      if(this.note_like>0){//点赞数不能为负数
      Time.updateStar(this.id,"like","-");
     this.note_like--;
      }
   }
     console.log(this.checkedLike);

    },
    //评论点赞数
    toCountF(now){
      this.comments[now].like_count++;
      this.$axios.post('/api/updateCommentLike.php',{
        comment_id:this.comments[now].comment_id
      })
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log("修改点赞数失败",err);
      })
    },
    toCountS(now,now1){
      this.comments[now].sub_comments[now1].like_count++;
    },
    sub(){
      if(this.userMessage.name){
        this.count++;//评论数自增
        //发表之后，清空评论框
        //插入到评论数据库
        this.$axios.post('/api/insertComment.php',{
          note_id:this.id,
          like_count:0,
          content:this.talk,
          nickname:this.userMessage.name,
          img:this.userMessage.img,
          // time:Time.changeTime()
          time:Moment(new Date()).formate("YYYY-MM-DD-HH:mm:ss")
        })
        .then(res=>{
          console.log(res.data);
         this.talk='';
        })
        .catch(err=>{
          console.log("插入到评论数据库失败",err);
        });
        //加载新评论的
        this.hasComment();
      }
      else{//如果没有登录
         this.$message({
          message: '您还没有登录呢，请先登录吧',
          type: 'warning'
        });
      }
    },
    //新发布的笔记具体详情
    getNewPublic(){
    this.$axios.post('/api/checkNoteIT.php',{
      id:this.id,
      caozuo:"id"
    })
    .then(res=>{
      this.note=res.data;
      this.note_like=this.note.like_count;//获取点赞数
      this.note_star=this.note.star;//获取收藏数
      this.$axios.post('/api/checkUserTele.php',{
        tele:this.note.tele
      })
      .then(responce=>{
        // 获取笔记主人的头像和昵称
        this.Nname=responce.data.name;
        this.NsrcURL=responce.data.img;
      })
      //对图片url的字符串拆成数组
      let regs=/[-]{3}/;
      if(regs.test(this.note.img)){
        let imglist=this.note.img.split('---');
        this.note_imgs=imglist;
      }
      else{
        this.note_imgs.push(this.note.img);
      }
    })
    .catch(err=>{
      console.log(err);
    })

    },
    getKeyWord(key){
      //获取关键字，但因为导航守卫this无法调用，所以实例化方法回调，不在create里请求数据，因为title无法传到create里面
      //要么请求最新发布的，要么请求数据api的笔记详情
      if(key==="最新发布"){
        this.getNewPublic();
      }
      else{
        this.$axios.get('../../../static/data/图片'+key+'1.json')
      .then(res=>{
          let that=this;
          //因为具体的商品详情与商品分类同一个json数据,所以要获取数组中的一个元素才是具体的商品详情
        for (var i = 0; i < res.data.data.length; i++) {
           if(res.data.data[i].id==this.id){
          this.imgs=res.data.data[i];//数组中的一个元素
          console.log(this.imgs);
          this.note_like=this.imgs.liked_count;
          this.note_star=this.note_like;
          this.imgs.images_list.forEach((item,index)=>{
            that.imgsList.push(item.original);
          })

           this.name=this.imgs.user.nickname;//用在topbar组件传值（父-》子）
           this.srcURL=this.imgs.user.images;
        }
      }
      })
      .catch(err=>{
        console.log("获取相对应分类的图片失败",err);
      })
      }
    },
    //新发布的评论
    getUserComment() {
     return this.$axios.post('/api/checkComment',{
        note_id:this.id
      });
    },
    //数据api的笔记
    getApiComment() {
      return this.$axios.get('../../../static/data/小诺村评论.json')
       //暖儿 'https://api03.6bqb.com/xhs/notes/comment?apikey=5F3779A028E404694FC192684E80B7C3&itemId='+id
    },
   //合并请求,如果有一个失败就都失败
   hasComment(){
     var that=this;//   合并里面的this指向this.$axios，会导致赋值不成功
    this.$axios.all([this.getUserComment(), this.getApiComment()])
    .then(this.$axios.spread(function (acct, perms) {
      // 两个请求现在都执行完成
      //如果没有查询到数据
      if(acct.data.status=="0"){
          that.comments=perms.data.data;
      }
      else{//正常查询到数据
          let talkList=Time.ToArray(acct.data);
          that.comments=perms.data.data;
         //把新发布的评论数组元素放进数据API评论数组里面，合并
         talkList.forEach(item=>{
          that.comments.unshift(item);
            })
        }
      // console.log(talkList instanceof Array);//true

       let count1=0;
        for (var i = 0; i <that.comments.length; i++) {
        if(that.comments[i].sub_comment_count){
        count1+=that.comments[i].sub_comment_count;
        }
      }
      that.count=that.comments.length+count1;
      }));
    }
  },//methods
  beforeRouteUpdate(to,from,next){
    this.getKeyWord(to.params.categoryTitle);
    next();
  },
    created(){
      this.id=this.$route.query.id;

      let key=this.$route.params.categoryTitle;
      this.getKeyWord(key);
      //加载评论
      this.hasComment();
    }//created

};
</script>

<style lang="css" scoped>

.comment input{
  margin-left:5%;
  padding-left: 10px;
    border-radius: 4px;
    border: 1px solid #9e9e9e47;
    width: 80%;
    background: #9e9e9e21;
    height: 30px;
}

.comment button{
  border-radius: 4px;
    border: 1px solid #9e9e9e47;
    width: 10%;
    background: #9e9e9e21;
    height: 30px;
}
.count{
  margin: 10px;
  font-size: 14px;
}

.content{
  margin: 25px 10px;
}
.content p{
line-height: 30px;
    font-size: 15px;
}
.comment{
  padding-left: 10px;
}
.comment ul li{
  border-bottom: 1px solid rgba(0,0,0,0.1);
  width: 100%;
  position: relative;
  padding: 10px 0;
}
.l{
  overflow: hidden;
  /*清除浮动在父元素*/
}
.l a img{
  float: left;
}
.l label{
  display: block;
  margin-left: 60px;
  margin-right: 20px;
  margin-top: 5px;
  /*评论内容离头像远一点*/
}
.r{
    float: right;
    width: 5px;
    position: absolute;
    top: 10px;
    right: 15px;
}
.r a{
  color: pink;
  font-size: 16px;
}
.r a:hover{
color:#8cc5ff;
}
/*样式权重值要多*/
.comment .inside li{
  width: 85%;
  border: none;
  /*覆盖之前的边框*/
  padding-left: 50px;
  margin-top:10px;

}

.control{
  position: fixed;
  bottom:43px;
  left: 0;right: 0;
  height: 30px;
  width: 100%;
  background-color: #fff;
  z-index: 2001;
}
.control input{
  border-radius: 5px;
  border: 0.3px solid #000;
  margin-left: 10px;
  height: 30px;
  float: left;
}
.control button,.control label{
    height: 30px;
    line-height: 0px;
    width: 18%;;
    border: none;
    float: right;
    padding: 0;
}
.control label span{
    position: absolute;
    top: -1px;
    left: 4.5px;
    z-index: 2001;
}


.control span i{
  font-size: 25px;
}

</style>
