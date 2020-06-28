import {submit,post,get} from "../../util/request";
  /**
   * 视频详情接口
   */
  export const getVideo=data=>get('topic/details',data)