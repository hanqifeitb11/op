<template>
  <div class="controllers">
    <!-- <div class="left_icon">艾维奇无</div> -->
    <div class="right_icon">
      <!-- <div class="bar" @click="showShare = true">
        <img class="icon" src="@/assets/images/home/icon_transmit.png" alt />
      </div>-->
      <div class="bar" @click="showCommentList(item)">
        <img class="icon_islike" src="@/assets/images/main/icon_video_comment.png" alt />
      </div>
      <div class="bar" @click="Admire">
        <img
          class="icon_islike"
          :src="item.isLike == 0?require('@/assets/images/main/icon_video_like.png'):require('@/assets/images/main/icon_video_like_pressed.png')"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
import { admire, dislike, offAdmire, offdislike } from "../../api/modules/home";
import { mapState, mapMutations } from "vuex";
import AnComment from "../comment/an-comment";
import { Toast } from "vant";

export default {
  name: "an-controllers",
  components: { AnComment },
  props: ["item", "time", "user"],
  data() {
    return {
      showComment: false,
      showShare: false
    };
  },
  created() {
    console.log(this.item)
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    ...mapMutations({
      changeData: "home/changeData"
    }),
    action(item) {
      const { id, type, dislike_status } = item;
      const cate = "topic";
      if (dislike_status == 0) {
        dislike({ id, type, cate }).then(res => {
          this.item.dislike_times++;
          this.item.dislike_status = 1;
        });
      } else {
        offdislike({ id, type, cate }).then(res => {
          this.item.dislike_times--;
          this.item.dislike_status = 0;
        });
      }
    },
    showCommentList(item) {
      if (this.user == "other") {
        this.$router.push({
          path: "/detail",
          query: {
            id: item.id
          }
        });
      } else {
        this.changeData({
          key: "isProps",
          val: "1"
        });
        // this.showComment = true;
      this.$emit('showComment',true,)
      }
    },
    Admire() {
      const { id, type } = this.item;
      const cate = "topic";
      // if (this.item.isLike == 0) {
      admire({ id: id, type: this.item.isLike ? 2 : 1 }).then(res => {
        console.log(res);
        this.item.isLike = !this.item.isLike;
        // this.item.is_praise = 1;
        Toast({
          message: !this.item.isLike ? "取消点赞" : "点赞成功",
          duration: 1500
        });

        // console.log()

        // this.item.praise_times++;
      });
      // }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/font";
.controllers {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 16px;
  margin-right: 0px;
  display: flex;
  //   justify-content: space-between;
  .left_icon {
    justify-content: flex-start;
    font-size: 15px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  .right_icon {
    display: flex;
    justify-content: flex-end;
    .bar {
      // margin-right: 25px;
    }
    .bar:nth-child(3) {
      margin-right: 0px;
    }
  }
  .bar {
    display: flex;
    align-items: center;
.icon{
  width: 19px;
  height: 19px;
}
    .icon_islike {
      width: 50px;
      height: 50px;
      margin-right: 6px;
    }

    .tit {
      color: @homeControllerBarColor;
    }
  }
}
</style>
