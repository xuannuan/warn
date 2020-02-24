<template>
  <div class="newslist">

    <!-- 全局的导航栏组件，父组件给子组件传值，直接自定义title属性，不用在js里绑定属性 -->
    <!-- <TopBar title="科技天地" :srcURL="imgUrl"/> -->

    <ul>
      <li class="list-group-item" v-for="(item,index) in newsList" :key="index">
        <router-link :to="{name:'detail',query:{id:item.id}}">
          <img :src="item.cover">
          <div class="body">
            <h4 class="heading">{{item.title}}</h4>
            <p>简介：{{item.summary}}</p>
            <span>作者：{{item.user.name}}
            &nbsp;&nbsp;&nbsp;</span>
            <span class="clock">
              <i class="clock_icon"></i>
              <!-- 过滤器 -->
            {{item.published_at | coverTime("YYYY-MM-DD HH:mm:ss")}}
            </span>
          </div>
        </router-link>
      </li>
    </ul>


  </div>
</template>

<script>
export default {

  name: 'NewsList',

  data () {
    return {
      newsList:[],
      imgUrl:''
    }
  },
  created(){
    this.$axios.get('../../../static/data/新闻列表.json')
    //https://api03.6bqb.com/kr/category?apikey=69330CA8CE3088F90BED27B6012BB0D9&category=web_news
    .then(res=>{
      this.newsList=res.data.data;
      this.imgUrl=this.newsList[1].cover;
    })
    .catch(err=>{
      console.log('新闻列表异常',err);
    });
  }
};
</script>

<style lang="css" scoped>
.newslist{
  background-color: #9e9e9e1c;
}

ul li{
  width: 98%;
  overflow:hidden;
  border-radius: 5px;
  margin: 5px;
  background-color: #fff;

}
ul li a img{
  float: left;
}
ul li a .body{
  margin-left: 120px;
}
.body span{
  display: inline-block;
  padding-top: 10px;
  color: #918f8f;
}


.list-group-item {
    position: relative;
    height: auto;
    padding: 20px 0;
    font-size: 14px;
}
.list-group-item img{
  width: 100px;
  height: 100px;
}
.list-group-item .media-body{
   padding-left:20px;
   padding-right: 5px;

}
.list-group-item p{
    color: #555;
}
.media-body span{
  color:#fd7e14;
}
.media-body .clock{
  float:right;

}
.clock .clock_icon{
  display: inline-block;
  position: relative;
  top: 1px;
    right: -1px;
    width: 10px;
    height: 10px;
  background:url(../../../static/homeke.png)  no-repeat;
  background-size: 246px 1012px;
  background-position:  0 -115px;

}
</style>
