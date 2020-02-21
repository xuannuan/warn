<template>
  <div class="car">
    <el-checkbox-group v-model="example" @change="handleCheckedChange">
    <el-checkbox v-for="i in all" :label="i" :key="i">
     <div class="goods_con" ref="cbox"  >
      <!-- 比那里常数，但i从1开始 -->
        <!-- <div class="checkbox"></div> -->
        <div class="con_box">
            <img :src="products['img'+i]" alt="">
            <div class="small_box">
            <a href="#">{{products['title'+i]}}&nbsp;{{products['category'+i]}}</a>
            <h6> ¥{{products['price'+i]}}</h6>
                <div class="changebox">
                     <button class="left" @click="jian(i)">-</button>
                    <input type="number" v-model="products['num'+i]"/>
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
      合计:<span style="color:#ef4f4f">￥{{money}}</span>
       <el-button type="warning" round>结算（{{Count}}）</el-button>
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
import GoodsTool from '@/router/GoodsTool'
export default {

  name: 'Car',

  data () {
    return {
      num:'',
      products:{},//是一个对象
      example:[],
      all:[],
      length:'',
      checkAll: false,
      show:false,//弹出框隐藏
      index:'',//获取第几个垃圾桶，点击删除第几个商品的数据
      dele:[],
      Count:0,//选中商品的数量，用在单选操作和统计商品数量
      money:0,

    }
  },
  methods:{
    //对于全选的复选框
     handleCheckAllChange(val) {
        this.example = val ? this.all : [];
      },
      //对于单选的复选框
      handleCheckedChange(value) {
        // console.log(value);//选中复选框的值组成数组[0, 1,]
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
      // 确定删除元素结点
      com(){
        // 使弹出框隐藏
        this.show=false;
        // 使触发的那一个垃圾桶盖复原
        this.dele[this.index]=false;
            // 删除商品数据存储，进行删除商品
        GoodsTool.deleteGoods(this.index);
      },
      //添加商品
      jian(index){
        if(this.products['num'+index]>1){
          this.products['num'+index]--;
          // 组件bus传值给App.vue组件的购物车数量，
          // this.$bus.$emit('sendPickNum',-1);//只能针对于点击改变数量即时传给购物车的小球,当进行输入数量，就无法获取插值进行正确的数量相加
          GoodsTool.updataGoods('num'+index,this.products['num'+index]);//传入到本地存储

        }
      },
      add(index){
        this.products['num'+index]++;
        // this.$bus.$emit('sendPickNum',1);
        let key='num'+index;
        let value= this.products['num'+index];
        GoodsTool.updataGoods(key,value);
      }

  },
  watch:{
    //监视复选框的选中状态,对于单选的
    example:function(newc,oldc){
      // console.log(newc,oldc);
      if(newc.length>oldc.length){//选中新的商品

        let i=newc[newc.length-1];//选中就会插入到value数组最后一个
        this.money+=this.products['price'+i]*this.products['num'+i];//结算勾选的商品总价
        this.Count+=this.products['num'+i];//加上勾选的总商品数
      }
      else{//取消选中的商品

       let i=oldc[oldc.length-1];//减去旧的选中序列的最后一个，即取消的商品
         if(this.money>0||this.Count>0){
          this.money-=this.products['price'+i]*this.products['num'+i];//减去取消勾中的商品价格
          this.Count-=this.products['num'+i];//减去取消勾中的商品数量
        }
      }
    },
    checkAll:function(newed,olded){
      console.log(newed,olded);
      if(newed==true){//全选的状态
        for(let i=0;i<this.length;i++){
          this.money+=this.products['price'+i]*this.products['num'+i];//结算勾选的商品总价
          this.Count+=this.products['num'+i];
        }
      }
      else{//全部选的状态
        this.money=0;
        this.Count=0;
      }
    }
  },
  created(){
    let goodsList=GoodsTool.getGoodsList();
    // console.log(goodsList);
    this.products=goodsList;
    let keys=Object.keys(goodsList);//获取对象的所有属性 
    this.length=keys.length/6;//获取虚拟的数组长度，即最后i的值
    //all数组是进行全选操作的数组控制，dele数组时进行单个翻盖动画效果的控制
    for(let i=0;i<this.length;i++){
      this.all.push(i);
      this.dele.push(false);//创建数组元素，是所有的垃圾盖动画类fan先隐藏，当点击时，才触发单个
    }
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
    padding-left: 90px;
}
.goods_con .con_box .small_box a{
    font-size: 13px;
    display: block;
    overflow: hidden;
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
    bottom: 53px;
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
