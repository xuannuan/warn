<template>
  <div class="goods">
    <Search :geta="geta"/>
    <div class="category_left">
            <ul>
                <li v-for="(item,index) in goods" :key="index" @click="getKeyWord(item.catName,index)">
                  <a href="javascript:void(0);" :class='{active:item.catId==goodsCurrentIndex}' >{{item.catName}}</a>
                </li>
            </ul>
    </div>
    <div class="category_right">
      <ul class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
        <li v-for="(item,index) in products" :key="index" class="list-item">
             <router-link :to="{name:'goods.detail',query:{id:item.id}}">
                    <!-- mint-ui 懒加载 ,看一张加载一张-->
               <img v-lazy="item.imageUrls[0]" width="100%" height="110px" >
             </router-link>
             <!-- 过滤器控制显示个数,不然有些li会出现大片空白 -->
                     <p >{{item.title | Tolength(10)}}</p>

                    <span style="color:red;font-size:13px">￥{{item.price}}</span>
                     <span style="font-size:12px">{{item.sales}}</span>
                  </li>
             </ul>
              <p v-if="loading" class="loading">加载中...</p>
              <p v-if="noMore" class="noMore">没有更多了</p>
        <!-- 这个是购物车的图标 -->
    <fixCar/>
</div>
</div>
</template>

<script>
import Vue from 'vue';
import {mapState} from 'vuex'
import GoodsTool from '../../router/GoodsTool'
export default {

  name: 'Goods',

  data () {
    return {
      goods:[],
      products:[],
      geta:[],//组件传值
      key:'',
      page:1,
      allLoaded:false,
      loading:false,//加载更多
    }
  },
  computed:{
    noMore () {
        return this.pages >= 2
      },
      disabled () {
        return this.loading || this.noMore
      },
      goodsCurrentIndex(){
        return this.$store.state.goodsCurrentIndex;//获取分类词的下标
      }
    },

  methods:{
    // 点击分类列表获取商品列表,且关键词高亮显示
    getKeyWord(item,index){
      this.category=item;
      this.$store.dispatch('setGoodsCurrentIndex',index);
        this.key=this.$route.params.categoryTitle;
         this.$axios.get('../../../static/data/商品'+item+1+'.json')
           .then((res)=>{
               this.products=res.data.data;
               this.$router.push({name:'shop',params:{categoryTitle:item}});
           })
           .catch((err)=>{
             console.log("商品加载失败",err);
             this.products=[];//请求失败，内容清空
             this.$router.push({name:'shop',params:{categoryTitle:item}});
             this.$toast({
              message:"暂无商品",
              iconClass:'iconfont icon-plant-18'
            })
          });
    },
    // 加载更多
     load () {
       this.loading = true
        setTimeout(() => {
        this.page +=1;
         console.log(this.page);
        this.$axios.get('../../../static/data/商品'+this.key+this.page+'.json')
       .then((res)=>{
         this.products=this.products.concat(res.data.data);
           })
       console.log(this.products);
        this.loading = false
        }, 2000)

      },

  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
     vm.getKeyWord(to.params.categoryTitle);
    })
  },
  beforeRouteUpdate(to,from,next){
    this.getKeyWord(to.params.categoryTitle,this.goodsCurrtentIndex);
    next();
  },
  created(){
    this.$axios.get('../../../static/data/商品分类.json')
    .then((res)=>{
      this.goods=res.data.data;
      this.geta=this.goods;
      this.geta.forEach((item,index)=>{
        Vue.set(item,'value',item.catName);//要引入vue模块
        JSON.stringify(item);
      });
    })
    .catch((err)=>{
      console.log("商品分类加载失败",err);
    });


    }

};
</script>

<style lang="css" scoped>
.search{
      padding-left: 30px;
}
/*.loading,.noMore{
  margin: 300px aoto;
}*/

.mint_button{
  position: relative;
  left: 50%;
  margin-left: -45px;
 /*margin-left:calc(50%-45px);*/
 /*calc()函数用于动态计算长度值*/
}

.category_left{
    width: 20%;
    height: 88%;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 40px;
    z-index:2002;
    overflow: scroll;

}
.category_right{
    width: 80%;
    height: 80%;
    margin-top: 83px;
    /*定位是为了滚动条不在滑出顶部栏组件上面*/
    position: absolute;
    top: 0;
    right: 0;
    overflow: scroll;
    z-index:2002;
}

.category_left ul li{
    width: 100%;
    height: 50px;
    float: left;
    background: #f3f4f6;
}
.category_left ul li a{
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    font-size: 12px;
    font-family: inherit;
}
.category_left ul li a:hover,.active{
  background-color: #b3d8ff;
  color: #fff;
  font-size: 14px;
}


.category_right li{
    float: left;
    width: 47%;
    text-align: center;
    margin: 0 0 5px 5px;
    border-radius: 5px;
    background-color: #f3f4f6;
}
</style>
