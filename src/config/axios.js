import axios from 'axios';
import Qs from 'qs'
const _axios = (url, params, headers = { "Content-Type": "application/x-www-form-urlencoded" }, method = 'post') => {
    if (!url) { return }
    return axios({
        headers,
        method: method,
        url,
        transformRequest: [function (data) {
            return Qs.stringify(data)// 对 data 进行任意转换处理
        }],
        data: params
    })
}

export default _axios;