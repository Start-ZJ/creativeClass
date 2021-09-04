import React from 'react';
import { Button, Input, message } from 'antd';
import { connect } from 'react-redux';
import store from './../../redux/store';
import { getUserParameter } from './../../redux/actions/cart-actions';
require('./less/LoginPage.less')
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputUserName: '',
            inputUserPassWord: ''
        }
    }
    componentWillMount() {
        this.funLogic();//不想测登录了，直接登录
    }
    funLogic = () => {
        let { inputUserName, inputUserPassWord } = this.state;
        store.dispatch(getUserParameter('admin', '123456zj'));
        // store.dispatch(getUserParameter(inputUserName, inputUserPassWord));
    }
    // 简单的交互事件
    simpleInteractiveEvents = (type, value) => {
        if (type === 1) {//输入账号
            this.setState({ inputUserName: value })
        } else if (type === 2) {//输入密码
            this.setState({ inputUserPassWord: value })
        }
    }
    render() {
        const { inputUserName, inputUserPassWord } = this.state;
        return (
            <div className='LoginPage'>
                <div className='LoginPage-page'>
                    <div className='LoginPage-page-line'>
                        <div className='LoginPage-page-text'>账号</div>
                        <Input
                            className='LoginPage-page-input'
                            placeholder='请输入您的账号'
                            value={inputUserName}
                            onChange={(e) => { this.simpleInteractiveEvents(1, e.target.value) }}
                        />
                    </div>
                    <div className='LoginPage-page-line'>
                        <div className='LoginPage-page-text'>密码</div>
                        <Input.Password
                            className='LoginPage-page-input'
                            placeholder='请输入您的密码'
                            value={inputUserPassWord}
                            onChange={(e) => { this.simpleInteractiveEvents(2, e.target.value) }}
                        />
                    </div>
                    <Button onClick={() => { this.funLogic() }}>登录</Button>
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