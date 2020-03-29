<template>
  <div class="photoslist">
    <Search :geta="getData"/>
    <div class="banner">
      <ul>
        <!-- getCategoryTitle为了获取关键字进行搜索 -->
        <li v-for="(item,index) in category" :key="item.id" @click='getCategoryTitle(item.title,index)'>
          <a href="javascript:void(0)" :class='{active:item.id==lifeCurrentIndex}'>{{item.title}}&nbsp;&nbsp;&nbsp;</a>
        </li>
      </ul>
    </div>
        <keep-alive> <!-- 保留状态，避免重新渲染 -->

    <div class="photo_list">
      <!-- 要实现滚动加载的列表上上添加v-infinite-scroll，并赋值相应的加载方法，实现滚动到底部时自动执行加载方法 -->
      <ul class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <li v-for="(item,index) in pic" :key="item.id" class="list-item">
        <router-link :to="{name:'photos.detail',params:{categoryTitle:choosetitle},query:{id:item.id||item.note_id}}">
          <!-- 如果v-if="item.content"，有content属性的就是最新发布的，不可以用||拼接？ -->
           <!-- mint-ui 懒加载 ,看一张加载一张-->
            <img v-lazy="note_img[index]" width="100%" height="400px" v-if="item.content">
           <img v-lazy="item.image_info.original" width="100%" height="400px" v-else>
          </router-link>
          <p>
            <span>{{item.title}}</span><br/>
            <span v-if="item.content">{{item.content|Tolength(30)}}</span>
            <span v-else>{{item.desc}} </span>
          </p>
        </li>
      </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
    </div>
  </keep-alive>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Vue from 'vue';
import Time from '@/router/time'
export default {

  name: 'PhotosList',

  data () {
    return {
      category:[],
      pic:[],
      pages:1,
      note:[],//用户新发布的笔记
      note_img:[],//用户新发布的图片
      currentIndex:0,
      getData:[],//传给search组件的对象数组
      choosetitle:'',//目前获取的分类关键词
      loading:false
    }
  },
   computed:{
    noMore () {
        return this.pages >= 2
      },
      disabled () {
        return this.loading || this.noMore
      },
      lifeCurrentIndex(){
        return this.$store.state.lifeCurrentIndex;
      }
    },

  methods:{
    load () {
       this.loading = true
        setTimeout(() => {
        this.pages +=1;
         console.log(this.pages);
         if(this.choosetitle!=="最新发布"){
            this.$axios.get('../../../static/data/图片'+this.choosetitle+this.pages+'.json')
           .then(res=>{
             this.pic=this.pic.concat(res.data.data);
           })
         }
          this.loading = false
        }, 2000)

      },

    // 小转弯，再点击相应分类后再发起图片的跨域请求
    getCategoryTitle(title,index){
    this.choosetitle=title;
      // 为了获取正在点击的分类，来渲染样式
    this.$store.dispatch('setLifeCurrentIndex',index);
    if(title=="最新发布"){
     //获取数据库的用户发布的笔记
    this.$axios.get('/api/checkNote.php')
    .then(res=>{
       //动态路由匹配,不管有没有内容请求，都先跳转路由
      this.$router.push({name:'life',params:{categoryTitle:title}});
       this.pic=Time.ToArray(res.data);//调用time组件里的方法，用一个数组进行存储所有笔记对象
       this.note_img=Time.hasImgs(res.data);
       //处理图片格式，有的是一张，有的是多张

    })
    .catch(err=>{
      console.log(err);
    })
    }//if
    else{
      this.$axios.get('../../../static/data/图片'+title+1+'.json')
      .then(res=>{
      this.$router.push({name:'life',params:{categoryTitle:title}});
        this.pic=res.data.data;
      })
      .catch(err=>{
         //动态路由匹配,不管有没有内容请求，都先跳转路由
      this.$router.push({name:'life',params:{categoryTitle:title}});
        console.log(err);
        this.pic=[];
        this.$toast({//因为已经Vue.use(Mint),所以可以this使用加载动漫
          message: '图片加载完毕',
          iconClass: 'iconfont icon-plant-1'
          //以Font Class引入字体图标
      // iconfont +字体图标类名.记得在main.js中引入import '../static/css/font_1629701_ou9lsu8m4r.css'
        });
      })
    }

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
    this.getCategoryTitle(to.params.categoryTitle,this.lifeCurrentIndex);//当路由改变内容也会变化
    //动态路由匹配,不管有没有内容请求，都先跳转路由
    next();
  },


  //在生命周期开始之前就要发起跨域ajax请求
  //自定义写json，图片分享分类，获取请求
  created(){
    this.$axios.get('../../../static/data/category.json')
    .then(res=>{
      this.category=res.data.message;
      // 搜索组件
      this.getData=this.category;
      // 因为search组件输入建议的数组对象属性必须有value，且要转换为json格式，都要加""
      this.getData.forEach((item,index)=>{
      Vue.set(item,'value',item.title);//
      JSON.stringify(item);
      });

    })
    .catch(err=>{
      console.log("图片分类获取失败",err);
    });




  }//created
};
</script>

<style lang="css" scoped>
/*.search,.banner{
  position: fixed;
}*/
.banner{
  /*横向滚动条*/
  overflow-x:scroll;
  width: 375px;
  position: relative;
  /*Z-index 仅能在定位元素上奏效*/
  z-index:2002;
  /*不然拦截器的loading图标加载无法点击切换分类*/
}
 .banner ul{
  padding:10px;
  width:1100px;
  /*隐藏后面的li*/
}
ul li{
    float: left;
}


.photo_list ul li{
  position: relative;
  padding-bottom:10px;
}

.photo_list ul li p{
  position: absolute;
  bottom: 15px;
  z-index: 1000;
  padding: 0 10px;
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

