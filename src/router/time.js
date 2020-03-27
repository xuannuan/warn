import Vue from "vue"
let time={};

// time.geto=function(num){
//     return num<0?'0'+num:num;
// }
//转换时间格式符合数据库datetime格式，用momentjs.cn库代替了
// time.changeTime=function(){
//    const date=new Date();
//    const ymd=date.getFullYear()+'-'+this.geto(date.getMonth()+1)+'-'+this.geto(date.getDate());
//    const time=this.geto(date.getHours())+':'+this.geto(date.getMinutes())+':'+this.geto(date.getSeconds());
//    return ymd.concat('-',time);
// }

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


//抛出去obj对象
export default time;
