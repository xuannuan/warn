<template>
<div class="photosdetail">
  <TopBar :title="title" :srcURL="srcURL"/>

   <video controls='controls' width='100%' height="400px" v-if="imgs.video_info">
          <source :src="imgs.video_info.url" type="" alt='no'>
    </video>
    <!-- v-if筛选有的数据没有视频 -->
    <!-- 轮播图 :show-indicators="false"缺点，不能点开看大图-->
    <div class='swipe' v-if="!imgs.video_info">
      <!-- 如果换回数据api就可以用轮播图组件 -->
      <!-- <MySwipper :url="url"/> -->
      <!-- 自定义的json，只能这样，因为imgs是数组中的一个对象元素 -->
    <mt-swipe  :auto="4000" style="width:100%;height:400px" >
      <mt-swipe-item v-for='(pic,index) in imgs.images_list' :key='index'  :preview-src-list="imgsList">
        <el-image  :src="pic.url" :preview-src-list="imgsList"></el-image>
      </mt-swipe-item>
    </mt-swipe>
    </div>


<!-- preview大图查看器 ，但不能轮播-->
 <!-- <vue-preview :slides="imgsList"></vue-preview> -->
 <!--  <vue-preview v-if="!imgs.video_info"
      :list="imgsList"
      :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
      :previewBoxStyle="{border: '1px solid #eee'}"
      :tapToClose="true"
    /> -->

    <div class="content">
      <h5>{{imgs.title}}</h5>
    <p>{{imgs.desc}}</p>
  </div>
  <!-- 小图是视频同时存在，否则大的轮播图存在 ,得出结论，有视频就不用图，因为图是截图用作封面-->
  <!-- <div class="pic" v-if="imgs.video_info">
    <ul>
      <li v-for='(pic,index) in imgs.images_list' :key='index'>
      <img :src="pic.url" alt="" width="100px" height="150px"/>
    </li>
    </ul>
    </div>
 -->
<hr/>
    <div class="comment">
      <p class="count">共{{count}}条评论</p>
      <input type="text" name="" width="80%" placeholder="发送评论" v-model="talk">&nbsp;&nbsp;
        <!-- <mt-button type="primary" size="big">加载更多</mt-button> -->
      <input type="button" value="发送" @click="sub">
      <!-- 自己提交的评论 -->
      <ul>
        <li v-for="(item,index) in talkList" :key="index">
             <div class="l">
              <a href="javascript:void(0)">
                 <svg class="icon" aria-hidden="true" style="width: 30px;height: 40px">
                    <use xlink:href="#icon-plant-"></use>
                </svg>
              <!-- <img :src="item.user.images" alt="user" width="40px" height="40px"> -->&nbsp;&nbsp;
              <span>暖团</span>
              </a>
              <p> {{item}}</p>
              </div>
              <div class="r">
                <span @click="toCountM">♥</span>
                <span>{{like_my}}</span>
              </div>
        </li>
      </ul>
    <!-- 对于数据api的评论 -->
    <ul>
      <li v-for="(item,index) in comments" :key="index">

        <div class="l">
        <a href="javascript:void(0)">
        <img :src="item.user.images" alt="user" width="40px" height="40px">&nbsp;&nbsp;
        <span>{{item.user.nickname}}</span>
        </a>
        <!-- 点击评论内容进行提交评论 -->
        <p @click="sub">{{item.content}}</p>
        </div>
        <div class="r">
          <span @click="toCountF(index)">♥</span>
          <span>{{item.like_count}}</span>
        </div>
          <!-- 不过要先写好评论，点击即可提交，在评论中再评论 -->
         <ul class="inside">
            <li v-for="(item,index1) in comments[index].sub_comments" :key="index1">
              <div class="l">
                  <a href="javascript:void(0)">
                  <img :src="item.user.images" alt="user" width="30px" height="30px">&nbsp;&nbsp;
                  <span style="font-size: 14px">{{item.user.nickname}}</span>
                  </a>
                  <p @click="sub">{{item.content}}</p>
                  </div>
                  <div class="r">
                    <span @click="toCountS(index,index1)">♥</span>
                    <span>{{item.like_count}}</span>
                  </div>
            </li>
              </ul>
          </li>
        </ul>
    </div>

</div>
</template>

