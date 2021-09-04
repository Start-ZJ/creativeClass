import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'antd';
import store from './../../redux/store';
import { login_out } from './../../redux/actions/cart-actions';
import './less/noFindPage.less';
class NoFindPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    userOutPage = () => { 
        store.dispatch(login_out());
    }
    render() {
        return (
            <div className='noFindPage'>
                <div>哇喔~没有发现所需内容哦！</div>
                <Link to="/Home" style={{color:'black'}}>
                    <Button>返回首页</Button>
                </Link>
                <Button onClick={() => { this.userOutPage() }}>退出登录</Button>
            </div>
        )
    }
}
export default NoFindPage;