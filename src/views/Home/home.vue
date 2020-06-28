<template>
  <div class="home container">
    <img src="@/assets/images/home/bg_treehole.png" v-if="tabIndex==0" alt class="bgi" />
    <img src="@/assets/images/home/bg_square.png" v-else alt class="bgi" />
    <an-header @changeLeft="changeLeft" ref="head" :item="statusItem"></an-header>
    <!-- <div v-show="tabIndex==0" style="margin-top:40px">123123123123</div> -->
    <!-- <attention v-show="tabIndex == 0" ref="attention" />  -->
    <Squert v-show="tabIndex==0" ref="SqureList" :item="treeList" :responseStatus="statusItem"></Squert>
    <recommend ref="recommend" v-show="tabIndex == 1" />
    <!-- <topic v-show="tabIndex == 2" ref="topic" />
    <search v-show="tabIndex == 3" />-->
  </div>
</template>
<script>
import { Overlay } from "vant";
import Squert from "../../components/square/squar";
import AnHeader from "./components/an-header";
import { mapMutations, mapState } from "vuex";
import Topic from "../Topic/topic";
import Recommend from "./recommend/recommend";
import search from "../Mine/search/search";
import { GetTreeList, getBlogStatus } from "../../api/modules/home";

import Attention from "./attention/attention";
var self, startpageX, endpageX, startpageY, endpageY;
export default {
  name: "home",
  components: {
    Attention,
    Squert,
    Overlay,
    Recommend,
    Topic,
    AnHeader,
    search
  },
  data() {
    return {
      page: 1,
      is_one_init: true,
      limit: 1,
      showLeftController: false,
      is_Prop: false,
      treeList: {},
      sumtotal: 10,
      is_Ok: false,
      statusItem: {}
    };
  },
  activated() {
       this.$nextTick(function(){
        //  console.log('------------------------')
          // this.$refs.recommend.onRefresh();
          this.$refs.recommend.getIndex();
       })
    // if (this.tabIndex == 0) {
    //   // if (this.is_Ok) {
    //   //   return false;
    //   // }
    //   this.getInit();
    // }
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.recommend.close();
    next();
  },
  computed: {
    ...mapState({
      isinit: state => state.home.isinit,
      NextTIme: state => state.home.NextTIme,
      tabIndex: state => state.home.tabIndex,
      token: state => state.user.token,
      userInfo: state => state.user.userInfo,
      openYong: state => state.user.openYong
    })
  },
  watch: {
    isinit(val) {
      console.log("0000000000000000000000000000000");
      console.log(val)
      // console.log(this.$refs.recommend)
      // this.$refs.recommend.list.forEach((v,i)=>{
      //   console.log(v)
      //   if(v.id==val){
      //     console.log(v)
      //   }
      // })
    //  this.$refs.recommend.getIndex();
    },
    tabIndex(n, o) {
      console.log(["-------------------"]);
      if (n == 0) {
        this.getTreeHoldStatus();
        if (this.is_Ok) {
          return false;
        }

        this.getInit();
        // this.activeList();
        // getInit
        //  this.$refs.recommend.getIndex();
      } else {
        // this.$refs.recommend.getIndex();
        // if (n == 0) {
        //   this.$refs.attention.getWatchList();
        // } else if (n == 2) {
        //   this.$refs.topic.getTalk();
        // }

        clearTimeout(this.tabTimer);
        let recommend = this.$refs.recommend;
        if (recommend) {
          recommend.close();
        }
      }
    },
    openYong(val) {
      if (val) {
      }
    }
  },

  created() {
    self = this;
    this.is_Prop = true;
  },
  mounted() {
    // document.addEventListener('touchstart', self.touchstart);
    // document.addEventListener('touchend', self.touchend);
  },
  methods: {
    getTreeHoldStatus() {
      getBlogStatus().then(res => {
        if (!res.residueDegree) {
          this.$nextTick(function() {
            this.is_end = 0;
          });
          this.statusItem = res;
        }
        this.changeData({ key: "NextTIme", val: res });
      });
      // }
    },
    getHoldList() {
      // tabIndex
    },
    getInit() {
      console.log(this.total);
      // alert('---')
      // debugger
      GetTreeList({
        page: this.page,
        limit: this.limit,
        type: 1
      }).then(res => {
        this.treeList = res[0];
        this.is_Ok = true;
        console.log(this.treeList);

        // this.total--;
        // this.sumtotal--;
        // console.log(this.sumtotal);
        this.getTreeHoldStatus();
        // if (this.sumtotal == 0) {
        //   // alert('到十次了')
        //   this.is_end = 0;
        //   this.getStaut();
        // }
        // this.sumtotal++;
        // this.changeData({ key: "total", val: this.sumtotal });
      });
    },
    async getStaut() {
      let data = await getBlogStatus();
      // console.log(data)
      this.statusItem = data;
    },
    changeLeft(val) {
      this.showLeftController = val;
    },
    Close() {
      this.is_Prop = false;
    },
    ToRouter(url) {
      this.$router.push({
        path: `/${url}`,
        query: {
          status: 1
        }
      });
    },
    activeList() {
      let recommend = this.$refs.recommend;
      if (recommend) {
        recommend.show();
        recommend.update();
        clearTimeout(this.tabTimer);
      } else {
        this.tabTimer = setTimeout(() => {
          this.activeList();
        }, 200);
      }
    },

    ...mapMutations({
      changeData: "home/changeData"
    }),
    touchstart(e) {
      if (!self.showComment) {
        startpageX = e.changedTouches[0].pageX;
        startpageY = e.changedTouches[0].pageY;
      }
    },
    touchend(e) {
      if (!self.showComment) {
        endpageX = e.changedTouches[0].pageX;
        endpageY = e.changedTouches[0].pageY;
        let differenceX = endpageX - startpageX;
        let differenceY = endpageY - startpageY;
        let index;
        if (differenceY < 30 && differenceY > -30 && differenceX > 30) {
          if (this.tabIndex == 0) {
            self.showLeftController = true;
          } else if (this.tabIndex > 0 && this.tabIndex < 3) {
            index = this.tabIndex - 1;
            this.$refs.head.change(index);
          }
        } else if (differenceY < 30 && differenceY > -30 && differenceX < -30) {
          if (this.tabIndex != 2) {
            index = this.tabIndex + 1;
            this.$refs.head.change(index);
          }
        }
        startpageY = startpageX = endpageY = endpageX = 0;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/safeArea";
@import "../../assets/font";

.home {
  position: relative;
  margin-bottom: 20px;
  // background-color: red;
  .bgi {
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

/deep/ .van-overlay {
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 7;

  .center_content {
    position: relative;
    width: 260px;
    /* height: 305px; */
    background-color: #fff;
    border-radius: 10px;

    img {
      width: 177px;
      height: 165px;
    }

    .bg_top {
      position: absolute;
      top: -2rem;
      left: 50%;
      margin-left: -2.343rem;
    }

    .Tips {
      margin-top: 105px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;

      .Tips_content {
        padding: 0 0.48rem 0.4rem 0.48rem;

        box-sizing: border-box;
      }

      .isOpen {
        margin-bottom: 15px;
      }

      .isOpen,
      .is_me {
        text-align: center;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(245, 112, 8, 1);
      }

      .is_me {
        padding: 0.45333rem 0 0.45333rem 0;
        box-sizing: border-box;
        border-top: 1px solid #f4f4f4;
      }
    }
  }
}
</style>
