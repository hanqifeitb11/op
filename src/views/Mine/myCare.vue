<template>
  <div class="myCare container">
    <An_header title="关注" />

    <div class="main">
      <!-- <img src="@/assets/images/home/bg.png" alt class="bg" /> -->
      <div class="list" v-if="list">
        <div
          v-for="(item,idx) in newList"
          :key="idx"
          @click="toRouter('OthersUserInfo',item.userInfo.id)"
        >
          <div class="listItem">
            <img class="rolePic" :src="item.avatar" alt />
            <div class="nameTxt">{{item.nickname}}</div>
            <div class="ctrl">
              <div v-if="!item.is_watch" class="ctrlBtn1" @click.stop="towatchUser(item)">+关注</div>
              <div v-else class="ctrlBtn2" @click.stop="towatchUser(item)">已关注</div>
            </div>
          </div>
        </div>
         <van-empty
        v-if="list.length==0"
          class="custom-image"
          :image="require('@/assets/images/home/icon_noperson.png')"
          description="这里还没有人哦～"
        />
      </div>
      <!-- <div v-else> -->
       
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import { Empty } from "vant";

import An_header from "../../components/header/an-header.vue";
import Applications from "./components/applications";
import NoLogin from "./components/noLogin";
import Features from "./components/Features";
import { mapState } from "vuex";
import { watchOther, watchUser } from "../../api/modules/mine";
import { Toast } from "vant";
export default {
  name: "myCare",
  components: { Features, NoLogin, Applications, An_header },
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      token: state => state.user.token
    }),
    newList() {
      return this.list;
    }
  },
  methods: {
    toRouter(url, id) {
      this.$router.push({
        path: `/${url}`,
        query: {
          id: id
        }
      });
    },
    towatchUser(item) {
      console.log(item);
      const { watchUserId } = item;
      const { id } = this.userInfo;
      console.log(id + "id");
      watchUser({
        userId: id,
        watchedUid: watchUserId,
        mark: 2,
        watchOptType: 2
      }).then(res => {
        this.list.forEach((v, i) => {
          console.log(v.watchUserId == watchUserId);
          if (v.watchUserId == watchUserId) {
            let tempitem = item;
            tempitem.is_watch = !item.is_watch;
            this.list.splice(i, 1, tempitem);
          }
        });
        console.log(this.list);
      });
    }
  },
  activated() {
    const { id } = this.userInfo;

    watchOther({ uid: id }).then(res => {
      this.list = res.data;
      this.list.forEach(e => {
        e.is_watch = 1;
      });
      console.log(this.list);
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/font.less";
@import "../../assets/safeArea.less";
/deep/ .van-empty__image {
  width: 120px;
  height: 110px;
}
.myCare {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /deep/ .header {
    border-bottom: 1px solid #f5f6f6ff;
  }

  .main {
    width: 100%;
    height: calc(100% - @top);
    margin-top: calc(@top + 46px);
    background-color: #ffffff;

    overflow: scroll;

    .bg {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    .list {
      margin-top: 2px;
      height: 100%;
      width: 100%;
      // background: black;
      // background-color: rgba(0,0,0,0.6);
      position: relative;
      overflow-y: scroll;

      .listItem {
        width: calc(100% - 100px);
        height: 39px;
        margin: 15px;
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        .rolePic {
          width: 39px;
          height: 39px;
          border-radius: 50%;
        }
        .nameTxt {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #000000ff;
          margin-left: 11px;
        }
        .ctrl {
          // justify-content: flex-end;
          // margin-left: 221px;
          position: absolute;
          right: 25px;

          .ctrlBtn1 {
            width: 67px;
            height: 28px;
            background: #ffffff;
            box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
            opacity: 1;
            color: #000000;
            border-radius: 14px;

            font-size: 15px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 28px;
            text-align: center;
            // color: rgba(255, 255, 255, 1);
          }
          .ctrlBtn2 {
            width: 67px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            background: rgba(148, 190, 50, 1);
            box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
            opacity: 1;
            border-radius: 14px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 600;
            // line-height:20px;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
}
</style>
