<template>
  <van-popup class="comment" v-model="show" position="bottom">
    <div class="top">
      <span class="count">共有{{commitCount}}条评论</span>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      class="commentList"
      finished-text="没有更多了"
      :offset="100"
      :immediate-check="false"
      @load="onLoad"
    >
      <div v-show="list.length" v-for="(v,i) in list" :key="i" class="content">
        <div class="One_recommad">
          <div class="left_info">
            <img :src="v.userInfo.avatar" alt v-if="v.userInfo" />
            <div class="nickname" v-if="v.userInfo">
              <div v-if="v.userInfo">{{v.userInfo.nickname}}</div>
              <div v-if="v.createdAt">{{v.createdAt}}</div>
            </div>
          </div>
          <div class="right_Icon">
            <div>{{v.likeCount}}</div>
            <img
              @click="CLickparse(v)"
              class="icon_islike"
              :src="v.isLike == 0?require('@/assets/images/main/icon_video_like.png'):require('@/assets/images/main/icon_video_like_pressed.png')"
              alt
            />

            <div class="reportItem" @click.stop="reportType(v)">举报</div>
          </div>
        </div>
        <div class="content_remmend" @click="replayClick(v)">
          {{v.isShowBoth?hidden(v.content,30):v.content}}
          <span
            class="showUpdate"
            @click.stop="showcontent(v)"
            v-if="v.content.length>30"
          >{{v.isShowBoth?'展开':'收起'}}</span>
        </div>
        <div class="two_content_remend" v-for="(v1,i)  in v.replies" :key="i">
          <div class="ardound_content">
            <div class="two_remend">
              <img :src="v1.userInfo.avatar" alt v-if="v1.userInfo" />
              <div class="around_nickname">
                <div v-if="v1.userInfo">{{v1.userInfo.nickname}}</div>
                <div v-if="v1.createdAt">{{v1.createdAt}}</div>
              </div>
            </div>
            <div class="right_Icon">
              <div v-if="v1.likeCount">{{v1.likeCount}}</div>
              <img
                @click="CLickparse(v1)"
                class="icon_islike"
                :src="v1.isLike == 0?require('@/assets/images/main/icon_video_like.png'):require('@/assets/images/main/icon_video_like_pressed.png')"
                alt
              />
              <div class="reportItem" @click.stop="reportType(v1)">举报</div>
            </div>
          </div>
          <div class="content_two" @click="replayTworend(v1)">
            <span class="replayname" v-if="v1.userInfo">回复{{v1.userInfo.nickname}}:</span>
            {{v1.isShowBoth?hidden(v1.content,30):v1.content}}
            <span
              class="showUpdate"
              @click.stop="showcontent(v1)"
              v-if="v1.content.length>30"
            >{{v1.isShowBoth?'展开':'收起'}}</span>
          </div>
        </div>
      </div>

      <an-empty
        v-if="list.length == 0 && !loading"
        :url="require(`@/assets/images/home/icon-default@2x.png`)"
        title="还没人评价~skr"
      />
    </van-list>
    <div class="inputBox">
      <input v-model="content" type="text" :placeholder="placeholder" class="textfield" />
      <div class="send" @click.stop="reply">发送</div>
    </div>

    <van-dialog
      width="210px"
      class="showContent"
      :showConfirmButton="false"
      closeOnClickOverlay
      v-model="showType"
    >
      <div class-="reportItem_sleect">
        <div
          class="cell"
          v-for="(v,i) in resportList"
          :class="curentIndex==i?'active':''"
          :key="i"
          @click="ToReport(i,v)"
        >
          <span>{{v.name}}</span>
        </div>
      </div>
    </van-dialog>
  </van-popup>
</template>
<script>
import { hidden } from "../../util/common";
import { Dialog, Toast } from "vant";
import { deleterecommand } from "../../api/modules/home";
import AnEmpty from "../../views/Home/components/an-empty";

