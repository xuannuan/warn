<template>
  <div class="message">
    <div class="top">
    <h2>个人资料</h2>
    <span @click="onSubmit">保存</span>
    </div>

    <!-- 提交表单 -->
   <el-form ref="form" :model="sizeForm" label-width="80px" size="medium">
  <el-form-item label="性别">
    <el-radio-group v-model="sizeForm.radio">
    <el-radio :label="1">男生</el-radio>
    <el-radio :label="2">女生</el-radio>
    <el-radio :label="3">保密</el-radio>
  </el-radio-group>
  </el-form-item>
   <el-form-item label="破蛋日">
      <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date" style="width: 100%;"></el-date-picker>
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
</el-form>

  </div>
</template>

<script>
var starlist=[{value: '1',label: '水瓶座'}, {value: '2',label: '双鱼座'}, {value: '3',label: '白羊座'}, {value: '4',label: '金牛座'}, {value: '5',label: '双子座'},{value: '6',label: '巨蟹座'},{value: '7',label: '狮子座'},{value: '8',label: '处女座'},{value: '9',label: '天秤座'},{value: '10',label: '天蝎座'},{value: '11',label: '射手座'},{value: '12',label: '摩羯座'}];
import {mapState} from 'vuex'
export default {

  name: 'Message',

  data () {
    return {
       options: starlist,
        value: '',
      sizeForm:{
        radio:'',//1,2,3
        date:'',
        star:'',
        interest:'',
        work:'',
        myself:''
      }
    }
  },
   computed:mapState([
      'userMessage',
    ]),

  methods:{


      p(s) {

      return s < 10 ? '0' + s : s

    },

      // 提交表单
      onSubmit(){

        //Mon Feb 03 2020 00:00:00 GMT+0800 (中国标准时间) 转换成 2020-02-03,插入到数据库
        const d = new Date(this.sizeForm.date);
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate());
        // const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds());
        console.log(resDate);

        let obj={
          tele:this.userMessage.tele,
          sex:this.sizeForm.radio,
          birthday:resDate,//yyyy-MM-DD格式(date)
          star:this.sizeForm.star,
          interest:this.sizeForm.interest,
          work:this.sizeForm.work,
          myself:this.sizeForm.myself
         };
         console.log(obj);
         this.$axios.post('/api/insertUserMessage.php',obj)
         .then(res=>{
            console.log(res.data);
         })
         .catch(err=>{
          console.log('获取个人信息失败')
         })
      }

  },
   created(){
  }
};
</script>

<style lang="css" scoped>

.message{
  width: 100%;
}
.top{
  background-color: #fff;
  position: relative;
  line-height: 40px;
  font-size: 18px;
}
.top h2{
  text-align: center;
}
.top span{
  color: #8cc5ff;
  position: absolute;
  right: 5px;
  top: -1px;
  font-size: 18px;
  padding-right: 10px;
}
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

.exit{
  margin: 10px 35%;
}
</style>
