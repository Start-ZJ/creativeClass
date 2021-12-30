import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
  Link
} from "react-router-dom";
import React from 'react';
import { connect } from 'react-redux';
import { Menu, Avatar } from 'antd';
import store from './redux/store';
import { login_out } from './redux/actions/cart-actions';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
/* 页面组件引入开始 */
import Home from './pageManage/Home/Home';
import About from './pageManage/About/About';
import Users from './pageManage/Users/Users';
import LoginPage from './pageManage/LoginPage/LoginPage';
import NoFindPage from './pageManage/noFindPage/noFindPage';
import * as style from './appStyle.less';
// require('./appStyle.less');
/* 页面组件引入结束 */
const { SubMenu } = Menu;

const routes = [
  {
    path: "/about",
    component: About
  },
  {
    path: "/users",
    component: Users
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/noFindPage",
    component: NoFindPage
  },
];
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
function renderUserImg(userImg) {
  return <div
    className='Navigation-userImg'>
    <img src={require('./image/45df4d8148e5453b823e23e1f8308241_view_720.jpg').default} />
  </div>
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail'
    }
  }
  componentWillMount() {
  }
  handleClick = e => {
    this.setState({ current: e.key });
  };
  render() {
    const { current } = this.state;
    let reduxState = store.getState();
    let isLogin = reduxState.UserState.userParams[0].isLogin;//登录状态
    let userImg = reduxState.UserState.userParams[0].userImg;//用户头像
    let userName = reduxState.UserState.userParams[0].userName;//用户姓名
    return (
      <HashRouter>
        <Router>
          <div className='Router-content'>
            {isLogin ?
              <>
                <div className='Router-content-Navigation'>
                  <div className='Router-content-Navigation-left'>
                    {userImg && userImg.length > 0 ?
                    renderUserImg(userImg) :
                    <Avatar
                      icon={<UserOutlined />}
                    />}
                    <div className='Navigation-userName'>{userName}</div>
                  </div>
                  
                  <Menu
                    className='Router-contentMenu'
                    onClick={this.handleClick}
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
                <Switch>
                  {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                  ))}
                </Switch>
              </>
              :
              <>
                <LoginPage />
              </>
            }
          </div>
        </Router>
      </HashRouter>
    );
  }
}
const mapStateToProps = state => ({
  isLogin: state.UserState.userParams[0].isLogin
})
export default connect(
  mapStateToProps
)(App)