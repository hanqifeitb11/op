<template>
  <div class="ContentUpload" @click="callClick">
    <div class="upload" @click="chooseImage" v-if="curreentIndex==2&&url.length<4">
      <img src="@/assets/images/home/icon_add.png" alt />
      <p>添加图片</p>
    </div>
    <div class="upload" @click="chooseImage" v-if="curreentIndex==1&&url.length<1">
      <img src="@/assets/images/home/icon_add.png" alt />
      <p>添加图片</p>
    </div>
    <div class="upload" @click="chooseImage" v-if="curreentIndex==3&&url.length<1">
      <img src="@/assets/images/home/icon_add.png" alt />
      <p>添加图片</p>
    </div>
    <div class="showImage" @click="chooseImage" v-for="(v,i) in url" :key="i">
      <img :src="v" alt />
      <!-- <img :src="url" alt /> -->
    </div>
    <van-popup @close="close" class="photoList" v-model="show" round position="bottom">
      <div class="tab" @click="camera">选择相机</div>
      <div class="tab" @click="photo">选择相册</div>
    </van-popup>
  </div>
</template>

<script>
import { openCamera, openPhoto } from "../../util/common";

export default {
  name: "an-uploader",
  data() {
    return {
      show: false
    };
  },
  mounted() {
    console.log(this.url.length);
  },
  props: {
    curreentIndex: {
      type: String,
      default: "1"
    },
    url: {
      type: Array,
      default:()=>{
        return []
      }
    },
    Click: {
      type: Function,
      default: () => {}
    },
    success: {
      type: Function,
      default: () => {}
    },
    cancel: {
      type: Function,
      default: () => {}
    },
    fail: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    photo() {
      this.show = false;
      openPhoto()
        .then(imgUrl => {
          this.$emit("success", imgUrl);
        })
        .catch(err => {
          this.$emit("fail", err);
        });
    },
    camera() {
      this.show = false;
      openCamera()
        .then(imgUrl => {
          this.$emit("success", imgUrl);
        })
        .catch(err => {
          this.$emit("fail", err);
        });
    },
    close() {
      this.$emit("cancel");
    },
    chooseImage() {
      this.show = true;
    },
    callClick() {
      this.$emit("Click");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/safeArea";
.ContentUpload {
  display: flex;
  flex-wrap: wrap;
  .showImage {
    width: 100px;
    height: 100px;
    margin-left: 15px;
    margin-top: 15px;
    border-radius: 10px;
    margin-bottom: 17px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .upload {
    width: 111px;
    height: 111px;
    background: rgba(243, 244, 248, 1);
    opacity: 1;
    border-radius: 12px;
    padding-top: 15px;
    box-sizing: border-box;
    margin-left: 28px;
    margin-bottom: 17px;
    margin-top: 15px;
    img {
      width: 40px;
      height: 40px;
      margin-bottom: 15px;
      margin-left: 36px;
    }
    p {
      color: #999999;
      font-size: 12px;
      text-align: center;
    }
  }
  .photoList {
    height: calc(150px + @bottom);
    padding-top: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    .tab {
      font-size: 16px;
      color: black;
      width: 100%;
      text-align: center;
      // flex:1;
      height: 40px;
      line-height: 40px;
      // line-height: 100%;
    }
    .tab:nth-child(1) {
      margin-bottom: 20px;
    }
  }
}
</style>
