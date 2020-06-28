
<template>
  <div class="personaldetail container">
    <an-header title="修改资料">
      <div slot="right" class="right_text" @click="updateUserInfo">确定</div>
    </an-header>
    <div class="main">
      <!-- <img src="@/assets/images/home/bg.png" alt class="bg" /> -->
      <div class="content">
        <div class="avator">
          <an-uploader
            class="avatar"
            :url="tempLsit"
            curreentIndex="3"
            @success="getImage"
            ref="upload"
          ></an-uploader>
          <div class="sex_user" @click="UploadrefClick">
            <!-- 点击更换头像 -->
            <!-- <img src="@/assets/images/mine/icon_data_photo.png" alt /> -->
            <!-- <img src="@/assets/images/mine/icon_boy.png" v-if="userInfo.gender == 1" class="sex_man" alt="">
            <img src="@/assets/images/mine/icon_girl.png"  v-else class="sex_women" alt="">-->
          </div>
          <div class="sex_left">
            <!-- 编辑资料 -->
            <!-- <img src="@/assets/images/mine/icon_data_photo.png" alt /> -->
            <!-- <img src="@/assets/images/mine/icon_boy.png" v-if="userInfo.gender == 1" class="sex_man" alt="">
            <img src="@/assets/images/mine/icon_girl.png"  v-else class="sex_women" alt="">-->
          </div>
        </div>
        <div class="info_name filed_name">
          <van-field
            v-model="nickname"
            class="fields"
            placeholder="昵称"
            maxlength="12"
            show-word-limit
            label="文本"
          />
        </div>
        <div class="info_name">
          <!-- <div></div> -->
          <!-- <van-field readonly clickable v-model="userInfo.birth_day" :formatter="filterDate" placeholder="点击设置"
          @click="showPicker=true" />-->
          <div
            class="birthdy"
            :style="{'color':userInfo.birth_day?'#000000':'#666666FF'}"
            @click="showPicker=true"
          >
            <span style="margin-right:40px">出生年月</span>
            <span>{{userInfo.birth_day?userInfo.birth_day:'点击添加'}}</span>
          </div>
        </div>

        <div class="info_name">
          <!-- <div>性别</div> -->
          <!-- <van-field readonly clickable v-model="userInfo.birth_day" :formatter="filterDate" placeholder="点击设置"
          @click="showPicker=true" />-->
          <div
            class="birthdy"
            :style="{'color':userInfo.gender?'#000000':'#666666FF'}"
            @click="showSex=true"
          >
            <span style="margin-right:40px">性别</span>
            <span>
              <!-- {{userInfo.gender?userInfo.gender == 1?'男':'女':'点击添加'}} -->
              <!-- "@/assets/images/mine/icon_man_2.png -->
              <img
                :src="userInfo.gender==1?require('@/assets/images/mine/icon_man_2.png'):require('@/assets/images/mine/icon_woman_1.png')"
                alt
                @click="changeSex(1)"
                class="cell_sex"
                v-if="userInfo.gender"
              />
              <span v-if="!userInfo.gender">点击添加</span>
            </span>
          </div>
        </div>
        <div class="info_name">
          <!-- <div>所在地区</div> -->
          <!-- <van-field readonly v-model="userInfo.city" :formatter="filterCity" placeholder="选择自己所在的地区位置" /> -->
          <div
            class="birthdy"
            :style="{'color':userInfo.addr?'#000000':'#666666FF'}"
            @click="show=true"
          >
            <span style="margin-right:40px">所在地区</span>
            <span v-if="userInfo.addr">{{userInfo.addr | filterCity}}</span>
            <span v-if="!userInfo.addr">点击填写</span>
          </div>
          <!-- 所在学校 -->
          <!-- <div class="info_name">
            <van-field v-model="school" placeholder="所在学校" show-word-limit label="文本"></van-field>
          </div>-->
        </div>
        <div class="info_names">
          <!-- <div>个人介绍</div> -->
          <van-field
            v-model="sign"
            rows="2"
            autosize
            label="留言"
            type="textarea"
            maxlength="50"
            placeholder="一句话介绍你自己!"
            show-word-limit
          />
        </div>
      </div>
    </div>

    <van-popup v-model="showSex" class="showSex" position="bottom" :style="{ height: 'auto' }">
      <div class="header">
        <div class="icon_left" @click="showSex=false">取消</div>
        <div class="center_title">选择性别</div>
        <div class="icon_left" @click="showSex=false">确定</div>
      </div>
      <div class="content_icon">
        <img src="@/assets/images/mine/icon_man_2.png" alt @click="changeSex(1)" class="cell" />
        <img class="cell" @click="changeSex(2)" src="@/assets/images/mine/icon_woman_1.png" alt />
      </div>
      <!-- <div class="cell" style="color:#000000" >男</div>
      <div class="cell" style="color:#000000" >女</div>-->
    </van-popup>
    <van-popup v-model="showPicker" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="pickerValue"
        ref="pickerTime"
        type="date"
        title
        :min-date="startDate"
        :max-date="endDate"
        @cancel="showPicker=false"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-area
        :area-list="cityList"
        :columns-num="2"
        ref="myArea"
        @confirm="onCityConfirm"
        @cancel="show=false"
        :value="city"
      ></van-area>
    </van-popup>
  </div>
