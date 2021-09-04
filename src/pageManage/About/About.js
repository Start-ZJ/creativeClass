import React from 'react';
import { Button } from 'antd';
import store from './../../redux/store';
class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '1212'
        }
    }
    click = () => {
        console.log("🚀 ~ file: About.js ~ line 14 ~ About ~ store.getState()", store.getState())
    }
    render() {
        return (
            <div>
                <Button onClick={() => { this.click() }}>About</Button>
            </div>
        )
    }
}
export default About;