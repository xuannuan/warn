import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  //五大将
  state:{
    goodsNum:0,//购物车小球的数量
    goodsList:{},//加入购物车商品的详情对象
    //用户登录的信息
    userMessage:{},//用户信息以对象方式存入
    // userId:'',
    // userName:'',
    // userTele:'',
    // userPassWord:'',
    // userImg:''
  },
  getters:{
    getGoodsNum:(state)=>{
      return state.goodsNum;
    },
    getGoodsList:(state)=>{
      return state.goodsList;
    },
    getUserMessage:(state)=>{
      return state.userMessage;//对象
    },

  },
  mutations:{
    addGoodsNum:(state,num)=>{
      state.goodsNum+=num;
    },
    changeGoodsNum:(state,num)=>{
      state.goodsNum=num;
    },
    setGoodsList:(state,obj)=>{
      state.goodsList=obj;
    },
    setUserMessage:(state,obj)=>{
      state.userMessage=obj;//把传入的用户对象赋值
    },

  },
  actions:{
    addGoodsNum:({commit},num)=>{
      commit('addGoodsNum',num);
    },
    changeGoodsNum:({commit},num)=>{
      commit('changeGoodsNum',num);
    },
    setGoodsList:({commit},obj)=>{
      commit('setGoodsList',obj);
    },
    setUserMessage:({commit},obj)=>{
      commit('setUserMessage',obj);
    },

  }
})
