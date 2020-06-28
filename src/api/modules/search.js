import {submit,post,get} from "../../util/request";

  /**
   * 搜索模块—-获取热门和输入框数据
   */
  export const getData=data=>get('/yxh/subject/show')

  /**
   * 搜索模块—-获取热门和输入框数据
   */
  export const find=data=>get('/yxh/search/index',data)

  /**
   * 我的关注列表
   * 
   */
  export const getCare=data=>get('/yxh/message/me-care-about')

  /**
   * 关注我的列表
   * 
   */
  export const getCareMe=data=>get('/yxh/message/care-about-me')
  /**
   * 用户的Id
   */
  export const getUserList=data=>get('user/index',data)
  