</template>
<script>
import { Cell, CellGroup } from "vant";
import { Popup, DatetimePicker, Area, Toast } from "vant";
import AnHeader from "../../../components/header/an-header.vue";
import { mapState, mapMutations } from "vuex";
import cityList from "../../../assets/city.js";
import config from "../../../config/index";
import axios from "axios";
import { upUserInfo, editUserInfo, getPrefix } from "@/api/modules/mine";
import AnUploader from "../../../components/uploader/an-uploader";
import { upload } from "../../../api/modules/home";

export default {
  components: {
    AnUploader,
    AnHeader,
    Cell,
    CellGroup,
    Popup,
    DatetimePicker,
    Area,
    Toast
  },
  data() {
    return {
      prefix: "",
      tempLsit: [],
      is_EanableUpload: [],
      cityList,
      userInfo: {},
      photoFromLocal: false,
      avatar: [],
      nickname: "",
      school: "",
      sign: "",
      city: "",
      addr: "",
      currentDate: new Date(),
      showPicker: false,
      show: false,
      showSex: false,
      pickerValue: new Date(1990, 0, 1),
      startDate: new Date(1950, 0, 1)
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.userInfo,
      token: state => state.user.token
    }),
    endDate() {
      let date = new Date();
      let year = date.getFullYear();
      return new Date(year, 11, 31);
    }
  },
  watch: {
    user(val) {
      this.userInfo = { ...val };
      this.nickname = this.userInfo.nickname ? this.userInfo.nickname : "";
      this.sign = this.userInfo.sign ? this.userInfo.sign : "";
      // this.tempLsit.push(this.userInfo.tempLsit);
      //  this.tempLsit=this.userInfo.avatar?this.$set(this.tempLsit,0,this.userInfo.avatar):[]
    }
  },
  async mounted() {
    this.prefix = await getPrefix();
    // console.log(data);
    this.userInfo = { ...this.user };
    console.log(this.userInfo);
    this.nickname = this.userInfo.nickname ? this.userInfo.nickname : "";
    this.sign = this.userInfo.sign ? this.userInfo.sign : "";
    // this.avatar = this.userInfo.avatar;
    // console.log(this.data + this.userInfo.avatar);
    if (this.prefix) {
      // console.log()
      if (this.userInfo.avatar.indexOf("http") != -1||this.userInfo.avatar.indexOf("https") != -1) {
        // this.tempLsit[0] = this.userInfo.avatar;
        this.tempLsit=[];
        this.tempLsit.push(this.userInfo.avatar)
      } else {
        this.$set(this.tempLsit, 0, `${this.prefix}${this.userInfo.avatar}`);
      }
      // if(this.userInfo.avatar.includes('http')){

      // }

      // this.tempLsit
    }
    //  this.tempLsit=this.userInfo.avatar?this.$set(this.tempLsit,0,this.prefix+this.userInfo.avatar):[]
    // this.school = this.userInfo.school ? this.userInfo.school : "";
    this.addr = this.userInfo.addr ? this.userInfo.addr : "";
    // this.addr=
    // this.city=this.userInfo.addr?this.userInfo.addr:''
  },

  filters: {
    filterCity(code) {
      let list = cityList.city_list;
      return list[code] || "";
    }
  },
  methods: {
    getprefix() {
      getPrefix().then(res => {
        console.log(res);
        this.prefix = res;
      });
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
          images: this.tempLsit
        }
      }).then(res => {
        this.is_EanableUpload = [];
        this.is_EanableUpload.push(...res.data.data);
      });
    },
    UploadrefClick() {
      console.log(this.$refs.upload.chooseImage());
    },
    ...mapMutations({
      changeData: "user/changeData"
    }),
    getImage(imgUrl) {
      this.photoFromLocal = true;
      // alert("1");
      // this.tempLsit[0] =`data:image/jpeg;base64,${imgUrl}`
      // this.avatar.push('')
      //  this.tempLsit.push();
      // let base64 = `data:image/jpeg;base64,${imgUrl}`;
      var _this = this;
      _this.canvasDataURL(
        `data:image/jpeg;base64,${imgUrl}`,
        {
          quality: 0.3
        },
        function(res) {
          _this.$set(_this.tempLsit, 0, res);
          _this.UPloadImgAPI();
        }
      );
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
    changeSex(gender) {
      this.userInfo.gender = gender;
      this.showSex = false;
    },
    onConfirm() {
      this.$set(
        this.userInfo,
        "birth_day",
        this.filterDate(this.pickerValue.getTime())
      );
      this.showPicker = false;
    },
    onCityConfirm(val) {
      this.show = false;
      this.city = val[1].code;
      this.userInfo.addr = this.city;
    },
    filterDate(bir) {
      if ((bir + "").indexOf(":") != -1) {
        return bir.split(" ")[0];
      } else {
        if (bir) {
          let date = new Date(bir);
          let m = date.getMonth() + 1;
          let d = date.getDate();
          if (m < 10) {
            m = "0" + m;
          }
          if (d < 10) {
            d = "0" + d;
          }
          return date.getFullYear() + "-" + m + "-" + d;
        }
      }
    },

    /**
             * name	名称	否	名称
             birth_day	生日	否	生日 结构为xxxx-xx-xx
             city	所在地区	否	所在地区
             sign	简介	否	简介
             icon	头像	否	图片地址或者文件， 如果上传为文件，文件key=fileContent
             school: 学校
             */

    updateUserInfo() {
      if (this.photoFromLocal) {
        // if (!this.avatar) return;
        editUserInfo({
          avatar: this.is_EanableUpload[0],
          nickname: this.nickname,
          birthday: this.filterDate(this.userInfo.birth_day),
          sign: this.sign,
          // school: this.school,
          addr: this.userInfo.city,
          gender: this.userInfo.gender ? this.userInfo.gender : undefined,
          mobile: this.userInfo.mobile
        }).then(res => {
          Toast("修改成功");
          this.userInfo.sign = this.sign;
          this.userInfo.nickname = this.nickname;
          this.userInfo.avatar = this.is_EanableUpload[0];
          (this.userInfo.addr = this.city),
            (this.userInfo.school = this.school);
          this.changeData({ key: "userInfo", val: this.userInfo });
          this.$router.back();
        });
      } else {
        // alert('----')

        editUserInfo({
          nickname: this.nickname,
          birthday: this.filterDate(this.userInfo.birth_day),
          sign: this.sign,
          avatar: this.userInfo.avatar,
          // school: this.school,
          addr: this.userInfo.addr,
          gender: this.userInfo.gender ? this.userInfo.gender : undefined,
          mobile: this.userInfo.mobile
        }).then(res => {
          Toast("修改成功");
          this.userInfo.sign = this.sign;
          this.userInfo.nickname = this.nickname;
          (this.userInfo.addr = this.city),
            (this.userInfo.school = this.school);
          this.userInfo.birth_day = this.filterDate(this.userInfo.birth_day);
          this.userInfo.addr = this.userInfo.addr;
          this.changeData({ key: "userInfo", val: this.userInfo });
          this.$router.back();
        });
      }
    }
  }
};
</script>
<!-- 敏感词检测还没做 -->
<style lang="less" scoped>
@import "../../../assets/safeArea";