import {
  getComment,
  discuss,
  answer,
  admire,
  showAnswer,
  offAdmire,
  commitCount,
  SubjectUser,
  reportSubmit
} from "../../api/modules/home";
import { recommand } from "../../api/modules/mine";
import { mapState, mapMutations } from "vuex";
export default {
  name: "an-comment",
  components: { AnEmpty, Dialog },
  props: ["showPopup", "item"],
  data() {
    return {
      showType: false,
      curentIndex: "",

      resportList: [
        {
          type: "1",
          name: "广告营销"
        },
        {
          type: "2",
          name: "涉及诈骗"
        },
        {
          type: "3",
          name: "色情低俗"
        },
        {
          type: "4",
          name: "疑似违规"
        },
        {
          type: "5",
          name: "其他原因"
        },
        {
          type: "7",
          name: "提交"
        }
      ],
      reportItem: {},
      finished: false,
      loading: false,
      replyType: 1, //1   评论1   回复评论0
      page: 1,
      limit: 10,
      selectItem: {},
      list: [],
      // selectItem: {},
      placeholder: "可以在这里输入内容哦",
      // list: [],
      // both: false,
      // limit: 10,
      showContent: false,
      // page: 1,
      // order: "praise", //默认值为praise（点赞数）可选值为（praise，created_at）
      show: false,
      // loading: false,
      // finished: false,
      content: "",
      // str: "",
      // toUser: {},
      // replyType: 1, // 1为评论2为回复
      // currentReplyIndex: -1, // 当前被回复的评论下标
      commitCount: 0
      // id: -1,
      // type: 1,
      // children_id: ""
    };
  },
  model: {
    prop: "showPopup",
    event: "changeShow"
  },
  // created() {
  //   console.log(this.item)
  // },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      Item: state => state.home.Item
    })
  },
  mounted() {
    console.log(this.item);
  },
  watch: {
    showPopup(val) {
      this.show = val;
      if (val && this.list.length == 0) {
        this.getcomment();
      }
    },
    show(val) {
      this.$emit("changeShow", val);
    }
  },
  methods: {
    ...mapMutations({
      changeData: "home/changeData"
    }),
    ToReport(index, v) {
      const { type } = v;

      // const { userId, id } = user;
      console.log(index);
      if (index == 5) {
        {
          const { userId, id } = this.reportItem;
          reportSubmit({
            userId: this.userInfo.id,
            reportUserId: userId,
            type: 2,
            objectId: id,
            reason: type
          }).then(res => {
            Toast({
              message: "举报成功",
              duration: 1500
            });
            this.$nextTick(function() {
              this.showType = false;
            });
          });
          // reportSubmit({
          //   UserId: this.userInfo.id,
          //   ReportUserId: userId,
          //   Type: 1,
          //   ObjectId: id,
          //   Reason: type
          // }).then(res => {
          //   Toast({
          //     message: "举报成功",
          //     duration: 1500
          //   });
          //   this.showType = false;
          // });
        }
        this.curentIndex = "";
      } else {
        this.curentIndex = index;
      }
    },
    reportType(v) {
      // this.changeData({
      //   key: "isreportItem",
      //   val: v
      // }),
      this.$nextTick(function() {
        this.reportItem = v;
        this.showType = true;
      });
      console.log(v);
    },
    CLickparse(v1) {
      recommand({
        id: v1.id,
        type: v1.isLike ? 2 : 1
      }).then(() => {
        (v1.isLike = !v1.isLike), v1.isLike ? v1.likeCount++ : v1.likeCount--;
      });
    },
    replayTworend(v1) {
      this.replyType = 0;
      this.content = "";
      this.placeholder = "回复:" + v1.userInfo.nickname;
      this.selectItem = v1;
    },
    //单击一级评论信息
    replayClick(v) {
      this.replyType = 0;
      this.selectItem = v;
      this.content = "";
      this.placeholder = "回复:" + v.userInfo.nickname;
    },
    /**
     * 展开还是评论
     */
    showcontent(item) {
      item.isShowBoth = !item.isShowBoth;
    },
    /**
     * 回复还是评论
     *
     */
    hidden,
    reply() {
      console.log(this.Item);
      if (this.content == "") {
        Toast({
          message: "请先输入消息",
          duration: 1500
        });
        return false;
      }

      let threadStarterId = 0;
      let parentId = 0;
      let { userId } = this.Item;
      let { content } = this;
      let replyUserId = 0;
      // 这个说明直接是评论
      // if (this.replyType) {
      if (JSON.stringify(this.selectItem) == "{}") {
        replyUserId = userId;
      } else {
        // 这个说明是第一级别
        if (this.selectItem.parentId == 0) {
          // 一级
          parentId = this.selectItem.id;
          threadStarterId = this.selectItem.id;
          replyUserId = this.selectItem.userId;
        } else {
          console.log(this.selectItem);
          console.log("---------------");

          parentId = this.selectItem.id;
          replyUserId = this.selectItem.userId;
          // =this.selectItem.parentId;
          this.list.forEach(e => {
            e.replies.forEach(v1 => {
              if ((v1.id = this.selectItem.id)) {
                // console.log(e)
                threadStarterId = e.id;
              }
            });
          });
        }
      }

      discuss({
        blogId: userId,
        content,
        threadStarterId,
        parentId: parentId,
        replyUserId: replyUserId
      }).then(res => {
        this.content = "";
        this.getcomment();
        // console.log(res
        // console.log(this.list)
      });

      // } else {
      //   //给评论的回复
      //   console.log();
      // }
    },
    /**
     *
     * 下拉滚动加载更多
     */

    onLoad() {
      alert("assssdsd");
      this.page++;
      this.getcomment();
    },
    /***
     *
     * @获获取评论列表数据
     *
     *
     */
    getcomment() {
      const { userId } = this.Item;
      const { limit, page } = this;
      getComment({ limit, page, blogId: userId }).then(res => {
        console.log(res);
        this.commitCount = res.count;
        // this.list =
        if (this.list.length == 0) {
          console.log("----置顶");
          this.finished = true;
        }
        // if(this.page==1){
        this.list = res.comments;
        // }else{
        // let temp=Array.from(new Set([...this.list,...res.comments]))
        // console.log(temp)
        // }

        console.log("获取的数据");
        console.log(this.list);
        //  this.loading = false;

        this.list.forEach(e => {
          e.content.length > 30 ? (e.isShowBoth = true) : e.isShowBoth == false;
          console.log(e.isShowBoth);
          e.replies.forEach(v1 => {
            v1.content.length > 30
              ? (v1.isShowBoth = true)
              : v1.isShowBoth == false;
          });
        });
      });
    }

    // deleteItem(v) {
    //     console.log('这是选中的')
    //     console.log(v)
    //   this.selectItem = v;
    // },
    // deletRemoent() {
    //   deleterecommand({
    //     comment_id: this.selectItem.id
    //   }).then(res => {
    //     Toast({
    //       message: res,
    //       duration: 1500
    //     });
    //       var selectItem = {};
    //     this.showContent = false;
    //     if (this.selectItem.parent_id != 0) {
    //       this.list.forEach((v, i) => {
    //         if (v.id == this.selectItem.parent_id) {
    //           v.child.replyData.forEach((v1, i2) => {
    //             if (v1.id == this.selectItem.id) {
    //               selectItem=v;
    //               this.children_id = i2;
    //             }
    //           });
    //         }
    //       });
    //       selectItem.child.replyData.splice(this.children_id, 1)
    //     } else {
    //       this.list.forEach((v, i) => {
    //         if (v.id == this.selectItem.id) {
    //           this.list.splice(i, 1);
    //         }
    //       });
    //     }

    //     //
    //   });
    // },
    // hidden,
    // // replyType 为2是回复 1是评论
    // reply() {
    //   if (this.content == "") return;
    //   if (this.replyType == 2) {
    //     const { content } = this;
    //     answer({ ...this.toUser, content }).then(res => {
    //       if (this.currentReplyIndex > -1) {
    //         this.list[this.currentReplyIndex].child.replyData.push(res);
    //         this.currentReplyIndex = -1;
    //         this.commitCount++;
    //         this.item.comment_times++;
    //       }
    //     });
    //   } else {
    //     const { id, type, userInfo, content, item } = this;
    //     // console.log(id)
    //     // console.log(this.)
    //     discuss(item.id, content).then(res => {
    //       this.list.push(res);
    //       this.commitCount++;
    //       this.item.comment_times++;
    //     });
    //   }
    //   this.installReply();
    // },
    // /*** 显示更多回复
    //  * @param item
    //  * @param parentIndex
    //  * @param limit
    //  */
    // showMoreReply(item, parentIndex, limit) {
    //   const { comment_id } = this.list[parentIndex].child.replyData[0];
    //   const { type } = item;
    //   if (!item.page) {
    //     item.page = 1;
    //     item.limit = limit > 10 ? 10 : limit;
    //   }
    //   showAnswer({ comment_id, type, page: item.page, limit: item.limit }).then(
    //     res => {
    //       this.list[parentIndex].child.replyData = [
    //         ...this.list[parentIndex].child.replyData,
    //         ...res.replyData
    //       ];
    //       if (item.child.total > item.child.replyData.length) {
    //         item.page++;
    //       }
    //     }
    //   );
    // },
    // // getCommentCount(){
    // //     const {id,type} = this.item;
    // //     commitCount(id,type).then(res=>{
    // //         this.commitCount = res;
    // //     })
    // // },
    // // 初始化输入框内容及评论参数
    // installReply() {
    //   this.toUser = {};
    //   this.replyType = 1;
    //   this.placeholder = "可以在这里输入内容哦";
    //   this.content = "";
    // },
    // // 点赞回复
    // AdmireForReply(item, index, parentIndex) {
    //   const { id, type, praise_status } = item;
    //   let list = this.list;
    //   const cate = "comment";
    //   if (praise_status == 0) {
    //     admire({ id, type, cate }).then(res => {
    //       list[parentIndex].child.replyData[index].praise_status = 1;
    //       list[parentIndex].child.replyData[index].praise++;
    //     });
    //   } else {
    //     offAdmire({ id, type, cate }).then(res => {
    //       list[parentIndex].child.replyData[index].praise_status = 0;
    //       list[parentIndex].child.replyData[index].praise--;
    //     });
    //   }
    // },
    // // 点赞评论
    // Admire(item, index) {
    //   const { id, type, praise_status } = item;
    //   let list = this.list;
    //   const cate = "comment";
    //   if (praise_status == 0) {
    //     admire({ id, type, cate }).then(res => {
    //       list[index].praise_status = 1;
    //       list[index].praise++;
    //     });
    //   } else {
    //     offAdmire({ id, type, cate }).then(res => {
    //       list[index].praise_status = 0;
    //       list[index].praise--;
    //     });
    //   }
    // },
    // // 获取评论列表
    // getcomment() {
    //   const { limit, page } = this;
    //   const { id, type } = this.item;
    //   getComment(limit, page, id).then(response => {
    //   console.log(response)
    //     var res = response.Data;
    //     this.commitCount = response.count;
    //     res.forEach(r => {
    //       if (r.child.replyData.length > 0) {
    //         r.child.replyData.forEach(item => {
    //           item.showBoth = false;
    //         });
    //       }
    //       r.showBoth = false;
    //     });
    //     if (page == 1) {
    //       this.list = res;
    //     } else {
    //       this.list = this.list.concat(res);
    //     }

    //     if (res.length == 0) {
    //       this.finished = true;
    //     }
    //   });
    // },
    // //对评论回复
    // replyForComment(item, index) {
    //   if (item.user_id == this.userInfo.id) {
    //     this.showContent = true;
    //   }
    //   this.selectItem=item;
    //   console.log(item.id + "这是啥");

    //   this.currentReplyIndex = index;
    //   const { userInfo, type } = item;
    //   let from_name = this.userInfo.nickname;
    //   const reply_type = "comment";
    //   const from_uid = this.userInfo.id;
    //   const to_uid = item.from_uid;
    //   const comment_id = item.id;

    //   this.replyType = 2;
    //   this.toUser = {
    //     from_name,
    //     type,
    //     reply_type,
    //     from_uid,
    //     to_uid,
    //     comment_id
    //   };
    //   this.placeholder = `回复${from_name}：`;
    // },
    // // 对回复内容再回复
    // replyForReply(item, index) {
    //   // this.showContent=true;
    //   //   this.deletRemoent(item);
    //   this.replyForComment(item, index);

    //   this.toUser.reply_type = "reply";
    //   this.toUser.comment_id = item.id;
    // },
    // /**
    //  * 展开全部内容
    //  * @param i 评论下标
    //  * @param n 评论内容
    //  * @param index 回复下标
    //  * @param item 回复内容
    //  */
    // showBoth(i, n, index, item) {
    //   console.log(...this.list);
    //   let list = [...this.list];
    //   if (typeof index !== "undefined") {
    //     let obj = { ...item };
    //     obj.child[i].showBoth = !n.showBoth;
    //     list[index] = obj;

    //     console.log(obj);
    //   } else {
    //     list[i].showBoth = !n.showBoth;
    //   }
    //   this.list = list;
    // },
    // /**
    //  * 分页加载更多评论
    //  */
    // onLoad() {
    //   this.page++;
    //   this.getcomment();
    // }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/safeArea";
@import "../../assets/font";
.active {
  border: 1px solid greenyellow;
}
/deep/ .van-dialog {
  border-radius: 0px !important;
  width: 210px;
  position: absolute;
  // height: 129px;
  z-index: 20000 !important;
  background: rgba(40, 52, 74, 1);
}
/deep/ .van-empty__image {
  width: 97px !important;
  height: 97px !important;
}
.comment {
  height: calc(481px + @bottom);
  // background: #28344a;
  z-index: 20000 !important;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-radius: 22px 22px 0px 0px;
  .top_content {
    text-align: center;
    margin-top: 30px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .bottom {
    text-align: right;
    margin-right: 22px;
    margin-top: 30px;
    span:nth-child(1) {
      margin-right: 30px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    span:nth-child(2) {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(35, 149, 255, 1);
    }
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 13px;
    padding-bottom: 13px;
    height: 45px;
    box-sizing: border-box;
    border-bottom: 1px solid #f4f4f4;
    .count {
      color: #999999;
      font-size: 16px;
    }
    .icon {
      width: 19px;
      height: 19px;
      margin-right: 11px;
    }
    span {
      font-size: @font16;
      color: #333333;
    }
  }
  .commentList {
    height: 413px;
    width: 100%;
    overflow-y: auto;
    padding-top: 15px;
    padding-bottom: 30px;
    box-sizing: border-box;
  }
  // .commentList {
  //
  //   .content {
  //     margin-bottom: 20px;
  //     .head {
  //       display: flex;
  //       align-items: center;
  //       margin-bottom: 15px;
  //       .avatar {
  //         margin-left: 15px;
  //         margin-right: 10px;
  //         width: 35px;
  //         height: 35px;
  //       }
  //       .userInfo {
  //         display: flex;
  //         flex-direction: row;
  //         align-items: center;
  //         justify-content: space-between;
  //         flex: 1;
  //         .name {
  //           color: #ffffff;
  //           font-size: 16px;
  //         }
  //         .time {
  //           font-size: 15px;
  //           color: #666666;
  //           margin-right: 20px;
  //         }
  //       }
  //       .star {
  //         display: flex;
  //         align-items: center;
  //         justify-content: flex-start;
  //         margin-left: auto;
  //         margin-right: 26px;
  //         .starIcon {
  //           width: 19px;
  //           height: 19px;
  //           margin-right: 6px;
  //         }
  //         .num {
  //           color: #999999;
  //           font-size: 12px;
  //         }
  //       }
  //     }
  //     .text {
  //       width: 288px;
  //       font-size: 15px;
  //       font-family: Source Han Sans CN;
  //       font-weight: 400;
  //       color: #ffffff;
  //       margin: 0 auto 0 61px;
  //       .btn {
  //         font-size: 15px;
  //         color: #f57008;
  //       }
  //     }
  //     .more {
  //       height: auto;
  //     }
  //     .child {
  //       margin-top: 19px;
  //       .user {
  //         display: flex;
  //         align-items: center;
  //         justify-content: flex-start;
  //         .avatar {
  //           width: 25px;
  //           height: 25px;
  //           border-radius: 50%;
  //           margin-left: 60px;
  //           margin-right: 10px;
  //         }
  //         .info {
  //           display: flex;
  //           flex-direction: row;
  //           align-items: center;
  //           justify-content: space-between;
  //           flex: 1;
  //           span:nth-of-type(1) {
  //             font-size: 16px;
  //             color: #ffffff;
  //           }
  //           span:nth-of-type(2) {
  //             color: #666666;
  //             margin-right: 21px;
  //             font-size: 15px;
  //           }
  //         }
  //         .like {
  //           display: flex;
  //           margin-left: auto;
  //           margin-right: 25px;
  //           .starIcon {
  //             width: 19px;
  //             height: 19px;
  //             margin-right: 6px;
  //           }
  //           span {
  //             font-size: @font12;
  //             color: #999999;
  //           }
  //         }
  //       }
  //       .reply {
  //         padding-left: 95px;
  //         padding-right: 24px;
  //         width: 100%;
  //         box-sizing: border-box;
  //         white-space: pre-wrap;
  //         font-size: 15px;
  //         color: #ffffff;
  //         span {
  //           color: #f57008;
  //         }
  //       }
  //     }
  //     .showMore {
  //       display: flex;
  //       align-items: center;
  //       justify-content: flex-start;
  //       margin-top: 14px;
  //       .line {
  //         width: 30px;
  //         height: 2px;
  //         background: rgba(187, 187, 187, 1);
  //         margin-left: 60px;
  //         margin-right: 5px;
  //       }
  //       .num {
  //         color: #999999;
  //         font-size: 12px;
  //         /deep/ .van-icon {
  //           margin-left: 4px;
  //         }
  //       }
  //     }
  //   }
  // }
  .inputBox {
    position: absolute;
    left: 0;
    bottom: 0;
    padding-bottom: @bottom;
    height: 50px;
    background: #ffffffff;
    width: 100%;
    z-index: 2003 !important;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .textfield {
      width: 273px;
      height: 34px;
      background: rgba(240, 241, 242, 1);
      opacity: 1;
      border-radius: 17px;
      color: #000000;
      // border-radius: 5px;
      text-indent: 11px;
      margin-left: 15px;
      margin-right: 10px;
    }
    .send {
      width: 61px;
      height: 34px;
      background: rgba(148, 190, 50, 1);
      opacity: 1;
      border-radius: 18px;
      text-align: center;
      line-height: 34px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      // line-height:20px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
// 这是新的评论信息
.One_recommad {
  height: 37px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .left_info {
    display: flex;
    align-items: center;
    margin-right: auto;
    .nickname {
      div:nth-child(1) {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        // line-height:17px;
        color: rgba(159, 162, 179, 1);
      }
    }
  }
}
//用户内评论一级
.content_remmend {
  padding: 10px 60px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  // line-height:22px;
  color: rgba(0, 0, 0, 1);
}
img {
  margin-right: 7px;
  height: 33px;
  width: 33px;
  border-radius: 50%;
}
.right_Icon {
  display: flex;
  align-items: center;
  div:nth-child(1) {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 17px;
    color: rgba(30, 41, 39, 1);
  }
}
.ardound_content {
  display: flex;
  align-items: center;
  img {
    height: 0.88rem;
    width: 0.88rem;
    border-radius: 50%;
    // margin-right: 10px;
    // margin-left: 52px;
  }

  .two_remend {
    display: flex;
    align-items: center;
    margin-right: auto;
  }
  .right_Icon {
    display: flex;
    align-items: center;
  }
}
.two_content_remend {
  margin-left: 52px;
  padding-right: 0.6rem;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.content_two {
  padding-left: 34px;
  /* margin-left: 1.53333rem; */
  width: 5.8rem;
  overflow-y: scroll;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 20px;

  // line-height:17px;
  color: rgba(30, 41, 39, 1);
  .replayname {
    color: #000000;
    font-weight: bolder;
  }
}
.showUpdate {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  // line-height:20px;
  color: rgba(148, 190, 50, 1);
}
.reportItem {
  font-size: 14px;
  color: #000000;
  padding: 5px;
}
.reportItem_sleect {
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.common {
  background: rgba(255, 78, 78, 1);
  opacity: 1;
  border-radius: 25px;
  font-size: 17px;
  font-family: PingFang SC;
  font-weight: 500;
  // line-height:24px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.cell {
  text-align: center;
  width: 115px;
  height: 36px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  line-height: 36px;
  border-radius: 25px;
  margin: 0px auto;
  margin-bottom: 19px;
}
.cell:nth-child(2) {
  .common();
}
.cell:nth-child(3) {
  .common();
}
.cell:last-child {
  width: 139px;
  height: 44px;
  background: rgba(148, 190, 50, 1);
  opacity: 1;
  border-radius: 25px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 500;
  // line-height:28px;
  color: rgba(255, 255, 255, 1);
  // .common()
}
.content_report {
  display: flex;
  margin: 0px auto;
  justify-content: center;
  align-items: center;
  width: 156px;
  height: 49px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-radius: 25px;
}
</style>

