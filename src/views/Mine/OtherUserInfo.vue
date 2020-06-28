<template>
  <div class="OtherUserInfo container">
    <An_header :title="otheruserInfo.nickname">
      <div slot="right" class="right_icon">
        <!-- <img v-if="false" src="@/assets/images/mine/icon_mesg.png"  alt /> -->
        <img src="@/assets/images/home/icon_video_more.png" @click="deleted" alt />
      </div>
    </An_header>

    <img src="@/assets/images/home/bg_square.png" alt class="bg" />



    <van-dialog
      width="210px"
      class="showContent"
      :showConfirmButton="false"
      closeOnClickOverlay
      v-model="show"
    >
      <div class="reportBlakc">
        <div class="content_report" @click="OpenShoereport()">
          <img src="@/assets/images/home/icon_report.png" class="left_icon_report" alt srcset />
          <div>举报TA</div>
        </div>
        <div class="content_report" @click="AddBlock()">
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
      v-model="show2"
    >
      <div class-="reportItem">
        <div
          class="cell"
          v-for="(v,i) in resportList"
          :class="curentIndex==i?'active':''"
          :key="i"
          @click="ToReport(i,v)"
        >
          <span>{{v.name}}</span>
        </div>
      </div>
    </van-dialog>


    <div class="main">
      <div class="userPanel">
        
        <div class="bg2">
            <div class="upDiv">
              <div class="left">
                <img class="rolePic" :src="otheruserInfo.avatar" alt />
              </div>

              <div class="right">
                <div v-if="!otheruserInfo.isWatched" class="t4" @click="towatchUser()">关注</div>
                <div v-else class="t4" @click="towatchUser()">已关注</div>
                <div class="sendMessage" @click="totalkChat()">发私信</div>
              </div>

            </div>


              <div class="t1">{{otheruserInfo.nickname}}</div>

            <div v-if="true" class="descTxt line2hidden">{{otheruserInfo.sign}}</div>

            <div class="bothdress">
                <!-- <div v-if="userInfo.constellation" class="both">{{userInfo.constellation}}双鱼座</div> -->
                <div class="both">{{otheruserInfo.constellation}}双鱼座</div>
                <div v-if="otheruserInfo.addr" class="adress">{{otheruserInfo.addr}}</div>
            </div>
        </div>
        <van-tabs
          :border="false"
          line-width="48px"
          line-height="2px"
          :v-model="tabIndex"
          class="tab"
          background='transparent'
        >
          <van-tab title="广场动态">
            <an-recommend
              :uerlist="seeOther"
              user='other'
              other="1"
              class="infoList"
              :id="'item'+index"
              ref="item"
              :item="item"
              v-for="(item,index) in dataList"
              :key="index"
            />
          </van-tab>
        </van-tabs>

        
      </div>
    </div>
  </div>
