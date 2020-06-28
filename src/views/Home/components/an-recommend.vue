<template>
  <div class="recommend_hole">
    <div class="recommend">
      <div class="around-border">
        <div class="header_">
          <div class="userInfo">
            <img :src="item.userInfo.avatar" alt class="avatar" @click="toRouterOtherUser(item)" />
            <div class="nickname">{{item.userInfo.nickname}}</div>
            <img
              src="@/assets/images/home/icon_video_more.png"
              class="right_cion"
              @click="OpenshowReport"
              alt
              v-if="fromItem==1"
            />
            <div class="right_Img" @click="deletItem(item)" v-if="fromItem==2">
              <img src="@/assets/images/main/icon_screen_close.png" alt />
            </div>
          </div>
        </div>
        <div class="content">{{item.isShowBoth?hidden(item.content,112):item.content}}</div>
        <div class="close" v-if="item.content.length>112">
          <div class="closemessage" @click="Openshow(item)">
            {{item.isShowBoth?"更多":'收起'}}
            <van-icon :name="item.isShowBoth?'arrow-down':'arrow-up'" />
          </div>
        </div>
        <div v-if="item.images&&item.images[0]&&item.images[0].type==1">
          <div :class="item.images.length==1?'onlyImage':'not_onlyimage'">
            <img
              :src="v.url"
              alt
              :key="i"
              v-for="(v,i) in item.images"
              @click="ClickPhot(item.images,i)"
            />
          </div>
        </div>
        <div v-else>
          <div @click="toRouter(item)" class="videoBox">
            <video
              width="100%"
              style="object-fit:fill"
              loop
              height="100%"
              preload="none"
              ref="video"
              v-if="item.images&&item.images[0]"
              :poster="item.images[0].url"
              :src="item.content"
              webkit-playsinline="true"
              playsinline="true"
              x-webkit-airplay="allow"
              x5-video-player-type="h5"
              x5-video-player-fullscreen="true"
              x5-video-orientation="portraint"
            ></video>
            <img src="@/assets/images/home/icon_play.png" class="videog" alt srcset />
          </div>
        </div>
        <div class="footbar">
          <div
            :class="item.userInfo.isWatch==0?'not_watch':'Watch'"
            @click="Watched(item)"
            v-show="other==2"
          >{{item.userInfo.isWatch==0?'关注TA':"已关注"}}</div>
          <an-controllers :item="item" @showComment="getShow" />
        </div>
      </div>
    </div>
    <!-- <div class="top" @click="toRouter_tu(item)"> -->
    <!-- <div class="head" v-if="!openYong"> -->
    <!-- <div class="left_icon">
          <van-image
            round
            v-show="froms!=4"
            class="avatar"
            @click="toRouterOtherUser(item)"
            :src="item.userInfo ? item.userInfo.avatar:'https://static.ldtwsq.cn/ld/common1/images/icon_head.png'"
          />
          <div
            v-show="froms!=4"
            class="name"
          >{{item.user_info? item.user_info.nickname:item.userInfo?item.userInfo.nickname:''}}</div>
    </div>-->
    <!-- 
        <div class="right_icon">
          <div
            :class="item.is_watch == 1 ?'gray':'attention'"
            v-if="item.userInfo &&  userInfo.id !=item.userInfo.id"
            @click="changeStatus(item.is_watch,item.userInfo.id)"
          >{{item.is_watch == 1 ?'':'+关注'}}</div>
          <div
            class="examine"
            v-if="is_exame==1&&item.status==0&& userInfo.id ==item.userInfo.id"
          >审核中</div>
          <div
            v-if="user!='other'"
            @click.stop="openDialog(item)"
            class="more"
            :style="{'marginLeft':from==1?'0px auto':'0px'}"
          >
            <img src="@/assets/images/home/icon_home_more.png" alt />
          </div>
    </div>-->
    <!-- </div> -->
    <!-- </div> -->
    <!-- <div class="photo" v-if="item.type == 1" @click="toRouter_tu(item)">
      <van-swipe height="300" v-show="item.content.length>1">
        <van-swipe-item v-for="(image, index) in item.content" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <img :src="item.content[0]" alt height="300" v-show="item.content.length==1" />
      <div class="head_content">{{item.desc}}</div>
    </div>-->

    <!-- <div @click="toRouter(item)" class="videoBox" v-if="item.type == 2">
      <video
        width="100%"
        style="object-fit:fill"
        loop
        height="100%"
        preload="none"
        ref="video"
        :poster="item.icon"
        :src="item.content"
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="allow"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="portraint"
      ></video>
      <img src="@/assets/images/home/icon_play.png" class="videog" alt srcset />
    </div>
    <div v-if="item.type == 2" class="head_content">{{item.desc}}</div>-->

    <van-dialog
      width="210px"
      class="showContent"
      :showConfirmButton="false"
      closeOnClickOverlay
      v-model="show"
    >
      <div class="reportBlakc">
        <div class="content_report" @click="OpenShoereport(item)">
          <img src="@/assets/images/home/icon_report.png" class="left_icon_report" alt srcset />
          <div>举报TA</div>
        </div>
        <div class="content_report" @click="AddBlock(item)">
          <img src="@/assets/images/home/icon_blacklist.png" class="left_icon_report" alt srcset />
          <div>拉黑TA</div>
        </div>
        <div class="content_report" @click="CLose">
          <img src="@/assets/images/main/icon_close.png" class="left_icon_report closeIcon" alt />
        </div>

        <!-- <div></div> -->
      </div>
    </van-dialog>
    <van-dialog
      width="210px"
      class="showContent"
      :showConfirmButton="false"
      closeOnClickOverlay
      v-model="showType"
    >
      <div class-="reportItem">
        <div
          class="cell"
          v-for="(v,i) in resportList"
          :class="curentIndex==i?'active':''"
          :key="i"
          @click="ToReport(item,i,v)"
        >
          <span>{{v.name}}</span>
        </div>
      </div>
    </van-dialog>
    <!-- <div class="foor_bar">
      <div>{{item.created_at}}</div>
     
    </div>-->
    <an-comment v-model="showComment"   />
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
// import AnComment from "../comment/an-comment";
import { mapState, mapMutations } from "vuex";
import { getDom, hidden } from "../../../util/common";
// import {SubjectUser} from '../../.'
import { getReport, Tip_off, reportSubmit } from "../../../api/modules/home";
//
import { reportSomeone, watchUser } from "../../../api/modules/mine";

