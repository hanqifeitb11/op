import {submit,post,get,uploadFile} from "../../util/request";



//获取树洞的接口
export const GetTreeList=(data)=>get('/mmApi/blog/list',data)









/**
 * 这是树洞的接口地址
 * @param {*} data 
 */

export const deletetBlogId=data=>post('/mmApi/blog/del',data)


 export const getBlogStatus=data=>get('/mmApi/blog/userViewStatus',data)


export const UploadImgFile=data=>post('/mmApi/blog/upload',data)




export const UploadPush=data=>post('/mmApi/blog/add',data)











/**
 * 注销账号
 * @param {} data
 */
export const deleteUsers=data=>post('/mmApi/user/logoff',data)
/**
 * 更换手机号
 * @param {*} data
 */

 export const UpdatePhoen=data=>post('/mmApi/user/changeMobile',data)
/**
 * 获取首页数据
 * @param data
 * @returns {Promise<AxiosResponse<*>>}
 */
export const index = data => get('/mmApi/blog/list',data);


/**
 * 关注的的接口
 * @param {} id 
 */
export const SubjectUser=data=>get('watch/user',data)












/**
 * 作品详情
 * @param {*} id 
 */
export const getPhotoInfo=data=>get('topic/details',data)








/***
 * 图文详情
 * @param id
 * @return {Promise<AxiosResponse<T>>}
*/
export const getPhotoDetail= data => get('topic/details',data);

/**
 * 评论列表
 * @param id
 * @param order
 * @param limit
 * @param page
 * @param type
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getComment =data => get('/mmApi/comment/list',data);
/**
 * 发表评论
 * @param topic_id
 * @param uid
 * @param type
 * @param content
 * @returns {Promise<AxiosResponse<*>>}
 */
export const discuss =data=>post('/mmApi/comment/add',data)
/**
 * 上传图片
 * @param {*} data
 */
export const UploadImg=data=>submit('upload/upload',data)
/**
 *
 * 获取文件的标题
 * @param {*} data
 */

export const PushPhotot=data=>submit('yxh/photo/push',data)
/**
 * 点赞
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const admire = data => post('/mmApi/blog/like',data);
/**
 * 取消点赞
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const offAdmire = data => submit('topic/cancel-praise',data);
/**
 * 回复
 * @param data
 * @returns {Promise<AxiosResponse<*>>}
 */
export const answer = data => submit('comment/reply',data);

/***
 * 回复列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const showAnswer = data =>get('yxh/discuss/show-answer',data);

/**
 * Ya组列表
 * @param data
 * @return {Promise<AxiosResponse<T>>}
 */
export const subList = data => get('subject/index',data);

/**
 * 踩
 * @param data
 * @return {Promise<AxiosResponse<T>>}
 */
export const dislike = data => submit('yxh/discuss/dislike',data);


/**
 * 取消点踩
 * @param data
 * @return {Promise<AxiosResponse<T>>}
 */
export const offdislike = data => submit('yxh/discuss/call-off-dislike',data);

/**
 * 修改关注状态
 * @param data
 * @return {Promise<AxiosResponse<T>>}
 */
export const changeCare = (uid,is_watch) => get('yxh/message/update-care-about',{uid,is_watch});
/**
 * 修改关注状态
 * @param data
 * @return {Promise<AxiosResponse<T>>}
 */
export const subjectDel = data => submit('yxh/subject/set-like-subject',data);



/**
 * 删除评论
 * @param {} data 
 */
export const deleterecommand=data=>get('comment/del',data)







/**
 * 点击不喜欢这个内容
 * @param data
 * @return {Promise<AxiosResponse<T>>}
 */
export const unlikeContent = data => post('topic/dislike',data);

/**
 * 点击不喜欢这个内容
 * @param data
 * @return {Promise<AxiosResponse<T>>}
 */
export const delSubject = id => submit('yxh/subject/del-subject-user',{id});

/**
 * 上传文件
 * @param url
 * @param data
 * @returns {Promise<unknown>}
 */
export const uploadSubject = (data) => submit('topic/push',data)

/**
 * 评论数
 * @param data
 * @return {Promise<AxiosResponse<T>>}
 */
export const commitCount = (topic_id,type) => submit('yxh/discuss/comment-count',{topic_id,type});

/**
 * 获取验证码
 *
 */
export const getUserCode=data=>get('yxh/user/gc',data)

/**
 * 更换手机号获取验证码
 */
export const getUpdate_code=data=>get('yxh/wo/get-code',data)
/**
 * 判断是不是自己的手机号
 */
export const getIs_my=data=>get('yxh/wo/is-my-mobile',data)
/**
 * 验证旧手机号
 */
export const getoldPhoe=data=>get('yxh/wo/verify-old-mobile',data)
/**
 * 绑定新手机账号
 */

 export const getbingNewPhone=data=>get('yxh/wo/bind-mobile',data)
/**
 * 注销账户
 */
export const deleteUser=data=>get('yxh/user/del-user',data)
/**
 * 注销手机号码获取烟瘴吗
 */
export const getDeleteCode=data=>get('yxh/user/del-user-code')

/**
 * 获取举报的类型
 */
export const getReport=data=>get('feedback/report-type',data)

/**
 * 上传
 * @param url
 * @param data
 * @returns {Promise<unknown>}
 */
export const upload = (url,data) => uploadFile(url,`/upload/upload`,data)

/**
 * 图片上传
 * @param data
 * @returns {Promise<AxiosResponse<*>>}
 */
export const photoPush = data => submit(`/yxh/photo/push`,data)

/***
 * Ya组详情
 * @param data
 * @returns {Promise<AxiosResponse<*>>}
 */
export const subjectDetail = data => submit(`/yxh/subject/list`,data)

/****
 *yxh/tip-off/report
 */
export const Tip_off=data=>submit('yxh/tip-off/report',data)



/***
 * 我的发布
 * @param data
 * @returns {Promise<AxiosResponse<*>>}
 */
export const other = data => get(`/yxh/common/other`,data)

/***
 * 删除我的发布
 * @param data
 * @returns {Promise<AxiosResponse<*>>}
 */
export const del = data => submit(`/yxh/common/del`,data)

/**
 * Ya组列表
 * 
 * @param {} data 
 */

export const getSubjectList=data=>get('/subject/index',data)






/**
 *我屏蔽的Ya组列表
 */
export const getSUbject=data=>post('yxh/subject/subject-for-user',data)
/***
 * 关注Ya组列表
 * @param data
 * @returns {Promise<AxiosResponse<*>>}
 */
export const subjectList = data => submit(`/yxh/subject/subject-for-user`,data);


/***
 * 点赞列表
 * @param data
 * @returns {Promise<AxiosResponse<*>>}
 */
export const saveList = data => submit(`/yxh/praise/list`,data);




export const reportSubmit=data=>post('/mmApi/user/report',data)