</template>
<script>
import An_header from "../../components/header/an-header.vue";
import Applications from "./components/applications";
import NoLogin from "./components/noLogin";
import { mapState ,mapMutations} from "vuex";
import { getReport, Tip_off, reportSubmit } from "@/api/modules/home";
import AnRecommend from "@/views/Home/components/an-recommend";
import { reportSomeone, cancelLahei} from "@/api/modules/mine";
import { Dialog } from "vant";
import { Toast } from "vant";
import { watchMe, watchUser,getUserinfo,userBlogs} from "../../api/modules/mine";
var userID = "";
export default {
  name: "OtherUserInfo",
  components: {
    NoLogin,
    Applications,
    An_header,
    AnRecommend,
    Dialog
  },
  data() {
    return {
      otheruserInfo: {},
      tabIndex: 0,
      show: false,
      show2: false,
      dataList:[],
      curentIndex: "",
      bg2Height:'100px',
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
      ],
    };
  },
  activated() {
    userID = this.$route.query.id;
    this.seeOther(userID);
  },
    computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  filters: {

  },
  methods: {
    ...mapMutations({
      changeData:'home/changeData'
    }),
    seeOther(userID) {
      getUserinfo({ id: userID })
        .then(res => {
          this.otheruserInfo = res.data;
          let that = this;
          userBlogs({userId:userID,limit:20,page:1}).then(res=>{
            this.dataList = res;
          })
          })
        .catch(error => {
          this.$router.back();
        });
    },

        ToReport( index, v) {
      const { type } = v;
      var info = JSON.parse(localStorage.userInfo);
      console.log(index);
      if (index == 5) {
        {
          reportSubmit({
            UserId: info.id,
            ReportUserId: userID,
            Type: 1,
            ObjectId: this.otheruserInfo.id,
            Reason: type
          }).then(res => {
            Toast({
              message: "举报成功",
              duration: 1500
            });
            this.show2 = false;
          });
        }
        this.curentIndex = "";
      } else {
        this.curentIndex = index;
      }
    },
    getReportType() {
      getReport().then(res => {
        console.log(res);
        this.resportList = res;
      });
    },
    towatchUser() {

      if (this.otheruserInfo == {}) return;
      var info = JSON.parse(localStorage.userInfo);
      watchUser({
        userId: info.id,
        watchedUid: userID,
        mark: 2,
        watchOptType: this.otheruserInfo.isWatched ? 2 : 1
       }).then(res => {
          this.changeData({
          key:'isinit',
          val:this.otheruserInfo.id
        })
        this.otheruserInfo.isWatched = this.otheruserInfo.isWatched? false : true;


        var evt = new CustomEvent('updateWatch');
        evt.data = userID;
        window.dispatchEvent(evt);
       
        if (this.otheruserInfo.isWatched == false) {
        
          Toast("已取消关注该用户");
        }
      });
    },
    CLose() {
      this.$nextTick(function() {
        this.show = false;
      });
    },
    change(index) {
      this.tabIndex = index;
    },
    deleted() {
      if (!userID) {
        return;
      }
      this.show = true;
    },
 OpenShoereport(item) {
      this.$nextTick(function() {
        this.show = false;
        this.show2 = true;
      });
    },
    AddBlock() {
      if (this.otheruserInfo == {}) return;
      var info = JSON.parse(localStorage.userInfo);
      cancelLahei({
        userId: info.id,
        blackUserId: userID,
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
    toHei() {
      console.log("拉黑");
      dislikeSomeone({ block_user_id: userID }).then(res => {
        Toast("已加入黑名单");
      });
    },
    dislike(idx) {
      console.log("举报+++++" + idx);
      this.show2 = false;
      reportSomeone({ report_user_id: userID, type: idx }).then(res => {
        Toast("举报成功");
      });
    },
    totalkChat() {
      this.$router.push({ path: "/talkChat", query: { data: userID } });
    },
    openUpdate() {
      this.$router.push({
        path: "/Personaldetail"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/font.less";
@import "../../assets/safeArea.less";

.OtherUserInfo {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:rgba(255,255,255,0.47);
  .header {
    background: transparent;
  }

  .right_icon {
    display: flex;
    align-items: center;
    img:nth-child(1) {
      width: 20px;
      margin-left: 10px;
      height: 5px;
      padding: 10px 0 10px 10px;
    }
  }

  .controlDiv {
    position: absolute;
    z-index: 1002;
    width: 80px;

    margin-left: 247px;
    justify-content: flex-end;
    display: inline-flex;
    align-items: center;
    padding-top: 15px;
    margin-top: @top;
    .ctrlIcon {
      width: 17px;
    }
    .icon2 {
      height: 15px;
      z-index: 10000;
    }
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

.active {
  border: 1px solid greenyellow;
}
.reportItem {
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

  .bg {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    
    /deep/ .van-tabs__content{
      // height: calc(100% - 40px);
      // overflow: scroll;
      padding-bottom: 40px;
    }


    .tab {
      width: 100%;
      position: relative;
    }

    /deep/ .van-tabs__line {
      width:27px !important;
      height:3px;
      background:rgba(0,0,0,1);
      opacity:1;
      border-radius:3px;
      // margin-top: -13px;
    }

    /deep/ .van-tab {
      background: transparent;
      border: none;
      color: #000000;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:500;
    }

    .userPanel {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      margin-top: calc(@top + 46px);
      overflow-y: scroll;
      height: calc(100% - @top);
      justify-content: center;
      box-sizing: border-box;

      .bg2{
        width:375px;

        // opacity:0.74;
        // z-index: 0;
      }
      .upDiv {
        position: relative;
        width: calc(100% - 40px);
        height: 130px;
        overflow: hidden;
        display: inline-flex;
        margin: 0 20px;
        margin-top: 20px;
        z-index: 1;

        .left {
          width: 94px;
          .rolePic {
            width: 94px;
            height: 94px;
            border-radius: 50%;
          }
        }
        .right {
          width: calc(100% - 130px);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-left: 31px;

          .t4{
            width:84px;
            height:31px;
            background:rgba(148,190,50,1);
            box-shadow:0px 0px 6px rgba(0,0,0,0.16);
            opacity:1;
            border-radius:16px;

            font-size:14px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height: 31px;
            text-align: center;
          }

          .sendMessage{
            width:84px;
            height:31px;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 6px rgba(0,0,0,0.16);
            opacity:1;
            border-radius:16px;

            font-size:14px;
            font-family:PingFang SC;
            font-weight:500;
            line-height: 31px;
            text-align: center;
          }
        }
      }

      .t1{
        width:216px;
        height:25px;
        font-size:18px;
        font-family:PingFang SC;
        font-weight:600;
        line-height:25px;
        color:rgba(0,0,0,1);
        opacity:1;
        margin-left: 20px;
        z-index: 1;
        position: relative;
      }

      .descTxt {
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,1);
        padding-top: 15px;
        padding-left: 21px;
        padding-right: 21px;
        opacity:1;
        position: relative;
        z-index: 1;
      }
    }
      .bothdress{
        position: relative;
        z-index: 1;
        display: inline-flex;
        justify-content: flex-end;
        width: 100%;

        right: 27px;
        margin-top: 12px;
        padding-bottom: 20px;

        .adress{
          // width:48px;
          height:27px;
          background:rgba(255,255,255,1);
          opacity:1;
          border-radius:14px;
          line-height: 27px;
          text-align: center;
          padding: 2px 10px;

          font-size:12px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(25,25,25,1);
        }
        .both{
          height:27px;
          background:rgba(255,255,255,1);
          opacity:1;
          border-radius:14px;
          line-height: 27px;
          text-align: center;
          padding: 2px 10px;

          font-size:12px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(25,25,25,1);
          margin-right: 19px;
        }
      }
  }
}
</style>
