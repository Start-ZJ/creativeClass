import React from 'react';
import { Upload, Icon, message } from 'antd';
import { config } from './../../config'
class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: ''
        }
    }
    handleChange(info) {
        console.log('info---->', info)
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
    render() {
        const uploadButton = (
            <div>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
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
                {this.state.imageUrl
                    ? <img src={this.state.imageUrl} alt="" />
                    : uploadButton}
            </Upload>
        );
    }
}
export default Users;