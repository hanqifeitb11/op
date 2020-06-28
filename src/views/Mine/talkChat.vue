<template>
  <div class="talkChat container">
    <An_header :title="nickname" />

    <div class="mline"></div>
    <!-- <img src="@/assets/images/home/bg.png" alt="" class="bgi"> -->
    <div class="info" ref="chatInfo">
      <!-- <div class="time">昨天 12:30</div> -->
      <ul class="chatUl">
        <li class="tree_hold" v-if="isSelectItem&&type==1">
          <div class="userInfo_top">
            <img :src="isSelectItem.userInfo.avatar" alt />
            <div class="detila">
              <div class="nickname">{{isSelectItem.userInfo.nickname}}</div>
              <div class="info_nma">
                {{isSelectItem.userInfo.constellation}}
                <span>{{isSelectItem.userInfo.addr}}</span>
              </div>
            </div>
          </div>
          <div class="content_tree">{{isSelectItem.content}}</div>
        </li>

        <li class="detail"></li>
        <li v-for="(item, index) in datalist" :key="index" class="chatitem">
          <!-- v-if="item.userId=='left'" -->
          <div class="item" v-if="!item.isMeSend">
            <img class="pic1" :src="item.replyUserAvatar" alt />
            <div class="chatTxt">{{item.content}}</div>
          </div>
          <!-- -->
          <div class="mineitem" v-else>
            <div class="chatTxt">{{item.content}}</div>
            <img class="pic" :src="item.userAvatar" alt />
          </div>
        </li>
      </ul>
    </div>

    <div class="downChat">
      <div class="chatBox">
        <input ref="chatinput" type="text" placeholder="快来发表你的见解~" />
      </div>
      <div class="chatsend" @click="sendToPhp">
        发送
        <!-- <img src="@/assets/images/home/icon_sending.png" alt=""> -->
      </div>
    </div>
  </div>
