<template>
  <div class="topic" :style="{'paddingLeft':is_close?'30px':'10px'}">
    <div class="left_icon" v-if="is_close" @click="toRouter(item)">
      <!-- <img src="@/assets/images/mine/icon_ya.png" alt /> -->
      <div class="right_content">
        <div class="top_title">{{item.title}}</div>
        <div class="top_person">{{item.topic_count}}条作品</div>
      </div>
    </div>
    <div class="left_icon" v-else>
      <img :src="item.avatar" alt v-if="item.avatar" />
      <!-- <img src="@/assets/images/home/icon_head.png" v-else alt /> -->
      <div class="right_content">
        <div class="top_title">{{item.nickname}}</div>
        <!-- <div class="top_person">{{item.sign}}</div> -->
      </div>
      <div class="right_icon" @click="deleteUser(active,item)">
        移除
        <!-- <div class>
        

        </div>-->
        <!-- <img src="@/assets/images/setting/icon_close.png" alt srcset /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { hidden } from "../../../util/common";
import { deletebalckUser } from "../../../api/modules/mine";
import { mapMutations, mapState } from "vuex";
import { Toast } from "vant";
export default {
  name: "an-topic",
  props: {
    is_back: {
      type: Number,
      default: 1
    },
    item: {
      type: Object,
      default: {}
    },
    active: {
      type: Number
    },
    // type:{
    //   type:String
    // },
    // is_close  ==3的时候是用户的信息
    is_close: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    // alert('--')
  },
  methods: {
    toRouter(item) {
      this.changeData({
        key: "subject_id",
        val: item.id
      });
      this.changeData({
        key: "title",
        val: item.title
      });
      this.$nextTick(function() {
        if (this.is_back) {
          this.$router.push({
            path: "/Tbdetails"
          });
        } else {
          this.chooseAndBack(item);
        }
      });
    },
    deleteUser(active, items) {
      console.log(items)
      const {blockUserId,userId}=items;
      deletebalckUser({
        blackUserId: blockUserId,
        userId: userId,
        mark: 2,
        blackOptType: 2
      }).then(res => {
        // console.log(user_Id)
        this.$emit("deleteUserId", blockUserId);
      });
    },
    hidden,
    ...mapMutations({
      changeData: "home/changeData"
    }),

    chooseAndBack(item) {
      console.log(item);
      this.changeData({ key: "currentSubject", val: item });
      this.$nextTick(() => {
        this.$router.back();
      });
    },
    changeStatus(item) {
      const { subject_id, type } = item;
      if (type != 1) {
        subjectDel({ subject_id: subject_id, type: 1 }).then(res => {
          this.item.type = 1;
        });
      } else {
        delSubject(subject_id).then(res => {
          this.item.type = 0;
        });
      }
    },
    changePingbi(item) {
      const { subject_id, type } = item;

      if (type != 2) {
        subjectDel({ subject_id: subject_id, type: 2 }).then(res => {
          this.item.type = 2;
        });
      } else {
        delSubject(subject_id).then(res => {
          this.item.type = 0;
        });
      }
    },
    toDetail(item) {
      if (this.type != "choose") {
        const { subject_id, id } = item;

        this.$router.push({
          path: "/topicDetail",
          query: { id: subject_id || id }
        });
      } else {
        this.changeData({ key: "currentSubject", val: item });
        this.$nextTick(() => {
          this.$router.back();
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/font";
.topic {
  width: 345px;
  /*height:140px;*/
  padding: 0px 0 0px 27px;
  box-sizing: border-box;
  //   background: rgba(255, 255, 255, 1);
  //   box-shadow: 0px 2px 5px 0px rgba(0, 0, 1, 0.3);
  border-radius: 5px;
  display: flex;
  // margin-left: 15px;
  margin-bottom: 30px;
  margin-right: 11px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  .left_icon {
    display: flex;
    align-items: center;
    width: 100%;
    .right_content {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      margin-right: 40px;
      .top_title {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 600;
        // line-height:20px;
        color: rgba(0, 0, 0, 1);
        // letter-spacing:20px;
      }
      .top_person {
        font-size: 15px;
        //   margin-top: 10px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 230px;
        white-space: nowrap;
        color: rgba(102, 102, 102, 1);
      }
    }
    .right_icon {
      width: 67px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      text-align: right;
      background: rgba(248, 81, 81, 1);
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
      text-align: center;
      opacity: 1;
      border-radius: 14px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 600;
      // line-height:20px;
      color: rgba(255, 255, 255, 1);
      // line-height: 50px;
      img {
        width: 14px;
        height: 14px;
      }
    }
    img {
      width: 39px;
      height: 39px;
      border-radius: 50%;
    }
  }
  .photo {
    width: 99px;
    /*height:100px;*/
    position: relative;
    margin-left: 15px;
    margin-right: 11px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    .status {
      width: 55px;
      height: 21px;
      background: #f57008;
      color: #ffffff;
      border-radius: 11px;
      text-align: center;
      line-height: 21px;
      position: absolute;
      left: 23px;
      bottom: -10px;
    }
    .gray {
      width: 55px;
      height: 21px;
      background: #bbbbbb;
      border-radius: 11px;
      font-size: 12px;
      color: #ffffff;
      margin: 0 auto;
      text-align: center;
      line-height: 21px;
      position: absolute;
      left: 23px;
      bottom: -10px;
    }
  }
  .right {
    flex: 1;
    margin-right: 10px;
    .tit {
      font-size: @font16;
      color: #000000;
      margin-bottom: 19px;
    }
    .text {
      font-size: @font14;
      color: #000000;
      span {
        color: #f57008;
      }
    }
    .both {
      font-size: @font14;
      height: auto;
      white-space: pre-wrap;
      overflow: hidden;
      width: 210px;
      span {
        color: #f57008;
      }
    }
  }
}
</style>
