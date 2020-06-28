<template>
  <div class="container videoplayers">
    <an-header rightIcon rightText="关闭投屏" :rightEvent="close"></an-header>
    <div class="mian">
      <!-- <img src="@/assets/images/home/bg.png" alt class="bgi" /> -->
      <div class="content">
        <div class="player">
          <img src="@/assets/images/home/icon_voiceadd.png" @click="changeVolume(1)" alt />
          <img
            @click="stop"
            :src="playing?require('@/assets/images/home/icon_videostop.png'):require('@/assets/images/home/icon_videoplay.png')"
            alt
          />
          <img src="@/assets/images/home/icon_voicereduce.png" @click="changeVolume(-1)" alt />
        </div>
        <div class="top">
          <div>当前连接设备:</div>
          <div>{{curDevice.title}}</div>
          <div class="wifi_name">当前Wi-Fi:{{wifiName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import//
import { getVideo } from "../../api/modules/player";
import AnHeader from "../../components/header/an-header";
export default {
  props: ["id", "curDevice", "wifiName"],
  components: { AnHeader },
  data() {
    return {
      playing: false,
      volume: 50,
      seek: 0
    };
  },
  methods: {
    changeVolume(i) {
      this.volume += i;
      if (typeof cordova != "undefined") {
        cordova.exec(null, null, "IOSPlugin", "volume", [this.volume]);
      }
    },
    close() {
      if (typeof cordova !== "undefined") {
        cordova.exec(null, null, "IOSPlugin", "close", []);
      }
      this.$emit("close", false);
    },
    stop() {
      this.playing = !this.playing;
      if (typeof cordova !== "undefined") {
        cordova.exec(null, null, "IOSPlugin", "playOrStop", [
          this.playing ? "1" : "0"
        ]);
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "../../assets/safeArea";
/deep/ .header {
  position: fixed;
  z-index: 10000000;
}
.videoplayers {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #ffffff;

  /deep/ .van-nav-bar__text {
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  /deep/ .vjs-big-play-button {
    background-color: rgba(0, 0, 0, 0.45);
    font-size: 3.5em;
    border-radius: 50%;
    height: 2em !important;
    margin-left: -1em;
    line-height: 2em !important;
    margin-top: -1em !important;
    width: 2em;
  }
  .mian {
    width: 100%;
    height: 100%;
    overflow: hidden;
    // position:width;
  }
  .nav {
    position: fixed;
    top: @top;
    left: 0px;
    right: 0px;
    height: 1.22667rem;
    color: #ffffff;
    z-index: 222;
    font-size: 24px;
    margin-left: 15px;
    // padding-top: 10px;
    display: flex;
    align-items: center;
    .title {
      margin-left: 10px;
      width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }

  .content {
    position: fixed;
    top: 0px;
    left: 0px;
    margin-top: calc(@top + 46px);
    height: calc(100% - @top);
    overflow: hidden;
    // display: flex;
    text-align: center;
    width: 100%;
    // align-items: center;
    justify-content: center;

    .top {
      margin-top: 100px;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #000000;
      line-height: 24px;
      .wifi_name {
        font-size: 14px;
        margin-top: 19px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #49CCC0;
      }
    }
    .player {
      display: flex;
      justify-content: space-around;
      margin-top: 100px;
      img {
        width: 35px;
        height: 36px;
      }
    }
    .bottom_foot {
      margin-top: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      // text-align: center;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #f57008;
      div:nth-child(1) {
        width: 100px;
      }
      img {
        width: 15px;
        height: 16px;
      }
    }
  }
}
</style>