</template>
<script>
import An_header from "@/components/header/an-header.vue";
import {
  relationChat,
  relationSendChat,
  mailIndex
} from "../../api/modules/mine";
import { Toast } from "vant";
import { mapState } from "vuex";
var time = null;
export default {
  data() {
    return {
      uid: 0,
      datalist: [],
      nickname: "",
      type: "",
      remoendList: [],
      recommit: {},
      time: null
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      isSelectItem: state => state.home.isSelectItem
    })
  },
  components: {
    An_header
  },
  beforeDestroy() {
    // console.log('iizhixig')
    clearInterval(this.time)
    // clearInterval(this.time);
  },
  activated() {
    this.uid = this.$route.query.data;
    this.type = this.$route.query.type;
    this.getInit();
    // this.getSetTime();
    // this.getInit();
  },
  methods: {
    getSetTime() {
      // var _this = this;
      // _this.time = setInterval(() => {
      //   _this.getInit();
      // }, 10000);
    },
    getInit() {
      if (this.type == 1) {
        this.nickname = this.isSelectItem.userInfo.nickname;
      }
      relationChat({ replayUserId: this.uid }).then(res => {
        if (typeof res == "undefined") {
          this.datalist = [];
        } else {
          this.datalist = res.messageDetail;
          this.nickname =
            res.replyUserNickname || this.isSelectItem.userInfo.nickname;
          console.log(this.nickname);
          this.$nextTick(function() {
            this.updateScrollTop();
          });
        }
      });
    },
    sendToPhp() {
      var str = this.$refs.chatinput.value;
      if (!str.length) {
        // Toast('请输入您');
        return;
      }
      var _this = this;
      console.log(this.datalist);
      if (this.datalist.length == 0) {
        this.recommit.parentId = 0;
      } else {
        this.recommit.parentId = this.datalist[0].id;

        console.log(this.isSelectItem);

        // this.datalist.forEach(e => {
        //   console.log(e);
        //   if ((this.isSelectItem.id = e.userId || e.replyUserId)) {
        //     // console.log(e)
        //
        //   } else {
        //     this.recommit.parentId = 0;
        //   }
        // });
      }
      // console.log(this.isSelectItem);

      // this.datalist.length == 0
      //   ? (this.recommit.parentId = 0)
      //   : this.datalist.forEach(e => {
      //       if (
      //         e.userId == this.isSelectItem.userId ||
      //         e.replyUserId == this.isSelectItem.userId
      //       ) {
      //         this.recommit.parentId = this.datalist[0].id;
      //       } else {
      //         this.recommit.parentId = 0;
      //       }
      //     });

      this.recommit.blogId = this.type == 1 ? this.isSelectItem.id : 0;
      this.recommit.content = str;
      this.recommit.replyUserId =
        this.type == 1 ? this.isSelectItem.userId : this.uid;
      relationSendChat(this.recommit).then(res => {
        console.log(this.uid);
        var _this = this;
        // setTimeout(function() {
        // _this.getInit();
        // }, 1400);

        this.time = setInterval(function() {
          _this.getInit();
        }, 1000);
        // var obj = {
        //   content: str,
        //   replyUserAvatarL: this.userInfo.avatar
        // };
        // _this.datalist.push(obj);
        // _this.updateScrollTop();
        _this.$refs.chatinput.value = "";
        //      relationChat({ replayUserId: this.uid }).then(res => {
        //   console.log(res)
        //   if (typeof res == "undefined") {
        //     this.nickname = this.isSelectItem.userInfo.nickname;
        //   }
        //   this.datalist = res.messageDetail;
        //   this.nickname =
        //     res.replyUserNickname || this.isSelectItem.userInfo.nickname;
        //   console.log(this.nickname);
        //   this.updateScrollTop();
        // });
        // this.recommit.parentId = this.isSelectItem.id;
        // });

        // this.remoendList.filter(e => {
        //   if ((e.userId = this.isSelectItem.userId)) {
        //     console.log(e);
        //   }
      });
      // this.remoendList
      // if(this.type==1){

      // }
      //       relationSendChat({ id: this.uid, content: str }).then(res => {
      //         var tt = res;
      //
      //       });
    },
    updateScrollTop() {
      var _this = this;
      this.$nextTick(() => {
        _this.$refs.chatInfo.scrollTop = _this.$refs.chatInfo.scrollHeight;
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/safeArea";
@import "../../assets/font";
.tree_hold {
  width: 347px;
  // height:231px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-radius: 20px;
  margin: 0px auto;
  margin-top: 14px;
  .content_tree {
    padding: 20px;
    padding-top: 0px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    // line-height:20px;
    color: rgba(0, 0, 0, 1);
  }
  .userInfo_top {
    display: flex;
    align-items: center;
    img {
      width: 41px;
      height: 41px;
      border-radius: 50%;
      margin: 20px;
    }
  }
  .detila {
    display: flex;
    flex-direction: column;
    .nickname {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      // line-height:21px;
      color: rgba(0, 0, 0, 1);
    }
    .info_nma {
      .common_nam();
    }
  }
  .common_nam {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    // line-height:17px;
    color: rgba(0, 0, 0, 1);
    opacity: 1;
  }
}
.mline {
  position: relative;
  z-index: 2;
  width: 375px;
  height: 1px;
  background: rgba(231, 231, 231, 1);
  margin-top: calc(50px + @top);
}

.bgi {
  position: fixed;
  z-index: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.info {
  position: relative;
  z-index: 3;
  background-color: #f5f6f6ff;
  height: calc(100% - 105px - @top);
  overflow-y: scroll;
  .time {
    width: 80px;
    height: 20px;
    background: rgba(210, 211, 212, 1);
    border-radius: 10px;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    margin: 15px 148px;
    color: white;
  }

  .chatitem {
    width: 100%;
    .item {
      width: calc(100% -60px);
      margin: 15px;
      margin-right: 60px;
      display: inline-flex;
      // display: flex;
      // justify-content: space-between;

      .pic1 {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .chatTxt {
        max-width: 250px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        background: rgba(255, 255, 255, 1);
        opacity: 1;
        border-radius: 22px;
        // color: #ffffff;
        color: #000000;

        padding: 10px;
        // background: #000000;
        // border-radius:20px;
        // border: 1px solid rgba(102, 102, 102, 0.8);
        margin-left: 10px;
        box-sizing: border-box;
      }
    }

    .mineitem {
      margin: 15px;
      margin-right: 15px;
      margin-left: 61px;
      display: flex;
      justify-content: flex-end;
      width: calc(100% -61px);
      .pic {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .chatTxt {
        max-width: 220px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #000000;
        padding: 10px;
        background: rgba(255, 255, 255, 1);
        opacity: 1;
        border-radius: 22px;
        margin-right: 10px;
        word-wrap: break-word;
      }
    }
  }
}

.downChat {
  position: fixed;
  bottom: 0;
  width: 375px;
  height: 54px;
  background: #ffffffff;
  .chatBox {
    width: 280px;
    height: 34px;
    background: rgba(246, 246, 246, 1);
    opacity: 1;
    border-radius: 18px;
    margin-top: 8px;
    margin-left: 15px;
    input {
      width: 290px;
      padding: 0 5px;
      line-height: 34px;
      text-align: center;
      font-size: 16px;
      background: transparent;
    }
  }
  .chatsend {
    position: absolute;
    right: 15px;
    top: 0.1667rem;
    // width:60px;
    // height:28px;
    line-height: 28px;
    text-align: center;
    background: rgba(3, 121, 255, 1);
    opacity: 1;
    border-radius: 18px;
    // color: #F57008;
    color: #ffffffff;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    padding: 5px 17px;
    box-sizing: border-box;
    img {
      width: 34px;
      height: 34px;
    }
  }
}
</style>