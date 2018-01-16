/**
 * Created by zhoumeiyan on 2018/1/16.
 */
import axios from 'axios'
import * as querystring from 'qs'

let service = axios.create({
    timeout: 1000
})
// http request 拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做的事
        return config;
    },
    err => {
        // 请求错误时做些事
        return Promise.reject(err);
    }
);

// http response 拦截器
service.interceptors.response.use(
    response => {
        // 对响应数据做些事
        return response;
    },
    error => {
        // 请求错误时做些事
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    }
);

const request = (method, url, headers, body) => {
    if (typeof headers === 'object' && typeof body === 'undefined') {
        body = headers
        headers = undefined
    }
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers
        },
        method: method.toUpperCase(),
        timeout: 30000
    }
    if (body && method.toUpperCase() === 'GET') {
        url += `?${querystring.stringify(body)}`
    } else if (body) {
        options.data = options.headers['Content-Type'] === 'application/json' ? JSON.stringify(body) : body
    }
    return axios(url, options)
        .then((response) => {
            return Promise.resolve(response.data)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}
export default request