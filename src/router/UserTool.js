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
  //注册时插入
  Vue.set(user,'userName',obj.name);
  Vue.set(user,'userTele',obj.tele);
  Vue.set(user,'userPassWord',obj.password);
  Vue.set(user,'userImg',obj.img);
  Vue.set(user,'userId',obj.id);
  Vue.set(user,'userLoginTip',obj.logintip);
  //修改个人信息插入
  Vue.set(user,'userSex',obj.sex);
  Vue.set(user,'userBirthday',obj.birthday);
  Vue.set(user,'userInterest',obj.interest);
  Vue.set(user,'userWork',obj.work);
  Vue.set(user,'userMyself',obj.myself);
  Vue.set(user,'userStar',obj.star);

  this.saveUser(user);
}

//要抛出user对象
export default user;
