<template>
  <div class="topicSuccess container">
    <an-header title :left-arrow="false" >
      <div class="header_wo">
        <div class="left_i" @click="Toback">
          <img src="@/assets/images/setting/icon_close.png" width="14" alt srcset />
        </div>
      </div>
    </an-header>
    <div class="main">
      <div class="img">
        <!-- <img src="@/assets/images/home/pic_examine.png" alt=""> -->
      </div>
      <!-- <p class="img_content">
        <img src="@/assets/images/home/icon_audit.png" width="141px" height="100px" alt />
      </p> -->
      <p class="tit">发布成功</p>
      <p class="message">通过官方审核后才能对外展示</p>
      <!-- <div class="button"  @click="$router.go(-2)">看看其他热门Ya组</div> -->
    </div>
  </div>
</template>

<script>
import AnHeader from "../../../components/header/an-header";
export default {
  name: "topicSuccess",
  components: { AnHeader },
  methods:{
      Toback(){
        this.$nextTick(function(){
          this.$router.push({
            path:"/home"
          })
        })
          // this.$router.go(-2);
      }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/font";
@import "../../../assets/safeArea";
.img_content {
  width: 141px;
  height: 100px;
  margin: 0px auto;
}
// .header_wo {
//     display: flex;
//     justify-content: space-between;
// }
.left_i {
  img {
    width: 14px;
    height: 14px;
    padding: 10px;
    // background: rgba(153, 153, 153, 1);
    // border-radius: 2px;
  }
}
/deep/ .van-nav-bar__text{
    font-size:18px;
font-family:Source Han Sans CN;
font-weight:400;
color:rgba(255,255,255,1);
line-height:48px;
}
.topicSuccess {
  // background-image: url("../../../assets/images/home/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  .header {
    background: transparent;
    .rightIcon {
      padding: 10px;
      // box-sizing: border-box;
      width: 13px;
      height: 13px;
    }
  }

  .main {
    padding-top: 50px;
    .img {
      width: 200px;
      margin: 100px auto 25px auto;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .tit {
      text-align: center;
      color: #ffffff;
      font-size: 24px;
      margin-top: 40px;
      margin-bottom: 29px;
    }
    .message {
      width: 252px;
      margin: 0 auto;
      color: #ffffffff;
      font-size: 14px;
      text-align: center;
    }
    .button {
      width: 160px;
      height: 40px;
      background: linear-gradient(
        90deg,
        rgba(255, 167, 13, 1),
        rgba(236, 51, 0, 1)
      );
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
      color: #ffffff;
      margin: 43px auto 0 auto;
    }
  }
}
</style>
