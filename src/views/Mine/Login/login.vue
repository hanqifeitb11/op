<template>
  <div class="container login">
    <div class="main">
      <img src="@/assets/images/home/login_background.jpg" alt class="bg" />

      <div class="content">
        <div>
          <div>
            <img src="@/assets/images/home/icon-aboutus_logo.png" class="logo" alt />
            <div class="message">
              <div>声镜</div>
              <div>你的私人声音体验馆</div>
            </div>
          </div>
          <div class="phone_tiel">手机号登录</div>

          <!-- 手机号登录 -->
          <!-- <div ></div> -->
          <!-- <img src="@/assets/images/home/icon_loginlogo.png" class="logo" alt="" srcset=""> -->
        </div>
        <div>
          <van-field v-model.trim="phone" label="文本" maxlength="11" placeholder="请输入手机号" />
        </div>
        <div>
          <van-field v-model.trim="captche" maxlength="6" label="文本" placeholder="请输入验证码" />
          <!-- <span></span> -->
          <span :class="is_white==1?'captnum_edit':'captnum'" @click.prevent="getSend">{{msg}}</span>
        </div>
        <div
          @click="isclick_submit"
          class="submit"
          :style="{'background':is_submit_color?'#02AFB8FF':'#02AFB8FF','opacity':is_submit_color?'1':'0.5'}"
        >
          登录
          <!-- <img src="@/assets/images/home/icon_enter.png" alt srcset /> -->
        </div>

        <p class="expreci">
          <span class="left">
            注册/登录表示同意
            <span class="right">
              <!--  -->
              <!--  -->
              <span @click="$router.push('/UseraGreement')">用户协议</span>
              <span style="color:#000000FF">和</span>
              <span @click="$router.push('/PrivacyPolicy')">隐私条款</span>
            </span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { Field } from "vant";

import { GetCode, Login, getUserinfo } from "../../../api/modules/mine.js";
import { Toast } from "vant";
import { mapState, mapMutations, mapActions } from "vuex";

