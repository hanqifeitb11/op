<template>
  <div class="createTopic container">
    <!-- <img src="@/assets/images/home/bg.png" alt class="bgi" /> -->
    <an-header title right-text="确定" :rightEvent="UploadImgcreate" />
    <div class="lauyout">
      <div class="selectItem">
        <div class="upload_title">
          <img src="@/assets/images/home/icon_home_publish.png" alt />
          <div>
            <div>{{currentIndex==1?'埋下一个你的树洞消息':'发布一个广场图文动态'}}</div>
            <div>{{currentIndex==1?'树洞消息将会随机被他人发现,如果秘密收到回复,其他人将不会再看到你的秘密哦～':'发布到广场的图文动态将会被所有人看到哦欢迎和大家分享你的 生活与快乐~'}}</div>
          </div>
          <div :class="currentIndex==1?'bottom_top':'bottom__right'"></div>
        </div>
      </div>
      <div class="seleItem">
        <div @click="ChangeClick(1)" :class="currentIndex==1?'active':'not_active'">树洞消息</div>
        <div @click="ChangeClick(2)" :class="currentIndex==2?'active':'not_active'">广场动态</div>
      </div>
      <div class="bg_content">
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          :maxlength="currentIndex==1?120:300"
          placeholder="你有什么想和其他人单独分享的事情呢？"
          show-word-limit
        />
        <!--  -->
        <div class="uploadIcon" v-if="currentIndex==1&&UploadFileList.length<2">
          <an-uploader :url="UploadFileList" @success="getImage" curreentIndex="1" />
          <!-- <div class="Add_ICon" style="margin-left:10px">
            <input
              type="file"
              accept="image/*"
              name
              class="fileinput"
              :multiple="isOkUpload"
              @change="uploadFile"
              id
            />
            <img src="@/assets/images/home/icon_publish_addpic.png" class="uplaodIcon_add" alt />
          </div>-->
        </div>

        <div class="list_images">
          <div class="uploadFileList" v-show="currentIndex==2&&UploadFileList.length<5">
            <an-uploader curreentIndex="2" :url="UploadFileList" @success="getImage" />
          </div>
        </div>
      </div>

      <div class="title" v-if="hasImg">添加配图文字</div>
      <div class="textarea" v-if="hasImg">
        <textarea
          maxlength="140"
          v-model="desc"
          placeholder="添加配图文字"
          name
          id
          cols="30"
          rows="10"
          class="content"
        ></textarea>
        <!-- <span
          class="num"
          @click="toRouter('chooseTopic')"
        >{{currentSubject.title?currentSubject.title:'#添加Ya组,可以被更多人看到哦~ >'}}</span>-->
      </div>
      <!-- <div :class="getClass()" @click="UploadSubjectClick">{{getTitle()}}</div> -->
    </div>
  </div>
</template>

