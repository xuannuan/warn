<template>
  <div class="car_shop">
    <el-checkbox-group v-model="example" @change="handleCheckedChange">
    <el-checkbox v-for="i in all" :label="i" :key="i">
     <div class="goods_con" ref="cbox"  >
      <!-- 比那里常数，但i从1开始 -->
        <div class="con_box">
          <router-link :to="{name:'goods.detail',query:{id:products.goods_id||products[i].goods_id}}">
            <img :src="products.img||products[i].img" alt="">
          </router-link>
            <div class="small_box">
            <h5 href="#">{{products.title||products[i].title}}&nbsp;{{products.category||products[i].category}}</h5>
            <h4> ¥{{products.price||products[i].price}}</h4>
                <div class="changebox">
                     <button class="left" @click="jian(i)">-</button>
                     <!-- 要监视加减数量，改变结算的价格和商品数量 -->
                    <input type="number" v-model="products.num||products[i].num"/>
                    <button class="right" @click="add(i)">+</button>
                </div>

                <div class="delete"  @click="open(i)">
                    <div :class="{delete_top:true,fan:dele[i]}"></div>
                    <!-- fan的类给垃圾盖添加动画效果,给show加上数组，不然所有的商品共用一个show的话，就会所有都有翻盖 -->
                    <div class="delete_bot"></div>
                </div>

            </div>
        </div>
    </div>
</el-checkbox>
  </el-checkbox-group>
    <footer>
       <el-checkbox  v-model="checkAll" @change="handleCheckAllChange">&nbsp;&nbsp;&nbsp;&nbsp;全选</el-checkbox>

    <div class="ToSum">
      合计:<span style="color:#ef4f4f">￥{{payment.total}}</span>
       <el-button type="warning" round @click="going">结算（{{payment.count}}）</el-button>
    </div>

</footer>
 <!--弹出框-->
    <div class="bg_box" v-if="show">
    <div class="alert_box jump">
        <div class="tex">
            确认删除该宝贝吗？
        </div>
          <button class="cancel" @click="cancel">取消</button>
          <button class="sure" @click="com">确定</button>
    </div>
    </div>
  </div>
</template>

<script>
import Time from '@/router/time'
export default {

  name: 'Car',

  data () {
    return {
      num:'',
      products:[],
      example:[],
      all:[],
      checkAll: false,
      show:false,//弹出框隐藏
      index:'',//获取第几个垃圾桶，点击删除第几个商品的数据
      dele:[],
      isSelected:[],//选中的数组
    }
  },
  methods:{
    //对于全选的复选框
     handleCheckAllChange(val) {
      // console.log(val);//boolean
      //如果true，即为全选，则全选数组为all
      if(val==true){
        this.isSelected=this.all;
      }
      else{
        this.isSelected=[];
      }
      this.example = val ? this.all : [];

      },
      //对于单选的复选框
      handleCheckedChange(value) {
        this.isSelected=value;//选中复选框的值组成数组[0, 1,]
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.all.length;
      },
      // 刪除,点击垃圾桶
      open(i){
        this.show=true;//弹出框出现
        this.index=i;//赋值第几个垃圾桶，点击删除第几个商品的数据
         this.dele[i]=true;//触发正在点击的垃圾盖
      },
      cancel(){
        // 使弹出框隐藏
        this.show=false;
        // 使触发的那一个垃圾桶盖复原
        this.dele[this.index]=false;
        this.$toast({
          message:'取消删除',
          iconClass:'iconfont icon-plant-1'
        })
      },
      //提取公共的删除和修改商品的PHP连接操作
      commen(cz,id){
        this.$axios.post('/api/deleteGoods.php',{
          caozuo:cz,
          goods_id:id
        })
        .then(res=>{
          console.log(res.data);
        })
        .catch(err=>{
          console.log(err);
        })
      },
      // 确定删除元素结点，应该以哪一个元素作为标志进行删除？
      com(){
        // 使弹出框隐藏
        this.show=false;
        // 使触发的那一个垃圾桶盖复原
        this.dele[this.index]=false;
        // 删除商品数据存储，进行删除商品
        // GoodsTool.deleteGoods(this.index);
        let goods_id=this.products.goods_id?this.products.goods_id:this.products[this.index].goods_id;
        this.commen("delete",goods_id);
        //删除元素，因为v-model绑定的是all,所以要改变数组all，
         this.all.splice(this.index,1);
      },
      //添加商品
      jian(index){
        //因为数据处理不好，所以有一条数据与多条数据
        let cnum=this.products.num?this.products.num:this.products[index].num;
        let goods_id=this.products.goods_id?this.products.goods_id:this.products[index].goods_id;
        if(cnum>1){
          // vuex传值给App.vue组件的购物车数量，
          this.$store.dispatch('addGoodsNum',-1);
          this.commen("jian",goods_id);
          this.getGoods();//修改后的数据显示，双向数据绑定
        }
      },
      add(index){
        //let作用在该块级作用域内
        let goods_id=this.products.goods_id?this.products.goods_id:this.products[index].goods_id;
        this.$store.dispatch('addGoodsNum',1);
        this.commen("add",goods_id);
        this.getGoods();
      },
      //提交后触发的
       going() {
        this.$notify.info({
          title: '(＞人＜；)',
          message: '目前无商家入驻，请敬请期待',
          offset: 300//提示框偏移
        });
      },
      //获取加入购物车的商品，公共类
   getGoods(){
    this.$axios.get('/api/checkGoods.php')
    .then(res=>{
      if(res.data instanceof Object){
        this.products=res.data;
      }
      else{
      this.products=Time.ToArray(res.data);
      }

    })
    .catch(err=>{
      console.log(err);
    })
      }
  },//methods
  // 对加减商品进行结算监控，获取和设置值
  computed:{
    payment(){
      //computed默认getter方法
        let total=0;//商品总价
        let count=0;//商品总数
        this.all.forEach((item,index)=>{
          // 如果选中，则在选中数组中
          if(this.isSelected.indexOf(item)!=-1){
           let num=this.products.num?this.products.num:this.products[index].num;
           let price=this.products.price?this.products.price:this.products[index].price;
              count+=num;
              total+=price*num;
          }
        });
      return{
        total,count//在组件中用payment.total调用
      }
    }

  },

  created(){
    // this.getGoods();
    this.$axios.get('/api/checkGoods.php')
    .then(res=>{
      if(res.data instanceof Object){
        this.products=res.data;
        this.products.length=1;//对象没有长度，对后面的all数组undefined,所以要赋值
      }
      else{
      this.products=Time.ToArray(res.data);
      }
        //all数组是进行全选操作的数组控制，dele数组时进行单个翻盖动画效果的控制(axios是异步请求，会在create其他事件操作完才执行，所以依赖这个就要放在执行体里面)
    for(let i=0;i<this.products.length;i++){
      this.all.push(i);
      this.dele.push(false);//创建数组元素，是所有的垃圾盖动画类fan先隐藏，当点击时，才触发单个
      // 对于加减操作的立即实现
    }
    })
    .catch(err=>{
      console.log(err);
    })
  }

};
</script>

