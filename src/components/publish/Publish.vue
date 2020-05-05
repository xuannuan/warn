<template>
  <div class="search">
    <el-form ref="form" :model="form"  :rules="rules">
       <el-form-item prop="name">
         <el-input v-model="form.name" class="title" placeholder="笔记标题(不可为空)"></el-input>
       </el-form-item>
      <el-form-item prop="content">
      <el-input type="textarea" placeholder="正文内容(写写吧~)"  v-model="form.content" >
      </el-input>
    </el-form-item>
    <!-- 上传图片 -->
  <el-form-item>
 <el-upload
  action="#"
  list-type="picture-card"
  :auto-upload="false"
  :on-change="getFile"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
</el-form-item>
<!-- 分类 -->
<el-button type="small" round @click="drawer = true">#笔记分类</el-button>
<ul class="keyword">
  <li v-for="(i,l) in word" :key="l">
    <el-button type="small" round @click="del(l)">#{{i}}</el-button>
  </li>
</ul>
<el-drawer
  title="笔记关键词"
  :visible.sync="drawer"
  direction="rtl"
  :before-close="handleClose">
     <el-checkbox-group v-model="word">
          <el-checkbox v-for="(item,index) in category" :key="index" :label="item.title">
          </el-checkbox>
  </el-checkbox-group>
</el-drawer>
<br>
<el-form-item>
<!-- <hr> -->
<el-button type="primary" class="pub" @click="pub('form')">发布笔记</el-button>
 <el-button @click="resetForm('form')">重置</el-button>
</el-form-item>
</el-form>

  </div>
</template>

<script>
import Moment from 'moment';
import Time from '@/router/time'
import {mapState} from 'vuex'
export default {

  name: 'Search',

  data () {
    return {
      form:{
        name:'',
        content:'',
      },
      rules:{
         name:[
           { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
         ],
         content:[
           { required: true, message: '请输入内容', trigger: 'blur' }
         ]
      },
       drawer: false,//打开分类抽屉
      dialogImageUrl: '',//以下是控制上传图片的
      dialogVisible: false,
      pics:[],
      category:[],//获取笔记分类关键词
      word:[],//获取勾选的关键词
      check:[],//勾选的打钩，控制类的显示隐藏

    }
  },
  computed:mapState([
    'userMessage'
    ]),
   methods: {
    //将上传的图片url的blob格式转换
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
    getFile(file, fileList) {
     this.getBase64(file.raw).then(res => {
      this.dialogImageUrl = res;
      this.pics.push(res);//获取一组上传的图片列表
      // console.log(this.pics);
      });
    },
    //关闭抽屉
     handleClose(done) {
            done();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      del(index){
        this.word.splice(index,1);
      },
      pub(formName){
      this.$refs[formName].validate((valid) => {
      if (valid) {
        let keyword=this.word.join(',');//数组->字符串,存进去数据库
        let picURLs=this.pics.join("---");//用特殊符号进行连接成字符串
        // console.log(picURLs);

        this.$axios.post('/api/insertNote.php',{
          tele:this.userMessage.tele,
          title:this.form.name,
          content:this.form.content,
          img:picURLs,//后面取出来的时候需要转化成数组
          keyword:keyword,
          // date:Time.changeTime()
          date:Moment(new Date()).format('YYYY-MM-DD-HH:mm:ss')//转时间的格式抽象出来
        })
        .then(res=>{
          console.log(res.data);
        })
        .catch(err=>{
          console.log('获取连接PHP错误',err);
        })
        this.$router.push({name:'life',params:{categoryTitle:'最新发布'}})
      }
      else {
            console.log('error submit!!');
            return false;
          }
        });
      },//pub
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },//methods
    created(){
      this.$axios.get('../../../static/data/category.json')
      .then(res=>{
        this.category=res.data.message;
        this.category.forEach((item,index)=>{
          this.check.push(false);//先把check数组全部赋值false，不显示
        })
      })
      .catch(err=>{
        console.log("获取笔记分类关键词失败",err);
      })
    }//created


};//export
</script>

<style lang="css" scoped>
.title{
    height: 30px;
}
.content{
    height: 300px;
}
input,textarea{
  margin: 10px 0;
  width: 100%;
  padding-left: 10px;
  border: none;
  font-size: 16px;
}
.pub{
    margin-left: 25%;
    background-color: #8cc5ff;
    border-color: #8cc5ff;
}
.keyword li{
  float: left;
}



</style>