<script>
import { Field } from "vant";
import axios from "axios";
import AnHeader from "../../../components/header/an-header";
import AnUploader from "../../../components/uploader/an-uploader";
import { Toast } from "vant";
import {
  uploadSubject,
  upload,
  UploadImgFile,
  UploadPush
} from "../../../api/modules/home";
import config from "../../../config/index";
import { mapState } from "vuex";
export default {
  name: "createTopic",
  components: { AnUploader, AnHeader, Field },
  watch: {
    currentIndex(val) {
      if (val == 1) {
        this.isOkUpload = false;
      } else {
        this.isOkUpload = true;
      }
    }
  },
  data() {
    return {
      sumTotal: 0,
      isOkUpload: false,
      UploadFileList: [
        //
        // "https://img.yzcdn.cn/vant/apple-2.jpg",
        // "https://img.yzcdn.cn/vant/apple-1.jpg",
        // "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      message: "", //发布的内容
      desc: "",
      title: "",
      // icon: "",
      UploadImg: "",
      currentIndex: 1,
      hasImg: false,
      tempLsit: [
        //  "https://img.yzcdn.cn/vant/apple-1.jpg",
        //  "https://img.yzcdn.cn/vant/apple-1.jpg",
        //  "https://img.yzcdn.cn/vant/apple-1.jpg",
      ],
      progress: "",
      enUploadLisr: [],
      is_upload: 0 //图片是否上传成功
    };
  },
  watch: {
    desc(val) {
      if (val.length > 0) {
        this.getTitle();
        this.getClass();
        console.log(val);
      }
    }
  },
  created() {
    console.log("---111");
    // console.log()
    // console.log(d)
    // console.log)
    // this.$nextTick(function() {
    //   var d = document.getElementsByClassName("selectItem")[0];
    //   // var item

    //   console.log(d.offsetTop);
    //   var content=document.getElementsByClassName('bg_content0')[0];
    //   content.style.height
    // });
    // console.log(this.$route.query.subject_id);
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      currentSubject: state => state.home.currentSubject,
      subject_id: state => state.home.subject_id,
      token: state => state.user.token
    })
  },
  watch: {
    currentIndex(val) {
      // console.log(val);
      if (val == 1) {
        this.message = "";
        this.UploadFileList = [];
        this.tempLsit = [];
        this.enUploadLisr = [];
      } else {
        this.message = "";
        this.tempLsit = [];
        this.enUploadLisr = [];
        this.UploadFileList = [];
      }
    }
  },
  methods: {
    UploadImgcreate() {
      if (this.message == "") {
        Toast({
          message: "请输入内容",
          duration: 1500
        });
        return false;
      }
      if (this.currentIndex == 1) {
        if (this.enUploadLisr.length == 0) {
          Toast({
            message: "请上传图片",
            duration: 1600
          });
          return;
        }

        UploadPush({
          type: this.currentIndex == 1 ? 1 : 2,
          content: this.message,
          images: this.enUploadLisr.join(",")
        }).then(res => {
          Toast({
            message: "发布成功",
            duration: 1500
          });
            this.$nextTick(function(){
                  this.$router.push({
                    path:'/home'
                  })
              })
          this.enUploadLisr = [];
          this.message = "";
          this.UploadFileList = [];
          console.log(res);
        });
      }
      if (this.currentIndex == 2) {
        if (this.tempLsit.length == 0) {
          Toast({
            message: "请上传图片",
            duration: 1600
          });
          return;
        }

        var _this = this;
        _this.UploadFileList = [];
        // this.tempLsit.forEach((v, i) => {
        //   (function() {
        //     _this.canvasDataURL(v, { quality: 0.3 }, function(base64) {
        //       _this.UploadFileList.push(base64);
        //     });
        //   })(v);
        // });





        // if (this.UploadFileList.length == this.tempLsit.length) {
        //   alert("执行函数");
        //   axios({
        //     method: "POST",
        //     url: `${config.baseURI}/mmApi/blog/upload`,
        //     headers: {
        //       Token: this.token
        //     },
        //     data: {
        //       images: this.UploadFileList
        //     }
        //   }).then(res => {
        //     this.enUploadLisr.push(...res.data.data);
        //     UploadPush({
        //       type: this.currentIndex == 1 ? 1 : 2,
        //       content: this.message,
        //       images: this.enUploadLisr.join(",")
        //     }).then(res => {
        //       Toast({
        //         message: "发布成功",
        //         duration: 1500
        //       });
        //       
        //       this.enUploadLisr = [];
        //       this.message = "";
        //       this.UploadFileList = [];
        //       console.log(res);
        //     });
        //   });
        // }

        this.UploadFileList = this.tempLsit;
        axios({
          method: "POST",
          url: `${config.baseURI}/mmApi/blog/upload`,
          headers: {
            Token: this.token
          },
          data: {
            images: this.UploadFileList
          }
        }).then(res => {
          this.enUploadLisr.push(...res.data.data);
        
          UploadPush({
            type: this.currentIndex == 1 ? 1 : 2,
            content: this.message,
            images: this.enUploadLisr.join(",")
          }).then(res => {
            Toast({
              message: "发布成功",
              duration: 1500
            });
            this.$nextTick(function(){
                  this.$router.push({
                    path:'/home'
                  })
              })
            this.enUploadLisr = [];
            this.message = "";
            this.UploadFileList = [];
            console.log(res);
          });
        });
      }
    },

    UPloadImgAPI() {
      axios({
        method: "POST",
        url: `${config.baseURI}/mmApi/blog/upload`,
        headers: {
          Token: this.token
          // "Content-Type": "application/json"
        },
        data: {
          images: this.UploadFileList
        }
      }).then(res => {
        
        this.enUploadLisr.push(...res.data.data);

      });
    },

    canvasDataURL(path, obj, callback) {
      let data = path.split(",");
      let type = data[0].split(";")[0].slice(11);
      var img = new Image();
      img.src = path;
      img.onload = function() {
        // 默认按比例压缩
        var that = this;
        let w = that.width;
        let h = that.height;
        let scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;
        var quality = 0.4; // 默认图片质量为0.7
        // 生成canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        let base64 = canvas.toDataURL("image/" + type, quality);
        callback(base64);
        // 回调函数返回base64的值
      };
    },
    uploadFile(event) {
      console.log(event);
      // if (this.currentIndex == 1) {
      // } else {
      // }
      for (let item of event.target.files) {
        console.log(item);
        if (item.type.split("/")[0] !== "image") {
          Toast({
            message: "只能选择图片",
            duration: 2000
          });
          return false;
        }

        const reader = new FileReader();
        reader.readAsDataURL(item);
        let _this = this;
        reader.onloadend = ev => {
          let base64img = ev.target.result;
          _this.canvasDataURL(base64img, { quality: 0.3 }, function(
            base64Codes
          ) {
            if (_this.currentIndex == 1) {
              if (_this.UploadFileList.length > 1) {
                return false;
              }
            } else {
              console.log(_this.UploadFileList.length);
              if (_this.UploadFileList.length == 4) {
                console.log("------");
                return false;
              }
            }
            console.log(_this.UploadFileList.length);
            _this.UploadFileList.push(base64Codes);
            _this.UPloadImgAPI();
          });
        };
      }
      // let lg = event.target.files.length;
    },
    ChangeClick(index) {
      console.log(index);
      this.currentIndex = index;
    },
    UploadSubjectClick() {
      if (this.hasImg) {
        if (
          this.currentSubject.title == undefined ||
          this.currentSubject.title == ""
        ) {
          Toast({
            message: "请选择话题标题",
            duration: 1500
          });
          return false;
        }
        const { icon, title, desc, currentSubject, UploadImg } = this;
        uploadSubject({
          images: UploadImg,
          content: desc,
          subject_id: currentSubject.id
        }).then(res => {
          Toast({
            message: "创建成功",
            duration: 1500
          });
          //   alert(res);
          this.$nextTick(function() {
            this.$router.push("/topicSuccess");
          });
        });
      }
    },
    toRouter(path) {
      if (this.token == "") {
        Toast("您还没有登陆，请先登陆");
        setTimeout(() => {
          this.$router.push({
            path: "/login"
          });
        }, 1500);
      } else {
        this.$router.push({ path });
      }
    },
    getTitle() {
      if (this.hasImg) {
        return "发布";
      }
      return "下一步";
    },
    getClass() {
      if (this.hasImg && this.desc != "") {
        return "light";
      }
      return "btn";
    },
    create() {
      var self = this;
      // title,order,desc,icon
      if (this.icon == "") {
        return Toast("您还没有选择Ya组封面");
      }
      if (this.title == "") {
        return Toast("您当前的Ya组标题是什么呢？");
      }
      if (this.desc == "") {
        return Toast("您当前的Ya组内容有点少咯");
      }
    },

    //上传图片代码
    getImage(imgUrl) {
      //  说明是树洞的照片
      // let tempList = [];

      var _this = this;
      if (this.currentIndex == 1) {
        if (this.tempLsit.length > 1) {
          Toast({
            message: "该类型图片只能上传一张",
            duration: 1500
          });
          return false;
        }
        this.tempLsit.push(`data:image/jpeg;base64,${imgUrl}`);
      } else {
        if (this.tempLsit.length > 4) {
          Toast({
            message: "该类型图片只能上传四张",
            duration: 1500
          });
          return false;
        }
        this.tempLsit.push(`data:image/jpeg;base64,${imgUrl}`);
      }
      if (this.currentIndex == 1) {
        this.canvasDataURL(this.tempLsit[0], { quality: 0.3 }, function(
          base64
        ) {
          _this.UploadFileList.push(base64);
          _this.UPloadImgAPI();
        });
      } else {
        _this.UploadFileList.push(`data:image/jpeg;base64,${imgUrl}`);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/font";
@import "../../../assets/safeArea";
/deep/ .van-field__label {
  display: none;
}
.uploadFileList {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  /deep/ .upload {
    margin-left: 0px;
  }

  div {
    // margin-right:10px;
  }
  .img_content {
    width: 109px;
    height: 109px;
    border-radius: 10px;
    margin-top: 20px;
    // margin-right: 20px;
    // margin-left: 20px;
  }
}
.uplaodIcon_add {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  margin-top: -0.2rem;

  left: 50%;
  margin-left: -0.2rem;
}
.Add_ICon {
  margin-top: 20px;
  // margin-left: 20px;
  width: 109px;
  height: 109px;
  background: rgba(243, 244, 248, 1);
  opacity: 1;
  border-radius: 12px;
  position: relative;
}
.list_images {
  display: flex;
  padding: 0px 10px;
}
.uploadIcon {
  display: flex;
  flex-wrap: wrap;
  // width: 109px;
}
input {
  width: 109px;
  height: 109px;
  opacity: 0;
}
.createTopic {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  .bgi {
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  /deep/ .header {
    background: #ffffff;
    /deep/ .van-nav-bar__title {
      color: white;
    }
    .rightTitle {
      font-size: @font16;
      color: @commentSendBtnColor;
    }
  }
  .lauyout {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    padding-bottom: @bottom;
    height: calc(100% - @bottom - @top - 50px);
    overflow-y: auto;
    .bg_content {
      background: rgba(254, 255, 254, 1);
      opacity: 1;
      height: calc(100% - 119px - 82px);
    }
    .selectItem {
      margin: 16px 20px;
      margin-bottom: 0px;
      background-color: transparent;
      .bottom_top {
        position: absolute;
        bottom: -60px;
        left: 94px;
        width: 0;
        border-top: 1.06667rem solid #ffffff;
        border-right: 0.8rem solid transparent;
        border-left: 0 solid transparent;
        border-bottom: 0.53333rem solid transparent;
      }
      .bottom__right {
        position: absolute;
        bottom: -60px;
        right: 94px;
        width: 0;
        border-top: 1.06667rem solid #ffffff;
        border-right: 0px solid transparent;
        border-left: 0.8rem solid transparent;
        border-bottom: 0.53333rem solid transparent;
      }
      .upload_title {
        padding: 20px;
        box-sizing: border-box;
        border-radius: 50px;
        position: relative;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        div:nth-child(1) {
          height: 20px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 600;
          // line-height:20px;
          color: rgba(0, 0, 0, 1);
          opacity: 1;
        }
        div:nth-child(2) {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          opacity: 1;
        }
        img {
          width: 57px;
          height: 57px;
          margin-right: 10px;
          background: rgba(148, 190, 50, 1);
          box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
          opacity: 1;
          border-radius: 29px;
        }
      }
    }
    .seleItem {
      margin-top: 40px;
      display: flex;
      .common {
        width: 50%;
        height: 42px;
        line-height: 42px;
        text-align: center;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        opacity: 1;
        z-index: 1;
        border-radius: 21px;
      }
      .active {
        .common();
        background: rgba(254, 255, 254, 1);
      }
      .not_active {
        .common();
        background: #e3e3e3ff;
      }
    }
    .example {
      width: 300px;
      height: 119px;
      background-image: url("../../../assets/images/home/kaung_talk.png");
      background-repeat: no-repeat;
      background-size: contain;
      border-radius: 5px;
      position: relative;
      margin: 0 auto;
      color: @commentSendBtnColor;
      padding-top: 14px;
      .tit {
        text-align: center;
        margin-bottom: 14px;
      }
      .message {
        width: 275px;
        margin: 0 auto;
        text-align: left;
      }
      .fox {
        width: 56px;
        height: 55px;
        position: absolute;
        right: -22px;
        bottom: -36px;
      }
    }
    .title {
      font-size: @font18;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      margin-left: 16px;
      .must {
        font-size: 18px;
        color: #ff0000;
      }
      .low {
        color: #999999;
        font-size: 12px;
      }
    }
    .inputBox {
      width: 345px;
      height: 40px;
      background: rgba(244, 244, 244, 1);
      border-radius: 5px;
      margin-left: 15px;
      padding: 6px 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 12px;
      input {
        background: transparent;
        flex: 1;
        text-indent: 11px;
        color: #000000;
        font-size: 16px;
      }
      input::placeholder {
        color: #bbbbbb;
        font-size: 16px;
      }
      span {
        color: #bbbbbb;
        font-size: 16px;
        margin-left: auto;
        margin-right: 11px;
      }
    }
    .textarea {
      width: 345px;
      height: 260px;
      background: rgba(51, 51, 51, 1);
      border: 1px solid rgba(102, 102, 102, 0.8);
      border-radius: 5px;
      padding-top: 10px;
      position: relative;
      margin-left: 15px;
      .content {
        width: 319px;
        height: 300px;
        margin-left: 11px;
        background: transparent;
        border: none;
        color: #ffffff;
        font-size: 16px;
      }
      .content::placeholder {
        color: #999999;
        font-size: 16px;
      }
      .num {
        position: absolute;
        left: 11px;
        bottom: 10px;
        color: #bbbbbb;
        font-size: 16px;
      }
    }
    .btn {
      width: 240px;
      height: 50px;
      background: #666666;
      border-radius: 8px;
      text-align: center;
      line-height: 50px;
      color: #999999;
      margin: 0 auto;
      position: absolute;
      left: 68px;
      bottom: calc(100px + @bottom);
    }
    .light {
      width: 240px;
      height: 50px;
      background: linear-gradient(
        180deg,
        rgba(35, 149, 255, 1),
        rgba(0, 80, 213, 1)
      );
      border-radius: 8px;
      text-align: center;
      line-height: 50px;
      color: #ffffff;
      margin: 0 auto;
      position: absolute;
      left: 68px;
      bottom: calc(155px + @bottom);
    }
  }
}
</style>
