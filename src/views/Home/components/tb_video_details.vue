<template>
  <div class="container tb-video-details">
    <An_header>
      <div slot="right" style="height: 100%;display: flex;align-items: center">
        <div class="rigth_icon">
          <div @click="isOpen">
            <img
              src="@/assets/images/home/icon_home_more.png"
              style="vertical-align: middle"
              alt
              srcset
            />
          </div>
        </div>
      </div>
      <!-- </div> -->
    </An_header>
    <div class="main">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        :options="playerOptions"
      ></video-player>

      <div class="left_" @click="toRouter('/OthersUserInfo')">
        <img
          :src="VideoInfo.userInfo && VideoInfo.userInfo.avatar"
          v-if="VideoInfo.userInfo && VideoInfo.userInfo.avatar"
          alt
          srcset
        />
        <!-- <img src="@/assets/images/home/icon_head.png" v-else alt srcset /> -->
        <div
          v-show="VideoInfo.userInfo && VideoInfo.userInfo.nickname"
          class="nickname"
        >{{VideoInfo.userInfo && VideoInfo.userInfo.nickname}}</div>
      </div>
      <div class="right_select">
        <img class="downL" src="@/assets/images/home/jian.png" @click="toDownload()" alt /> -->
        <an-controllers :item="videoItem"   @showComment="getShow"/>
      </div>
    </div>

    <van-dialog
      v-model="isOpen_dialg"
      width="210px"
      title
      :showConfirmButton="false"
      closeOnClickOverlay
    >
      <div class="content_center_report">
        <div class="reportItem" @click.stop="toCastScreen">
          <img src="@/assets/images/home/dianshi@3x.png" alt />
          <span>投屏</span>
        </div>
        <div class="reportItem" @click="OpenShoereport()">
          <img src="@/assets/images/home/icon_report.png" alt />
          <span>举报TA</span>
        </div>
        <div class="reportItem" @click="AddBlock()">
          <img src="@/assets/images/home/icon_blacklist.png" alt />
          <span>拉黑TA</span>
        </div>
        <img
          src="@/assets/images/main/icon_screen_close.png"
          class="closeItem"
          @click="OpenClose"
          alt
        />
      </div>
    </van-dialog>
    <van-dialog
      width="210px"
      class="showContent"
      :showConfirmButton="false"
      closeOnClickOverlay
      v-model="showType"
    >
      <div class-="reportItem_type">
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
 <an-comment v-model="showComment"   />
  </div>
</template>
<script>
import {
  offAdmire,
  dislike,
  offdislike,
  changeCare,
  subjectDel,
  unlikeContent,
  admire,
  offadmire,
  getReport,
  index,
  SubjectUser,
  reportSubmit
} from "../../../api/modules/home";
import config from "../../../config/index";
import An_header from "../../../components/header/an-header.vue";
import { getVideo } from "../../../api/modules/player";
import { mapState, mapMutations } from "vuex";

import AnComment from '../../../components/comment/an-comment'
import { reportSomeone, Videoplayer } from "../../../api/modules/mine";
import { cancelLahei } from "../../../api/modules/mine";

import { Toast } from "vant";
// import { , Tip_off, } from "../../../api/modules/home";

