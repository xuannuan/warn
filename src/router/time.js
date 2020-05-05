import Vue from "vue"
import Axios from 'axios'
import store from '@/store'
// 配置axios,每一个文件对axios发起请求，要挂载到vue实例化对象上
Vue.prototype.$axios=Axios


let time={};

//php取出来的是一个个对象，需要转换成对象数组
//缺点：对于只有一条数据，无法进行转换
time.ToArray=function(objs){
      let note=[];
      let a=objs.split('}');//将多个对象转化为数组
      let l=a.join('}},');//将数组转换为字符串
      let b=l.split('},');//再将字符串转换为标准的数组对象
      b.pop();//多出了一个空元素，删除
      b.forEach(item=>{
      if(JSON.parse(item)){
         note.push(JSON.parse(item));//将每个元素的json格式转换为对象
      }

      });
      return note;
    }


//用于笔记的封面列表，获取单张图片作为封面
time.hasImgs=function(objs){
    //将多个对象转化为数组
     let note=this.ToArray(objs);
       //处理图片格式，有的是一张，有的是多张
       let note_img=[];
       note.forEach(item=>{
        let reg=/[-]{3}/;
        if(reg.test(item.img)){
          let k=item.img.split("---");//对应public.vue里pics转成字符串的方式，把字符串转回一组图片数组
          note_img.push(k[0]);
        }else{
          note_img.push(item.img);//用一个数组吧所有封面图片装起来
        }
       })
        return note_img;
}

//提取公共的删除和修改加入购物车商品的PHP连接操作(car.vue)
time.updateGoods=function(cz,id,c){
        Vue.prototype.$axios.post('/api/updateGoods.php',{
          caozuo:cz,
          goods_id:id,
          category:c
        })
        .then(res=>{
          console.log(res.data);
        })
        .catch(err=>{
          console.log(err);
        })
  }



//对于购物车小图标的小球里面的数量(fixcar.vue和goodsdetail.vue)
time.getGoodsNum=function(telephone){
     let products=[];
     var num=0;
     // this.$axios这里的this错误
    Vue.prototype.$axios.post('/api/checkGoods.php',
      {tele:telephone})
    .then(res=>{
      if(res.data instanceof Object){
        products=res.data;
        num=parseInt(products.num);
      }
      else{
        products=this.ToArray(res.data);
        products.forEach((item,index)=>{
          num+=parseInt(item.num);
        })
      }
    //当页面进行刷新会清空，要想商品数量保留则调用action(vuex)获取总数量重新赋值
    // 同样，this.$store的this也错误，正确的是store
      store.dispatch('changeGoodsNum',num);
      })
    .catch(err=>{
      console.log(err);
    })
}

time.updateStar=function(noteId,caoZuo,ad){
   //提取共同连接PHP，点赞与收藏数+或-1(photosdetail.vue)
       Vue.prototype.$axios.post('/api/updateNoteLike.php',{
        note_id:noteId,
        caozuo:caoZuo,
        AD:ad
      })
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log("修改点赞数失败",err);
      })
}

//提取公共的删除和修改商品的PHP连接操作(goodsdetail.vue)
      time.updateShop=function(cz,id,number){
        Vue.prototype.$axios.post('/api/deleteGoods.php',{
          caozuo:cz,
          goods_id:id,
          num:number
        })
        .then(res=>{
          console.log(res.data);
        })
        .catch(err=>{
          console.log(err);
        })
      }


time.geto=function(num){
    return num<0?'0'+num:num;
}
// 转换时间格式符合数据库datetime格式，用momentjs.cn库代替了
time.changeTime=function(){
   const date=new Date();
   const ymd=date.getFullYear()+'-'+this.geto(date.getMonth()+1)+'-'+this.geto(date.getDate());
   const time=this.geto(date.getHours())+':'+this.geto(date.getMinutes())+':'+this.geto(date.getSeconds());
   return ymd.concat('-',time);
}

//抛出去obj对象
export default time;
