<template>
  <div class="tb-details container">
    <an-header></an-header>
    <div class="main">
      <!-- <img src="@/assets/images/home/bg.png" alt class="bgi" srcset /> -->
      <div class="content">
        <div class="bg_title">
          <!-- <img src="@/assets/images/home/pic_topic.png" alt srcset /> -->
          <span class="header_title">{{title}}</span>
        </div>
        <div class="tab">
          <div @click="onchange(1)" :class="curentIndex==1?'active':''">最热</div>
          <div @click="onchange(2)" :class="curentIndex==2?'active':''">最新</div>
        </div>
        <div>
          <Recommend type="1" :sort="curentIndex" ref="recommend" />
        </div>
      </div>
    </div>
    <van-dialog
      v-model="isOpen_dialg"
      width="210px"
      title
      :showConfirmButton="false"
      closeOnClickOverlay
    >
      <div class="cell" @click.stop="dislikeContent">
        <img src="@/assets/images/home/icon_dislike.png" alt />
        <span>不喜欢这个内容</span>
      </div>
      <div class="cell" @click.stop="dislikeTitle" v-if="!openYong">
        <img src="@/assets/images/home/icon_blist.png" alt />
        <span>屏蔽这个Ya组</span>
      </div>
      <div class="cell" @click.stop="kill">
        <img src="@/assets/images/home/icon_blist.png" alt />
        <span>举报这个内容</span>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import {
  admire,
  offAdmire,
  dislike,
  offdislike,
  changeCare,
  subjectDel,
  unlikeContent
} from "../../../api/modules/home";
import Attention from "../attention/attention";
import Recommend from "../recommend/recommend";
import { Progress } from "vant";
import { getPhotoDetail, del, index } from "../../../api/modules/home";
import { Image as VanImage, Toast, Dialog } from "vant";
import { mapState } from "vuex";
import AnHeader from "../../../components/header/an-header";
import AnRecommend from "./an-recommend";
export default {
  name: "Work_details",
  components: {
    AnRecommend,
    Recommend,
    AnHeader,
    VanImage,
    Attention,
    Progress
  },
  computed: {
    ...mapState({
      openYong: state => state.user.openYong,
      title: state => state.home.title
    })
  },
  filters: {
    toStr(val) {
      if (typeof val === "string") {
        return val;
      }
      var str = "";
      val.forEach(r => {
        str += `#${r}>`;
      });
      return str;
    }
  },
  data() {
    return {
      // bg_url: require("../../../assets/images/home/bg.png"),
      // title_url: require("../../../assets/images/home/pic_topic.png"),
      info: {},
      rightIcon: true,
      list: [],
      isOpen_dialg: false,
      id: "",
      curentIndex: 1
    };
  },
  created() {},
  mounted() {},
  watch: {
    $route: function(newval, oldVal) {
      console.log(newval != oldVal);
      if (newval != oldVal) {
        this.isOpen_dialg = false;
      }
    }
  },
  methods: {
    onchange(v) {
      this.curentIndex = v;
      //       if(this.curentIndex==1){
      // this.$refs.recommend.getIndex();
      //       }
      //
      //   this.getIndex
    },
    toRouter(v) {
      console.log(v);
      this.$router.push({
        path: "/OthersUserInfo",
        query: {
          id: v.user_id
        }
      });
    },
    ToRouterOther(v) {
      this.$router.push({
        path: "/Tbdetails",
        query: {
          id: v.id
        }
      });
    },
    dislikeContent() {
      this.isOpen_dialg = false;
      const { type, id } = this.info;
      unlikeContent({ topic_id: id }).then(res => {
        Toast("减少类似内容推荐");
        this.$emit("getList", true);
      });
    },
    // 不喜欢标题
    dislikeTitle() {
      this.isOpen_dialg = false;
      const { subject_id } = this.info;
      const type = 2;
      subjectDel({ type, subject_id }).then(res => {
        // Toast('减少类似标题推荐')
        Toast("将不推荐该Ya组相关内容");
      });
    },
    kill() {
      //
      // this.isOpen_dialg = true;

      this.isOpen_dialg = false;
      this.$nextTick(function() {
        this.$router.push({
          path: "/report",
          query: {
            to_user_id: this.info.user_id,
            topic_id: this.info.id,
            topic_type: this.info.type
          }
        });
      });
    },
    isOpen() {
      this.isOpen_dialg = true;
    },
    deleted() {
      var self = this;
      Dialog.confirm({
        title: "是否删除这条内容？",
        beforeClose
      });
      function beforeClose(action, done) {
        if (action == "confirm") {
          const { id, type } = self.info;
          del({ id, type }).then(res => {
            done();
            Toast("删除成功");
            setTimeout(() => {
              self.$router.back();
            }, 1500);
          });
        } else {
          done();
        }
      }
    },
    ToBack() {
      this.$router.go(-1);
    },
    getUserInfo() {}
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/safeArea";

.tb-details {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: calc(100% - @top);
    // padding: 0px 15px;
    margin-top: 46px;
    // padding-top: 50px;
    box-sizing: border-box;
    overflow: scroll;
    z-index: 1;
  }
  .bgi {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .bg_title {
    position: fixed;
    right: 0px;
    top: calc(@top + 60px);
    z-index: 1;
    width: 333px;
    .header_title {
      position: absolute;
      top: 25%;
      right: 19%;
      font-size: 21px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .tab {
    height: 50px;
    background: rgba(30, 31, 49, 1);
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    display: flex;
    padding: 0px 85px;
    z-index: 1;
    // padding:0px 85px;
    box-sizing: border-box;
    position: fixed;
    top: calc(@top + 145px);
    div {
      height: 50px;
      line-height: 50px;
    }
    width: 100%;
    align-items: center;
    justify-content: space-between;
    .active {
      border-bottom: 2px solid #007bffff;
    }
  }
  // .bg{margin-bottom: 20px;}
  .cell {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 65px;

    img {
      width: 19px;
      height: 19px;
      margin-left: 36px;
      margin-right: 9px;
    }

    span {
      font-size: 16px;
      color: #000000;
    }
  }

  .cell {
    border-bottom: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
  }

  .header_cneter {
    display: flex;
    color: red;
    align-items: center;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);

    background: linear-gradient(
      0deg,
      rgba(255, 167, 13, 1) 0%,
      rgba(236, 51, 0, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .header_avator {
    width: 30px;
    height: 21px;
    margin-right: 9px;
  }

  .rightIcon {
    width: 20px;
    height: 100%;
    display: flex;
    align-items: center;

    img {
      height: 4px;
    }
  }

  /* background-color: #ffffff; */
  .title_content {
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
    margin-left: 12px;
  }

  .title_name {
    margin: 14px 0px;
    color: #999999;
    padding: 4px 8px;
    /* inline-block */
    display: inline-block;
    /* width: 50%; */
    background: rgba(0, 0, 0, 1);
    opacity: 0.1;
    border-radius: 5px;
  }

  .main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    // overflow: scroll;
  }

  .recommend_list {
    margin-top: 15px;
    width: 100%;
    background: #ffffff;
    margin-bottom: 100px;
    /* padding-bottom: 150px; */
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 2px 5px 1px rgba(0, 0, 1, 0.3);
    /* width:90%; */
    /*  */
    box-sizing: border-box;
    border: 1px solid #f4f4f4;

    .recommend_list_items {
      /* display: flex; */
      display: grid;
      box-sizing: border-box;
      padding: 13px 13px 14px 15px;
      grid-template-columns: 50% 50%;
      grid-row-gap: 10px;
      grid-row-gap: 10px;

      /* justify-content: center; */
      .left {
        img {
          /* width: 120px; */
          width: 100%;
          height: 85px;
          border-radius: 10px;
        }

        /* margin-right: 10px; */
      }

      .right {
        align-items: flex-start;
        align-self: end;
        margin-left: 10px;

        .right_conetnet {
          display: flex;
          margin-top: 12px;
          /* flex-direction: column; */
          align-items: center;

          .left_avator {
            width: 25px;
            height: 25px;
            margin-right: 10px;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }

          .username {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
        }

        .content_desc {
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 24px;
          letter-spacing: 0;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          /*要显示的行数*/
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  .content_messgae {
    font-size: 16px;
    color: #000;
  }

  .controllers {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-right: 18px; */

    .bar {
      display: flex;
      align-items: center;

      .icon {
        width: 19px;
        height: 19px;
        margin-right: 6px;
      }
    }

    .bar:nth-child(1) {
      margin-left: 20px;
    }
  }

  /* 视频部分设置 */
  .video_detail {
    /* border: 1px solid red; */
    border-radius: 14px;
    overflow: hidden;
    height: 215px;
    margin-top: 20px;
  }

  .album {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    display: flex;
    flex-wrap: wrap;

    .photo {
      width: 103px;
      height: 103px;
      margin: 4px;
      border-radius: 10px;
    }
  }

  .one {
    width: 320px;
    height: 215px;
    border-radius: 10px;
  }
}
</style>
