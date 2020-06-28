<template>
  <div class="unboundPhone container">
    <an-header :title="title"></an-header>
    <div class="main">
      <!-- <img src="@/assets/images/home/bg.png" alt class="bgi" srcset /> -->
      <div class="content">
        <div v-if="is_success" class="content_update">
          <div class="old">
            <div class="title">请验证原手机号</div>
            <input
              type="text"
              v-model="old_phone"
              autocomplete="off"
              name
              id
              maxlength="11"
              :placeholder="phoneTitle"
            />
            <div class="bottom">
              <input
                type="text"
                maxlength="6"
                v-model="old_captche"
                name
                id="bottom_msg"
                :placeholder="captcheTitle"
                autocomplete="off"
              />
              <span :class="is_witer==1?'c':'c_not'" @click="getSend">{{captche}}</span>
            </div>
          </div>
          <div class="new">
            <div class="new_title">请验证新手机号</div>

            <input
              type="text"
              v-model="new_phone"
              autocomplete="off"
              maxlength="11"
              name
              id
              :placeholder="phoneTitle"
            />
            <div class="bottom">
              <input
                type="text"
                name
                maxlength="6"
                v-model="new_captche"
                id="bottom_msg"
                autocomplete="off"
                :placeholder="captcheTitle"
              />
              <span @click="newresetClick" :class="is_witer_two==1?'c':'c_not'">{{captche_n}}</span>
            </div>
          </div>
          <div :class="is_show_new==1?'submit':'submit_blue'" @click="nextClick">确认更换</div>
        </div>
        <!--  -->
        <div class="update_success" v-show="!is_success">
          <van-empty
            class="custom-image"
            :image="require(`@/assets/images/home/icon_changephone.png`)"
            description="手机号更换成功"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Field, Button, Toast } from "vant";
import {
  getIs_my,
  getUpdate_code,
  getbingNewPhone,
  UpdatePhoen
} from "../../../api/modules/home";
import { GetCode } from "../../../api/modules/mine";
import AnHeader from "../../../components/header/an-header";
import { Empty, Dialog } from "vant";

