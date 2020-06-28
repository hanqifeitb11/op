<template>
  <div class="mine container">
    <An_header :leftArrow="false">
      <div class="controlDiv" slot="right">
        <img
          class="ctrlIcon"
          src="@/assets/images/home/jian.png"
          alt
          @click="toRouter('/videoCache')"
        />
        <img
          class="ctrlIcon icon2"
          src="@/assets/images/home/bianjiziliao@3x.png"
          @click="toRouter('/personaldetail')"
          alt
        />
        <img
          class="ctrlIcon"
          src="@/assets/images/mine/icon_set.png"
          alt
          @click="toRouter('/Systemsettings')"
        />
      </div>
    </An_header>
    <img src="@/assets/images/home/bg_square.png" alt class="bg" />

    <div class="main">
      <div class="userPanel">
        <!-- <div class="userInfo"> -->
        <div class="top_content">
          <div class="rolePic">
            <img :src="MienUserinfo.avatar" alt />
          </div>
          <div class="searchInfo">
            <div>
              <img src="@/assets/images/home/icon_hole_reply.png" alt />
            </div>
            <div>给树洞秘密回复{{responseItem.todayReplyCount}} 次</div>
          </div>
        </div>
        <div class="content_info">
          <div class="userInfo_info">
            <div class="nickname">{{MienUserinfo.nickname}}</div>
            <div class="info">{{MienUserinfo.sign}}</div>
            <div class="watch">
              <div class="addr">
                <div class="info_watch" @click="toRouter('/myCare')" v-if="MienUserinfo.watchCount">
                  <div>{{MienUserinfo.watchCount}}</div>
                  <div>关注</div>
                </div>
                <div class="info_watch" @click="toRouter('/myFans')" v-if="MienUserinfo.fansCount">
                  <div>{{MienUserinfo.fansCount}}</div>
                  <div>粉丝</div>
                </div>
              </div>
              <div class="right_info">
                <div class="control" v-show="MienUserinfo.constellation">
                  <div>{{MienUserinfo.constellation}}</div>
                </div>
                <div class="city" v-show="MienUserinfo.addr">{{MienUserinfo.addr | filterCity}}</div>
              </div>
            </div>
          </div>
          <div class="selectbar">
            <van-tabs v-model="active">
              <van-tab title="树洞消息">
                <Squre
                  v-for="(v,i) in List"
                  :key="i"
                  :item="v"
                  fromItem="2"
                  @deleteItemsad="getItem"
                  @isShowGet="getisOK"
                />
              </van-tab>
              <van-tab title="广场动态">
                <div v-for="(v,i) in List" :key="i" class="recommand_item">
                  <AnRecommend :item="v" @deleteItemsad="getItem" @isShowGet="getisOK"   other="1" fromItem="2"></AnRecommend>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </div>

        <van-overlay :show="show" @click="show = false">
          <div class="wrapper" @click.stop>
            <div class="block">确定删除已发布内容吗？</div>
            <div class="block_item">
              <div @click="show=false">取消</div>
              <div @click="DeteItemOne">删除</div>
            </div>
          </div>
        </van-overlay>
      </div>
    </div>
  </div>
</template>
<script>
import AnCommand from "../../components/comment/an-comment";
import { Tab, Tabs, Toast } from "vant";
import Squre from "../../components/square/squar";
import An_header from "../../components/header/an-header.vue";
import Applications from "./components/applications";
import NoLogin from "./components/noLogin";
import Features from "./components/Features";
import { mapState } from "vuex";
import cityList from "../../assets/city.js";
import { getBlogStatus, deletetBlogId } from "../../api/modules/home";
import { getUserinfo, getMEinfo } from "../../api/modules/mine";
import AnRecommend from "@/views/Home/components/an-recommend";

