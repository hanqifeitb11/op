<template>
  <div class="container Amusing">
    <An_header title="关于我们"></An_header>
    <div class="main">
      <!-- <img src="@/assets/images/home/bg.png" alt class="bg" /> -->
      <div class="content">
        <div class="select_item">
          <div class="slect_itemss" @click="ToRouter('useragreement')">
            <div>
              <!-- <img src="@/assets/images/mine/icon_agreement.png" class="bg1" alt=""> -->
              <span>用户协议</span>
            </div>
            <van-icon name="arrow" />
          </div>
          <div class="slect_itemss" @click="ToRouter('PrivacyPolicy')">
            <div>
              <!-- <img src="@/assets/images/mine/icon_privacy.png" class="bg2" alt=""> -->
              <span>隐私政策</span>
            </div>
            <van-icon name="arrow" />
          </div>
          <!-- <div class="slect_itemss" @click="ToRouter('contact')">
            <div>
              <span>联系方式</span>
            </div>
            <van-icon name="arrow" />
          </div> -->
        </div>

        <div class="content_logo">
          <!-- <div class=""></div> -->
                    <img src="@/assets/images/home/icon-aboutus_logo.png" class="logo_top" alt="" srcset="">

          <div>当前版本：V1.0.0</div>
           <div>官方邮箱：shenjing@SH.com</div>        
           </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Cell, CellGroup } from "vant";

import An_header from "../../../components/header/an-header";
export default {
  name: "Amusing",
  components: {
    An_header,
    Cell,
    CellGroup
  },
  methods: {
    ToRouter(url) {
      this.$router.push({ path: `/${url}` });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/safeArea";
.Amusing {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .main {
    width: 100%;
    height: 100%;
    // overflow: scroll;
    .bg {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    /deep/ .van-icon {
      color: #000000;
      font-size: 18px;
      // background:rgba(0,0,0,1);
      opacity: 1;
    }
    .content_logo {
      width: 100%;
      position: fixed;
      bottom: calc(@bottom + 40px);
      // margin-top: 139px;

      text-align: center;
      .logo_top {
     width:64px;
height:64px;
        margin: 0px auto;
        background: rgba(255, 255, 255, 1);
        // border-radius: 50%;
        opacity: 1;
      }
      div:nth-child(2){
        margin-top: 10px;
        font-size:12px;
font-family:PingFang SC;
font-weight:500;
// line-height:22px;
color:rgba(0,0,0,1);
      }
         div:nth-child(3){
        // margin-top: 51px;
        font-size:12px;
font-family:PingFang SC;
font-weight:500;
// line-height:22px;
color:rgba(0,0,0,1);
      }
    }
    .content {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      height: calc(100% - @top);
      width: 100%;
      overflow: scroll;
      margin-top: calc(@top + 46px);

      box-sizing: border-box;
      z-index: 1;

      .avator {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        margin-top: 30px;
        .version {
          color: #999999;
          font-size: 16px;
          margin-top: 30px;
        }
        img {
          width: 62px;
          height: 62px;
        }
      }

      .Amusing_info {
        margin-top: 30px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 30px;
      }

      .select_item {
        margin-top: 10px;
        background-color: #ffffff;
        color: #000000;
        padding: 0px 15px;
        /* background: #ffffff;
        
                     */
        // box-shadow: 0px 4px 10px 0px rgba(0, 0, 1, 0.3);
        border-radius: 5px;
        color: #ffffff;
        // background-color: #ffffff;

        .slect_itemss {
          display: flex;
          justify-content: space-between;
          padding: 15px 0px;
          box-sizing: border-box;
          // border-bottom: 1px solid #dbdbdb;
          align-items: center;
          color: #ffffff;

          span {
            // font-size: 15px;
            color: #000000;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            line-height: 22px;
            color: rgba(0, 0, 0, 1);
          }

          div {
            display: flex;
          }
        }

        .bg1,
        .bg2,
        .bg3 {
          width: 24px;
          height: 24px;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
