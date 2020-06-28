<template>
  <div class="myMessageList container">
    <!-- <an-header title="私信" /> -->

    <div class="main">
      <!-- 消息 -->

      <div class="messagetotal">消息</div>
      <img src="@/assets/images/home/bg_treehole.png" alt class="bg" />
      <!-- 私信消息 -->
      <div class="messageBox">
        <!-- wqewqewqe -->

        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            class="messageItem"
            @click="totalkChat(item)"
          >
            <img :src="item.replyUserInfo.avatar" v-if="item.replyUserInfo" alt />
            <div class="messageUp">
              <span
                class="messageT1"
                v-if="item.replyUserInfo.nickname"
              >{{item.replyUserInfo.nickname}}</span>
              <span class="messageT2">{{item.updateTime}}</span>
            </div>
            <div class="messageT3 line1hidden">{{item.content}}</div>
            <div v-if="item.unReadNumber" class="messageT4">
              <div class="mini">{{item.unReadNumber}}</div>
            </div>
          </li>
        </ul>
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
import { mailIndex } from "../../api/modules/mine";

export default {
  name: "myMessageList",
  components: { Features, NoLogin, Applications, AnHeader },
  data() {
    return {
      list: []
    };
  },
  activated() {
    mailIndex().then(res => {
      console.log(res);

      this.list = res;
    });
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      token: state => state.user.token
    })
  },
  methods: {
    totalkChat(item) {
      console.log(item);
      let id;
      if (item.userId == this.userInfo.id) {
        id = item.replyUserId;
      } else {
        id = item.userId;
      }

      this.$router.push({ path: "/talkChat", query: { data: id } });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/font.less";
@import "../../assets/safeArea.less";

.myMessageList {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .messagetotal {
    position: absolute;
    // top: -10px;
    top: 30px;
    z-index: 1;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    // line-height:33px;
    color: rgba(255, 255, 255, 1);
    margin-left: 21px;
    margin-bottom: 13px;
  }
  .main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    .bg {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    .messageBox {
      position: fixed;
      // height: 100% ;
      top: 0px;
      left: 0px;
      right: 0px;
      width: 100%;
               overflow: scroll;

      height: calc(100% - @top -30px);
      background-color: #ffffff;
      // z-index:998;
      margin-top: calc(@top + 46px + 30px);
      ul{
          height: calc(100% - @top -30px);
      }

      .messageItem {
        width: 100%;
        // height: 90px;
        // background:rgba(255,255,255,1);
        // box-shadow: 0px 2px 5px 0px rgba(0, 0, 1, 0.3);
        border-radius: 5px;
        margin-left: 0px;
        margin-bottom: 2px;
        margin-top: 2px;
        display: inline-flex;
        position: relative;
        // background: black;
        // background-color: rgba(0, 0, 0, 0.6);

        img {
          width: 39px;
          height: 39px;
          border-radius: 50%;
          margin-top: 27px;
          margin-left: 15px;
        }

        .messageUp {
          position: absolute;
          margin-top: 26px;
          margin-left: 70px;
          width: calc(100% - 65px - 15px);
          display: flex;
          justify-content: space-between;
        }
        .messageT1 {
          color: #000000;
          font-size: 16px;
        }
        messageT2 {
          font-size: 15px;
        }
        .messageT3 {
          width: 228px;
          font-size: 15px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 24px;
          margin-left: 15px;
          margin-top: 50px;
        }

        .messageT4 {
          width: 15px;
          height: 15px;

          background: rgba(255, 0, 0, 1);
          opacity: 1;
          border-radius: 9px;
          border-radius: 50%;
          position: absolute;
          margin-top: 50px;
          right: 15px;

          .mini {
            font-size: 9px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 15px;
            text-align: center;
            transform: scale(0.8);
          }
        }
      }
    }
  }
}
</style>
