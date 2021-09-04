import axios from 'axios';
import { message } from 'antd';
// 用于定义派发的任务类型和所需的任务参数
export const Get_User_Parameter = 'Get_User_Parameter';//获取用户登录数据
export const Clear_User_Parameter = 'Clear_User_Parameter';//清空用户数据

// 登录
export const login_ok = (session) => {
    let { account, passWord, userType } = session;
    return ({
        type: Get_User_Parameter,
        payload: { account, passWord, userType, isLogin: true }
    })
}
// 登出
export const login_out = () => {
    return ({
        type: Clear_User_Parameter,
        payload: { account: '', passWord: '', userType: -1, isLogin: false }
    })
}
// 调用登录接口，获取用户数据的方法
export const getUserParameter = (_account, _passWord) => dispath => {
    axios.post('http://127.0.0.1:9000/user/login.html', {
        'userName': _account,
        'passWord': _passWord
    }).then(function (response) {
        let callBackData = response.data;
        if (callBackData.isHaveUser) {
            message.success('登录成功!');
            let account = _account;
            let passWord = _passWord;
            let userType = 1;
            let isLogin = false;
            setTimeout(() => {
                isLogin = true;
                dispath(login_ok({ account, passWord, userType, isLogin }))
            }, 1000)
        } else {
            message.error('账号或密码错误!');
            dispath(login_out())
        }
    }).catch(function (error) {
        console.log(error);
    });
}