import An_header from "../../../components/header/an-header";
import { isChild } from "../../../api/modules/home";
export default {
  components: {
    An_header,
    Toast
  },

  computed: {
    ...mapState({
      uuid: state => state.device.uuid,
      userInfo: state => state.user.userInfo,
      token: state => state.user.token
    })
  },
  mounted() {},
  data() {
    return {
      is_submit_color: false,
      captche: "",
      phone: "",
      msg: "获取验证码",
      isShowClick: false,
      isResetSend: 1, //是否重复发送,
      is_white: 0
    };
  },
  watch: {
    // phone(val) {
    //   if (val.length > 0) {
    //     this.is_white = 1;
    //   }
    // },
    captche(val) {
      if (val != "" && val.length == 6 && this.phone != "") {
        console.log("-----执行函数");
        this.is_submit_color = true;
      }
    }
  },
  methods: {
    ...mapMutations({
      changeData: "user/changeData"
    }),
    getTime_yk() {
      if (this.isResetSend) {
        this.gettime();
      } else {
        this.gettime();
      }
    },
    gettime() {
      var num = 58;
      var _this = this;
      var time = setInterval(function() {
        _this.isShowClick = true;
        if (num == 1) {
          _this.$nextTick(function() {
            _this.isResetSend = 0;
            _this.isShowClick = false;
            _this.msg = "重新获取";
          });
          clearInterval(time);
        }
        _this.msg = `${num}s`;
        _this.is_white = 1;
        num--;
      }, 1000);
      // }
    },
    isclick_submit() {
      // if(regs.test('17521637658')){
      // console.log(regs.test('17521637658'))
      // }

      if (this.phone.length == 0) {
        Toast({
          message: "请输入手机号！",
          duration: 1500
        });
        return false;
      } else if (this.phone.length < 11) {
        Toast({
          message: "请输入正确的手机号！",
          duration: 1500
        });
        return false;
      }

      if (this.captche.length == 0) {
        Toast({
          message: "请输入验证码",
          duration: 1500
        });
        return false;
      } else if (this.captche.length < 6) {
        Toast({
          message: "请输入正确的验证码 ！",
          duration: 1500
        });
        return false;
      }

      Login({
        mobile: this.phone,
        verificationCode: this.captche
      }).then(res => {
        console.log("-----------ioioioioi");
        console.log(res);

        Toast({
          message: "登录成功",
          duration: 1500
        });
        localStorage.token = res.data.token;
        this.changeData({
          key: "token",
          val: res.data.token
        });
        localStorage.userInfo = JSON.stringify(res.data);
        console.log(res.data);
        this.changeData({
          key: "userInfo",
          val: res.data
        });
        var _this = this;
        setTimeout(function() {
          _this.$nextTick(function() {
            _this.$router.push({
              path: "/home"
            });
          });
        }, 1500);
      });

      // 后续登录的方式操作
    },
    // 验证手机号

    getSend() {
      // 13 15 17 18 19 14
      // let regs = /^((13[0-9])|(14[0-9])|(17[0-9])|(16[0-9])|(15[0-9])|(18[0-9]))\d{8}$/;
      if (this.phone.length == 0) {
        Toast({
          message: "请输入手机号！",
          duration: 1500
        });
        return false;
      } else if (this.phone.length < 11) {
        Toast({
          message: "请输入正确的手机号！",
          duration: 1500
        });
        return false;
      } //   this.getCaptche();
      //   this.isShowClick = true;
      if (!this.isShowClick) {
        this.getTime_yk();
        GetCode({
          mobile: this.phone
          // code: 111000,
        }).then(red => {
          console.log(red);
        });
      }
    },

    openUser() {
      this.$router.push({
        path: "/useragreement"
      });
    },
    Pass() {
      this.$router.push({
        path: "/PrivacyPolicy"
      });
    },
    sublogin() {
      if (this.is_Step == 2) {
        Toast({
          message: "请输入验证码",
          duration: 1500
        });
        return false;
      } else {
        Toast({
          message: "请输入手机号",
          duration: 1500
        });
        return false;
      }
    },
    sendCode() {
      this.is_reset = false;
      this.is_show_Capt = true;
      this.getTime();
      GetCode({
        mobile: this.phone
      }).then(res => {
        console.log(res);
      });
    },
    ToStep_end() {
      if (this.is_enclick == 2) {
        Login({
          mobile: this.phone,
          verificationCode: this.newPhone,
          device_id: this.uuid
        }).then(res => {
          Toast({
            message: "登录成功",
            duration: 1500
          });
          this.$store.commit("user/changeData", {
            key: "token",
            val: res.token
          });
          // isChild().then(res => {

          //   this.$store.commit("user/changeData", {
          //     key: "openYong",
          //     val: res.young_status == 1 ? true : false
          //   });
          // });
          this.$store.commit("user/changeData", {
            key: "userInfo",
            val: res.userInfo
          });
          localStorage.setItem("token", res.token);
          var _this = this;
          setTimeout(function() {
            _this.$router.push({ path: "/" });
          }, 1000);
        });
      } else {
        this.msg = "请输入验证码";
        if (this.is_Step == 2) {
          if (this.newPhone.length == 0) {
            Toast({
              message: "请输入验证码",
              duration: 1500
            });
            return false;
          }
        } else {
          if (this.newPhone.length == 0) {
            Toast({
              message: "请输入手机号！",
              duration: 1500
            });
            return false;
          } else if (this.newPhone.length < 11) {
            Toast({
              message: "请输入正确的手机号！",
              duration: 1500
            });
            return false;
          } else if (/^((\+?86)|(\(\+86\)))?1\d{10}$/.test(this.phone)) {
            Toast({
              message: "请输入正确格式手机号！",
              duration: 1500
            });
            return false;
          }
          console.log("-------------------------");
          //   this.is_Step = 2;
        }

        GetCode({
          mobile: this.newPhone
        }).then(res => {
          console.log(res);
        });

        this.isClick_step = false;
        this.is_show_Capt = true;
        this.phone = this.newPhone;
        this.newPhone = "";
        this.getTime();
        this.is_enclick = 2;
      }
    },
    getTime() {
      var num = 59;
      var _this = this;
      var time = setInterval(function() {
        if (num <= 1) {
          clearInterval(time);
          _this.is_reset = true;
          _this.is_show_Capt = false;
          _this.code = 59;
          num = 59;
          return false;
        }
        _this.code = num;
        --num;
      }, 1000);
    },
    toYs() {
      this.$router.push({ path: "/PrivacyPolicy" });
    },
    toTerms() {
      //跳转到toTerms
      this.$router.push({ path: "/UseraGreement" });
    },
    agree() {
      this.lookProtocol = !this.lookProtocol;
    },
    submitlogin() {
      if (!/^((\+?86)|(\(\+86\)))?1\d{10}$/.test(this.phone)) {
        Toast({
          message: "请输入正确格式手机号！",
          duration: 1500
        });
        return false;
      }
      if (this.code == "") {
        Toast({
          message: "请输入验证码！",
          duration: 1500
        });
        return false;
      }
      Login({
        mobile: `86${this.phone}`,
        captcha: this.code,
        device_id: this.uuid
      }).then(res => {
        Toast({
          message: "登录成功",
          duration: 1500
        });
        this.$store.commit("user/changeData", {
          key: "token",
          val: res.token
        });
        // isChild().then(res => {
        //   this.$store.commit("user/changeData", {
        //     key: "openYong",
        //     val: res.young_status == 1 ? true : false
        //   });
        // });
        this.$store.commit("user/changeData", {
          key: "userInfo",
          val: res.userInfo
        });

        localStorage.setItem("token", res.token);
        var _this = this;
        setTimeout(function() {
          _this.$router.push({ path: "/" });
        }, 1000);
      });
    }
    // sendCode() {

    //     GetCode({
    //         mobile: this.phone
    //     }).then((res) => {
    //         console.log(res)
    //         if (res != 'error') {
    //             Toast({
    //                 message: "短信发送成功",
    //                 duration: 1500
    //             })
    //             var num = 59;
    //             var _this = this;
    //             var time = setInterval(function () {
    //                 // num--;
    //                 if (num <= 0) {
    //                     clearInterval(time);
    //                     _this.msg = "获取验证码"
    //                     return false;
    //                 }
    //                 _this.msg = num + 's';
    //                 --num;
    //             }, 1000)
    //         }
    //     }, error => {
    //         Toast({
    //             message: error.msg,
    //             duration: 1500
    //         })
    //     })
    // }
  }
};
</script>
<style scoped lang="less">
@import "../../../assets/safeArea";
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #ffffffff;
  .submit {
    margin-top: 68px;
   width:200px !important;
  //  margin:0px 30px;
    height: 43px;
    background: rgba(148, 190, 50, 1);
    opacity: 0.53;
    border-radius: 18px;
    text-align: center;
    line-height: 43px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    // line-height: 22px;
    color: rgba(255, 255, 255, 1);
  }
  .know {
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 16px;
    /* text-align:center; */
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    .tips {
      margin-left: 11px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(245, 112, 8, 1);
    }
  }

  .main {
    width: 100%;
    height: 100%;
    margin-top: 46px;

    .messsage {
      margin-top: 20px;
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }

    .bg {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      width: 100%;
      height: 100%;
      /* height: calc(100% - 46px); */
    }

    .content {
      color: red;
      position: fixed;
      top: 80px;
      left: 0px;
      right: 0px;
      width: 100%;
      height: calc(100% - 46px);
      overflow: scroll;
      padding: 0px 40px;
      box-sizing: border-box;
      display: flex;
      /* justify-content: center; */
      flex-direction: column;
      align-items: center;
      div {
        width: 100%;
      }
      .font-setttinhg(@fontSize,@textAlign,@marginbottom:0px) {
        text-align: @textAlign;
        font-size: @fontSize;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin-bottom: @marginbottom;
      }
      .phone_tiel {
        margin-top: 74px;
        .font-setttinhg(22px, center, 50px);
      }
      .message {
        display: flex;
        flex-direction: column;
        div:nth-child(1) {
          .font-setttinhg(16px, none);
        }
        div:nth-child(2) {
          .font-setttinhg(12px, none);
        }
      }
      div:nth-child(1) {
        // margin-top: 50px;
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        div:nth-child(1) {
          display: flex;
        }
        //  div:nth-child(2) {
        //    margin-top: 74px;
        //         // display: flex;
        //       }

        .logo {
          width: 45px;
          height: 45px;
          margin-right: 11px;
          background: rgba(245, 246, 246, 1);
          border-radius: 10px;

          // margin: 0px auto;
        }
      }
      // div:nth-child(2) {
      //   margin-top: 51px;
      // }
      div:nth-child(3) {
        margin-top: 12px;
        position: relative;
        .captnum {
          position: absolute;
          right: 0px;
          top: 0px;
          padding: 10px 10px;
          // border-radius: 18px;
          box-sizing: border-box;
          // border-left: 1px solid red;;
          // background-color: #94be32ff;
          font-size: 15px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #02AFB8FF;

          // color: rgba(102, 102, 102, 1);
        }
        .commone_shuxian{
            content: "";
          display: inline-block;
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 1);
          // background-color: red;
          position: absolute;
          /* margin-right: 20px; */
          left: -8px;
          top: 9px;
        }
        .captnum::before {
          .commone_shuxian();
        }
        .captnum_edit::before{
          //  .commone_shuxian();
        }
        .captnum_edit {
          position: absolute;
          right: 0px;
          top: 0px;
          padding: 10px 27px;
          // border-radius: 18px;
          box-sizing: border-box;
          // background-color: #94be32ff;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          line-height: 22px;
          color: #02AFB8FF;
        }
      }
      div:nth-child(4) {
        // width: 100px;
        // height: 50px;
        // margin-top: 80px;
        // margin-bottom: 90px;
      }
      div:nth-child(2) {
        //  display;
        flex-direction: column;
      }
      .expreci {
        position: fixed;
        left: 0;
        bottom: calc(@bottom + 16px);
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #ffffff;
        .left {
          margin-right: 11px;
        }
        .right {
          color: #ffffff;
        }
      }
    }

    .phoen {
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 70px;
      margin-bottom: 80px;
    }

    /deep/ .van-button--normal {
      padding: 12px 117px;
      box-sizing: border-box;
    }

    /deep/ .van-cell {
      // background: rgba(245, 246, 246, 1);
      background: rgba(0, 0, 0, 1);
      opacity: 0.7;
      border-radius: 40px;
      // opacity: 1;
      // border-radius: 18px;
      //   background: rgba(255, 255, 255, 1);
      //   border: 1px solid rgba(221, 221, 221, 1);
      //   border-radius: 5px;
      // height:2px;
      // border-bottom: 1px solid #eeeeee;
      // background: none;

      // background:rgba(238,238,238,1);
      // opacity:0.2;
    }
    /deep/ .van-field__control {
      color: #ffffff;
      font-size: 16px;
    }

    .edit_phoen {
      width: 100%;
      position: relative;
    }

    /deep/ .van-field__label {
      display: none;
    }

    /deep/ .van-button {
      margin-top: 60px;
    }

    .capte {
      position: absolute;
      bottom: 14px;
      right: 17px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(245, 112, 8, 1);
    }

    .resetCode {
      text-align: right;
      font-size: 15px;
      font-family: Source Han Sans CN;
      margin-top: 10px;
      font-weight: 400;
      color: rgba(245, 112, 8, 1);
    }
  }

  /* .qmina */
}

