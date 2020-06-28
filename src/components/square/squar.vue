<template>
  <div class="squre">
    <!-- <div></div> -->
    <div class="main">
      <div class="content_hole">
        <div v-if="is_end" class="around_hole">
          <div class="userInfoHeader" v-if="fromItem==2">
            <div v-if="item.statu==1" class="commitstatus">未被回复</div>
            <div class="right_Img" @click="deletItem(item)">
              <img src="@/assets/images/main/icon_screen_close.png" alt />
            </div>
          </div>
          <div class="userInfo_bar" v-if="fromItem==1">
            <div class="hold">
              <div class="avator" v-if="itemnew.userInfo && itemnew.userInfo.avatar">
                <img :src="itemnew.userInfo.avatar" alt srcset />
              </div>
              <div class="rigt_icon" @click="OpenshowReport">
                <img src="@/assets/images/home/icon_video_more.png" alt srcset />
              </div>
            </div>
            <div class="userinfo">
              <div
                class="username"
                v-show="itemnew.userInfo"
              >{{itemnew.userInfo && itemnew.userInfo.nickname}}</div>
              <div
                class="adress"
              >{{itemnew.userInfo && itemnew.userInfo.constellation}}&nbsp;&nbsp;&nbsp;&nbsp;{{itemnew.userInfo && itemnew.userInfo.addr}}</div>
            </div>
          </div>
          <div
            v-show="itemnew.images"
            :class="itemnew.images?'content':'only_content'"
          >{{itemnew.content}}</div>

          <div class="content_img" @click="img_show(itemnew.images[0].url)" v-if="itemnew.images">
            <van-image
              lazy-load
              :src="itemnew.images[itemnew.images.length-1].url"
              v-if="itemnew.images[itemnew.images.length-1]"
            />
          </div>
          <div class="foor_bar" v-if="fromItem==1">
            <div class="leftBack" @click.stop="totlaSum">
              <div class="left">
                <img src="@/assets/images/home/icon_home_throw.png" alt srcset />
              </div>
              <span>埋回去</span>
            </div>
            <div class="remend" @click="routerShow(item)">
              <img src="@/assets/images/home/icon_home_reply.png" alt srcset />
              <span>回个话</span>
            </div>
          </div>
        </div>
        <div class="is_end_around" v-else>
          <div class="top_content">
            <img
              :src="responseStatus.avatar"
              class="avator_not_read"
              alt
              srcset
              v-if="responseStatus.avatar"
            />
            <div class="userInfo_tree">
              <div class="nick_name">{{responseStatus.nickname}}</div>
              <div>
                <van-divider
                  :style="{ color: '#000000FF', borderColor: '#000000FF' , fontsize:'15px',padding: '0 7px' }"
                >今天你查看了{{responseStatus.todayViewCount}}个树洞秘密</van-divider>
                <div class="tree_info">
                  <div>
                    <img src="@/assets/images/home/icon_hole_throw.png" alt srcset />
                  </div>
                  <div>把秘密埋回树洞{{responseStatus.todayDiscardCount}}次</div>
                </div>
                <div class="tree_info">
                  <div>
                    <img src="@/assets/images/home/icon_hole_reply.png" alt srcset />
                  </div>
                  <div>把树洞秘密回复{{responseStatus.todayReplyCount}}次</div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom_content">
            <img src="@/assets/images/home/icon_home_wait.png" class="bottom_icon" alt />
            <div class="bottom_padding">
              <van-divider
                :style="{ color: '#000000FF', borderColor: '#000000FF' , fontsize:'15px',padding: '0 7px' }"
              >距离下次查看树洞秘密还有</van-divider>
              <div class="slider-time">
                <div>
                  <span>{{timeResult.hour}}</span>
                  <span></span>
                </div>
                <div class="time">时</div>
                <div>
                  <span>{{timeResult.min}}</span>
                  <span></span>
                </div>
                <div class="time">分</div>
                <div>
                  <span>{{timeResult.sencond}}</span>
                  <span></span>
                </div>
                <div class="time">秒</div>
              </div>
            </div>
          </div>
          <div class="pushTree" @click="ToRouter">
            <img src="@/assets/images/home/icon_home_publish.png" class="edit_push" alt srcset />
            <span>发个树洞秘密</span>
          </div>
        </div>
      </div>
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
    </div>
  </div>
</template>

