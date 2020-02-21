<template>
  <div class="photoslist">
    <Search :geta="getData"/>
     <!-- <TopBar :title="keyword" :srcURL="imgUrl"/> -->
    <div class="banner">
      <ul>
        <!-- getCategoryTitle为了获取关键字进行搜索 -->
        <li v-for="(item,index) in category" :key="item.id" @click='getCategoryTitle("item.title",index)'>
          <!-- @click='getCategoryTitle("item.title")' -->
        <!-- 这个CategoryHandle为了获取正在点击的分类，来渲染样式 -->
          <a href="javascript:void(0)"   :class='{active:item.id==currentIndex}'>{{item.title}}&nbsp;&nbsp;&nbsp;</a>
          <!-- 为什么index不行，或者调用api后只能点一两次 -->
        </li>
      </ul>
    </div>
    <div class="photo_list">
      <ul>
        <li v-for="(item,index) in pic" :key="item.id" >
          <router-link :to="{name:'photos.detail',query:{id:item.id}}">
           <!--  <img :src="item.image_info.original"  width="100%" height="365px"> -->
           <!-- mint-ui 懒加载 ,看一张加载一张-->
           <img v-lazy="item.image_info.original" width="100%" height="400px" >
          </router-link>
          <p>
            <span>{{item.title}}</span><br/>
            <span>{{item.desc}}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {

  name: 'PhotosList',

  data () {
    return {
      category:[],
      pic:[],
      currentIndex:0,
      getData:[],//传给search组件的对象数组
    }
  },
  methods:{
    // 小转弯，再点击相应分类后再发起图片的跨域请求
    getCategoryTitle(title,index){
      this.currentIndex=index;
      // 拼接
      this.$axios.get('../../../static/data/图片'+title+'.json')
      // https://api03.6bqb.com/xhs/notes/search?apikey=69330CA8CE3088F90BED27B6012BB0D9&keyword='+title
      .then(res=>{
        this.pic=res.data.data;
         //动态路由匹配
      this.$router.push({name:'life',params:{categoryTitle:title}});
      })
      .catch(err=>{
        this.$toast({//因为已经Vue.use(Mint),所以可以this使用加载动漫
          message: '图片加载完毕',
          iconClass: 'iconfont icon-plant-1'//以Font Class引入字体图标
          // iconfont +字体图标的类名，记得在main.js中引入import '../static/css/font_1629701_ou9lsu8m4r.css'
        });
      })
    }
  },
  // 组件内的导航守卫

  // 用法：复制链接再次打开会在相应的页面
   beforeRouteEnter (to, from, next) {
   next(vm => {
    // 通过 `vm` 访问组件实例
    vm.getCategoryTitle(to.params.categoryTitle);// 相当于在created方法里面this.getCategoryTitle(this.$route.params.categoryTitle),缺点，异步调用出现阻塞，图片无法加载
  })
  },
    beforeRouteUpdate (to, from, next) {
    // 可以访问组件实例 `this`
    // console.log(to);//name: "photos.list"params: {categoryTitle: "旅行"}path: "/photos/list/旅行"
    this.getCategoryTitle(to.params.categoryTitle);//当路由改变内容也会变化
    next();
  },

  //在生命周期开始之前就要发起跨域ajax请求
  //自定义写json，图片分享分类，获取请求
  created(){
    // this.getCategoryTitle("旅行");//默认title是旅行，点进去是旅行的分类图片
    this.$axios.get('../../../static/data/category.json')
    .then(res=>{
      // console.log(res.data.message);
      this.category=res.data.message;

      // 搜索组件
      this.getData=this.category;
      // 因为search组件输入建议的数组对象属性必须有value，且要转换为json格式，都要加""
      this.getData.forEach((item,index)=>{
      Vue.set(item,'value',item.title);//
      JSON.stringify(item);
      });
      // 当对搜索完成进行内容跳转,对应的分类关键词进行高亮提示
      this.$bus.$on('sendNowIndex',(data)=>{
        this.currentIndex=data;
      });
    })
    .catch(err=>{
      console.log("图片分类获取失败",err);
    })

  }
};
</script>

<style lang="css" scoped>
.banner{
  /*横向滚动条*/
  overflow-x:scroll;
  width: 378px;
}
 .banner ul{
  padding:10px;
  width:1100px;
  /*隐藏后面的li*/
}
ul li{

    float: left;
}
/*.photo_list ul li[data-v-18e4f228] {
    position: relative;
    padding-bottom: 10px;
    width: 50%;
}*/

.photo_list ul li{
  position:relative;
  padding-bottom:10px;
}

.photo_list ul li p{
  width: 100%;
  position: absolute;
  bottom: 10px;
  left: 5px;
  z-index: 1000;
  background-color: #6c757d3d;
}
.photo_list ul li p span{
  color: #fff;
}

/*点击该分类时的样式*/
.active{
  color:#8cc5ff;
}

</style>

