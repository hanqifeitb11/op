<template>
  <div class="container tb-video-details">
    <An_header>
      <!-- <div slot="right" style="height: 100%;display: flex;align-items: center">
        <div class="rigth_icon">
          <div>
            <img
              src="@/assets/images/main/icon_screen_close.png"
              style="vertical-align: middle"
              alt
              srcset
            />
          </div>
        </div> -->
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
    </div>

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
  SubjectUser
} from "../../api/modules/home";
import config from '../../config/index'
import An_header from "../header/an-header.vue";
import { getVideo } from "../../api/modules/player";
import { mapState } from "vuex";
import { reportSomeone, Videoplayer } from "../../api/modules/mine";

import { Toast } from "vant";
// import { , Tip_off, } from "../../../api/modules/home";

import AnControllers from "../../components/controllers/an-controllers";
export default {
  components: {
    AnControllers,
    An_header,
    Toast
  },
  computed: {
    ...mapState({
      videoURL: state => state.videoURL
    }),
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  data() {
    return {
      resportList: [],
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
            src: "", // 路径
          }
        ],
        hls: true,
        poster: "@/assets/images/main/bg_treehole.png", //你的封面地址
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
    // this.$store.commit("changeData", {
    //   key: "videoURL",
    //   val: ""
    // });
  },
  activated() {
    var url = this.$route.query.data;
    // debugger
    // url = 'http://192.168.2.43:8901/mmApi/shortVideo/playShortVideo/148a17ecbd0a27000e4f0c5f50b081bc/m3u8'
    this.playerOptions.sources[0].src = url;

    let that = this;
    setTimeout(() => {
      that.player.play();
    }, 500);
  },
  methods: {

    Change(e) {
      console.log(e);
    },
    onPlayerPause() {

    },
    onPlayerPlay(e) {
      this.isplay = !this.isplay;
    },
  },
  name: "tb-video-details"
};
</script>
<style lang="less" scoped>
@import "../../assets/safeArea";
.tb-video-details {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: black;
  /deep/ .van-dialog {
    border-radius: 0px;
    background: #28344a;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .downL{
    position: absolute;
    bottom: 30px;
    width:36px;
    height:36px;
    left: 200px;
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
    bottom: calc(@bottom + 20px);
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
      div{
            img{
          width: 30px;
          height: 30px;
      }
      }
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
    width: 100%;
  }
  .cell {
    justify-content: center;
    border-bottom: 1px solid #eeeeee;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    // height: 65px;
  }
  .img_base {
    width: 19px;
    height: 19px;

    margin-right: 10px;
  }
}
</style>
