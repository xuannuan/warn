import Vue from 'vue'
// 直接在组件使用时import UserTool from '@/router/UserTool'引用

let user={}

user.saveUser=function(userobj){
  window.sessionStorage.setItem('User',JSON.stringify(userobj));
  // window.localStorage.setItem('User',JSON.stringify(user));
}

user.getUser=function(){
  return JSON.parse(window.sessionStorage.getItem('User')||'{}');
  // return JSON.parse(window.localStorage.getItem('User')||'{}');
}

user.addUser=function(obj){
  let user=this.getUser();
  Vue.set(user,'userName',obj.name);
  Vue.set(user,'userTele',obj.tele);
  Vue.set(user,'userPassWord',obj.password);
  Vue.set(user,'userImg',obj.img);
  Vue.set(user,'userId',obj.id);
  Vue.set(user,'userLoginTip',obj.logintip);
  this.saveUser(user);
}

//要抛出user对象
export default user;
