import {get, post, submit,uploadFile} from '../../util/request'

/**
 * 获取验证码
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const GetCode = data => post('/mmApi/user/sendAuthCode',data);
/**
 * 登陆
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const Login =data=>post('/mmApi/user/login',data)
/**
 * 获取用户信息
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUserinfo= data=>get('/mmApi/user/userInfo',data);
/**
 * 拉黑列表
 * @param data
 * @return {Promise<AxiosResponse<T>>}
 */
export const laheiList = data =>submit('yxh/user/block-list',data);

/**
 * 取消拉黑
 * @param data
 * @return {Promise<AxiosResponse<any>>}
 */
export const cancelLahei = data =>post('/mmApi/user/blackListOpt',data);

//修改关注状态
export const updateCareAbout= data=>get('/yxh/message/update-care-about',data);
/**
 * 
 * 意见反馈类型列表
 * @param {} data 
 */


// 获取前缀
export const getPrefix=data=>get('/mmApi/blog/imagePrefix',data)

 export const getUpdateType=data=>get('feedback/get-type',data)
/**
 * 意见反馈
 * @param data
 * @returns {Promise<AxiosResponse<*>>}
 */
export const suggest = data=>submit("/mmApi/user/feedback", data)

//私信消息-消息首页
export const mailIndex= data=>get('/mmApi/message/list',data);
//私信对话界面




export const relationChat= data=>get('/mmApi/message/messageDetail',data);
//发送私信
export const relationSendChat= data=>post('/mmApi/message/add',data);

//作者主页
export const seeOther= data=>post('/user/other-user',data);

//历史收藏—-点赞
export const praiselist= data=>post('/yxh/praise/list',data);

//作者的发布
export const commonOther= data=>get('/yxh/common/other',data);



// 编辑用户资料
export const upUserInfo = (fileUrl,data)=>uploadFile(fileUrl,"/user/update", data)

/**
 * 编辑用户信息，但是不带上传图片
 * @param data
 * @returns {Promise<AxiosResponse<*>>}
 */
export const editUserInfo = data => post('/mmApi/user/userInfo',data);

/**
 * facebookLogin
 * @param pwd
 * @returns {Promise<AxiosResponse<*>>}
 */
export const fbLogin = data =>submit('/yxh/user/login-facebook',data);

/**
 * facebookLogin
 * @param pwd
 * @returns {Promise<AxiosResponse<*>>}
 */
export const twitterLogin = data =>submit('/yxh/user/login-twitter',data);
/**
 * 黑名单
 * @param {*} token 
 */
export const getBlackList=data=>get('/mmApi/user/blackList',data)


export const deletebalckUser=data=>post('/mmApi/user/blackListOpt',data)
/**
 * 移除黑名单
 * @param {} token 
 */
/**
 * instagramLogin
 * @param pwd
 * @returns {Promise<AxiosResponse<*>>}
 */
export const instagramLogin = token =>submit('/yxh/user/login-instagram',{token});


/**
 * 我的博客
 * @param {*} data 
 */
export const getMEinfo=data=>get('/mmApi/blog/myBlogs',data)

/**
 * 
 * @param {视频播接口} data 
 */
export const Videoplayer=data=>get('/mmApi/shortVideo/playShortVideo',data)

/**
 * 统计次数
 * @param {
 * } data 
 */
export const reportcount=data=>post('/mmApi/blog/discardOrReply',data);


/**
 * 评论的点赞
 * @param {} data 
 */

 export const recommand=data=>post('/mmApi/comment/like',data)


/**
 * 举报
 * @param pwd
 * @returns {Promise<AxiosResponse<*>>}
 */
export const reportSomeone= data =>post('feedback/report',data);

/**
 * 拉黑
 * @param pwd
 * @returns {Promise<AxiosResponse<*>>}
 */
export const dislikeSomeone= data =>post('/user/accede-to-dislike',data);

/**
 * 消息
 * @param pwd
 * @returns {Promise<AxiosResponse<*>>}
 */
export const systemMsg= data =>post('/system-msg/index',data);
/**
 * 我的关注列表
 * @param pwd
 * @returns {Promise<AxiosResponse<*>>}
 */
export const watchOther= data =>get('/mmApi/user/watchList',data);
/**
 * 我的粉丝列表
 * @param pwd
 * @returns {Promise<AxiosResponse<*>>}
 */
export const watchMe= data =>get('/mmApi/user/fansList',data);

/**
 * 关注或取消关注
 * @param pwd
 * @returns {Promise<AxiosResponse<*>>}
 */
export const watchUser= data =>post('/mmApi/user/watchOpt',data);





/**
 * 查看他人的博客列表 只能看广场 userId必填
 * @param pwd
 * @returns {Promise<AxiosResponse<*>>}
 */
export const userBlogs= data =>get('/mmApi/blog/userBlogs',data);

