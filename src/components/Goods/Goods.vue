<template>
  <div class="goods">
 <TopBar :title="category" class="fix" />
 <div class="category">
    <div class="category_left">
        <div class="category_left_box">
            <ul>
                <li v-for="(item,index) in goods" :key="index">
                  <a href="javascript:void(0);" @click="getKeyWord(item.catName)" >{{item.catName}}</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="category_right">
          <div class="r_product">
            <!-- 底部上拉加载更多 -->
                <ul>
                    <li v-for="(item,index) in products" :key="index">
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
                <!-- 加载更多 -->
                <mt-button @click.native="LoadMore" class="mint_button">
                  <svg class="icon" aria-hidden="true" style="width: 30px;height: 40px" slot="icon">
                    <use xlink:href='#icon-plant-4'></use>
                </svg>
                More
                </mt-button>
            </div>
    </div>
</div>
</div>
</template>

<script>
export default {

  name: 'Goods',

  data () {
    return {
      goods:[],
      products:[],
      category:'',//组件传值
      key:'',
      page:'',
      allLoaded:false
    }
  },
  methods:{

    // 点击分类列表获取商品列表
    getKeyWord(item){
      this.category=item;
      //动态路由匹配
      this.$router.push({name:'goods.list',params:{categoryTitle:item,page:1}});//当点击分类时路由会切换
      this.$axios.get('../../../static/data/商品'+item+this.page+'.json')
      //'http://api01.6bqb.com/taobao/search?apikey=5F3779A028E404694FC192684E80B7C3&keyword='+item+'&page=${this.page}'
      .then((res)=>{
        if(this.page==1){
          this.products=res.data.data;
        }else{
          //把第二页之后的内容拼接进去
          this.products=this.products.concat(res.data.data);
        }
      })
      .catch((err)=>{
        console.log("商品加载失败",err);
        this.$toast({
          message:"暂无商品",
          iconClass:'iconfont icon-plant-18'
        })
      })
    },
    // 上拉加载更多
    LoadMore(){
      this.key=this.$route.params.categoryTitle;
      this.page=this.$route.params.page;
      this.page++;//从当前路由的page数增
      this.getKeyWord(this.key);//调用上述方法请求第二页的数据，因为有关键字，所以只能这样

       //动态路由匹配，再次改变路由
      this.$router.push({name:'goods.list',params:{categoryTitle:this.key,page:this.page}});
    }
  },
  created(){

    this.$axios.get('../../../static/data/商品分类.json')
    .then((res)=>{
      this.goods=res.data.data;
    })
    .catch((err)=>{
      console.log("商品分类加载失败",err);
    });


    //当点击分类时路由会切换内容(失败的经验，更在意逻辑思考)
    this.key=this.$route.params.categoryTitle;
    this.page=this.$route.params.page;//作用1：把路由的page参数传进去更改对应的内容
    // 作用2：给getKeyWord(item)传进去第一个page=1，不能再方法里面写，因为在加载第二页会调用，防止不被覆盖
    // 默认商品第一页
     this.$axios.get('../../../static/data/商品'+this.key+this.page+'.json')
      //'http://api01.6bqb.com/taobao/search?apikey=5F3779A028E404694FC192684E80B7C3&keyword='+item+'&page=$(this.page)'
      .then((res)=>{
          this.products=res.data.data;
      })
      .catch((err)=>{
        console.log("商品加载失败",err);
        this.$toast({
          message:"暂无商品",
          iconClass:'iconfont icon-plant-18'
        })
      })
    }

};
</script>

<style lang="css" scoped>
/*铺满屏幕*/
body{
    width: 100%;
    height: 100%;
    position: absolute;
}

.mint_button{
  position: relative;
  left: 50%;
  margin-left: -45px;
 /*margin-left:calc(50%-45px);*/
 /*calc()函数用于动态计算长度值*/
}
.fix{
  position: fixed;
  z-index:1000;
  background-color: #f3f4f6;
  width: 100%;

}

/*商品分类铺满屏幕*/
.category{
    width: 100%;
    height: 100%;
}
.category_left{
    width: 20%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 83px;
    padding-bottom: 54px;
    z-index:999;
}
.category_right{
    width: 100%;
    padding-left: 20%;
    height: 100%;
    padding-top: 43px;
    padding-bottom: 154px;
    /*定位是为了不在滑出顶部栏组件上面*/
    position: absolute;
    top: 40px;
    right: 0;
    overflow: scroll;

}
.category_left_box{
    width: 100%;
    height: 100%;
    overflow: scroll;
}
.category_left_box ul{
    width: 100%;
}
.category_left_box ul li{
    width: 100%;
    height: 50px;
    float: left;
    background: #f3f4f6;
}
.category_left_box ul li a{
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
/*.category_left_box ul .now a{
    background-color: #fff;
    color: darkred;
    border-right: none;
}
.category_right_box{
    padding: 10px 12px;
}*/

.category_right.r_product{
    width: 100%;
}

.category_right .r_product ul{
  /*padding-top: 40px;*/
    width: 100%;

}
.category_right .r_product li{
    float: left;
    width: 47%;
    text-align: center;
    margin: 0 0 5px 5px;
    /*border:1px solid gray;*/
    border-radius: 5px;
    overflow: hidden;
    background-color: #f3f4f6;

}
</style>
