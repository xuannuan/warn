import Vue from 'vue'
let obj={}


//保存商品
obj.saveGoods=function(goodsList){
  window.localStorage.setItem('goodsList',JSON.stringify(goodsList));
}

// 获取商品
obj.getGoodsList=function(){
  return JSON.parse(window.localStorage.getItem('goodsList')||'{}');

 }

 //因为属性+i，所以需要全局变量i,进行增删操作是获取最后的i
 //但是不能用全局变量，获取的i到后面不准确
// let goodsList=obj.getGoodsList();
// let k=Object.keys(goodsList);//获取对象的所有属性组成数组
// let i=k.length/6-1;因为一次循环有6个不同的对象属性，为虚拟数组的长度


//添加商品
// goods参数是一个对象，{加入购物车商品id，商品数量}
 obj.addGoods=function(goods){
  let goodsList=this.getGoodsList();
  let k=Object.keys(goodsList);//获取对象的所有属性组成数组
  let i=k.length/6-1;
   i++; //不是刷新后从0开始，从数组长度-1开始

   //2,因为obj是一个对象，不是一个数组,所以要不同的属性名才可以存进去，
    // if(goods.num!=0){因为在数量为0不进入小球动漫触发后，即不调用添加方法
    // goodsList['id'+i]=goods.id;
     Vue.set(goodsList,'id'+i,goods.id);
    Vue.set(goodsList,'title'+i,goods.title);
    Vue.set(goodsList,'price'+i,goods.price);
    Vue.set(goodsList,'img'+i,goods.img);
    Vue.set(goodsList,'num'+i,goods.num);
    Vue.set(goodsList,'category'+i,goods.category);
    // 保存一下
    this.saveGoods(goodsList);
}


//删除商品，删除对象属性
obj.deleteGoods=function(index){
  let goodsList=this.getGoodsList();
  let k=Object.keys(goodsList);//获取对象的所有属性组成数组
  let i=k.length/6-1;
   // 删除对象属性，且不占位置Vue.delete(obj,key);
   //删除相应的商品数据，而不是删除标签节点，可以存储
  Vue.delete(goodsList,'id'+index);
  Vue.delete(goodsList,'title'+index);
  Vue.delete(goodsList,'price'+index);
  Vue.delete(goodsList,'img'+index);
  Vue.delete(goodsList,'num'+index);
  Vue.delete(goodsList,'category'+index);

  // 删了index的数据后，后面的i要往前自动改变，
  // 不然在car.vue中无法遍历获取数据
  for(let j=index;j<i;j++){
    //想过设置删除的那些属性，(对象，属性，属性值)
    // Vue.set(goodsList,'id'+j,goodsList['id'+(j+1)]);
    //直接用后面覆盖前面的方法，认真分析过j<i还是j<i-1,
    // i-1不行,这样就只可获取长度-2，不可，只能再删除最后一个元素
    goodsList['id'+j]=goodsList['id'+(j+1)]
    goodsList['title'+j]=goodsList['title'+(j+1)]
    goodsList['img'+j]=goodsList['img'+(j+1)]
    goodsList['num'+j]=goodsList['num'+(j+1)]
    goodsList['price'+j]=goodsList['price'+(j+1)]
    goodsList['category'+j]=goodsList['category'+(j+1)]
  }
  // 再删除最后一个元素
  Vue.delete(goodsList,'id'+i);
  Vue.delete(goodsList,'title'+i);
  Vue.delete(goodsList,'price'+i);
  Vue.delete(goodsList,'img'+i);
  Vue.delete(goodsList,'num'+i);
  Vue.delete(goodsList,'category'+i);
  //存储改变
  // console.log("删除后的数组长度"+i);
  this.saveGoods(goodsList);
}

//修改加入购物车的商品,传入对象要修改的属性和值
obj.updataGoods=function(key,value){
  let goodsList=this.getGoodsList();
  goodsList[key]=value;
  // console.log(key,value);
  this.saveGoods(goodsList);
}


//获取购物车的总数量
obj.getTotalCount=function(){
  let sum=0;
  let goodsList=this.getGoodsList();
  let k=Object.keys(goodsList);//获取对象的所有属性组成数组
  let i=k.length/6-1;
  // 因为i此时已经是长度-1
  for(let j=0;j<=i;j++){
    let values=goodsList['num'+j];
    sum+=values;
  }
  return sum;
}




//抛出去obj对象
export default obj;

//在GoodsDetail.vue中的购入购物车事件中，
//调用js添加到购物车页面的数据，保存到本地数据方法
       // id:this.goods.item.itemId,
       // GoodsTool.addGoods({
       //  title:this.goods.item.title,
       //  price:this.goods.item.priceRange,
       //  id:this.$route.query.id,
       //  num:parseInt(parseInt(this.num)),//因为number类型的input返回值是string
       //  img:this.changeUrl,//更新的图片
       //  category:this.changeTitle//更新的名字
       // });
