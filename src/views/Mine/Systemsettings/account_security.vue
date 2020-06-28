<template>
  <div class="container account_security">
    <an-header title="账号与安全"></an-header>
    <div class="main">
      <!-- <img src="@/assets/images/home/bg.png" alt class="bgi"  srcset /> -->
      <!-- <div> -->
      <ul class="System_Settting">
        <li class="system_items" @click="ToRouter('unboundPhone')">
          <div class="lei">
            <!-- <img src="@/assets/images/setting/icon_set_change.png" class="bg1" alt /> -->
            <span>更换手机号</span>
          </div>
          <div class="rig">
            <img src="@/assets/images/setting/icon_common_open.png" alt />
            <!-- <img src="@/assets/images/setting/icon_set_shield.png" alt=""><span>屏蔽管理</span> -->
          </div>
        </li>
        <li class="system_items" @click="ToRouter('cancel_account')">
          <div class="lei">
            <!-- <img src="@/assets/images/setting/icon_set_off.png" class="bg1" alt srcset /> -->
            <span>注销账号</span>
          </div>
          <div class="rig">
            <img src="@/assets/images/setting/icon_common_open.png" alt />
          </div>
        </li>
        <!-- <li class="system_items" >
          <div class="lei">
            <span>退出登录</span>
          </div>
          <div class="rig">
            <img src="@/assets/images/setting/icon_common_open.png" alt />
          </div>
        </li>-->
      </ul>
      <div class="layout" @click="loginOut">退出登录</div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant';

import { mapState, mapMutations } from "vuex";
import AnHeader from "../../../components/header/an-header.vue";
export default {
  components: {
    AnHeader,Dialog
  },
  name: "account_security",
  data() {
    return {
      // bg_url: require("../../../assets/images/home/bg.png")
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      tiem_next: state => state.home.tiem_next
    })
  },
  methods: {
    ...mapMutations({
      changeData: "user/changeData"
    }),
    loginOut() {
      Dialog.confirm({
        title: "",
        width:270,

       
        confirmButtonColor:'#01AEB7FF',
        className:'.disloag',
        message: "是否退出当前账号？",
                  cancelButtonColor:'#8C8C8CFF'

      })
        .then(() => {
          console.log('执行看函数')
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
      // localStorage.clear();
      // this.changeData({ key: "token", val: "" });
      // this.changeData({ key: "userInfo", val: {} });
      //  clearInterval(window.tiem_next)
      // this.$nextTick(() => {

      //   this.$router.push({
      //     path: "/login"
      //   });
      // });
    },
    ToRouter(url) {
      this.$router.push({
        path: `/${url}`
      });
    }
  }
};
</script>
<style>
  .van-dialog__message{
  font-size:18px !important
}
.van-button{
  font-size: 18px !important;
}

</style>
<style  lang="less" scoped>
@import "../../../assets/safeArea";
// .van-overlay >>> .van-dialog{
//   background-color: red;
// }
/deep/ .van-dialog{
background-color: red;
width: 80% !important;
}

/deep/ .van-nav-bar {
  border-bottom: 2px solid #c8c8c8;
}


.account_security {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
  // /deep/ .van-nav-bar__title {
  //   color: #ffffff;
  // }
  .bgi {
    position: fixed;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    top: 0px;
  }
  .main {
    width: 100%;
    height: 100%;
    .layout {
      position: fixed;
      bottom: calc(@bottom + 40px);
      width: 300px;
      height: 40px;
      background: rgba(1, 174, 183, 1);
      border-radius: 20px;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      left: 50%;
      margin-left: -4rem;
    }
    .System_Settting {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      height: calc(100% - @top);
      width: 100%;
      // height: 100%;
      overflow: scroll;

      margin-top: calc(@top + 46px);

      box-sizing: border-box;
      // position: relative;
    }
    .system_items:nth-child(1) {
      margin-top: 10px;
    }
    .system_items:nth-child(5) {
    }
    .system_items {
      padding: 0px 15px;
      line-height: 54px;
      // border-bottom: 1px solid #cccccc;
      width: 100%;
      font-size: 16px;
      color: #000;
      // padding: 0px 10px;
      box-sizing: border-box;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;

      .lei {
        display: flex;
        // color: #ffffff;
        align-items: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        // line-height:22px;
        color: rgba(0, 0, 0, 1);
        opacity: 1;

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
      padding: 15px 105px;
      text-align: center;
      box-sizing: border-box;
      background-color: #e4e4e4;
      color: #666666;
      border-radius: 5px;
      font-size: 17px;

      /* left:15%; */
    }
  }
}
</style>