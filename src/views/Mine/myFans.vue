<template>
  <div class="myFans container">
    <An_header title="我的粉丝" />

    <div class="main">
      <!-- <img src="@/assets/images/home/bg.png" alt class="bg" /> -->
      <div class="list">
        <div
          v-for="(item,idx) in list"
          :key="idx"
         
        >
          <div class="listItem">
            <img class="rolePic" :src="item.avatar" alt />
            <span class="nameTxt">{{item.nickname}}</span>
            <div class="ctrl">
              <!-- <div v-if="!item.is_watch" class="ctrlBtn1" @click.stop="towatchUser(item)">+关注</div> -->
              <div  class="ctrlBtn2" >已关注</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import An_header from "../../components/header/an-header.vue";
import Applications from "./components/applications";
import NoLogin from "./components/noLogin";
import Features from "./components/Features";
import { mapState } from "vuex";
import { watchMe, watchUser } from "../../api/modules/mine";
import { Toast } from "vant";

export default {
  name: "myFans",
  components: { Features, NoLogin, Applications, An_header },
  data() {
    return {
      list: [
      
      ]
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      token: state => state.user.token
    })
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


      // console.log(item);
      // const { watchUserId,id ,userId} = item;
      // // const { id } = this.userInfo;
      //  watchUser({
      //   userId: watchUserId,
      //   watchedUid:  userId,
      //   mark: 2,
      //   watchOptType: 2
      // }).then(res => {
 
      // });
      //  this.list.forEach((v, i) => {
      //     console.log(v.id == item.id);
      //     if (v.id == item.id) {
      //       let tempitem = item;
      //       console.log(tempitem);
      //       tempitem.is_watch = !item.is_watch;
      //       this.list.splice(i, 1, tempitem);
      //     }
      //   });
     
    }
  },
  activated() {
    const { id } = this.userInfo;
    watchMe({
      uid: id
    }).then(res => {
      console.log(res);
      this.list = res.data;
  
      this.list.forEach(e => {
        e.is_watch = 1;
      });
      console.log(this.list)
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/font.less";
@import "../../assets/safeArea.less";

.myFans {
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
          // width: 100px;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #000000;
          margin-left: 11px;
        }
        .ctrl {
          // justify-content: flex-end;
          position: absolute;
          right: 25px;

          .ctrlBtn1 {
            width: 67px;
            height: 28px;
            box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
            opacity: 1;
            color: #000000;
            border-radius: 14px;

            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 28px;
            text-align: center;
            color: #000000;
          }
          .ctrlBtn2 {
            width: 67px;
            height: 28px;
            background: #666666;
            border-radius: 6px;
            background: rgba(148, 190, 50, 1);
            box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
            opacity: 1;
            border-radius: 14px;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 28px;
            text-align: center;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
}
</style>
