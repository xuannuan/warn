<template>
  <div class="message">
    <TopUser :titles="titles"/>
     <div class="bg">
      <el-upload
       class="avatar-uploader img"
       action="https://jsonplaceholder.typicode.com/posts/"
       :show-file-list="false"
       :on-success="handleAvatarSuccess"
       :before-upload="beforeAvatarUpload">
         <em class="el-icon-edit"></em>
        <img v-if="userMessage.logintip==1" :src="userMessage.img" class="avatar">
       </el-avatar>
       <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    </div>

    <!-- 提交表单 -->
   <el-form ref="sizeForm" :model="sizeForm" label-width="80px" size="medium">
    <el-form-item label="昵称">
    <el-input v-model="sizeForm.name" maxlength="8"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-radio-group v-model="sizeForm.radio">
    <el-radio :label="1">男生</el-radio>
    <el-radio :label="2">女生</el-radio>
    <el-radio :label="3">保密</el-radio>
  </el-radio-group>
  </el-form-item>
   <el-form-item label="破蛋日" >
      <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date" style="width: 100%;"
     required
      ></el-date-picker>
       <!-- -->
    </el-form-item>
    <el-form-item label="星座">
      <!-- 可搜索的selected -->
    <el-select filterable v-model="sizeForm.star">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="兴趣">
    <el-input v-model="sizeForm.interest"></el-input>
  </el-form-item>
  <el-form-item label="职业">
    <el-input v-model="sizeForm.work"></el-input>
  </el-form-item>
  <el-form-item label="关于自己">
    <el-input
  type="textarea"
  maxlength="50"
  :autosize="{ minRows: 2, maxRows: 4}"
  placeholder="一句话介绍一下你自己？"
  v-model="sizeForm.myself">
</el-input>
  </el-form-item>
  <el-button type="primary" @click="submitForm('sizeForm')" style="width: 40%;margin: 10px 30%;color: #FFF;
    background-color: #8cc5ff;font-size: 16px;
    border-color: #8cc5ff">保存</el-button>
</el-form>

  </div>
</template>

<script>
var starlist=[{value: '1',label: '水瓶座'}, {value: '2',label: '双鱼座'}, {value: '3',label: '白羊座'}, {value: '4',label: '金牛座'}, {value: '5',label: '双子座'},{value: '6',label: '巨蟹座'},{value: '7',label: '狮子座'},{value: '8',label: '处女座'},{value: '9',label: '天秤座'},{value: '10',label: '天蝎座'},{value: '11',label: '射手座'},{value: '12',label: '摩羯座'}];
import {mapState} from 'vuex'
import UserTool from '@/router/UserTool'
export default {

  name: 'Message',

  data () {
    return {
       options: starlist,
        value: '',
      sizeForm:{
        name:'',
        radio:'',//1,2,3
        date:'',
        star:'',
        interest:'',
        work:'',
        myself:''
      },
      //组件传值到顶部栏面包屑效果，同时点击完成页面跳转
      titles:[
      {name:'我的',routeName:{path:'/mine'}},
      {name:'设置',routeName:{path:'/install'}},
      {name:'个人资料',routeName:{path:'/install/message'}}]

    }
  },
   computed:mapState([
      'userMessage',
    ]),
   created(){
    this.sizeForm=this.userMessage;

   },

  methods:{
    //从本地上传图片当头像,url格式从blob：http的格式换成Base64
    getBase64(file) {
     return new Promise(function(resolve, reject) { let reader = new FileReader();
      let imgResult = "";
      reader.readAsDataURL(file);
       reader.onload = function() {
        imgResult = reader.result;
      };
       reader.onerror = function(error) {
        reject(error);
      };
       reader.onloadend = function() {
        resolve(imgResult);
      };
    });
   },
      handleAvatarSuccess(res, file) {
      this.getBase64(file.raw).then(res => {
      this.userMessage.img = res;
      // console.log(this.userMessage.img);
      });
      // this.userMessage.img = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      p(s) {
        //对于转变时间日期，2010-01-03
      return s < 10 ? '0' + s : s
      },
      // 提交表单
      submitForm(){
        //Mon Feb 03 2020 00:00:00 GMT+0800 (中国标准时间) 转换成 2020-02-03,插入到数据库
        const d = new Date(this.sizeForm.date);
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate());
        // const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds());
        console.log(resDate);
        let obj={
          tele:UserTool.getUser().userTele,
          name:this.sizeForm.name,
          sex:this.sizeForm.radio,
          birthday:resDate,//yyyy-MM-DD格式(date)
          star:this.sizeForm.star,
          interest:this.sizeForm.interest,
          work:this.sizeForm.work,
          myself:this.sizeForm.myself,
          img:this.userMessage.img
         };
         console.log(obj);
         this.$axios.post('/api/updateUser.php',obj)
         .then(res=>{
            console.log(res.data);
            if(res.data.status==1){//修改成功
              //更新信息到sessionStorage,然后更新到vuex
              //方法一：请求PHP连接到数据库进行查询
            // this.$axios.post('/api/checkUser.php',{
              //   Name:this.sizeForm.name,//用修改过后的值
              //   userPwd:this.userMessage.password
              // })
              // 方法二：获取之前vuex仓库的数据和修改的数据修改到本地存储
            UserTool.addUser({
              tele:this.userMessage.tele,
              password:this.userMessage.password,
              id:this.userMessage.id,
              img:this.userMessage.img,
              logintip:this.userMessage.logintip,//登录提示，成功=1.否则=0
              name:this.sizeForm.name,
              sex:this.sizeForm.radio,
              birthday:this.sizeForm.date,
              star:this.sizeForm.star,
              interest:this.sizeForm.interest,
              work:this.sizeForm.work,
              myself:this.sizeForm.myself
            });

            this.$notify({//提示修改成功
            message: '修改成功',
            type: 'success',
            });

            }
            else{
               // 如果日期没写，就是NaN-NaN-NaN，就插入date到数据库失败，时间日期严格要求
            this.$notify({
            message: '记得写上破蛋日那一天鸭~',
            type: 'warning',
            });

            }
         })
         .catch(err=>{
          console.log('获取个人信息失败')
         })
       }
     }//methods
};//export
</script>

<style lang="css" scoped>


.bg{
  width: 100%;
  height:150px;
  background-color: #cccccc47;
  position: relative;
}
.bg .img{
  width: 100px;height: 100px;
  margin: 0px auto;
  padding-top: 25px;
}
/*小图标*/
.bg em{
  position: absolute;
    top: 0;
    left: 0;
    font-size: 15px;
}
/*保存按钮*/
.save{
  width: 40%;margin: 10px 30%;color: #FFF;
    background-color: #8cc5ff;font-size: 16px;
    border-color: #8cc5ff;
}

</style>
