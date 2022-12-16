import React from 'react';
import { Button, Input, message } from 'antd';
import { connect } from 'react-redux';
import store from './../../redux/store';
import { getUserParameter, addUserParameter } from './../../redux/actions/cart-actions';
import style from './less/LoginPage.less';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageType: 0,//控制登录或者是注册状态
            inputUserName: '',//用户名
            inputUserPassWord: '',//用户密码
            inputUserPassWordAgain: '',//重复一次用户密码
        }
    }
    componentWillMount() {
        this.funLogic();//不想测登录了，直接登录
    }
    /** @description 登录接口 */
    funLogic = () => {
        let { inputUserName, inputUserPassWord } = this.state;
        // if (inputUserName === '') {
        //     message.info('请输入用户名！');
        //     return;
        // }
        // if (inputUserPassWord === '') {
        //     message.info('请输入用户密码！');
        //     return;
        // }
        // store.dispatch(getUserParameter(inputUserName, inputUserPassWord));
        store.dispatch(getUserParameter('admin', '123456zj'));//测试时的默认密码
    }
    /** @description 登录时简单的交互事件 */
    loginSimpleInteractiveEvents = (type, value) => {
        if (type === 1) {//输入账号
            this.setState({ inputUserName: value })
        } else if (type === 2) {//输入密码
            this.setState({ inputUserPassWord: value })
        } else if (type === 3) {//输入密码
            this.setState({ inputUserPassWordAgain: value })
        }
    }
    /** @description 注册接口 */
    funRegister = () => {
        let { inputUserName, inputUserPassWord, inputUserPassWordAgain } = this.state;
        if (inputUserName === '') {
            message.info('请输入用户名！');
            return;
        }
        if (inputUserPassWord === '') {
            message.info('请输入用户密码！');
            return;
        }
        if (inputUserPassWordAgain === '') {
            message.info('请输入用户二次密码！');
            return;
        }
        if (inputUserPassWord !== inputUserPassWordAgain) {
            message.info('两次输入的密码不相等！');
            return;
        }
        store.dispatch(addUserParameter(inputUserName, inputUserPassWord));
    }
    /** @description 注册时简单的交互事件 */
    registerSimpleInteractiveEvents = () => {
        const { pageType } = this.state;
        this.setState({
            pageType: +(!pageType),//控制登录或者是注册状态
            inputUserName: '',//用户名
            inputUserPassWord: '',//用户密码
            inputUserPassWordAgain: '',//重复一次用户密码
        })
    }
    render() {
        const { pageType, inputUserName, inputUserPassWord, inputUserPassWordAgain } = this.state;
        return (
            <div className={style.LoginPage}>
                <div className='LoginPage-page'>
                    <div className='LoginPage-page-lineDom'>
                        <div className='LoginPage-page-text' style={pageType ? { width: '120px' } : null}>账号</div>
                        <Input
                            className='LoginPage-page-input'
                            placeholder='请输入您的账号'
                            value={inputUserName}
                            onChange={(e) => { this.loginSimpleInteractiveEvents(1, e.target.value) }}
                        />
                    </div>
                    <div className='LoginPage-page-lineDom'>
                        <div className='LoginPage-page-text' style={pageType ? { width: '120px' } : null}>密码</div>
                        <Input.Password
                            className='LoginPage-page-input'
                            placeholder='请输入您的密码'
                            value={inputUserPassWord}
                            onChange={(e) => { this.loginSimpleInteractiveEvents(2, e.target.value) }}
                        />
                    </div>
                    {pageType === 1 ? <div className='LoginPage-page-lineDom'>
                        <div className='LoginPage-page-text' style={pageType ? { width: '120px' } : null}>密码二次确认</div>
                        <Input.Password
                            className='LoginPage-page-input'
                            placeholder='请再次输入您的密码'
                            value={inputUserPassWordAgain}
                            onChange={(e) => { this.loginSimpleInteractiveEvents(3, e.target.value) }}
                        />
                    </div> : null}
                    <div className='LoginPage-page-lineText' onClick={() => { this.registerSimpleInteractiveEvents(); }}>{pageType ? '取消注册，返回登录' : '没有密码？立即注册'}</div>
                    <Button onClick={() => { {pageType ? this.funRegister() :this.funLogic()} }}>{pageType ? '立即注册' : '登录'}</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isLogin: state.isLogin
})
export default connect(
    mapStateToProps
)(LoginPage)