import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter,
    Link
} from "react-router-dom";
import React from 'react';
import { connect } from 'react-redux';
import { routesPage } from './routerPage'
import store from './../redux/store';
import * as style from './appStyle.less';
/* 页面组件引入开始 */
import LoginPage from './../pageManage/LoginPage/LoginPage';
import MenuDom from './../pageManage/Menu/Menu';

const mapStateToProps = state => ({
    isLogin: state.UserState.userParams[0].isLogin
})
const RouteWithSubRoutes = (route) => {
    return (
        <Route
            path={route.path}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount() {
    }
    componentWillReceiveProps() {
        // let reduxState = store.getState();
        // console.log('reduxState', reduxState);
    }
    render() {
        const reduxState = store.getState();
        const isLogin = reduxState.UserState.userParams[0].isLogin;//登录状态
        return (
            <HashRouter>
                <div className={style.Router_content}>
                    {isLogin ?
                        <>
                            <MenuDom />
                            <Switch>
                                {routesPage.map((route, i) => (
                                    <RouteWithSubRoutes key={i} {...route} />
                                ))}
                            </Switch>
                        </>
                        : <LoginPage />
                    }
                </div>
            </HashRouter>
        );
    }
}
export default connect(
    mapStateToProps
)(App)