/* .login {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #ffffff;
        font-size: 30px;

        .main {
            position: relative;
            margin-top: 46px;

            .logo {
                width: 100px;
                height: 100px;
                background-color: red;
                border-radius: 50%;
                z-index: 3;
                position: absolute;
                left: 50%;
                top: 15%;
                margin-left: -1.343rem;
            }
        }

        .bg {
            background-color: red;
        }

        .main_login_from {
            padding: 0px 30px;

            .from_group_phone {
                height: 50px;
                position: relative;
                ;
                border-bottom: 1px solid #cccccc;

                .captch_code {
                    font-size: 0.36rem;
                    color: red;
                    position: absolute;
                    right: 0px;
                    top: 17px;
                }

                input {
                    width: 100%;

                    font-size: 16px;
                    height: 100%;
                    display: block;
                    border-bottom: 1px solid #eaeaea;
                    color: #888888;
                }

                input::placeholder {
                    color: #aaa;
                }

                .notCode {
                    color: red;
                }
            }

            .login_submit {
                width: 100%;
                padding: 20px;
                box-sizing: border-box;
                height: 100px;
                display: flex;
                align-items: center;

                .submit {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    background-color: #8F7CF2;


                    text-align: center;
                    font-size: 0.48rem;
                    color: #fff;
                    border-radius: 30px;

                }
            }
        }

        .agreement {
            position: fixed;
            bottom: 20px;
            left: 0px;
            font-size: 16px;
            width: 100%;
            text-align: center;
            color: #888888;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 20px;
                height: 20px;
            }

            .red-txt {
                color: #00aefe;
            }
        }
    } */
</style>
