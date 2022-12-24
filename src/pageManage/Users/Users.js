import React from 'react';
import { Upload, message, Input, Radio, DatePicker } from 'antd';
import { config } from './../../config';
import style from './less/User.less';
import dayjs from 'dayjs';
const { TextArea } = Input;
class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: config.getUser().userImg,
            userName: config.getUser().userName
        }
    }
    componentWillUnmount() {
        console.log('config.getUser()----->', config.getUser());
    }
    handleChange(info) {
        const { imageUrl } = this.state;
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl, loading: false }));
        }
    }
    // getBase64(img, callback) {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // }
    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt20M = file.size / 1024 / 1024 < 20;
        if (!isLt20M) {
            message.error('Image must smaller than 20MB!');
        }
        return isJPG && isLt2M;
    }
    /** @description 个人信息页面的列表 */
    userFrom = () => {
        const { userName, imageUrl, userSeX, userAge, userMemo = '' } = this.state;
        const uploadButton = <div className="antUploadPng"></div>;
        return (<div className='userFrom'>
            <div className='userFromLine'>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={`${config.port}/file/addFile`}
                    beforeUpload={this
                        .beforeUpload
                        .bind(this)}
                    onChange={this
                        .handleChange
                        .bind(this)}>
                    {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
                </Upload>
            </div>
            <div className='userFromLine'>
                <div className='userFromLineLebal'><i>*</i>姓名:</div>
                <Input
                    className='userFromLineValue'
                    value={userName}
                />
            </div>
            <div className='userFromLine'>
                <div className='userFromLineLebal'>性别:</div>
                <Radio.Group value={userSeX}>
                    <Radio value={'0'}>女</Radio>
                    <Radio value={'1'}>男</Radio>
                </Radio.Group>
            </div>
            <div className='userFromLine'>
                <div className='userFromLineLebal'>出生日期:</div>
                <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={'YYYY-MM-DD'} />
            </div>
            <div className='userFromLine'>
                <div className='userFromLineLebal'>个人简介:</div>
                <TextArea
                    className='userFromLineValue'
                    value={userMemo}
                />
            </div>
        </div>)
    }
    render() {
        return (
            <div className={style.userStyle}>
                {this.userFrom()}
            </div>
        );
    }
}
export default Users;