import AnComment from "../../../components/comment/an-comment";
import {
  admire,
  dislike,
  offdislike,
  changeCare,
  subjectDel,
  SubjectUser,
  unlikeContent
} from "../../../api/modules/home";
import AnControllers from "../../../components/controllers/an-controllers";
import { Toast } from "vant";
import { ImagePreview } from "vant";
import { cancelLahei } from "../../../api/modules/mine";
export default {
  name: "an-recommend",
  created() {
    // console.log(this.item);
    // this.item.content='https://static.ldtwsq.cn/ya_know/ya/know/32708d622a369c75a23a27a95da7ee10.jpg,https://static.ldtwsq.cn/ya_know/ya/know/32708d622a369c75a23a27a95da7ee10.jpg,https://static.ldtwsq.cn/ya_know/ya/know/32708d622a369c75a23a27a95da7ee10.jpg，https://static.ldtwsq.cn/ya_know/ya/know/32708d622a369c75a23a27a95da7ee10.jpg'
  },

  components: {
    AnControllers,
    AnComment,
    Toast,
    Swipe,
    SwipeItem,
    ImagePreview
  },
  props: {
    other: {
      type: String,
      default: "2"
    },
    fromItem: {
      type: String,
      default: "1"
    },
    shenhe: {
      type: String,
      default: ""
    },
    item: {
      type: Object,
      default: {}
    },
    from: {
      type: Number,
      default: 0
    },
    is_exame: {
      type: Number,
      default: 0
    },
    user: {
      type: String,
      default: ""
    },
    uerlist: {
      type: Function,
      default: () => {}
    },
    froms: {
      type: Number,
      default: 0
    }
  },
  filters: {
    toStr(val) {
      if (typeof val === "string" || !val) {
        return val;
      }
      var str = "";
      val.forEach(r => {
        str += `#${r}>`;
      });
      return str;
    },
    showStatus(val) {
      switch (Number(val)) {
        case 1:
          return "通过审核";
        case 2:
          return "审核中";
        case 3:
          return "审核失败";
        default:
          return "";
      }
    }
  },
  data() {
    return {
      SelectItem: {},
      show: false, // 是否展示弹出框
      id: "", // 当前被点击的内容的id
      showComment: false,
      is_Prop: false,
      curentIndex: "",
      currentObj: {}, // 当前选中的Ya组\
      ImgList: [],
      showType: false,
      resportList: [
        {
          type: "1",
          name: "广告营销"
        },
        {
          type: "2",
          name: "涉及诈骗"
        },
        {
          type: "3",
          name: "色情低俗"
        },
        {
          type: "4",
          name: "疑似违规"
        },
        {
          type: "5",
          name: "其他原因"
        },
        {
          type: "7",
          name: "提交"
        }
      ]
    };
  },
  created() {
    this.is_Prop = true;
    window.addEventListener('updateWatch',this.onUpdateWatch);
  },

  computed: {
    isVideo() {
      return this.item && this.item.type == 4;
    },
    ...mapState({
      openYong: state => state.user.openYong,
      userInfo: state => state.user.userInfo,
      isreportItem: state => state.home.isreportItem
    })
  },
  watch: {

    item: {
      deep: true,
      immediate: true,
      handler: function(val) {
        console.log(val);
      }
    },

    "item.type": {
      immediate: true,
      deep: true,
      handler: function(val) {
        if (val == 1) {
          this.item.content = `${this.item.content}`.split(",");
        }
      }
    },
    showComment(val) {
      var homeContent = getDom("homeContent")[0];
      if (!homeContent) return;
      if (val) {
        homeContent.style.zIndex = 3;
      } else {
        this.changeData({
          key: "isProps",
          val: 0
        });
        console.log("----wqeqwe");
        setTimeout(() => {
          homeContent.style.zIndex = 1;
        }, 300);
      }
    }
  },

  methods: {
    onUpdateWatch(data) {
      var tid = data.data;
      if(this.item.userInfo.id == tid)
      {
        this.$set(this.item.userInfo,'isWatch', !this.item.userInfo.isWatch)
      }

    },
    deletItem(item) {
      console.log(item);
      this.$emit("isShowGet", 2);
      this.$emit("deleteItemsad", item);
    },
    ...mapMutations({
      changeData: "home/changeData"
    }),
    getShow(val) {
      this.showComment = val;
      this.changeData({ key: "Item", val: this.item });
      // console.log(this.item)
      // this.SelectItem=this.item
      //  this.item=this.item;
    },
    OpenShoereport(item) {
      this.$nextTick(function() {
        this.show = false;
        this.showType = true;
      });
    },
    AddBlock(item) {
      console.log(item);
      const { id } = this.userInfo;
      cancelLahei({
        userId: id,
        blackUserId: item.userId,
        mark: 1,
        blackOptType: 1
      }).then(() => {
        Toast({
          message: "已拉黑",
          duration: 1500
        });
        this.$nextTick(function() {
          this.show = false;
        });
      });
    },
    CLose() {
      this.$nextTick(function() {
        this.show = false;
      });
    },
    OpenshowReport() {
      this.show = true;
    },
    Watched({ userInfo } = item) {
      console.log(userInfo);
      const { isWatch } =userInfo;
      console.log(isWatch)
      watchUser({
        userId: this.userInfo.id,
        watchedUid: userInfo.id,
        mark: 2,
        watchOptType: isWatch ? 2 : 1
      }).then(res => {
        this.item.userInfo.isWatch = !this.item.userInfo.isWatch;
        Toast({
          message: this.item.userInfo.isWatch ? "关注成功" : "已取消关注",
          duration: 1500
        });
      });
    },
    ClickPhot(v, i) {
      // console.log([...v.url])
      var obj = [];

      if (v.length == 1) {
        obj[0] = v[0].url;
      } else {
        v.forEach((e, i) => {
          console.log(e.url);
          obj.push(e.url);
        });
      }
      ImagePreview({
        images: obj,
        startPosition: i,
        onClose() {
          // do something
        }
      });
    },
    Openshow(item) {
      // this.$set(this.item,'isshowBoth',!item.isshowBoth)
      // this.$emit('updateItemIsBoth',item)
      this.item.isShowBoth = !item.isShowBoth;
      // console.log(this.item)
      // item.isshowBoth=!item.isshowBoth;
      // let temp=item;
      // this.item=Object.assign({},temp)
      //     console.log(this.item)

      // this.$set(this.item,'isshowBoth',!this.item.isshowBoth)
      // console.log(item.isshowBoth)
      // console.log(item.content.length);
    },
    toRouter_tu(item) {
      if (this.user == "other") {
        this.$router.push({
          path: "/detail",
          query: {
            item: item
          }
        });
      }
    },
    ToReport(user, index, v) {
      console.log(user);
      const { type } = v;

      const { userId, id } = user;
      console.log(index);
      if (index == 5) {
        {
          reportSubmit({
            UserId: this.userInfo.id,
            ReportUserId: userId,
            Type: 1,
            ObjectId: id,
            Reason: type
          }).then(res => {
            Toast({
              message: "举报成功",
              duration: 1500
            });
            this.showType = false;
          });
        }
        this.curentIndex = "";
      } else {
        this.curentIndex = index;
      }

      // console.log(user, type);
      // const { user_id } = user;
      // reportSomeone({
      //   type: type,
      //   report_user_id: user_id
      // }).then(res => {
      //   Toast({
      //     message: "举报成功",
      //     duration: 1500
      //   });
      //   this.$nextTick(function() {
      //     this.showType = false;
      //   });
      //   // console.log(res)
      // });
    },
    getReportType() {
      getReport().then(res => {
        console.log(res);
        this.resportList = res;
      });
    },
    // getReport()
    hidden,
    getClass(val) {
      switch (Number(val)) {
        case 1:
          return "pass";
        case 2:
          return "doing";
        case 3:
          return "fail";
        default:
          return "";
      }
    },
    toRouterOtherUser(item) {
      console.log(item);
      this.$router.push({
        path: "/OthersUserInfo",
        query: {
          id: item.userId,
          
        }
      });
    },

    // 是否关注
    changeStatus(status, uid) {
      console.log(uid);
      var is_watch;

      if (status == 0) {
        is_watch = 1;
      } else {
        is_watch = 0;
      }
      SubjectUser({
        id: uid
      }).then(res => {
        this.item.is_watch = is_watch;
        this.user ? this.uerlist(uid) : "";
      });
    },
    openDialog(item) {
      this.id = item.id;
      this.currentObj = item;
      this.show = true;
    },
    //不喜欢内容
    dislikeContent() {
      this.show = false;
      const { id } = this.currentObj;
      unlikeContent({ topic_id: id }).then(res => {
        this.$nextTick(function() {
          Toast("减少类似内容推荐");
        });
        this.$emit("item_delete", id);
        this.$emit("getList", true);
      });
    },
    // 不喜欢标题
    dislikeTitle() {
      this.show = false;
      const { subject_id } = this.item;
      const type = 2;
      subjectDel({ type, subject_id }).then(res => {
        this.$nextTick(function() {
          Toast("将不推荐该Ya组相关内容");
        });
      });
    },
    // 举报
    kill(item) {
      //
      this.show = false;
      this.showType = true;
      this.getReportType();
      // this.$router.push({
      //   path: "/report",
      //   query: {
      //     to_user_id: item.user_id,
      //     topic_id: item.id,
      //     topic_type: item.type
      //   }
      // });
    },
    getList(list) {
      if (list.length < 9) {
        return list;
      }
      return list.slice(0, 9);
    },
    toRouter(item) {
      this.$emit("leave");
      this.changeData({ key: "videoItem", val: item });
      // switch (Number(item.type)) {
      //   case 2:
      this.$router.push({
        path: "/Tb_Video_detail"
      });
      //     break;
      // }
    },
    getClassName(count) {
      var num = Number(count);
      if (num == 1) {
        return "one";
      } else if (num > 1 && num < 7) {
        return "three";
      } else {
        return "nine";
      }
    },

    play() {
      if (this.$refs.video) {
        this.$refs.video.play();
      }
    },
    stop() {
      if (this.$refs.video) {
        this.$refs.video.pause();
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/font";
@import "../../../assets/safeArea";
.right_Img {
  width: 25px;
  height: 25px;
  margin-left: auto;
}
.active {
  border: 1px solid greenyellow;
}
.reportItem {
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.common {
  background: rgba(255, 78, 78, 1);
  opacity: 1;
  border-radius: 25px;
  font-size: 17px;
  font-family: PingFang SC;
  font-weight: 500;
  // line-height:24px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.cell {
  text-align: center;
  width: 115px;
  height: 36px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  line-height: 36px;
  border-radius: 25px;
  margin: 0px auto;
  margin-bottom: 19px;
}
.cell:nth-child(2) {
  .common();
}
.cell:nth-child(3) {
  .common();
}
.cell:last-child {
  width: 139px;
  height: 44px;
  background: rgba(148, 190, 50, 1);
  opacity: 1;
  border-radius: 25px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 500;
  // line-height:28px;
  color: rgba(255, 255, 255, 1);
  // .common()
}
.footbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 0px;
  .Watch {
    height: 20px;
    padding: 4px 11px;
    background: rgba(148, 190, 50, 1);
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 22px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .not_watch {
    padding: 4px 11px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 22px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    // line-height:21px;
    color: rgba(0, 0, 0, 1);
  }
}
.recommend_hole {
  // background;
  margin-bottom: 20px;
  // position: fixed;
  // top: 0px;
  // left: 0px;
  // width: 100%;
  // margin-top: calc(100);
  // height: 100%;
}
.left_icon_report {
  width: 21px;
  height: 21px;
  margin-right: 16px;
}
.closeIcon {
  width: 30px;
  height: 30px;
  margin-top: 15px;
  //   position: absolute;
  // bottom: -50px;
  // z-index: 1;
}
.content_report {
  display: flex;
  margin: 0px auto;
  justify-content: center;
  align-items: center;
  width: 156px;
  height: 49px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-radius: 25px;
}

.content_report:nth-child(1) {
  margin-bottom: 20px;
}
.content_report:nth-child(3) {
  // margin-bottom: 20px;
  background-color: transparent;
}
/deep/ .van-dialog {
  background-color: transparent;
}
.recommend {
  margin: 0px auto;
  width: 314px;
  background: rgba(255, 255, 255, 0.3);

  border-radius: 21px;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  .around-border {
    width: 302px;
    // position: absolute;
    z-index: 1;

    // // top: 6px;
    // height: 472px;
    background: rgba(255, 255, 255, 0.41);
    // opacity: 1;
    border-radius: 16px;
    padding: 20px 23px 24px;
    margin: 6px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .content {
      margin-top: 13px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 20px;
      color: rgba(0, 0, 0, 1);
      line-height: 20px;
    }
    .close {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 9px;
      margin-bottom: 10px;
      // flex-direction: column;
    }
    .closemessage {
      width: 62px;
      height: 25px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
      opacity: 1;
      border-radius: 13px;
      font-size: 12px;
      font-family: PingFang SC;
      line-height: 25px;
      text-align: center;
      font-weight: 600;
      // line-height:17px;
      color: rgba(0, 0, 0, 1);
    }
    .header_ {
      height: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .userInfo {
      display: flex;
      align-items: center;
      width: 100%;
      .nickname {
        width: 111px;
        // height:21px;
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 500;
      }
      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .right_cion {
      width: 0.65333rem;
      height: 0.16rem;
      padding: 10px;
      margin-left: auto;
      // box-sizing: border-box;
      // background-color: red;
    }
  }
  .videoBox {
    position: relative;
    border: 1px dotted;
    height: 132px;
    border-radius: 10px;
    margin: 13px auto;

    display: flex;
    align-items: center;
    justify-content: center;
    .videog {
      position: absolute;
      width: 25px;
      height: 25px;
    }
    video {
      max-width: 100%;
      height: 100%;
    }
  }
  .onlyImage {
    img {
      width: 253px;
      height: 132px;
      border-radius: 16px;
    }
  }
  .not_onlyimage {
    display: flex;
    flex-wrap: wrap;

    // margin: 0px auto;
    // justify-content: space-around;
    img {
      width: 109px;
      height: 109px;
      margin-bottom: 10px;
      border-radius: 10px;
      // margin-right: auto;
    }
    img:nth-child(odd) {
      margin-right: 10px;
      margin-right: auto;
      // border-radius:50%;
    }
  }
  .showContent {
    position: relative;
  }
}
// /deep/ .van-dialog__content {
//   z-index: 2221 !important;
//   position: relative;
// }
// /deep/ .van-overlay {
//   z-index: 2200;
// }
// /deep/ .van-swipe {
//   width: 100%;
//   /deep/ .van-swipe-item {
//     img {
//       width: 100%;
//       height: 300px;
//     }
//   }
// }
// .head_content {
//   font-size: 15px;
//   font-family: Source Han Sans CN;
//   padding: 0px 15px;
//   box-sizing: border-box;
//   font-weight: 400;
//   color: rgba(255, 255, 255, 1);
//   line-height: 24px;
// }
// .recommend {
//   border-radius: 5px;
//   margin: 15px auto;
//   padding-bottom: 12px;

//   .top {
//     .head {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       padding-top: 10px;
//       .left_icon,
//       .right_icon {
//         display: flex;
//       }
//       .examine {
//         background: rgba(46, 47, 67, 1);
//         border-radius: 6px;
//         font-size: 12px;
//         padding: 8px 7px;
//         margin-right: 10px;
//         color: #ff4444ff;
//         font-family: Source Han Sans CN;
//         font-weight: 400;
//       }

//       .avatar {
//         width: 25px;
//         height: 25px;
//         margin-left: 10px;
//       }

//       .name {
//         font-size: @font16;
//         margin-left: 11px;
//         font-size: 16px;
//         font-family: Source Han Sans CN;
//         font-weight: 400;
//         color: rgba(255, 255, 255, 1);
//       }

//       .more {
//         height: 6px;
//         width: 20px;
//         margin-right: 15px;
//         padding: 10px 0px;
//         margin-left: auto;
//         margin-right: 20px;
//       }

//       .attention {
//         width: 60px;
//         height: 26px;
//         background: linear-gradient(
//           180deg,
//           rgba(35, 149, 255, 1),
//           rgba(0, 80, 213, 1)
//         );
//         border-radius: 6px;
//         border-radius: 5px;
//         color: #ffffff;
//         font-size: 12px;
//         line-height: 26px;
//         text-align: center;
//         margin-left: auto;
//         margin-right: 15px;
//       }

//       .gray {
//         display: none;

//       }

//       .pass {
//         background: #3cb039;
//         border-radius: 11px;
//         color: #ffffff;
//         font-size: 12px;
//         padding: 2.5px 11px;
//         margin-left: auto;
//         margin-right: 10px;
//       }

//       .doing {
//         background: #f57008;
//         border-radius: 11px;
//         color: #ffffff;
//         font-size: 12px;
//         padding: 2.5px 11px;
//         margin-left: auto;
//         margin-right: 10px;
//       }

//       .fail {
//         background: #ff0701;
//         border-radius: 11px;
//         color: #ffffff;
//         font-size: 12px;
//         padding: 2.5px 11px;
//         margin-left: auto;
//         margin-right: 10px;
//       }
//     }

//     .text {
//       width: 314px;
//       height: 144px;
//       overflow: hidden;
//       font-size: 16px;
//       font-family: Source Han Sans CN;
//       font-weight: 400;
//       color: rgba(0, 0, 0, 1);
//       line-height: 24px;
//       margin: 13px auto;
//       text-align: left;
//     }
//   }
//   /deep/ .van-dialog {
//     border-radius: 0px;
//     background-color: #28344a;
//   }
//   .photo {

//     border-radius: 10px;
//     align-items: flex-start;
//     display: flex;
//     flex-wrap: wrap;

//     margin: 12px auto;

//     .one {
//       width: 320px;
//       height: 215px;
//       border-radius: 10px;
//     }

//     .three {
//       width: 103px;
//       height: 103px;
//     }

//     .three,
//     .nine {
//       margin-left: 5px;
//       margin-top: 5px;
//       border-radius: 5px;
//     }

//     .nine {
//       width: 103px;
//       height: 70px;
//     }

//     .three:nth-of-type(1),
//     .nine:nth-of-type(1),
//     .three:nth-of-type(4),
//     .nine:nth-of-type(4),
//     .three:nth-of-type(7),
//     .nine:nth-of-type(7),
//     .nine:nth-of-type(4),
//     .three:nth-of-type(10),
//     .nine:nth-of-type(10) {
//       margin-left: 0;
//     }
//   }

//   .tag {
//     background: #e5e5e5;

//     border-radius: 5px;
//     padding: 4px 8px;
//     margin-bottom: 13px;
//     font-size: 12px;
//     color: #999999;
//     display: inline-block;
//     margin-left: 15px;
//   }

//   .showContent {
//     .cell {
//       border-bottom: 1px solid #eeeeee;
//     }
//     .cell {
//       display: flex;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       height: 65px;

//       img {
//         width: 19px;
//         height: 19px;
//         margin-right: 9px;
//       }

//       span {
//         font-size: @font16;
//         color: #ffffffff;
//       }
//     }

//     .cell {
//     }
//   }
//   .foor_bar {
//     display: flex;
//     padding: 15px;
//     font-size: 15px;
//     box-sizing: border-box;
//     justify-content: space-between;
//   }
// }
</style>