import AnControllers from "../../../components/controllers/an-controllers";
export default {
  components: {
    AnControllers,
    An_header,
    Toast,
    AnComment
  },
  computed: {
    ...mapState({
      videoURL: state => state.videoURL,
      userInfo: state => state.user.userInfo,
      videoItem: state => state.home.videoItem
    }),
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  data() {
    return {
      showComment: false,
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
      // resportList: [],
      showType: false,
      isOpen_dialg: false,
      VideoInfo: {},
      isplay: false,
      playerOptions: {
        playbackRates: [], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        preload: "auto", //视频预加载
        muted: false, //默认情况下将会消除任何音频。
        loop: false, //导致视频一结束就重新开始。
        language: "zh-CN",
        aspectRatio: "3:4", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            withCredentials: false,
            type: "application/x-mpegURL", // 类型
            src: "" // 路径
          }
        ],
        hls: true,
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: true,
          controlBar: false, //全屏按钮
          currentTimeDisplay: true
        }
      }
    };
  },
  mounted() {
    this.$store.commit("changeData", {
      key: "videoURL",
      val: ""
    });
  },
  activated() {
    this.getInit();
  },
  methods: {
    ...mapMutations({
      changeData: "home/changeData"
    }),
    getShow(val) {
      this.showComment = val;
      console.log(this.VideoInfo)
      this.changeData({ key: "Item", val: this.videoItem });
      // console.log(this.item)
      // this.SelectItem=this.item
      //  this.item=this.item;
    },
    ToReport(index, v) {
      const { type } = v;

      const { userId, id } = this.videoItem;

      console.log(index);
      if (index == 5) {
        {
          reportSubmit({
            UserId: this.userInfo.id,
            ReportUserId: userId,
            Type: 1,
            ObjectId: id,
            Reason: type
          }).then(res => {
            Toast({
              message: "举报成功",
              duration: 1500
            });
            this.showType = false;
          });
        }
        this.curentIndex = "";
      } else {
        this.curentIndex = index;
      }

      // console.log(user, type);
      // const { user_id } = user;
      // reportSomeone({
      //   type: type,
      //   report_user_id: user_id
      // }).then(res => {
      //   Toast({
      //     message: "举报成功",
      //     duration: 1500
      //   });
      //   this.$nextTick(function() {
      //     this.showType = false;
      //   });
      //   // console.log(res)
      // });
    },
    AddBlock() {
      // console.log(item);
      const { id } = this.userInfo;
      cancelLahei({
        userId: id,
        blackUserId: this.videoItem.userId,
        mark: 1,
        blackOptType: 1
      }).then(() => {
        Toast({
          message: "已拉黑",
          duration: 1500
        });
        this.$nextTick(function() {
          this.isOpen_dialg = false;
        });
      });
    },
    OpenShoereport() {
      this.$nextTick(function() {
        this.isOpen_dialg = false;
        this.showType = true;
      });
    },
    OpenClose() {
      this.$nextTick(function() {
        this.isOpen_dialg = false;
      });
    },
    toCastScreen() {
      if (!this.playerOptions.sources[0].src) {
        Toast("请等待视频源");
        return;
      }
      this.$nextTick(function() {
        this.isOpen_dialg = false;
        this.$router.push({
          path: "/castScreen",
          query: { id: this.playerOptions.sources[0].src }
        });
      });
    },
    is_watch() {
      console.log(!this.VideoInfo.is_watch);
      if (!this.VideoInfo.is_watch) {
        SubjectUser({
          id: this.VideoInfo.user_id
        }).then(res => {
          console.log(res);
          this.VideoInfo.is_watch = 1;
        });
      }
    },
    toRouter(url) {
      this.$router.push({
        path: url,
        query: {
          id: this.VideoInfo.id
        }
      });
    },
    // ToReport(type) {
    //   // console.log(user, type);
    //   const { user_id } = this.VideoInfo;
    //   reportSomeone({
    //     type: type,
    //     report_user_id: user_id
    //   }).then(res => {
    //     Toast({
    //       message: "举报成功",
    //       duration: 1500
    //     });
    //     this.$nextTick(function() {
    //       this.showType = false;
    //     });
    //     // console.log(res)
    //   });
    // },
    parse() {
      const { id, type } = this.VideoInfo;
      if (this.VideoInfo.praise_status == 0) {
        admire({ id, type, cate }).then(res => {
          this.VideoInfo.praise_status = 1;
          this.VideoInfo.praise_times++;
        });
      } else {
        offAdmire({ id, type, cate }).then(res => {
          this.VideoInfo.praise_status = 0;
          this.VideoInfo.praise_times--;
        });
      }
    },
    isOpen() {
      this.isOpen_dialg = true;
    },
    dislikeContent() {
      this.isOpen_dialg = false;
      const { id } = this.VideoInfo;
      console.log(this.VideoInfo);
      const type = 4;
      unlikeContent({ topic_id: id }).then(res => {
        Toast("减少类似内容推荐");
        this.$emit("getList", true);
      });
    },
    // 不喜欢标题
    // dislikeTitle() {
    //   this.isOpen_dialg = false;
    //   const { subject_id } = this.VideoInfo;
    //   const type = 4;
    //   subjectDel({ type, subject_id }).then(res => {
    //     Toast("将不推荐该Ya组相关内容");
    //   });
    // },
    getReportType() {
      getReport().then(res => {
        this.resportList = res;
      });
    },
    kill() {
      //
      // this.isOpen_dialg = true;

      this.isOpen_dialg = false;
      this.showType = true;
      this.getReportType();
      // this.$nextTick(function() {
      //   this.$router.push({
      //     path: "/report",
      //     // query: {
      //     //   to_user_id: this.VideoInfo.user_id,
      //     //   topic_id: this.VideoInfo.id,
      //     //   topic_type: this.VideoInfo.type
      //     // }
      //   });
      // });
    },
    getInit() {
      // this.playerOptions.sources[0].src= url;
      this.playerOptions.poster = this.videoItem.images[0].url;
      const { iuid, fileName } = this.videoItem.images[0];
      console.log(iuid, fileName);
      // let data = Videoplayer({
      //   iuid,
      //   fileName
      // });
      var url = `${config.baseURI}/mmApi/shortVideo/playShortVideo/${iuid}/${fileName}`;
      console.log("url==========" + url);
      this.playerOptions.sources[0].src = url;
      // console.log(`${config.baseURI}/mmApi/shortVideo/playShortVideo/${iuid}/${fileName}`)
      // console.log(data);
      // getVideo({ topic_id: this.$route.query.id }).then(res => {
      //   that.VideoInfo = res.data;
      //   that.$store.commit("changeData", {
      //     key: "videoURL",
      //     val: that.VideoInfo.content
      //   });

      // this.VideoInfo=0;
      // this.VideoInfo.is_watch = 0;
      let that = this;
      setTimeout(() => {
        that.player.play();
        // that.player.playbackRate(1);
      }, 500);
      // });
    },
    Change(e) {
      console.log(e);
    },
    onPlayerPause() {
      // this.$refs.videoPlayer.player.play()
      // this.$refs.videoPlayer.player.pause()
      // console.log('暂停')
      // this.$refs.videoPlayer.player.pause()
    },
    onPlayerPlay(e) {
      this.isplay = !this.isplay;
    },

    toDownload(url) {

      if (typeof cordova !== "undefined") {
        if (!url) {
          url = this.playerOptions.sources[0].src;
        }

        let args = [
          this.videoItem.content,
          "",
          this.playerOptions.poster,
          url,
          `${this.groupId}&${this.videoId}`
        ];
        console.log("args=========" + args);
        cordova.exec(
          this.downloadCallBack,
          error => {
            // console.log("下载出错~~~");
          },
          "IOSPlugin",
          "download",
          [args]
        );
      }
    },
    downloadCallBack(code) {
      if (code == "1") {
        this.$toast("已加入下载列表");
      } else {
        this.$toast("影片已在下载中，请不要重复添加");
      }
    }
  },
  name: "tb-video-details"
};
</script>
<style lang="less" scoped>
@import "../../../assets/safeArea";
.right_select {
  display: flex;
}
.closeItem {
  width: 30px;
  height: 30px;
  margin-top: 30px;
}
.active {
  border: 1px solid greenyellow;
}
.reportItem_type {
  // .reportItem {
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // }
}
.content_center_report {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;

  .reportItem {
    display: flex;
    justify-content: center;
    width: 156px;
    height: 49px;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    align-items: center;
    border-radius: 25px;

    img {
      width: 21px;
      height: 21px;
      margin-right: 10px;
    }
  }
  .reportItem:nth-child(1) {
    margin-bottom: 18px;
  }
  .reportItem:nth-child(2) {
    margin-bottom: 18px;
  }
}
.tb-video-details {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: black;
  /deep/ .van-dialog {
    border-radius: 0px;
    background-color: transparent;
    // background: #28344a;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
  }
  .downL {
    position: fixed;
    bottom: calc(@bottom + 10px);
    width: 36px;
    right: 140px;
    height: 36px;
    // left: 200px;
  }

  .left_ {
    position: fixed;
    left: 0;
    margin-left: 20px;
    display: flex;
    align-items: center;

    // width: 280px;

    bottom: calc(@bottom + 10px);
    box-sizing: border-box;
    z-index: 99;
    img {
      width: 39px;
      height: 39px;
      border-radius: 50%;
    }
    .nickname {
      margin-left: 0.63333rem;
      // margin-right: 20px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .controllers {
    position: fixed;
    right: 0;
    margin-right: 10px;
    bottom: calc(@bottom + 1px);
    box-sizing: border-box;
    z-index: 99;
  }
  .header {
    background: transparent;
  }
  .video-player {
    height: 100%;
  }
  .cell_item {
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    color: #ffffff;
    height: 65px;
    display: flex;
    span {
      color: #ffffff;
    }
  }
  /deep/ .van-icon-arrow-left::before {
    color: white;
  }
  .rightICon {
    width: 28px;
    height: 28px;
  }
  .rigth_icon {
    .is_watch {
      //  background-color: #666666ff;
      border-radius: 6px;
      color: #ffffffff;
      padding: 5px 7px;
      box-sizing: border-box;
      font-size: 12px;
    }
    .is_not_watch {
      background: linear-gradient(
        180deg,
        rgba(35, 149, 255, 1),
        rgba(0, 80, 213, 1)
      );
      border-radius: 6px;
      color: #ffffffff;
      padding: 5px 7px;
      margin-right: 20px;
      box-sizing: border-box;
      font-size: 12px;
    }
    display: flex;
    align-items: center;
  }
  .main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin-top: 46px;
    background-color: #000;
    position: relative;
    background-color: #000;
    .video_pause_zhezhao {
      position: fixed;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      background: rgba(0, 0, 0, 0.7);
      width: 100%;
      height: 100%;
      z-index: 1000;
      img {
        width: 70px;
        height: 70px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -0.1033333rem;
        margin-left: -0.93333rem;
      }
    }

    .playicon {
      position: absolute;
      bottom: 3.7rem;
      left: 17px;
      font-size: 18px;
      color: #fff;
      width: 40px;
      height: 40px;
    }

    .jingdutiaozhegai {
      position: absolute;
      left: 80px;
      bottom: 143px;
      width: calc(100% - 40%);
      /* height: 30px; */
      /* height: 100px; */
      /* opacity: 0; */
      background-color: rebeccapurple;
    }

    .nav_top {
      position: absolute;
      width: 100%;
      height: 100px;
      z-index: 2222;
      bottom: 100px;
      padding: 0px 20px;
      box-sizing: border-box;
      left: 0px;
      color: #ffffff;
    }

    /deep/ .video-js .vjs-big-play-button {
      line-height: 60px;
      height: 60px;
      width: 60px;
      border: none;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      margin-left: -0.9rem;
    }

    /deep/ .vjs-control-bar {
      position: fixed;
      bottom: calc(40px + @bottom);
    }

    /deep/ .vjs-custom-skin > .video-js .vjs-big-play-button {
      line-height: 1.6rem !important;
      height: 1.6rem !important;
    }

    /deep/ .video-js .vjs-control-bar {
      background: none;
    }

    /deep/ .video-js .vjs-fullscreen-control {
      display: none;
    }

    .foot_bar {
      padding: 0px 14px;
      box-sizing: border-box;
      color: red;
      position: fixed;
      bottom: 20px;
      /* background-color: red; */
      width: 100%;
      display: flex;
      justify-content: space-around;
    }

    .foor_bar_item {
      display: flex;
      color: blueviolet;
      align-items: center;
      color: #ffffff;

      img {
        width: 19px;
        height: 19px;
        margin-right: 12px;
      }
    }
  }
  /deep/ .van-dialog__content {
    // width: 100%;
    position: relative;
  }
  /deep/ .van-dialog__footer {
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
  .footbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding-bottom: 0px;
    .Watch {
      height: 20px;
      padding: 4px 11px;
      background: rgba(148, 190, 50, 1);
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
      opacity: 1;
      border-radius: 22px;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
  // .cell {
  //   justify-content: center;
  //   border-bottom: 1px solid #eeeeee;
  //   color: #ffffff;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   padding: 20px;
  //   // height: 65px;
  // }
  .img_base {
    width: 19px;
    height: 19px;

    margin-right: 10px;
  }
}
</style>
