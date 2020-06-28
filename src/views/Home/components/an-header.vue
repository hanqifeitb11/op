<template>
  <div class="an-header">
    <!-- <div class="avatar" @click="showUserInfo">
            <img :src="userinfo.avatar==null?require('@/assets/images/home/icon_noloading.png'):userinfo.avatar" alt="" >
    </div>-->
    <ul class="tabs">
      <!-- <div class="left_icon" @click="toRouter('mine')">
          <img src="@/assets/images/home/icon_my.png" alt />
      </div>-->
      <!-- </li> -->
      <!-- {{NextTIme.residueDegree}} -->
      <li @click="change(0)" :class="[tabIndex == 0?'selected':'','tab']">树洞</li>
      <li @click="change(1)" :class="[tabIndex == 1?'selected':'','tab']">广场</li>
      <!-- <li @click="change(2)" :class="[tabIndex == 2?'selected':'','tab']">Ya组</li>
      <li @click="change(3)" :class="[tabIndex == 3?'selected':'','tab']">搜索</li>-->
      <!-- <li>
        <div class="right_icon" @click="$router.push({path:'/createTopic'})">
          <img src="@/assets/images/home/icon_publish.png" alt />
        </div>
      </li>-->
      <div class="line"></div>
    </ul>
    <!-- {{}} -->
    <!-- {{NextTIme}} -->
    <div slot="right" class="right_icon_Item" v-if="tabIndex == 0&&NextTIme.residueDegree">
      <img src="@/assets/images/home/icon_home_check.png" class="title_icon" alt srcset />
      <div class="right-title">
        <span class="selectstatus">查看树洞中</span>
        <!-- {{responseStatus.residueDegree}} -->
        <span class="total_num">还剩{{NextTIme.residueDegree}}树洞秘密</span>
      </div>
    </div>
  </div>
</template>

<script>
var line, tabs;
import { Toast } from "vant";
import { getDom } from "../../../util/common";
import { mapMutations, mapState } from "vuex";
export default {
  props:['item'],
  name: "an-header",
  computed: {
    ...mapState({
      tabIndex: state => state.home.tabIndex,
      userinfo: state => state.user.userInfo,
      openYong: state => state.user.openYong,
      token: state => state.user.token,
      total: state => state.home.total,
      NextTIme: state => state.home.NextTIme
    })
  },
  created() {
    // console.log(this.responseStatus)
  },
  mounted() {
    console.log("---这是啥");
    // console.log(this.responseStatus)
    line = getDom("line")[0];

    tabs = getDom("tab");
    this.change(1);
  },
  watch: {
        NextTIme: {
      deep: true,
      immediate: true,
      handler: function(val) {
        console.log(val);
      }
    },
  },
  methods: {

    toRouter(url) {
      this.$router.push({
        path: `/${url}`
      });
    },
    showUserInfo() {
      if (this.token) {
        this.$emit("changeLeft", true);
      } else {
        this.$router.push("/login");
      }
    },
    ...mapMutations({
      changeData: "home/changeData"
    }),
    change(index) {
      console.log(index);
      var x = tabs[index].offsetLeft;
      this.changeData({ key: "tabIndex", val: index });
      line.style.left = x + "px";
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/safeArea";
@import "../../../assets/font";
.right_icon_Item {
  // width: 110px;
  display: flex;
  margin-right: 30px;
  justify-content: space-between;
  // height: 34px;
  background: rgba(255, 255, 255, 1);
  align-items: center;
  opacity: 1;
  padding-right: 11px;
  box-sizing: border-box;
  border-radius: 20px;
  .title_icon {
    width: 40px;
    // height: 34px;
    margin-right: 10px;
  }
  .selectstatus {
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 500;
    // line-height:14px;
    color: rgba(148, 190, 50, 1);
  }
  .total_num {
    font-size: 8px;
    font-family: PingFang SC;
    font-weight: 500;
    // line-height:11px;
    color: rgba(148, 190, 50, 1);
    opacity: 1;
    // font-size: 4px;
    // padding-right: 11px;
    // //  font-weight:500;
    // // font-weight: floor();
    // font-weight: 500;
    // color: rgba(148, 190, 50, 1);
  }
  .right-title {
    display: flex;
    flex-direction: column;
  }
}
.an-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  padding-top: @top;
  left: 0;
  width: 100%;
  z-index: 2;

  .avatar {
    margin-left: 15px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 57px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .left_icon {
    width: 24px;
    height: 24px;
  }
  .tabss {
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    /* color:rgba(0,0,0,1); */
    background: linear-gradient(
      0deg,
      rgba(255, 167, 13, 1) 0%,
      rgba(236, 51, 0, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;

    .lines {
      /* color:red; */
      height: 2px;
      width: 26px;
      color: red;
      position: absolute;
      background: linear-gradient(
        90deg,
        rgba(255, 167, 13, 1),
        rgba(236, 51, 0, 1)
      );
      border-radius: 1px;
      margin-top: 10px;
      /* top: 100%; */
      /* left: 66px; */
      left: 50%;
      margin-left: -0.4rem;
      /* left: 0px;
        bottom: -5px; */
    }
  }

  .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // flex: 1;
    position: relative;
    padding: 0px 15px;
    box-sizing: border-box;
    justify-content: flex-start;
    .tab {
      font-size: @font18;
      margin-right: 18px;
      // width: 45px;
      text-align: center;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
    }
    .selected {
      font-size: @font21;
      font-weight: 800;
      // background:linear-gradient(0deg,rgba(255,167,13,1) 0%, rgba(236,51,0,1) 100%);\
      color: #ffffff;
      // -webkit-background-clip:text;
      // -webkit-text-fill-color:transparent;
    }
  }
  .line {
    display: inline-block;
    width: 28px;
    height: 2px;
    border-radius: 1px;
    // background: @homeTabAfterBakcground;
    background: linear-gradient(
      90deg,
      rgba(35, 149, 255, 1),
      rgba(0, 80, 213, 1)
    );
    position: absolute;
    left: 0px;
    bottom: -5px;
    transition: all 0.2s;
    margin-left: 7px;
  }
  .rightIcon_open {
    width: 28px;
    height: 28px;
    margin-right: 15px;
    margin-left: 74px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  // .rightIcon{
  //     width:18px;
  //     height:17px;
  //     margin-right: 15px;
  //     margin-left: 74px;
  //     img{
  //         width: 100%;
  //         height: 100%;
  //     }
  // }
}
</style>