export default {
  components: {
    AnHeader,
    Dialog,
    Field,
    Button,
    Empty
  },
  data() {
    return {
      phoneTitle: "请输入手机号",
      captcheTitle: "请输入验证码",
      title: "更换手机号",
      isreset: 1, //是否可以重新请求
      isresets: 1, //是否可以重新请求
      captche: "获取验证码",
      captche_n: "获取验证码",
      is_witer: 1,
      is_witer_two: 1,
      is_reset: 1,
      old_phone: "",
      is_show_new: 1,
      old_captche: "",
      new_captche: "",
      new_phone: "",
      is_success: 1
    };
  },

  created() {},
  mounted() {},
  methods: {
    nextClick() {
      if (this.is_show_new == 2) {
        if (this.getType(this.old_phone) && this.getType(this.new_phone)) {
          // Dialog.confirm({
          //   title: "标题",
          //   message: "弹窗内容"
          // }).then(() => {
          //   // on close
          // });

          Dialog.confirm({
            message: "确认更换手机号？",
            width: 270,
            confirmButtonColor: "#01AEB7FF",
            //
            cancelButtonColor: "#8C8C8CFF"
          })
            .then(() => {
              // on close
              UpdatePhoen({
                originalMobile: this.old_phone,
                originalAuthCode: this.old_captche,
                newMobile: this.new_phone,
                newAuthCode: this.new_captche
              }).then(() => {
                this.is_success = false;
                var _this = this;
                setTimeout(function() {
                  _this.$router.push({
                    path: "/login"
                  });
                });
                // Toast({
                //   message:'更换'
                // })
              });
            })
            .catch(() => {
              // on cancel
            });

          // alert('发送请求')
        }
      }
    },
    newresetClick() {
      console.log(this.getType(this.new_phone));
      // this.getType(this.o);
      if (this.getType(this.new_phone)) {
        if (this.isresets == 1) {
          this.getTimes();
          GetCode({
            mobile: this.new_phone,
            type: 3
          });
        }
      }
    },
    getType(type) {
      // let regs = /^((13[0-9])|(14[0-9])|(17[0-1,6-8])|(16[0-9])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
      var isFlag = false;
      if (type == 0) {
        Toast({
          message: "请输入手机号！",
          duration: 1500
        });
        return isFlag;
      } else if (type.length < 11) {
        Toast({
          message: "请输入正确的手机号！",
          duration: 1500
        });
        return isFlag;
      } else {
        isFlag = true;
      }
      return isFlag;

      //   this.getCaptche();
    },
    getSend() {
      // ;
      if (this.getType(this.old_phone)) {
        if (this.isreset == 1) {
          this.getTime();
          GetCode({
            mobile: this.old_phone
            // type: 3
          });
        }
      }
    },
    getTimes() {
      var sum = 59;
      var _this = this;
      var time = setInterval(function() {
        if (sum < 1) {
          clearInterval(time);
          _this.$nextTick(function() {
            _this.isresets = 1;
            _this.captche_n = "重新获取";
          });
        }
        _this.captche_n = `${sum}s`;
        _this.isresets = 2;
        _this.is_witer_two = 2;

        sum--;
      }, 1000);
    },
    getTime() {
      var sum = 59;
      var _this = this;
      var time = setInterval(function() {
        if (sum < 1) {
          clearInterval(time);
          _this.$nextTick(function() {
            _this.isreset = 1;
            _this.captche = "重新获取";
          });
        }
        _this.captche = `${sum}s`;
        _this.isreset = 2;
        _this.is_witer = 2;
        sum--;
      }, 1000);
    }
  },
  watch: {
    // old_phone: {
    //   immediate: true,
    //   handler: function(val) {
    //     if (val != "") {

    //       //  document.getElementsByClassName('c')[0]
    //     }
    //   }
    // },
    // new_phone: {
    //   immediate: true,
    //   handler: function(val) {
    //     if (val != "") {
    //       this.is_witer_two = 2;
    //     }
    //   }
    // },
    new_captche: function(val) {
      if (
        val != "" &&
        this.new_phone != "" &&
        this.old_phone != "" &&
        this.old_captche != ""
      ) {
        this.is_show_new = 2;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/safeArea";

/deep/ .van-cell {
  border: none;
  border-bottom: 1px solid red;
  background-color: none;
}
.unboundPhone {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background-color: #ffffff;

  // /deep/ .van-nav-bar__title {
  //   color: #ffffff;
  // }
  /deep/ .van-nav-bar {
    border-bottom: 1px solid #ffffff;
  }
  /deep/ .van-field__label {
    display: none;
  }
  .update_success {
    position: absolute;
    top: 40%;
    z-index: 2;
    left: 50%;
    margin: -3rem;
    /deep/ .van-empty__image {
      width: 80px;
      height: 80px;
    }
    /deep/ .van-empty__description {
      color: #000000ff;
      // font-size: 15px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 50px;
      color: rgba(0, 0, 0, 1);
      // letter-spacing:100px;
    }
  }
  .bottom {
    position: relative;
    .c::before {
      content: "";
      display: inline-block;
      width: 1px;
      height: 24px;
      background: #b2b2b2ff;
      // background-color: red;
      position: absolute;
      /* margin-right: 20px; */
      left: -8px;
      top: 9px;
    }
    .c {
      position: absolute;
      right: 0px;
      bottom: 2px;
      font-size: 13px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #01afb7ff;
      padding: 13px 10px;
      box-sizing: border-box;
      // background: rgba(148, 190, 50, 1);
      opacity: 1;
      border-radius: 18px;
    }
    .c_not {
      position: absolute;
      right: 0px;
      box-sizing: border-box;
      // background: rgba(148, 190, 50, 1);
      opacity: 1;
      bottom: 2px;
      padding: 10px 27px;
      box-sizing: border-box;
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #01afb7ff;
      border-radius: 18px;
    }
  }
  .main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .content {
      position: fixed;
      top: 0;
      left: 0px;
      right: 0px;
      width: 100%;
      height: calc(100% - @top);
      overflow: scroll;
      // padding: 0px 40px;
      box-sizing: border-box;
      margin-top: calc(@top + 56px);
      // background-color: #ffffff;
      z-index: 1;
    }

    /**确认点击了验证码; 
  font-size:13px;
font-family:PingFang SC;
font-weight:500;
line-height:18px;
color:rgba(255,255,255,1);
  
  
  */

    /deep/ input {
      // margin-bottom: 12px;
      // padding: 10px 0px;
      text-indent: 2em;
      // margin-bottom: 20px;
      font-size: 16px;
      // background: rgba(245, 246, 246, 1);
      background: rgba(255, 255, 255, 1);
      border-top: 1px solid #999999ff;
      border-bottom: 1px solid #999999ff;
      opacity: 1;
      // border-radius: 18px;
      width: 100%;
      line-height: 53px;
      box-sizing: border-box;
      // background-color:none
      // background-color: transparent;
      // border-bottom: 1px solid #ffffff;
      color: #000000;
    }
    input:nth-child(2) {
      border-bottom: none;
    }
    .new,
    .old {
      margin-top: 10px;
      background-color: #ffffff;
    }
    .submit {
      margin: 85px auto;
      // padding: 11px 139px;
      box-sizing: border-box;
      font-size: 16px;
      width: 309px;
      height: 43px;
      line-height: 43px;
      text-align: center;
      background: #01aeb7ff;
      opacity: 0.53;
      color: #ffffffff;
      border-radius: 18px;
      margin-bottom: 0px;

      // width: 240px;
      // height: 50px;
      // background: #999999ff;
      // border-radius: 16px;
      // line-height: 50px;
      // text-align: center;
      // font-size: 18px;
      // // margin-;
      // position: fixed;
      // bottom: 50px;
      // left: 50%;
      // margin-left: -3.2rem;
      // margin：0px auto;
    }
    .submit_blue {
      color: #ffffffff;
      margin: 85px auto;
      margin-bottom: 0px;
      // padding: 11px 139px;
      box-sizing: border-box;
      font-size: 16px;
      width: 309px;
      height: 43px;
      line-height: 43px;
      text-align: center;
      background: #01aeb7ff;
      // opacity:0.53;
      border-radius: 18px;
      // width: 240px;
      // height: 50px;
      // background: linear-gradient(
      //   180deg,
      //   rgba(35, 149, 255, 1),
      //   rgba(0, 80, 213, 1)
      // );
      // border-radius: 16px;
      // line-height: 50px;
      // text-align: center;
      // color: #ffffffff;
      // font-size: 18px;
      // // margin-;
      // position: fixed;
      // bottom: 50px;
      // left: 50%;
      // margin-left: -3.2rem;
    }
    .title {
      // margin-top: 30px;
      // margin-bottom: 9px;
      height: 53px;
      line-height: 53px;
      margin-left: 10px;
      color: #000000;
    }
    .new_title {
      height: 53px;
      line-height: 53px;
      margin-left: 15px;
      // margin-top: 30px;
      // margin-bottom: 9px;
    }
    .new_title,
    .title {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      // color: rgba(255, 255, 255, 1);
    }
    .content_update {
      position: relative;
      z-index: 1;
    }
    .bgi {
      position: fixed;
      z-index: 1;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      right: 0px;
    }
  }
}
</style>