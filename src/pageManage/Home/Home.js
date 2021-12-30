import React from 'react';
import axios from 'axios';
import {config} from './../../config/index';
import { message } from 'antd';
require('./less/Home.less')
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startPage: 0,//搜索起始页
            pageLimit: 20,//搜索页数
            keyWord: '',//查询关键字
            listTotle: 0,//总数据数量
            listAry: [],//数据总数
        }
    }
    componentWillMount() {
        this.getTableList();
    }
    getTableList = () => {
        let { startPage, pageLimit, keyWord } = this.state;
        let params = {
            startPage,
            pageLimit,
            keyWord
        }
        axios.post(`${config.port}/getTableList.html`, params).then(function (response) {
            let callBackData = response.data;
            if (callBackData.state) {
                this.setState({
                    listAry: callBackData.list
                })
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    render() {
        let { callBackData } = this.state;
        return (
            <div className='Home-center'>
                <div className='Home-center-left'>
                    <div>121</div>
                </div>
                <div className='Home-center-right'>这里要抽成组件</div>
            </div>
        )
    }
}
export default Home;