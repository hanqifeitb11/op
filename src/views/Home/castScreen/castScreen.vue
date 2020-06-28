<template>
  <div class="castScreen container">

    <div class="titleDiv">
      <div v-if="!connecting" class="imgBox" @click="install">
         <img src="@/assets/images/home/icon_refresh.png" alt />
      </div>
       
      <div class="imgBox" @click="back">
         <img src="@/assets/images/home/icon_close.png" alt />
      </div>
    </div>
    <img alt class="bgi" />
    <div class="main">
      <div v-if="!connecting">
        <div class="connction_fail" v-if="is_not_search">
          <div :class="[is_not_search==2?'not_success':is_not_search==3?'connection_fial':'']">
            <img
              :src="is_not_search==2?require('@/assets/images/home/icon_screen_fail.png'):is_not_search==3?require('@/assets/images/home/icon_screen_faildevice.png'):''"
              alt
              srcset
            />
          </div>
          <div class="errorTxt">{{msg}}</div>
        </div>
        <div class="deviceList">
          <p
            class="name"
            v-for="(item,index) in deviceList"
            @click="connect(item)"
            :key="index"
          >{{item}}</p>
        </div>

        <div class="lodingPic" v-if="isLoading && !is_not_search">
          <img src="@/assets/images/home/u1311@3x.png" alt />
        </div>

        <div class="loding" v-if="isLoading && !is_not_search">
          <img src="@/assets/images/home/loading.gif" alt />
        </div>


        <p v-if="!is_not_search" class="tit">{{tip}}</p>
        <p class="mesa">当前Wi-Fi: {{wifiName}}</p>

      </div>
      <AnVideo
        :id="id"
        @close="close"
        :curDevice="curDevice"
        v-if="!is_not_search && connecting"
        :wifiName="wifiName"
      />
    </div>
  </div>
</template>

<script>
import AnVideo from "../../../components/video/video";
var num = 0;
var startPoint;
var timer;
import AnHeader from "@/components/header/an-header";
 import {mapState} from 'vuex'
export default {
  name: "castScreen",
  components: { AnVideo, AnHeader },
  data() {
    return {
      is_not_search: 0, //临时开启
      msg: "连接失败，请检查后重新连接",
      id: -1, // 当前播放的视频id
      str: "正在搜索可投屏设备",
      tip: "",
      wifiName: "未识别",
      deviceList: [],
      isLoading: true,
      linkSuccess: false,
      connecting: false,
      curDevice: {},
      timerId: 0,
      connectTime: 5000,
    };
  },
  computed: {

  },
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    if (typeof cordova != "undefined") {
      var self = this;
      cordova.exec(
        function(res) {
          self.wifiName = res;
        },
        err => {},
        "IOSPlugin",
        "getWifiName",
        [""]
      );
    }
    this.install();
    timer = setInterval(() => {
      if (num >= 3) {
        num = 0;
      } else {
        num++;
      }
      this.showStr();
    }, 500);
  },
  methods: {
    close(args) {
      this.connecting = true;
      this.$router.back();
    },
    back(){
      this.$router.back();
    },
    install() {
      var self = this;
      this.isLoading = true;
      this.is_not_search = 0;
      if (typeof cordova != "undefined") {
        cordova.exec(self.searchResult, error => {}, "IOSPlugin", "search", []);
      }
    },
    connect(item) {
      if (typeof cordova !== "undefined") {
        var self = this;
        this.connecting = true;
        this.tip = "正在连接设备";
        this.curDevice = item;
        this.msg = "";
        var idx = this.deviceList.indexOf(item);
        cordova.exec(this.connectResult, null, "IOSPlugin", "select", [
          idx,
          self.id
        ]);
        //连接设备 如果超时 就断开连接
        this.timerId = setTimeout(() => {
          this.stop();
          this.$toast("设备连接失败！");
          this.is_not_search = 2; //连接失败
          this.msg = "未搜索到设备，请检查后重试";
          this.connecting = false;
          this.install();
        }, this.connectTime);
      }
    },
    //设备连接成功开始播放
    connectResult() {
      clearTimeout(this.timerId);
      Toast("设备连接成功");
      this.connecting = true;
    },
    searchResult(ary) {
      if (!ary || !ary.length) {
        this.tip = "暂无可用设备";
        this.is_not_search = 3; //没有查找的
        this.msg = "未搜索到设备，请检查后重试";
      } else {
        this.tip = "当前可用设备：";
      }
      clearInterval(timer);
      this.deviceList = ary;
    },
    showStr() {
      switch (num) {
        case 0:
          this.tip = this.str;
          break;
        case 1:
          this.tip = `${this.str}.`;
          break;
        case 2:
          this.tip = `${this.str}..`;
          break;
        case 3:
          this.tip = `${this.str}...`;
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/safeArea";

.castScreen {
  .rightIcon {
    width: 18px;
  }
  .connction_fail {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 18px;

    margin-top: 150px;
    .errorTxt {
      margin-bottom: 20px;
    }

    height: 100%;
    .not_success {
      width: 56px;
      margin-bottom: 30px;
      height: 56px;
    }
    .connection_fial {
      width: 150px;
      margin-bottom: 30px;
      // height: 9px;
    }
  }
  .bgi {
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .titleDiv{
    position: relative;
    z-index: 12;
    // width: calc(100%-20px);
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    justify-content: space-between;
    margin-top: @top;

    .imgBox{
      width:36px;
      height:36px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(255,255,255,1);
      box-shadow:0px 2px 4px rgba(0,0,0,0.24);
      opacity:1;
      border-radius: 50%;
    }
    img{
      width: 20px;
      height: 20px;
      margin-left: 7px;
      margin-top: 8px;
    }
  }

  .main {
    z-index: 2;
    padding-top: 49px;
    position: fixed;
    bottom: 0;
    height: calc(100% - @top);
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;

    .tit {
      font-size: 16px;
      color: #000000;
      margin-bottom: 20px;
      text-align: center;
    }

    .mesa {
      font-size: 16px;
      color: #49CCC0;
      text-align: center;
      margin-bottom: 25px;
    }

    .deviceList{
      margin-top: 120px;
    }

    .name {
      margin: 0 auto 20px auto;
      width:220px;
      height:40px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 6px rgba(0,0,0,0.16);
      opacity:1;
      border-radius:20px;
      font-size:16px;
      text-align: center;
      line-height: 40px;
      color: #000000;
    }

    .loding {
      width: 60px;
      margin: 10px auto;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .lodingPic{
      width: 200px;
      margin: 0 auto;
    }
  }
}
</style>
