<template>
  <div class="search">
      <el-autocomplete
      size="small"
      class="inline-input"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    >
      <el-button slot="append" icon="el-icon-search" ></el-button>
    </el-autocomplete>
  </div>
</template>

<script>
export default {

  name: 'Search',

  data() {
      return {
        restaurants: [],
        state: '',
      };
    },
    props:['geta'],//json格式的对象数组,且对象中必须有value属性

    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.geta;
        //有输入的？有就返回根据输入进行推荐的一行数据，没有就返回全部列表的数据（用到过滤器，调用下面判断关键词匹配的方法）
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      // queryString是自己输入的搜索关键词
      createFilter(queryString) {
        return (restaurant) => {
          //restaurant时进行关键词推荐的json数组，必须要有value值，所有英文单词都变成或小写进行比对，只要关键词在其中，indexof!=-1就可以检测
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !=-1);
        };
      },
      //这个是搜索匹配成功后自定义路由跳转等的方法
      handleSelect(item) {
        //进行路由跳转完成
        if(item.id){//如果有id属性，就是图文分享模块的
          this.$router.push({name:'life',params:{categoryTitle:this.state}});
        // 如果是photolist对象的话，传入现在的id，进行对应分类的高亮效果
        this.$store.dispatch('setLifeCurrentIndex',item.id);
        }
        else if(item.catId){
          this.$router.push({name:'shop',params:{categoryTitle:item.value,page:1}});
          this.$store.dispatch('setGoodsCurrentIndex',item.catId);
        }
        else{
          console.log("暂无内容");
        }

        // console.log(item);//当前输入搜索的对象

      }
    }
  };
</script>

<style lang="css" scoped>
.search{
  margin: 10px auto;
  text-align: center;
}
</style>
