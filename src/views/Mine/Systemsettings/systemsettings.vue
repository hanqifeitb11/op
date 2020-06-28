<template>
  <div class="container systemsettings">
    <An_Header title="系统设置"></An_Header>
    <div class="main">
      <!-- <img src="@/assets/images/home/bg.png" alt class="bgi" srcset /> -->

      <div class="content_item">
        <ul class="System_Settting">
          <li class="system_items" @click="ToRouter('account_security')">
            <div class="lei">
              <!-- <img src="@/assets/images/setting/icon_set_account.png" class="bg1" alt /> -->
              <span>账户与安全</span>
            </div>
            <div class="rig">
              <img src="@/assets/images/setting/icon_common_open.png" alt />
              <!-- <img src="@/assets/images/setting/icon_set_shield.png" alt=""><span>屏蔽管理</span> -->
            </div>
          </li>
          <!-- 'block_topics',1 -->
          <li class="system_items" @click="ToRoutes('block_topics',1)">
            <div class="lei">
              <span>屏蔽管理</span>
            </div>
            <div class="rig">
              <img src="@/assets/images/setting/icon_common_open.png" alt />
            </div>
          </li>

          <li class="system_items" @click="ToRouter('Feedback_edit')">
            <div class="lei">
              <!-- <img src="@/assets/images/setting/icon_set_help.png" class="bg1" alt srcset /> -->
              <span>帮助与反馈</span>
            </div>
            <div class="rig">
              <img src="@/assets/images/setting/icon_common_open.png" alt />
            </div>
          </li>
          <li class="system_items" @click="ToRouter('Amusing')">
            <div class="lei">
              <!-- <img src="@/assets/images/setting/icon_set_help.png" class="bg1" alt srcset /> -->
              <span>关于我们</span>
            </div>
            <div class="rig">
              <img src="@/assets/images/setting/icon_common_open.png" alt />
            </div>
          </li>
          <!-- <li class="system_items">
            <div class="submit"  @click="loginOut">退出登录</div>
          </li>-->
        </ul>
        <div class="btn_bottom">
          <!-- <div class="submit" v-else @click="login">登陆</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Switch, Toast } from "vant";

import An_Header from "../../../components/header/an-header.vue";
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    An_Header,
    Switch,
    Toast
  },
  name: "systemsettings",
  data() {
    return {
      //   bg_url: require("../../../assets/images/home/bg.png")，
      checked: false //是否开启消息推送
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      tiem_next: state => state.home.tiem_next
    })
  },

  methods: {
    ToRoutes(url, type) {
      this.$router.push({
        path: `/${url}`,
        query: {
          type: 1,
          title: "黑名单"
        }
      });
    },
    getChange(v) {
      console.log(v);
      if (v) {
        Toast({
          message: "已成功推送",
          duration: 1500
        });
      } else {
        Toast({
          message: "已关闭推送",
          duration: 1500
        });
      }
    },
    ...mapMutations({
      changeData: "user/changeData"
    }),
    ToRouter(url) {
      this.$router.push({ path: `/${url}` });
    },
    login() {
      this.$router.push("/login");
    },
    loginOut() {
      localStorage.clear();
      this.changeData({ key: "token", val: "" });
      this.changeData({ key: "userInfo", val: {} });
      clearInterval(window.tiem_next);
      //  this.changeData({key:'tiem_next',val:null})
      this.$nextTick(() => {
        this.$router.push({
          path: "/login"
        });
      });
    }
  }
};
</script>
<style scoped lang="less" scoped>
@import "../../../assets/safeArea";

/deep/ .van-nav-bar {
  border-bottom: 2px solid #c8c8c8;
}
.bgi {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.systemsettings {
  width: 100%;
  height: 100%;
  background-color: transparent;
  overflow: hidden;
  // /deep/ .van-nav-bar__title {
  //   color: #ffffff;
  // }
  /deep/ .van-switch {
    width: 51px;
    height: 26px;
  }
  /deep/ .van-switch__node {
    width: 24px;
    height: 24px;
  }
  /deep/ .van-nav-bar .van-icon {
    color: #01aeb7ff !important;
  }
  .main {
    width: 100%;
    height: 100%;
    .content_item {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      margin-top: calc(@top + 46px);
      overflow: scroll;
      height: calc(100% - @top);
    }
    .System_Settting {
      //
      box-sizing: border-box;
      z-index: 1;
      margin-top: 10px;
      // position: relative;

      // /* z-index: 2; *
    }
    .system_items:nth-child(5) {
      // text-align: center;
      margin-top: 39px;
      display: flex;
      justify-content: center;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      // line-height:22px;
      color: rgba(248, 81, 81, 1);
    }
    // .system_items:nth-child(1) {
    //   margin: 10px 0px;
    // }
    .system_items {
      padding: 0px 15px;
      line-height: 54px;
      border-bottom: 1px solid #cccccc;
      width: 100%;

      background-color: #ffffff;
      font-size: 16px;
      color: #000000;
      // padding: 0px 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .lei {
        display: flex;
        color: #000000ff;
        align-items: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        // line-height:22px;
        color: rgba(0, 0, 0, 1);

        .bg1 {
          margin-right: 15px;
        }

        img {
          width: 14px;
          height: 14px;
        }
      }

      .rig {
        display: flex;
        align-items: center;

        /* justify-content:center; */
        img {
          width: 7px;
          height: 12px;
          margin-left: 10px;
        }
      }

      /* margin-lefr */
    }

    .btn_bottom {
      width: 100%;
      position: fixed;
      bottom: 30px;
      display: flex;
      justify-content: center;
    }

    .submit {
      text-align: center;
      // padding: 15px 105px;
      // text-align: center;
      // box-sizing: border-box;
      // color: #ffffff;
      // // background-color: #666666ff;
      // background: linear-gradient(
      //   180deg,
      //   rgba(35, 149, 255, 1),
      //   rgba(0, 80, 213, 1)
      // );
      // border-radius: 5px;
      // // color: #999999ff;
      // border-radius: 5px;
      // font-size: 17px;

      // /* left:15%; */
    }
  }
}
</style>
