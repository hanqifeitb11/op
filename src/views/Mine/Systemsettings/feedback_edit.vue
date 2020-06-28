<template>
  <div class="feedback_edit container">
    <an-header title="帮助反馈" />
    <!-- <img src="@/assets/images/home/bg.png" alt class="bgi" /> -->
    <div class="main">
      <Field v-model="content" rows="5" autosize placeholder="请描述你遇到的问题具体情况，例如问题的大概内容、发生时间、网络状况、手机型号哦~" show-word-limit type="textarea" />
      <div :class="content?'submit':'not_submit'" @click="create">提交</div>
    </div>
  </div>
</template>
<script>
import { Field } from "vant";
import { Toast } from "vant";
import { suggest, getUpdateType } from "../../../api/modules/mine";
import AnHeader from "../../../components/header/an-header.vue";
import { upload } from "../../../api/modules/home";
import AnUploader from "../../../components/uploader/an-uploader";
import { mapState } from "vuex";
export default {
  components: {
    AnUploader,
    AnHeader,
    Field
  },
  created() {
    // this._initgettyee();
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  data() {
    return {
      images: [],
      isUploadImages: [], //本地的url
      currentImageIndex: 0,
      content: "",
      is_show: true,
      mobail: "",
      typeList: [],
      currentIndex: 0
    };
  },
  methods: {
    getClcik(v) {
      console.log(v);
      this.currentIndex = v;
    },
    _initgettyee() {
      this.isUploadImages = [];
      // this.images=[];
      getUpdateType().then(res => {
        this.typeList = res;
      });
    },
    create() {
      const { content, images, mobail, currentIndex } = this;
      let imagess = images.join(",");
      const { id } = this.userInfo;
      suggest({
        content,
        desc: "",
        feedbackType: 4,
        userId: id,
        mobile: mobail
      }).then(res => {
        Toast("提交成功");
        setTimeout(() => {
          this.$router.go(-2);
        });
      });
    },
    getImage(imgUrl) {
      this.isUploadImages.push(imgUrl);
      this.is_show = false;
      upload(imgUrl).then(res => {
        if (this.images.length < 9) {
          this.images.push(res);
        }
      });
    },
    saveIndex(index) {
      this.currentImageIndex = index;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/safeArea";
.not_submit {
  .submit_color();
}

.submit_color(@optiosn:0.3) {
  // width: 300px;
margin: 0px 40px;
  height: 40px;
  background: rgba(1, 174, 183, 1);
  opacity: @optiosn;
  border-radius: 20px;
  margin-top: 166px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 40px;
  // position: fixed;
// bottom: calc(@bottom + 30px);

}
.submit {
  .submit_color(1);
}
.bgi {
  position: fixed;
  z-index: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
// /deep/ .van-nav-bar__title {
//   color: #ffffff;
// }
/deep/ .van-nav-bar {
  border-bottom: 1px solid #ffffff;
}

/deep/ .van-field__body {
  height: 100%;
}
/deep/ .van-field__body {
  align-items: none;
  -webkit-align-items: none;
}
.feedback_edit {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background-color: #ffffff;
  /deep/ .van-nav-bar__text {
    color: #000000;
  }
  .main {
    /* width: 100%; */
    // border-top: 1px solid #cccccc;
    height: 100%;
    // margin-top: 10px;
    // padding: 15px;
    overflow: scroll;
    margin-top: 46px;
    position: relative;
    z-index: 2;
    padding-top: 10px;

    .tti {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      margin: 0px 10px 10px 10px;
      color: #000000;
      width: 325px;
      display: inline-block;
      line-height: 24px;
    }
    .list {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    .dott {
      color: #f57008;
    }
    .setttinh_li {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      div {
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid #ffffff;
        color: #ffffff;
        margin-right: 10px;
      }
      .active {
        border: 1px solid #1989fa;
        color: #1989fa;
      }
    }

    .stt {
      color: #999999;
    }

    span {
      margin: 50px 0px;
    }

    .img_title {
      /* color: #0000; */
      margin: 20px 0px;
    }
    .choosefile {
      background: chartreuse;
      width: 100%;
      height: 100%;
    }
    .uploadImage {
      /* padding-top: 30px; */
      /* margin-top: 20px; */
      width: 100px;
      height: 100px;
      box-sizing: border-box;
      background-color: red;

      input {
        opacity: 0;
        width: 100px;
        height: 100px;

        /* border: none; */
      }
    }

    .phoneInput {
      width: 345px;
      height: 35px;
      border-radius: 10px;
      background: rgba(245, 246, 246, 1);
      border-bottom: 1px solid #ffffff;
      //   border-radius: 5px;
      input {
        background: transparent;
        width: calc(100% - 10px);
        margin: 0 5px;
        line-height: 35px;
        color: #000000;
      }
    }
  }

  /deep/ .van-cell {
    margin-top: 15px;

    // width:325px;
    height: 318px;
    margin: 0px auto;
    background: #ffffff;
    opacity: 1;
    // border-radius:12px;
    // background: rgba(244, 244, 244, 1);
  }
  /deep/ .van-field__control {
    color: #000000;
    height: 100% !important;
  }
  /deep/ .van-field__control::placeholder {
    color: #999999;
  }

  /deep/ .van-field__word-limit {
    position: absolute;
    bottom: -10px;
    right: 0px;
  }

  .addPic {
    position: relative;
    width: 111px;
    height: 111px;
    background: rgba(244, 244, 244, 1);
    border-radius: 10px;
    img {
      position: absolute;
      width: 50px;
      // margin: 17px 30px;
      margin-top: 17px;
      margin-left: 30px;
    }
    div {
      height: 12px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      text-align: center;
      position: absolute;
      bottom: 16px;
      left: 33px;
    }
  }
  .piclist {
    width: 100%;
    display: flex;
    margin-right: 15px;
    justify-content: space-between;
    .picItem {
      position: relative;
    }
    .fliePic {
      width: 111px;
      height: 111px;
      position: absolute;
      top: 0;
      border-radius: 10px;
    }
    .closeImg {
      position: absolute;
      width: 23px;
      height: 23px;
      top: 5px;
      right: 5px;
    }
  }
}
</style>