<script>
var that;
import { reportcount } from "../../api/modules/mine";
import { cancelLahei } from "../../api/modules/mine";
import { ImagePreview, Toast } from "vant";
import {
  getReport,
  Tip_off,
  reportSubmit,
  getBlogStatus
} from "../../api/modules/home";

import { mapState, mapMutations } from "vuex";
var _this;
export default {
  props: {
  
    fromItem: {
      type: String,
      default: "1"
    },
    responseStatus: {
      type: Object,
      default: () => {
        return {};
      }
    },
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    ...mapState({
      total: state => state.home.total,
      userInfo: state => state.user.userInfo
      // tiem_next:state=>state.home.tiem_next
    }),

    itemnew() {
      return this.item;
    }
    // ImgURl(){
    //   return this.itemnew.images[0].url;
    // }
  },

  activated() {
    console.log("-------zhixng ");

    // this.getInit();
  },
  watch: {
    responseStatus: {
      deep: true,
      immediate: true,
      handler: function(val) {
        if (JSON.stringify(val) != "{}") {
          this.is_end = 0;
          var _this = this;
          if (!this.is_end_tiem) {
            this.formatSeconds(val.nextTime);
            // this.changeData(key:'')
            window.tiem_next = setInterval(function() {
              val.nextTime--;
              _this.formatSeconds(val.nextTime);
            }, 1000);
            console.log(window);
            this.changeData({ key: "tiem_next", val: this.nextTime });
            // this.formatSeconds(val.nextTime);
          }
        } else {
          this.is_end = 1;
        }
      }
    },
    // total: function(val) {
    //   console.log(val);
    //   if (val == 0) {
    //     this.is_end = 0;
    //   }
    // }
  },
  components: { ImagePreview },
  created() {
    // var time=7200;
    // // alert('---')
    // var _thi=this;
    //   this.formatSeconds(time);
    //
  },

  data() {
    return {
      tiem_next: null,
      timeResult: {
        hour: 0,
        min: 0,
        sencond: 0
      },
      is_end_tiem: false,
      imgUrl: "",
      sumtotal: 10,
      is_end: 0,
      curentIndex: "",

      treeList: {}, //
      is_Ok: false,
      show: false,
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
  //   mounted(){
  // this.formatSeconds(7200)
  //   },
  methods: {
    ToRouter() {
      this.$router.push({
        path: "/createTopic"
      });
    },
    formatBit(val) {
      val = +val;
      return val > 9 ? val : "0" + val;
    }, // 秒转时分秒，求模很重要，数字的下舍入
    formatSeconds(time) {
      if (time == 0) {
        clearInterval(window.tiem_next);
        this.is_end_tiem = false;
        this.$nextTick(function() {
          this.is_end = 1;
          // this.$parent.sumtotal=10;
       var _this=this;
       setTimeout(function(){
            _this.$parent.getInit();
       },300)
          // this.changeData({
          //   key:'total',
          //   val:10
          // })
        });
        // if(){

        // }
        // this.$parent.getInit();
        // debugger
        console.log("结束了");
      }
      let min = Math.floor(time % 3600);
      this.is_end_tiem = true;
      this.timeResult.hour = this.formatBit(Math.floor(time / 3600));
      this.timeResult.min = this.formatBit(Math.floor(min / 60));
      this.timeResult.sencond = this.formatBit(time % 60);

      // return val
    },
    deletItem(item) {
      console.log(item);
      this.$emit("isShowGet", 1);
      this.$emit("deleteItemsad", item);
    },
    OpenShoereport(item) {
      this.$nextTick(function() {
        this.show = false;
        this.showType = true;
      });
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
    },
    OpenshowReport() {
      this.show = true;
    },
    routerShow(item) {
      console.log(item);
      reportcount({
        type: 2
      }).then(() => {});
      this.changeData({ key: "isSelectItem", val: item });
      this.$router.push({
        path: "/talkChat",
        query: {
          type: 1,
          data: item.userId
        }
      });
    },
    ...mapMutations({
      changeData: "home/changeData"
    }),
    totlaSum() {
      console.log(this.$parent);
      reportcount({
        type: 1
      }).then(() => {});
      this.is_Ok = false;
      this.$parent.getInit();
    },
    img_show(url) {
      ImagePreview([url]);
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
    /**
     * 星座代表
     *
     *
     *
     */
    getType(val) {
      switch (val) {
        case 1:
          // 白羊座
          this.imgUrl = "baiyangzuo@3x.png";
          break;
        case 2:
          //金牛座
          this.imgUrl = "jinniuzuo@3x.png";
          break;
        // 巨蟹座
        case 3:
          this.imgUrl = "juxiezuo@3x.png";

          break;

        case 4:
          // 处女座
          this.imgUrl = "chunvzuo@3x.png";
          break;

        case 5:
          this.imgUrl = "tianxiezuo@3x.png";
          break;
        case 6:
          this.imgUrl = "mojiezuo@3x.png";
          break;
        case 7:
          this.imgUrl = "sheshouzuo@3x.png";
          break;
        case 8:
          this.imgUrl = "shizizuo@3x.png";
          break;
        case 9:
          this.imgUrl = "shuangyuzuo@3x.png";
          break;
        case 10:
          this.imgUrl = "shuangzizuo@3x.png";
          break;
        case 11:
          this.imgUrl = "shuipingzuo@3x.png";
          break;
        case 12:
          this.imgUrl = "tianchengzuo@3x.png";
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/safeArea";
.active {
  border: 1px solid greenyellow;
}
.userInfoHeader {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .commitstatus {
    width: 70px;
    height: 24px;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    line-height: 24px;
    text-align: center;
    border-radius: 12px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    // line-height:17px;
    color: rgba(25, 25, 25, 1);
    opacity: 1;
  }
  .right_Img {
    width: 25px;
    height: 25px;
    margin-left: auto;
  }
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
/deep/ .van-dialog {
  background-color: transparent;
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
.content_report:nth-child(1) {
  margin-bottom: 20px;
}
.content_report:nth-child(3) {
  // margin-bottom: 20px;
  background-color: transparent;
}
/deep/ .van-divider {
  font-size: 15px;
  margin: 0px;
}
.squre {
  height: 100%;
  // margin-top: 20px;
  // background-color: red;
  padding-top: calc(@top + 60px);
  // margin: 0px auto;
  position: fixed;
  width: 100%;
  z-index: 1;
  display: flex;
  // align-items: center;
  justify-content: center;

  // width: 100%;
  // position: fixed;
  // top: 0px;
  // padding-top: calc(@top + 64px);
  // left: 0px;
  // z-index: 1;
  // height: calc(100% - 46px);
  // overflow: hidden;
  // bottom: @bottom;
  background: rgba(0, 0, 0, 0.35);
  // opacity:0.28;
  // background-color: #00000;
  .main {
    .content_hole {
      margin: 0px auto;
      width: 314px;
      height: 484px;
      background: rgba(255, 255, 255, 0.3);

      // opacity: 0.3;
      border-radius: 21px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .is_end_around {
        width: 302px;
        position: absolute;
        z-index: 1;
        // top: 6px;
        height: 472px;
        background: rgba(255, 255, 255, 0.41);
        opacity: 1;
        border-radius: 16px;
        // padding: 20px 23px 24px;

        box-sizing: border-box;
        .pushTree {
          width: 157px;
          height: 41px;
          background: rgba(255, 255, 255, 1);
          opacity: 1;
          border-radius: 21px;
          margin: 21px auto;
          margin-bottom: 0px;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #000000;
          font-weight: bolder;
          .edit_push {
            width: 41px;
            height: 41px;
            margin-right: 14px;
          }
        }
        .bottom_content {
          width: 255px;
          height: 127px;
          background: rgba(255, 255, 255, 1);
          opacity: 1;
          border-radius: 21px;
          position: relative;
          margin: 0px auto;
          margin-top: 40px;
          .slider-time {
            display: flex;
            flex: 1;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            div:nth-child(odd) {
              width: 32px;
              height: 30px;
              background: rgba(0, 0, 0, 1);
              opacity: 1;
              border-radius: 0px 0px 4px 4px;
              margin-right: 10px;
              border-radius: 4px;
              position: relative;
              span:nth-child(2) {
                display: inline-block;
                width: 100%;
                height: 1px;
                position: absolute;
                top: 50%;
                z-index: 1;
                background-color: #ffffff;
              }
              span:nth-child(1) {
                display: inline-block;
                // width: 100%;
                // height: 1px;
                position: absolute;
                font-size: 20px;
                font-family: PingFang SC;
                font-weight: 600;
                left: 50%;
                margin-top: -0.4rem;
                top: 50%;
                margin-left: -0.3rem;
                z-index: 1;
                color: #ffffff;
                // background-color: #ffffff;
              }
            }
            div:nth-child(1) {
              margin-left: 25px;
            }
            .time {
              width: 32px;
              height: 30px;
              color: rgba(0, 0, 0, 1);
              line-height: 30px;
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 400;
            }
            .time:nth-child(3) {
              margin-right: 36px;
            }
          }
          .bottom_padding {
            padding-top: 36px;
          }
          .bottom_icon {
            position: absolute;
            top: -26px;
            left: 50%;
            margin-left: -0.7rem;
            width: 52px;
            height: 52px;
          }
        }
        .top_content {
          // margin-top: 48px;

          margin: 48px auto;
          margin-bottom: 0px;
          // margin: ;
          width: 255px;
          height: 151px;
          background: rgba(255, 255, 255, 1);
          opacity: 1;
          border-radius: 21px;
          position: relative;
          .avator_not_read {
            position: absolute;
            border-radius: 50%;
            width: 76px;
            height: 76px;
            // width: 2.02667rem;
            // height: 2.02667rem;
            top: -38px;
            left: 50%;
            margin-left: -1rem;
          }
          .userInfo_tree {
            // position: absolute;

            text-align: center;
            padding-top: 38px;
            .nick_name {
              font-size: 15px;
              font-family: PingFang SC;
              font-weight: 500;
              margin: 4px 0px 6px;
            }
            .tree_info:nth-child(1) {
              margin-top: 6px;
            }
            .tree_info {
              display: flex;
              justify-content: center;
              div:nth-child(1) {
                border: 1px dotted #707070ff;
                margin-right: 6px;
              }

              img {
                width: 19px;
                height: 19px;
                //
              }
              margin-bottom: 5px;
            }

            // margin-top: 38px;
          }
        }
      }

      .around_hole {
        width: 302px;
        position: absolute;
        top: 6px;
        height: 472px;

        background: rgba(255, 255, 255, 0.41);
        opacity: 1;
        border-radius: 16px;
        padding: 20px 23px 24px;
        box-sizing: border-box;
        .hold {
          display: flex;
          // justify-content: center;
          .avator {
            width: 55%;

            // background-color: red;
            display: flex;
            justify-content: flex-end;
            img {
              width: 36px;
              height: 36px;
              border-radius: 60%;
            }
          }
          .rigt_icon {
            // width:40%;
            margin-left: auto;
            // background-color: blue;
            padding: 10px 0px 10px 10px;
            // width: 14px;
            box-sizing: border-box;
            // display: flex;

            // justify-content: flex-end;
            img {
              width: 0.65333rem;
              height: 6px;
            }
          }
        }
        .userinfo {
          text-align: center;
          color: rgba(255, 255, 255, 1);
          font-family: PingFang SC;

          .username {
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 500;
            margin-top: 5px;
            // margin-right: 20px;
            // line-height:21px;
          }
          .addres {
            font-size: 12px;
            font-weight: 500;
            line-height: 17px;
            // color:rgba(255,255,255,1);
          }
          /**;;;; */
        }

        .content,
        .only_content {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          // line-height:20px;
          color: rgba(0, 0, 0, 1);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
        }
        .content {
          margin-top: 10px;
          line-height: 20px;
          font-weight: 500;
        }
        .only_content {
          line-height: 25px;
          margin-top: 70px;
          margin-bottom: 70px;
        }
      }
    }
    .content_img {
      // margin-top: 10px;
      width: 253px;
      height: 132px;
      overflow: hidden;
      border-radius: 10px;
      margin-top: 10px;
      position: absolute;
      bottom: 80px;
    }
    .foor_bar {
      display: flex;
      margin-top: 15px;
      justify-content: space-around;
      position: absolute;
      bottom: 20px;
      .leftBack {
        margin-right: 40px;
      }
      .leftBack,
      .remend {
        position: relative;
        width: 97px;
        height: 34px;
        background: rgba(255, 255, 255, 1);
        opacity: 1;
        border-radius: 17px;
        display: flex;
        align-items: center;
        margin-left: 11px;

        span {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          margin-left: 44px;
          // line-height:17px;
          color: rgba(0, 0, 0, 1);
        }

        img {
          position: absolute;
          top: -1px;
          left: -2px;
          bottom: -1px;
          width: 37px;
          height: 37px;
        }
      }
    }
  }
}
</style>