export default {
  name: "mine",
  components: {
    Features,
    NoLogin,
    Applications,
    Tab,
    Squre,
    Tabs,
    An_header,
    AnRecommend
  },
  data() {
    return {
      cityList,
      MienUserinfo: {},
      responseItem: {},
      commitItem: {},
      show: false,
      List: [],
      tabIndex: 0,
      active: 1,
      is_exame: 1,
      page: 1,
      limit: 20,
      type: 1
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      token: state => state.user.token
    })
  },
  filters: {
    filterCity(code) {
      let list = cityList.city_list;
      return list[code] || "";
    }
  },
  activated() {
    // alert('---')
    this.getInit();
    this.getUserInfoMe();
    // this.$store.dispatch("user/getUserInfo", {
    //   id: this.userInfo.id
    // });
  },
  watch: {
    show(val) {
      console.log(val);
    },
    active(val) {
      this.getInit();
      // console.log(val)
      //       if(val){
      // this.getItem();
      //       }else{

      //       }
    }
  },
  methods: {
    getUserInfoMe() {
      getUserinfo({
        id:this.userInfo.id
      }).then(res => {
        console.log('--------------------------------------------------------------')
        console.log(res);
        this.MienUserinfo = res.data;
        console.log(this.MienUserinfo);
      });
    },
    DeteItemOne() {
      console.log(this.commitItem);
      const { id } = this.commitItem;
      deletetBlogId({
        id
      }).then(res => {
        // console.log(res);
        Toast({
          message: "删除成功",
          duration: 1500
        });
      });

      this.List.forEach((e, i) => {
        if (e.id == this.commitItem.id) {
          this.List.splice(i, 1);
        }
      });
      this.$nextTick(function() {
        this.show = false;
      });
    },
    getisOK(val) {
      console.log(val);
      this.show = Boolean(val);
    },
    getItem(item) {
      this.commitItem = item;
      console.log(this.list);
    },
    async getInit() {
      await getMEinfo({
        limit: this.limit,
        type: this.active + 1,
        page: this.page
      }).then(res => {
        console.log(res);
        this.List = res;
      });
      this.responseItem = await getBlogStatus();
    },
    toRouter(idx) {
      this.$router.push({
        path: idx
      });
    },
    handler(idx) {
      console.log(idx);
      this.tabIndex = idx;
      // 已取消关注该用户
    },
    filterCity(code) {
      let list = cityList.city_list;
      return list[code] || "";
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/font.less";
@import "../../assets/safeArea.less";
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 224px;
  height: 62px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-radius: 15px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 62px;
  text-align: center;
  color: rgba(0, 0, 0, 1);
}
.block_item {
  display: flex;
  width: 224px;
  margin-top: 20px;
  justify-content: space-between;
  div:nth-child(1) {
    width: 99px;
    height: 43px;
    background: rgba(211, 211, 211, 1);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 12px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    // line-height: 22px;
    line-height: 43px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
  }
  div:nth-child(2) {
    width: 99px;
    height: 43px;
    background: rgba(255, 110, 110, 1);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 12px;
    line-height: 43px;
    text-align: center;
    // border-radius: 12px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    // line-height:22px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
  }
}
.recommand_item {
  margin-top: 20px;
}
.squre {
  position: inherit;
  padding-top: calc(@top + 1.2rem);
  background-color: transparent;
}
.header {
  background: transparent !important;
}
/deep/ .van-tabs {
  flex-direction: column;
  background-color: transparent;
}
/deep/ .van-tab {
  background: transparent !important;
  color: #000000 !important;
}
/deep/ .van-tabs__nav {
  background-color: transparent !important;
}
/deep/ .van-tabs__line {
  width: 27px !important;
  background: #000000ff !important;

  //  color: #000000FF;
}

/deep/ .van-tab--active {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  // line-height:22px;
  color: rgba(0, 0, 0, 1);
}
.mine {
  width: 100%;
  height: 100%;
  overflow: hidden;


  .controlDiv {
    display: flex;
    align-items: center;
    // position: absolute;
    // z-index: 1002;
    // width: 110px;

    // margin-left: 247px;
    // justify-content: space-between;
    // display: inline-flex;
    // align-items: center;
    // padding-top: 15px;
    // margin-top: @top;
    img {
      // margin-right: 20px;
      padding: 10px 10px;
    }
    img:nth-child(3) {
      margin-right: 12px;
      padding-right: 0px;
      // padding-right: ;
      // padding: 10px 10px;
    }
    .ctrlIcon {
      width: 29px;
      // height: 29px;
    }
    .ctrlIcon:nth-child(3) {
      width: 29px;
    }
    // .icon2 {
    //   // height: 15px;
    //   width: 29px;
    //   height: 29px;
    // }
  }
.bg {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
}

  .main {
    width: 100%;
    height: 100%;
    overflow: scroll;
    // height: calc(100% - 46px);
    // margin-top: 46px;
    // overflow: hidden;


    /deep/ .van-tabs__content {
      height: calc(100% - 40px);
      overflow: scroll;
    }

    .tab {
      width: 100%;
      height: calc(100% - 220px);
      margin-top: 30px;
      // background: #1E1F31;
    }

    /deep/ .van-tabs__line {
      background: linear-gradient(
        90deg,
        rgba(35, 149, 255, 1),
        rgba(0, 80, 213, 1)
      );
    }

    /deep/ .van-tab {
      background: #1e1f31;
      border: none;
      color: #ffffff;
    }

    .userPanel {
      position: fixed;
      top: 0px;
      left: 0px;
      // background-color: rgba(255, 255, 255, 0.74);
      // opacity: 0.74;
      right: 0px;
      margin-top: calc(@top + 46px);
        background:rgba(255,255,255,0.47);
      z-index: 1;
      height: calc(100% - @top);
      // display: flex;
      justify-content: center;
      overflow: scroll;
      // align-items: center;
      // padding: 0px 15px;
      box-sizing: border-box;
      .top_content {
        position: absolute;
        margin: 24px;
        margin-bottom: 0px;
        display: flex;
        .rolePic {
          width: 94px;
          height: 94px;
          img {
            border-radius: 50%;
          }
        }
      }
      // 在这里设置开始方式吧
      //   .rolePic {
      //     margin-left: 24px;
      //     // margin-top: 60px;
      //     // margin-left: 20px;
      //
      //     position: absolute;
      //     // top: -47px;
      //     margin-top: 20px;
      //     z-index: 1;
      //   }
      .content_info {
        margin-top: 65px;
        padding-top: 65px;
        width: 100%;
        
      }

      .searchInfo {
        // position: absolute;
        margin-left: 30px;
        display: flex;
        align-items: center;
        width: 191px;
        height: 31px;
        margin-top: 60px;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 16px;
        div:nth-child(1) {
          border: 1px dotted;
          margin-left: 22px;
          margin-right: 5px;
        }
        img {
          width: 21px;
          height: 18px;
        }
      }

      .userInfo_info {
        // margin-top: 61px;
        padding: 0px 20px;
        box-sizing: border-box;
        .nickname {
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 600;
          // line-height:25px;
          color: rgba(0, 0, 0, 1);
        }
        .info {
          margin-top: 4px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          // line-height:20px;
          color: rgba(0, 0, 0, 1);
        }
        .watch {
          display: flex;
          align-items: center;
          margin-top: 6px;
          .addr {
            display: flex;
            div {
              text-align: center;
            }
            .info_watch {
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 500;
              // line-height:22px;
              color: rgba(0, 0, 0, 1);
            }
            .info_watch:nth-child(1) {
              margin-right: 37px;
            }
          }
        }
        .right_info {
          display: flex;
          margin-left: 61px;
          align-items: center;
          .control {
            display: flex;
            background: rgba(255, 255, 255, 1);
            opacity: 1;
            border-radius: 14px;
            padding: 5px 13px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            margin-right: 18px;
            box-sizing: border-box;
            font-weight: bolder;
          }
        }
        .city {
          padding: 5px 13px;
          box-sizing: border-box;
          background: rgba(255, 255, 255, 1);
          opacity: 1;
          border-radius: 14px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          font-weight: bolder;
          // line-height: 17px;
        }
      }

      // .selectbar {
      //   margin-top: 19px;
      //   font-size: 12px;
      //   font-family: PingFang SC;
      //   font-weight: 500;
      //   color: rgba(0, 0, 0, 1);
      //   div:nth-child(1) {
      //     display: flex;
      //     justify-content: center;
      //     position: relative;
      //   }
      //   .line {
      //     width: 27px;
      //     height: 3px;
      //     background: rgba(0, 0, 0, 1);
      //     opacity: 1;
      //     border-radius: 3px;
      //     position: absolute;
      //     right: 50%;
      //   }
      //   .select_one {
      //   }
      // }

      // .descTxt {
      //   font-size: 15px;
      //   font-family: Source Han Sans CN;
      //   font-weight: 400;
      //   color: rgba(255, 255, 255, 1);
      //   padding-top: 15px;
      //   padding-left: 21px;
      //   padding-right: 21px;
      // }

      // .upDiv {
      //   position: relative;
      //   width: calc(100% - 30px);
      //   height: 130px;
      //   overflow: hidden;
      //   display: inline-flex;
      //   margin: 0 15px;
      //   margin-top: 20px;

      //   .left {
      //     width: 250px;

      //     .t1 {
      //       font-size: 22px;
      //       font-family: Source Han Sans CN;
      //       font-weight: 400;
      //       color: rgba(255, 255, 255, 1);
      //     }
      //     .sexandadress {
      //       display: inline-flex;
      //       align-items: center;
      //       margin-top: 17px;
      //       width: 100%;

      //       .adress {
      //         width: 82px;
      //         height: 26px;
      //         background: rgba(55, 52, 75, 1);
      //         border-radius: 5px;
      //         text-align: center;
      //         line-height: 26px;
      //         font-size: 14px;
      //         font-family: Source Han Sans CN;
      //         font-weight: 400;
      //         color: rgba(148, 149, 166, 1);
      //       }

      //       .adress2 {
      //         width: 150px;
      //         height: 26px;
      //         background: rgba(55, 52, 75, 1);
      //         border-radius: 5px;
      //         text-align: center;
      //         line-height: 26px;
      //         font-size: 14px;
      //         font-family: Source Han Sans CN;
      //         font-weight: 400;
      //         color: rgba(148, 149, 166, 1);
      //         margin-left: 5px;
      //       }
      //     }

      //     .seeDiv {
      //       //  position: relative;
      //       display: inline-flex;
      //       margin-top: 21px;
      //       align-items: center;
      //       .t2 {
      //         font-size: 18px;
      //         font-family: Source Han Sans CN;
      //         font-weight: 400;
      //         color: rgba(255, 255, 255, 1);
      //         margin-left: 10px;
      //       }
      //       .t3 {
      //         font-size: 14px;
      //         font-family: Source Han Sans CN;
      //         font-weight: 400;
      //         color: rgba(102, 102, 102, 1);
      //       }
      //       .tt3 {
      //         margin-left: 21px;
      //       }
      //     }
      //   }
      //   .right {
      //     width: calc(100% - 250px);
      //     display: flex;
      //     flex-direction: column;
      //     align-items: center;

      //     .sexDiv {
      //       width: 26px;
      //       height: 26px;
      //       background: rgba(55, 52, 75, 1);
      //       border-radius: 50%;
      //       justify-content: center;
      //       align-items: center;
      //       display: flex;
      //       position: absolute;
      //       top: 44px;
      //       right: 10px;
      //       .sexImg {
      //         width: 14px;
      //         height: 14px;
      //       }
      //     }

      //     .t4 {
      //       width: 84px;
      //       height: 32px;
      //       background: linear-gradient(
      //         180deg,
      //         rgba(35, 149, 255, 1),
      //         rgba(0, 80, 213, 1)
      //       );
      //       border-radius: 6px;

      //       font-size: 16px;
      //       font-family: Source Han Sans CN;
      //       font-weight: 400;
      //       color: rgba(255, 255, 255, 1);
      //       text-align: center;
      //       line-height: 32px;
      //       margin-top: 20px;
      //     }
      //   }
      // }
    }
  }
}
</style>
