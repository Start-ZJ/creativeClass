
import Home from './../pageManage/Home/Home';
import About from './../pageManage/About/About';
import Users from './../pageManage/Users/Users';
import LoginPage from './../pageManage/LoginPage/LoginPage';
import NoFindPage from './../pageManage/noFindPage/noFindPage';
const routesPage = [
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
export { routesPage };