/deep/ .van-field__control::placeholder {
  color: #666666ff;
}
/deep/ .van-field__control {
  color: #000000;
}
/deep/ .header {
  border-bottom: 1px solid #f5f6f6ff;
}
.personaldetail {
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #000000;
  // background-color: #ffffff;
  /deep/ .van-cell {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #eeeeeeff;
    color: #ffffff;
  }
  .fields {
    margin: 0px;
    // background-color: red;
  }
  .avatar {
    margin: 26px 0px;
    /deep/ .showImage {
      margin: 0 auto;
      border-radius: 50%;
    }
  }
  .right_text {
    font-size: 16px;
    color: #f57008;
  }

  /deep/ .van-picker__confirm {
    color: #2394ffff;
    font-size: 16px;
  }

  /deep/ .van-popup {
    background: #ffffff;
  }

  /deep/ .van-picker__toolbar {
    background: #ffffff;
  }
  /deep/ .van-picker__columns {
    background: #ffffff;
  }
  /deep/ .van-picker-column {
    background: #ffffff !important;
  }
  /deep/ .van-picker-column__item {
    background: #ffffff !important;
  }

  /deep/ .van-picker-column__item--selected {
    // color: ;
    background: #1e293c;
  }
  /deep/ .van-picker__mask {
    // color: #ffffff;
    // background: #28344A;
    background: transparent;
  }

  /deep/ .van-picker__frame {
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
    // color: #ffffff;
    // background: #28344A;
    background: #ffffff;
    opacity: 0.4;
  }

  .main {
    width: 100%;
    height: 100%;
    // padding-top: 50px;
    // overflow: scroll;
    overflow: hidden;

    .bg {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      width: 100%;
      height: 100%;
    }

    .content {
      position: fixed;

      top: 0px;
      margin-top: calc(@top + 46px);
      left: 0px;
      right: 0px;
      width: 100%;
      height: calc(100% - @top);
      overflow: scroll;
      // color: #ffffff;
      div:nth-child(2) {
        margin-bottom: 10px;
        /deep/ .van-cell {
          margin: 0px;
        }
      }
      .avator {
        width: 100%;
        display: flex;
        justify-content: center;

        // margin-top: 20px;
        position: relative;

        .sex {
          img:nth-child(1) {
            position: absolute;
            bottom: 540;
            left: calc(50% + 30px);
          }
          img {
            width: 20px;
            height: 20px;
          }
        }

        /* text-align:center; */
        img {
          width: 70px;
          height: 70px;
        }
      }
      .sex_user {
        position: absolute;
        top: 60px;
        right: 4%;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      .sex_left {
        position: absolute;
        top: 40px;
        left: 10px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      .cell_sex {
        width: 25px;
        height: 25px;
      }
      /deep/ .van-field__label {
        display: none;
      }
      // .info_name:nth-child(1){
      //   // color: red;
      // /deep/ .van-cell{
      //   background-color: red;
      // }
      // }
      //
      .info_names {
        margin-top: 10px;
        div:nth-child(1) {
          // margin: 20px 0px 15px 0px;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          margin-top: 8px;
          color: #000000;
        }
        /deep/ .van-cell {
          background-color: #ffffffff;
          width: 100%;
          // border: 2px solid rgba(102, 102, 102, 0.8);
          // opacity: 0.4;
          border-radius: 5px;
        }
      }
      // .filed_name{
      //    div:nth-child(1) {
      //           font-size: 16px;
      //           font-family: Source Han Sans CN;
      //           font-weight: 400;
      //           color: #ffffff;
      //           // margin: 20px 0px 15px 0px;
      //         }
      // }

      .info_name {
        // padding: 0px 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        text-align: left;
        height: 54px;

        background-color: #ffffff;
        /deep/ .van-field__value {
          display: flex;
          justify-content: space-between;
        }

        div:nth-child(1) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
          // margin: 20px 0px 15px 0px;
        }
      }

      /* .content:nth-child(5){
                    color: red;
                } */
    }
  }
}

.birthdy {
  border-bottom: 1px solid #ffffff;
  // background: #F4F4F4;
  width: calc(100% - 30px);
  // height: px;
  height: 54px;

  padding-left: 12px;
  font-size: 14px;
  // border-radius: 5px;
  line-height: 54px;
}
.showSex {
  .icon_left {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 22px;
    color: rgba(0, 0, 0, 1);
    opacity: 1;
  }
  .header {
    padding-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 25px;

    padding-right: 25px;
    box-sizing: border-box;
    .center_title {
      // opacity:1;">选择性别</div><div class="">确定</div>
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      // line-height:25px;
      color: rgba(0, 0, 0, 1);
      opacity: 1;
    }
  }
  .content_icon {
    display: flex;
    justify-content: center;
    margin-top: 36px;
    margin-bottom: 55px;
  }
  // padding-bottom: @bottom;
  .cell {
    padding: 10px;
    width: 0.88rem;
    height: 0.88rem;
    // box-sizing: border-box;
    // line-height: 32px;
    // margin-bottom: 10px;
    // font-size: 16px;
    // color: #333333;
    // text-align: center;
  }
  .cell:nth-child(1) {
    margin-right: 76px;
  }
}
.avator_img {
  border-radius: 50%;
}
</style>


