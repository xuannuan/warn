<template>
  <div id='home'>

    <!-- 九宫格列表 -->
    <div class="list">
      <ul>
        <li v-for="item in grids" :key="item.id">
          <!-- 用命名路由最好 -->
          <router-link :to="item.router">
            <!-- 渲染图片要用冒号 -->
            <!-- <img :src="item.src" alt=""> -->
            <svg class="icon" aria-hidden="true" style="width: 40px;height: 60px">
            <use :xlink:href="item.src"></use>
            </svg>
          </router-link>
          <p>{{item.title}}</p>
        </li>

      </ul>
    </div>
</div>
</template>

<script>
// webpack中src里面的文件夹assets，因为要打包编译，要用模块的方式导入后端资源
// 或者把图片放在static静态资源中，可以直接引用
// import src1 from '../../assets/home.jpg'

//在data中定义变量，在调用此变量
var grids=[
{id:1,src:'#icon-plant-4',title:'新闻资讯',router:{name:'news.list'}},
{id:2,src:'#icon-plant-5',title:'图文分享',router:{name:'photos.list',params:{categoryTitle:'旅行'}}},
{id:3,src:'#icon-plant-6',title:'商品展示',router:{name:'goods.list',params:{categoryTitle:'手表',page:1}}},
{id:4,src:'#icon-plant-7',title:'用户笔记',router:{name:'news.list'}},
{id:5,src:'#icon-plant-8',title:'留言反馈',router:{name:'news.list'}},
{id:6,src:'#icon-plant-9',title:'联系我们',router:{name:'news.list'}}
];
export default {

  name: 'Home',

  data () {
    return {
      imgs:[],
      grids:grids,
      url:'../../../static/data/轮播图.json'
    }
  },
  created(){
    this.$axios.get('../../../static/data/轮播图.json')
    // https://api03.6bqb.com/xhs/search?apikey=69330CA8CE3088F90BED27B6012BB0D9&keyword=女装
    .then(res=>{
      // console.log(res.data.data);//有20个数组元素
      this.imgs=res.data.data;
    })
    .catch(err=>{
      console.log('轮播图数据异常',err);
    })
  }
};
</script>

<style lang="css" scoped>
#home{
  width: 100%;height: 574px;
  background:url(../../../static/img/huajia.jpg) no-repeat center center;
}
/*轮播图样式*/
 .swipe{
  height: 250px;
}

  .title{
    background-color: gray;
    color: #fff;
    text-align: center;
    z-index: 1000;
    position:relative;
    top:230px;
  }


  /*九宫格样式*/
  .list{
    width: 100%;
  }

  .list ul{
    display: flex;
    /*换行*/
    flex-wrap: wrap;
  }

  .list ul li{
    width: 33.3%;
    height: 100px;
    text-align: center;
    font-size: 14px;
    /*默认16px*/
  }
  .list ul li a{
    display: inline-block;
    width: 60px;height: 50px;
    margin:5px auto;
  }
  .list ul li a img{
    width: 50px;
  }
</style>