<script>
export default {

  name: 'PhotosDetail',

  data () {
    return {
      title:'',
      srcURL:'',
      imgs:[],
      imgsList:[],//大图查看器遍历图片
      comments:[],
      count:'',//评论总数
      like_my:0,//对于自己发布的评论的点赞数
      talk:'',
      talkList:[],//提交的评论装进一个数组然后展示
    }
  },
  methods:{
    // 点赞数（缺点，无法保存）
    toCountM(){
      this.like_my++;
    },
    toCountF(now){
      this.comments[now].like_count++;
    },
    toCountS(now,now1){
      this.comments[now].sub_comments[now1].like_count++;
    },
    // 提交评论按钮事件操作（缺点，无法保存）,方法一：进行post请求
    // sub(){
    //   let id=this.$route.query.id;
    //   this.$axios.post('https://api03.6bqb.com/xhs/notes/comment?apikey=5F3779A028E404694FC192684E80B7C3&itemId='+id,'content='+this.talk)
    //   .then(res=>{
    //     console.log(res.data.data);
    //     //发表之后，清空评论框
    //     this.talk='';
    //     })
    //   .catch(err=>{
    //     console.log("发评论错误",err);
    //      this.$toast({
    //       message: '评论发表错误',
    //       iconClass: 'iconfont icon-plant-10'
    //     });
    //   });

    // },
    sub(){

        this.talkList.unshift(this.talk);//在前面加入
        this.count++;//评论数自增
        //发表之后，清空评论框
        this.talk='';
    },
    getKeyWord(key){
      let keyword=key;//获取关键字，但因为导航守卫this无法调用，所以实例化方法回调，不在create里请求数据，因为title无法传到create里面
      let id=this.$route.query.id;//获取路由上的id，截取数组中符合点击图片分享数组中的的该数据元素
      this.$axios.get('../../../static/data/图片'+keyword+'.json')
      .then(res=>{
          let that=this;
          //因为具体的商品详情与商品分类同一个json数据,所以要获取数组中的一个元素才是具体的商品详情
        for (var i = 0; i < res.data.data.length; i++) {
           if(res.data.data[i].id==id){
          this.imgs=res.data.data[i];//数组中的一个元素
          this.imgs.images_list.forEach((item,index)=>{
            that.imgsList.push(item.original);
          })
          // console.log(this.imgsList);//获取所有轮播图片为数组

          //preview看图器的遍历图片url
          // 实例参考https://www.npmjs.com/package/vue2-preview
          // this.imgsList.forEach((item,index)=>{
          //   item.msrc=item.original;
          //   item.src=item.url_size_large;
          //   item.w=600;//图片尺寸必须要
          //   item.h=600;
          // });

           this.title=this.imgs.user.nickname;//用在topbar组件传值（父-》子）
           this.srcURL=this.imgs.user.images;
        }
      }
      })
      .catch(err=>{
        console.log("获取相对应分类的图片失败",err);
      })
    }
  },
   beforeRouteEnter(to,from,next){
      // console.log(from);//{name: "photos.list", meta: {…}, path: "/photos/list/旅行", hash: "", query: {…}, …}
      //获取关键字，在路径链接中用到
      next(vm=>{
        vm.getKeyWord(from.params.categoryTitle);
      });
    },
    created(){

      let id=this.$route.query.id;
       //因为现在调用笔记详情api要钱，所以到最后展示的时候再用吧~现在就用自己艰辛抠出来的数据
      // this.$axios.get('https://api03.6bqb.com/xhs/notes/detail?apikey=69330CA8CE3088F90BED27B6012BB0D9&itemId='+id)
      // .then(res=>{
      //   this.imgs=res.data.data;
      //   this.title=this.imgs.user.nickname;//用在topbar组件传值（父-》子）
      //   this.srcURL=this.imgs.user.images;
      // })
      // .catch(err=>{
      //    console.log("获取相对应分类的图片失败",err);
      // });

//评论api
    this.$axios.get('../../../static/data/小诺村评论.json')
    //暖儿 'https://api03.6bqb.com/xhs/notes/comment?apikey=5F3779A028E404694FC192684E80B7C3&itemId='+id
    //暖团：'https://api03.6bqb.com/xhs/notes/comment?apikey=69330CA8CE3088F90BED27B6012BB0D9&itemId='+id
    .then(res=>{
      // console.log(res.data.data);
      this.comments=res.data.data;
      let count1=0;
      for (var i = 0; i <this.comments.length; i++) {

        count1+=this.comments[i].sub_comment_count;
      }
      this.count=this.comments.length+count1;


    })
    .catch(err=>{
      console.log('获取笔记评论错误',err);
    })

    }

};
</script>

<style lang="css" scoped>

.content{
  padding-top: 5px;
  padding-left: 10px;
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
.l p{
  margin-left: 50px;
  margin-right: 20px;
  /*评论内容离头像远一点*/
}
.r{
  float: right;width: 5px;
  position: absolute;
  top: 5px;right: 20px;
}
/*样式权重值要多*/
.comment .inside li{
  border: none;
  /*覆盖之前的边框*/
  padding-left: 50px;
  padding-right: 20px;
  margin-top:10px;

}

</style>
