// 实际的状态修改在这里进行
import { Get_User_Parameter, Clear_User_Parameter } from './../actions/cart-actions.js';//可省略引入，现在使用引入是方便以后的修改和能够方便定位到对应的方法

const initialState = {
  userParams: [{
    userName:'张矢',//用户名
    userAge:'18',//用户年龄
    userImg:'',//头像
    userSeX:'1',//性别
    passWord: '',//密码
    userType: -1,//用户类型
    isLogin: false,//是否是登录状态
  }]
}

export default function UserState(state = initialState, action) {
  switch (action.type) {
    case Get_User_Parameter: {
      return {
        ...state,
        userParams: [{
          userName:action.payload.userName,
          passWord: action.payload.passWord,
          userType: action.payload.userType,
          isLogin: action.payload.isLogin
        }]
      }
    }
    case Clear_User_Parameter: {
      return {
        ...state,
        userParams: [{
          account: action.payload.account,
          passWord: action.payload.passWord,
          userType: action.payload.userType,
          isLogin: action.payload.isLogin
        }]
      }
    }

    default:
      return state;
  }
}