<style lang="css" scoped>


.ToSum{
  float:right;
  line-height: 60px;
}
.ToSum button{
  height: 100%;
}

/*覆蓋bootstrap的label的下邊距*/
label{
  margin-bottom:0rem;
}
.goods_con{
    position: relative;
    margin-top: 10px;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 10px;
    overflow: hidden;
    /*清除浮动，撑高盒子*/
}

.goods_con .con_box{
    height: 83px;
    width: 100%;
    white-space: pre-line;
    /*换行*/
}
.goods_con .con_box img{
    float: left;
    height: 80px;
    width: 80px;
    display: block;
}
.goods_con .con_box .small_box{
    padding-left: 80px;
    padding-right: 10px;
}



.changebox button,.changebox input{
    text-align: center;
    width: 30px;
    height: 24px;
    border: 1px solid #e5e5e5;
    float: left;
}

.delete{
    margin-right: 10px;
    float: right;

}
.delete_top{
    background: url(../../../static/img/delete_up.png) no-repeat;
    width: 20px;
    height: 5px;
    background-size: 20px 5px;
    margin-left: -1px;
}
.delete_bot{
    background: url(../../../static/img/delete_down.png) no-repeat;
    width: 18px;
    height: 18px;
    background-size: 18px 18px;
    margin-top: -3px;
}

footer{
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 44px;
    left: 0;
    background-color: #fff;
    z-index: 1001;
    /*border-top: 1px solid #ccc;*/

}
/*对于全选*/
footer .el-checkbox{
  line-height: 60px;
}

/*弹出框背景*/
.bg_box{
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: 1002;
  /*因为底边栏的z-index是1001*/
    background: rgba(0,0,0,0.1);
}
/*弹出框*/
.alert_box{
    margin: 200px auto;
    background: #fff;
    width: 65%;
    overflow: hidden;
    /*清楚两个按钮的浮动*/
}
.alert_box .tex{
    height: 80px;
    line-height: 80px;
    font-size: 16px;
    color: #aaa;
    text-align: center;
    width: 100%;

}

.alert_box .cancel{
    width: 40%;
    float: left;
    height: 30px;
    margin: 5% 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
    text-align: center;
    line-height: 30px;

}
.alert_box .sure{
    width: 40%;
    float: right;
    height: 30px;
    margin: 5% 10px;
    background: #d8505c;
    border-radius: 4px;
    text-align: center;
    line-height: 30px;
}

@-webkit-keyframes jump {
    0%{
        opacity: 0;
        transform: translateY(-2000px);
        -webkit-transform: translateY(-2000px);
    }
    50%{
        opacity: 0.5;
        transform: translateY(30px);
        -webkit-transform: translateY(30px);
    }
    75%{
        opacity: 0.8;
        transform: translateY(-20px);
        -webkit-transform: translateY(-20px);
    }
    100%{
        opacity: 1;
        transform: translateY(10px);
        -webkit-transform: translateY(10px);
    }
}
.jump{
    animation: jump 0.5s ease 0s;

}
/*给垃圾桶翻盖动画*/
.fan{
  animation: fan 0.5s ease 0s;
  transform: translateX(5px) rotate(30deg);
}
</style>
