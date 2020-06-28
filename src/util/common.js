import FastClick from "fastclick";

/**
 * 获取秒级时间戳
 * @returns {number}
 */
export function gettime() {
    return parseInt(new Date().getTime() / 1000);
}

/**
 *  判断是否在ios设备上
 */
export function onIos() {
    var u = navigator.userAgent;
    var ua = u.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {  // iOS 系统 ->  跳AppStore下载地址
        //alert("iOS");
        return true;
    }
    return false;
}

/**
 * 数组拼接成字符串
 * @param array
 * @return {string}
 */
export function arrayToStr(array) {
    var str = '';
    array.forEach(r => {
        if (typeof r === 'string' && r.indexOf(':') > -1) {
            if (str == '') {
                str += r;
            } else {
                str += `;${r}`
            }
        }
    })
    return str;
}

/**
 * 信息渲染多行文字替换省略号
 * @param str
 * @param num
 * @return {string}
 */
export function hidden(str, num) {
    if (str.length > num) {
        return `${str.substring(0, num)}......`
    }
    return str;
}

/**
 * 判断是否符合密码规范
 * @param password
 * @return {boolean}
 */
export const testPassword = (password) => {
    var regin = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/;
    if (regin.test(password)) {
        return true
    }
    return false;
}


/**
 * 通过class获取标签
 * @param className
 * @return {HTMLCollectionOf<Element>}
 */
export const getDom = className => {
    return document.getElementsByClassName(className);
}

/**
 * 初始化时启动cordova所有监听方法
 */
export function installCordova() {
    document.addEventListener("deviceready", onDeviceReady, false);
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
            FastClick.prototype.focus = function (targetElement) {
                let length;
                if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
                    length = targetElement.value.length;
                    targetElement.focus();
                    targetElement.setSelectionRange(length, length);
                } else {
                    targetElement.focus();
                }
            }
        }, false);
    }
    function onDeviceReady() {
        // _this.changeDevice({ key: "device", val: device });
        // setTimeout(() => {
        //   navigator && navigator.splashscreen && navigator.splashscreen.hide();
        // }, 1000);
    }
}

/**
 * 获取相册
 * @param selection
 * @returns {Promise<unknown>}
 */
export function openPhoto() {
    console.log('相册')

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    return new Promise((resolve, reject) => {
        // 封装访问相册
        navigator.camera.getPicture(function cameraSuccess(imageUri) {
            resolve(imageUri);
        }, function cameraError(error) {
            reject(error);
        }, options);
    })
}

/**
 * 获取相机拍照
 * @param success
 * @returns {Promise<unknown>}
 */
export function openCamera() {
    console.log('相机')
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    return new Promise((resolve, reject) => {
        navigator.camera.getPicture(function cameraSuccess(imageUri) {
            resolve(imageUri);
        }, function cameraError(error) {
            reject(error);
        }, options);
    })
}

/**
 * 设置属性相机相册属性
 * @param srcType
 * @returns {{sourceType: *, correctOrientation: boolean, allowEdit: boolean, encodingType: *, destinationType: *, mediaType: *, quality: number}}
 */
function setOptions(srcType) {
    var options = {
        maximumImagesCount:4,
        // Some common settings are 20, 50, and 100
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}

/**
 * 获取视频资源
 * @returns {Promise<unknown>}
 */
export const getVideo = () => {
    return new Promise((resolve, reject) => {
        navigator.device.capture.captureVideo(function (mediaFiles) {
            var i, path, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                path = mediaFiles[i].fullPath;
                // do something interesting with the file
            }
            resolve(path);
        }, function fail(err) {
            reject('失败了');
        }, {
            duration: 15
        });
    })

}


/**
 *  压缩视频
 * @param filePath
 * @returns {Promise<unknown>}
 */
export const compression = (filePath) => {
    return new Promise((resolve, reject) => {
        VideoEditor.transcodeVideo(
            function videoTranscodeSuccess(result) {
                resolve(result);
            },
            reject,
            {
                fileUri: filePath,
                outputFileName: videoFileName,
                outputFileType: VideoEditorOptions.OutputFileType.MPEG4,
                optimizeForNetworkUse: VideoEditorOptions.OptimizeForNetworkUse.YES,
                saveToLibrary: true,
                maintainAspectRatio: true,
                width: 640,
                height: 640,
                videoBitrate: 1000000, // 1 megabit
                audioChannels: 2,
                audioSampleRate: 44100,
                audioBitrate: 128000, // 128 kilobits
                progress: function (info) {
                    console.log('transcodeVideo progress callback, info: ' + info);
                }
            }
        );
    })
}
