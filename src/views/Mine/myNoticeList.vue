<template>
  <div class="myNoticeList container">
    <an-header title="消息" />

    <div class="main">
      <img src="@/assets/images/home/bg_treehole.png" alt class="bg" />

      <div class="thumbs">
        <ul>
          <li v-for="(item, index) in dataList" :key="index" class="thumbsItem">
            <div class="tleft">
              <div class="rup">
                <!-- <img :src="item.avatar" alt="" @click.stop="toRouter('OthersUserInfo',item.user_id)"> -->
                <img
                  :src="item.userInfo.avatar"
                  alt
                  @click.stop="toRouter('OthersUserInfo',item.user_id)"
                />
                <div class="rlright">
                  <div class="rt1">{{item.userInfo.nickname}}</div>
                  <div class="rlDown">
                    <span class="rt2">{{item.msg}}你的作品</span>
                    <span class="rt3">{{item.created_at}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="tright">
              <img :src="item.topicInfo.icon" alt />
            </div>
          </li>
        </ul>

        <div v-if="!dataList.length">
          <div class="systemItem">
            <!-- <img class="sysItem" src="@/assets/images/mine/icon_head.png" alt /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AnHeader from "../../components/header/an-header.vue";
import Applications from "./components/applications";
import NoLogin from "./components/noLogin";
import Features from "./components/Features";
import { mapState } from "vuex";
import { systemMsg } from "../../api/modules/mine";

export default {
  name: "myNoticeList",
  components: { Features, NoLogin, Applications, AnHeader },
  data() {
    return {
      dataList: []
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      token: state => state.user.token
    })
  },
  activated() {
    systemMsg().then(res => {
      this.dataList = res;
    });
  },
  methods: {
    toRouter(url, id) {
      this.$router.push({
        path: `/${url}`,
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/font.less";
@import "../../assets/safeArea.less";

.myNoticeList {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .main {
    width: 100%;
    height: 100%;

    // margin-top: 46px;
    // background: black;
    // overflow: scroll;

    .bg {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      width: 100%;
      height: 100%;
      z-index:1;
    }

    .systemItem {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      img {
        margin-left: 15px;
        width: 39px;
        height: 39px;
        border-radius: 50%;
      }
      .st1 {
        margin-left: 11px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }

    .thumbs {
      position: fixed;
      z-index: 3;
    //   background: black;
    // background-color: #ffffff;
    //   background-color: rgba(0, 0, 0, 0.6);
      // height: 100%;
      top: 0px;
      left: 0px;
      right: 0px;
      margin-top: calc(@top + 46px);
      height: calc(100% - @top);
      overflow: scroll;
    }

    .thumbsItem {
      width: 345px;
      height: 123px;
      // background:rgba(255,255,255,1);
      // box-shadow:0px 2px 5px 0px rgba(0,0,1,0.3);
      border-radius: 5px;
      margin-left: 15px;
      margin-bottom: 15px;
      margin-top: 2px;
      display: inline-flex;
      .tleft {
        .rup {
          margin-top: 44px;
          margin-left: 15px;
          display: inline-flex;
          width: 219px;
          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin-top: -6px;
          }

          .rlright {
            margin-left: 15px;
          }

          .rt1 {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #ffffff;
            line-height: 24px;
          }

          .rlDown {
            margin-left: -50px;
            margin-top: 10px;
          }
          .rt2 {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #ffffff;
            line-height: 24px;
          }
          .rt3 {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #666666;
            line-height: 24px;
            margin-left: 16px;
          }
        }
        .rt4 {
          width: 219px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 24px;
          margin-left: 15px;
          // margin-top: 10px;
        }
        .rdown {
        }
      }
      .tright {
        margin: 17px 10px;

        img {
          width: 90px;
          height: 90px;
          border-radius: 10px;
        }

        .rt5 {
          background: rgba(235, 235, 235, 1);
          border-radius: 10px;
          font-size: 14px;

          padding: 14px 11px;
          width: 70px;
          height: 62px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #999999;
          line-height: 24px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
