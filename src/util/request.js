import axios from 'axios';
import router from '@/router';
import store from "@/store/index";
import config from '@/config'
import Qs from 'qs';
import { Toast } from "vant";

var _this = this;

// 超时时间
const service = axios.create({
    baseURL:config.baseURI,
    timeout: 15000,
})

// 这个是请求拦截器
service.interceptors.request.use(
    
    config => {
        let token = store.state.user.token
        // let token=localStorage.getItem('token')
        if (token) {
            config.headers = {
                Token: token,
                // 'Content-Type':'application/json; charset=UTF-8',
                'Content-Type': 'application/x-www-form-urlencoded',
                Ver: store.state.version
            }
        }
        // 防抖处理
        if (config.submit) {
            var apiList = [...store.state.api.apiList];
            apiList.push(config.url);
            store.commit('api/changeApiList', apiList)
        }
        return config;
    }
);
// 响应拦截
service.interceptors.response.use(
    response => {
        // alert(JSON.stringify(response))
        const { config } = response;
        clearRequest(config);
        if (response.status === 200) { // 请求服务端成功
            const res = response.data
            switch (res.code) {
                case 1:
                    // let token = response.headers.token || response.headers.Token
                    // token ? store.commit('user/changeData', { key: 'token', val: token }) : token;
                    // token ? localStorage.setItem('token', token) : token
                    // localStorage.setItem('token',token)
                    return Promise.resolve(res.data || res.msg)
                case 0:
                    Toast(res.msg);
                    return Promise.reject(res);
                case 301:
                // case 500:
                    // debugger
                    // Toast(res.message)
                    Toast('重新登录');
                    setTimeout(() => {
                        router.push({
                            path: '/login'
                        })
                    }, 1500)
                    return Promise.reject(res);
                default:
                    return Promise.reject(res);
                    break;
            }

        } else {
            // return Promise.reject(response)
        }
    },
    // 服务器状态码不是200的情况
    error => {
        store.commit('api/changeApiList', [])
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求参数错误';
                    break;
                case 401:
                    error.message = '未授权，请登录';
                    break;
                case 403:
                    error.message = '跨域拒绝访问';
                    break;
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`;
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器内部错误';
                    break;
                case 501:
                    error.message = '服务未实现';
                    break;
                case 502:
                    error.message = '网关错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网关超时';
                    break;
                case 505:
                    error.message = 'HTTP版本不受支持';
                    break;
                default:
                    break;
            }
        } else if (error.toString().search('timeout') > -1) {
            const { config } = error;
            Toast('当前网络不佳，正在为您尝试重连...')
            var back = new Promise(function (resolve) {
                setTimeout(() => {
                    resolve();
                }, 1500)
            })

            return back.then();


        }

        return Promise.reject(error.response);
    }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return service.get(params ? `${url}?${Qs.stringify(params)}` : url)
}
/**
 * post方法，对应请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return service.post(url, params ? `${Qs.stringify(params)}` : '')
}

/**
 * 防抖提交
 * @param url
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function submit(url, params, type = 'post') {
    if (searchRequest(url)) {
        return Promise.reject();
    }
    if (type == 'post') {
        return service.post(url, params ? `${Qs.stringify(params)} ` : '', { submit: true })
    }
    return service.get(params ? `${url}?${Qs.stringify(params)}` : url, { submit: true })
}

/**
 * 清除请求状态
 * @param config
 */
function clearRequest(config) {
    if (config.submit) {
        const { url } = config;
        const apiList = store.state.api.apiList;
        var arr = [];
        for (let item in apiList) {
            if (apiList[item] != url) {
                arr.push(apiList[item]);
            }
        }
        store.commit('api/changeApiList', arr)
    }
}

/**
 * 查询当前请求是否正在请求中
 * @param url
 * @param apiList
 * @returns {boolean}
 */
function searchRequest(url, apiList = store.state.api.apiList) {
    for (let item in apiList) {
        if (apiList[item] == url) {
            return true;
        }
    }
    return false;
}

/**
 * 上传文件
 * @param fileURL
 * @param serviceURL
 * @param data
 * @returns {Promise<unknown>}
 */
export function uploadFile(fileURL, serviceURL, data) {
    return new Promise((resolve, reject) => {
        var options = new FileUploadOptions();
        options.fileKey = "fileContent";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        let token = store.state.user.token
        options.headers = {
            Aot: token,
            Ver: store.state.version
        }
        var params = {};
        for (let i in data) {
            params[i] = data[i];
        }
        options.params = params;
        var ft = new FileTransfer();
        ft.upload(fileURL, encodeURI(config.baseURI + serviceURL), res, reject, options);
        function res(res) {
            alert(res)
            if (res.responseCode == 200) {

                var data = res.response;
                // console.log(data)
                if (typeof data === 'string') {
                    data = JSON.parse(res.response);
                }
                switch (Number(data.code)) {
                    case 200:

                        resolve(data.data);
                        break;
                    case 400:
                        reject(res);
                        break;
                    case 10000:
                        Toast('重新登录');
                        // var _this=this;
                        setTimeout(() => {
                            router.push({
                                path: '/login'
                            })
                        }, 1500)
                        break;
                    default:
                        reject();
                        break;
                }
            } else {
                reject();
            }
        }
    })

}
