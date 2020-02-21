<template>
  <div class="goodscomment">
     <ul>
      <li v-for="(item,index) in comments" :key="index">
        <div class="top">
        <img :src="item.userAvatar" alt="user" width="30px" height="30px" style="border-radius: 20px">&nbsp;&nbsp;
        <h6>{{item.userNick}}</h6>
        <!-- 遍历对象的属性 和值-->
        <span v-for="(item1,value,index) in item.skuMap">{{item.commentDate | coverTime("YYYY-MM-DD")}}| {{item1}}:{{value}}</span>
         </div>
        <div class="content">
        <p>{{item.content}}</p>

       <ul style="overflow: hidden">
         <li v-for="(p,i) in item.images" class="demo-image__preview">
          <!-- 可通过 previewSrcList 开启预览大图的功能。 -->
           <el-image
            style="width: 90px; height: 90px"
            :src="p"
            :preview-src-list="srcList">
          </el-image>
           <!-- <img :src="p" width="50px" height="50px"> -->
         </li>
       </ul>

          <p style="overflow: hidden">
          <span class="fl">浏览{{item.interactInfo.readCount}}次</span>
          <span @click="toCountF(index)" class="fr">♥&nbsp;{{item.interactInfo.likeCount}}</span>
          </p>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

  name: 'GoodsComment',

  data () {
    return {
      comments:[],
      srcList:[]//大图预览，是数组
    }
  },
  methods:{
    toCountF(now){
      this.comments[now].interactInfo.likeCount++;
    }
  },
  created(){
    let id=this.$route.query.id;//区别this.$router
    this.$axios.get('../../../static/data/满天星手表评论.json')
    // 'https://api03.6bqb.com/taobao/comment?apikey=5F3779A028E404694FC192684E80B7C3&itemId='+$(id)+'&page=1'
    .then(res=>{
        this.comments=res.data.data;
        let that=this;
        this.comments.forEach((item,index)=>{
          if(item.images){
            item.images.forEach((url,i)=>{
              that.srcList.push(url);
          });
          }
        })
        // console.log(this.srcList);//获取所有评论图片


    })
    .catch(err=>{
      console.log("商品评论加载失败",err);
    })
  }
};
</script>

<style lang="css" scoped>
ul li{
  float: left;
 margin: 20px 10px;
}

.top h6{
  display: inline-block;
}
.top span{
  color: gray;
}
</style>
