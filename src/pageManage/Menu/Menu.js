
import {
    Route,
    HashRouter,
    BrowserHistory as Router,
    Link
} from "react-router-dom";
import React from 'react';
import axios from 'axios';
import { config } from './../../config/index';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { message, Menu, Avatar } from 'antd';
import store from './../../redux/store';
import { login_out } from './../../redux/actions/cart-actions';
import style from './less/Menu.less'
const { SubMenu } = Menu;
const renderUserImg = (userImg) => {
    return <div
        className='Navigation-userImg'>
        <img src={require('./../../image/45df4d8148e5453b823e23e1f8308241_view_720.jpg').default} />
    </div>
}
class MenuDom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail'
        }
    }
    componentWillMount() {
        console.log('this.props--->', this.props);
    }
    render() {
        const { current } = this.state;
        const reduxState = store.getState();
        const userImg = reduxState.UserState.userParams[0].userImg;//用户头像
        const userName = reduxState.UserState.userParams[0].userName;//用户姓名
        return (
            <div className={style.Router_content_Navigation}>
                <div className='Router_content-Navigation_left'>
                    {userImg && userImg.length > 0 ?
                        renderUserImg(userImg) :
                        <Avatar
                            icon={<UserOutlined />}
                        />}
                    <div className='Navigation-userName'>{userName}</div>
                </div>
                <Menu
                    className='Router_contentMenu'
                    onClick={(e) => { this.setState({ current: e.key }); }}
                    selectedKeys={[current]}
                    mode="horizontal"
                >
                    <Menu.Item key="mail" icon={<MailOutlined />}>
                        <Link to="/home">首页</Link>
                    </Menu.Item>
                    <Menu.Item key="app" icon={<AppstoreOutlined />}>
                        <Link
                            to={{
                                pathname: "/about", 
                                state: { from: 'kk', state: '121' }
                            }}>精华</Link>
                    </Menu.Item>
                    <SubMenu key="SubMenu" icon={<SettingOutlined />} title="设置">
                        <Menu.Item key="setting:1"><Link to="/users">个人详情</Link></Menu.Item>
                        <Menu.Item key="setting:3" onClick={() => { store.dispatch(login_out()); }}>退出</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
export default MenuDom;