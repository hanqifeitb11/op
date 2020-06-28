<template>
  <div class="container cancel_account">
    <!--  -->
    <an-header title="注销账户" :leftArrow="is_left">
      <img
        src="@/assets/images/setting/icon_close.png"
        slot="right"
        class="bg_close"
        v-show="is_delete_success"
        @click="toback"
        alt
      />
    </an-header>
    <div class="main">
      <!-- <img src="@/assets/images/home/bg.png" alt class="bg" /> -->
      <div class="content_center">
        <!-- <div class="content" v-if="isClick&&!is_delete_success">
          <div class="content_top">
            <div class="bg_title">*注销前请认证阅读以下提醒</div>
为防止误操作,请再次确认是否注销帐号并确认注销后的影响。在此善意提醒,注销帐号为不可恢复的操作,建议在最终确定注销前自行备份本帐号相关的所有信息,并请再次确认与帐号相关的所有服务均已进行妥善处理。注销帐号后将无法再使用本帐号或找回本帐号浏览、关注、添加、绑定的任何内容或信息(即使你使用相同的手机号码再次注册并使用秘密树洞)。
          </div>
          <div class="sub_btn">
            <div class="btn_check">
              <div class="Outer" @click="toCheck">
                <div class="Inner" v-show="checked"></div>
              </div>
              <span @click="toCheck">
                我已阅读并同意
                <span class="attention">《秘密树洞注销须知》</span>
              </span>
            </div>
            <div class="btn">
              <van-button
                type="primary"
                block
                :class="!checked?'not_submit':''"
                v-if="!checked"
                @click="OpenDelete"
              >下一步</van-button>
              <van-button
                type="primary"
                block
                :class="checked?'checksubmit':''"
                v-else
                @click="To_Router"
              >下一步</van-button>
            </div>
          </div>
        </div>-->
        <!--  v-if="!isClick&&!is_delete_success" -->
        <div class="content_from">
          <div class="top_left">注销账号需要验证本账号手机号：</div>
          <div class="grounp_btn">
            <van-field v-model="newPhone" maxlength="11" label="文本" placeholder="请输入手机号" />
            <!-- <div></div> -->
            <div class="captche">
              <van-field v-model="newCaptche" maxlength="6" label="文本" placeholder="请输入验证码" />
              <span :class="isClick_step?'send':'captche_code'" @click="GetSend">{{capt_num}}</span>
            </div>
          </div>
        
          <div class="btn_submit" @click="ToNext_back">确认注销</div>
        </div>
        <div class="close_message">
          重要提醒：注销帐号后将无法再使用本帐号或找回本帐号浏览、关注、添加、绑定的任何内容或信息(即使你使用相同的手机号码再次注册并使用声境)。
        </div>
        <!--   -->
        <!-- <div class="NoT_Success" v-if="is_delete_success">
          <van-empty
            class="custom-image"
            :image="require(`@/assets/images/home/icon_accountcancellaion.png`)"
            description="账号已注销完成"
          ></van-empty>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { Empty } from "vant";
import {
  getUserCode,
  deleteUser,
  getDeleteCode,
  deleteUsers
} from "../../../api/modules/home";
import { GetCode } from "../../../api/modules/mine";
import { Checkbox, CheckboxGroup, Dialog } from "vant";
import { Field } from "vant";

import { Button, Toast } from "vant";
import { mapState, mapMutations } from "vuex";
import AnHeader from "../../../components/header/an-header";
export default {
  components: {
    AnHeader,
    Dialog,
    Button,
    Checkbox,
    Empty,
    CheckboxGroup,
    Field,
    Toast
  },
  data() {
    return {
      is_left: true,
      isShowClick: true,
      setTime: 5,
      text: "",
      newPhone: "",
      newCaptche: "",
      checked: false,
      isClick: true,
      capt_num: "获取验证码", //验证码倒计时
      Time: null,
      isResetBtn: false,
      isClick_step: false,
      is_delete_success: false
    };
  },
  name: "cancel_account",
  watch: {
    newCaptche(val) {
      if (val != "" && this.newPhone != "") {
        this.isShowClick = false;
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  mounted() {
    // this.getTime();
  },
  methods: {
    toback() {
      localStorage.clear();
      this.changeData({ key: "token", val: "" });
      this.changeData({ key: "userInfo", val: {} });
      this.$nextTick(() => {
        this.$router.push({
          path: "/login"
        });
      });
    },
    ToNext_back() {
      console.log(
        "--------------------------------------------------------------"
      );
      if (this.getType(this.newPhone)) {
        console.log(this.newCaptche.length);
        if (this.newCaptche.length == 0) {
          Toast({
            message: "请输入验证码",
            duration: 1500
          });
          return false;
        } else if (this.newPhone.length < 6) {
          Toast({
            message: "请输入正确的验证码",
            duration: 1500
          });
          return false;
        }
        console.log("----------------------------------------------------");
        Dialog.confirm({
          title: "",
          message: "是否要注销当前账号？",
           width:270,
          confirmButtonColor:'#01AEB7FF',
          // 
          cancelButtonColor:'#8C8C8CFF'
        })
          .then(() => {
            deleteUsers({
              mobile: this.newPhone,
              verificationCode: this.newCaptche
            }).then(res => {
              console.log(res);
              this.is_delete_success = true;
              this.is_left = false;

              localStorage.clear();
              this.changeData({ key: "token", val: "" });
              this.changeData({ key: "userInfo", val: {} });
              var __this = this;
              setTimeout(function() {
                __this.$router.push({
                  path: "/login"
                });
              }, 2000);
            });

            // on confirm
          })
          .catch(() => {
            // on cancel
          });
        // 发送请求去注销账号
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
    GetSend() {
      if (this.getType(this.newPhone)) {
        this.getTime();
        GetCode({
          mobile: this.newPhone,
          type: 2
        }).then(() => {});
      }
    },
    ...mapMutations({
      changeData: "user/changeData"
    }),
    ToStep_end() {
      // this.is_delete_success = true;
      deleteUser({
        // mobile: this.userInfo.mobile,
        code: this.text
      }).then(res => {
        this.is_delete_success = true;
        var _this = this;
        //
        // this.changeData({key:'token',val:''})
        //
        var Time = setInterval(function() {
          if (_this.setTime == 1) {
            clearInterval(Time);
            localStorage.clear();
            _this.changeData({ key: "token", val: "" });
            _this.changeData({ key: "userInfo", val: {} });
            _this.$router.push({ path: "/" });
          }
          _this.setTime--;
        }, 1000);
      });
    },
    getSend() {
      clearInterval(this.Time);
      this.isResetBtn = false;
      this.getTime();
      getDeleteCode({
        mobile: this.userInfo.mobile
        // type: 2
      }).then(res => {
        console.log("--222");
      });
    },
    ToNext() {
      if (this.text.length == 0) {
        Toast({
          message: "请输入验证码",
          duration: 1500
        });
        return false;
      }
    },
    getTime() {
      var sum = 59;
      var _this = this;

      this.Time = setInterval(function() {
        if (sum == 1) {
          clearInterval(_this.Time);
          _this.$nextTick(function() {
            _this.isResetBtn = true;
            _this.capt_num = "重新发送";
          });
        }
        _this.capt_num = `${sum}s`;
        _this.isClick_step = true;
        --sum;
      }, 1000);
    },
    OpenDelete() {
      if (!this.checked) {
        Toast({
          message: "请先同意该注意事项",
          duration: 1500
        });
        return false;
      }
    },
    toCheck() {
      this.checked = !this.checked;
    },
    To_Router() {
      if (!this.checked) {
        Toast({
          message: "请先同意该注意事项",
          duration: 1500
        });
        return false;
      }

      //   getDeleteCode({
      //     mobile: this.userInfo.mobile
      //     // type: 2
      //   }).then(res => {
      //     console.log("--222");
      //   });
      // 在这里发送烟瘴吗信息
      this.isClick = false;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/safeArea";
@import "../../../assets/font";
.close_message{
  padding:15px;
  box-sizing: border-box;
  font-size:14px;
font-family:PingFang SC;
font-weight:500;
color:rgba(0,0,0,1);
line-height:18px;
text-indent: 1em;
}
.not_submit {
  width: 309px;
  height: 43px;
  background: rgba(148, 190, 50, 1);
  opacity: 0.53;
  border-radius: 18px;
}
.checksubmit {
  width: 309px;
  height: 43px;
  background: rgba(148, 190, 50, 1);
  // opacity:0.53;
  border-radius: 18px;
}
.bg_close {
  width: 18px;
  height: 18px;
  padding: 10px 5px 10px 20px;
}
.content_center {
  position: fixed;
  top: 0px;
  // background-color: #ffffff;
  right: 0px;
  left: 0px;
  z-index: 2;
  margin-top: calc(@top + 46px);
  overflow: scroll;
  height: calc(100% - 46px);
  // padding: 0px 20px;
  box-sizing: border-box;
}
.cancel_account {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
  // /deep/ .van-nav-bar__title {
  //   color: #ffffff;
  // }
  .btn_submit {
    // width: 100%;
    text-align: center;
    line-height: 43px;
    height: 43px;
    // background: rgba(248, 81, 81, 1);
    opacity: 1;
    // border-radius: 18px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    width: 300px;
    height: 40px;
    left: 50%;
    margin-left: -4rem;
    background: rgba(1, 174, 183, 1);
    border-radius: 20px;
    position: fixed;
    bottom: calc(@bottom + 30px);
    // line-height:22px;
    color: rgba(255, 255, 255, 1);
    // width: 240px;
    // height: 50px;
    // background: #666666ff;
    // border-radius: px;
    // font-size: 18px;
    // font-family: Source Han Sans CN;
    // font-weight: 400;
    // color: rgba(153, 153, 153, 1);
    // line-height: 50px;
    // text-align: center;
    // position: fixed;
    // bottom: 50px;
    // left: 50%;
    // margin-left: -3rem;
  }
  .not_btn_submit {
    width: 100%;
    height: 43px;
    background: rgba(248, 81, 81, 1);
    opacity: 1;
    border-radius: 18px;
    line-height: 43px;
    text-align: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    // line-height:22px;
    color: rgba(255, 255, 255, 1);

    // width: 240px;
    // height: 50px;
    // background: #666666ff;
    // border-radius: 8px;
    // font-size: 18px;
    // font-family: Source Han Sans CN;
    // font-weight: 400;
    // color: #ffffff;
    // background: linear-gradient(rgb(35, 149, 255), rgb(0, 80, 213));
    // line-height: 50px;
    // text-align: center;
    // position: fixed;
    // bottom: 50px;
    // left: 50%;
    // margin-left: -3rem;
  }
  .NoT_Success {
    position: absolute;
    top: 32%;
    left: 50%;
    margin-left: -3rem;
    z-index: 33;

    /deep/ .van-empty__image {
      width: 80px;
      height: 80px;
    }

    /deep/ .van-empty__description {
      font-size: 16px;
      //   color: #ff0701;
      color: #000000;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 50px;
      color: rgba(0, 0, 0, 1);
      margin-top: 37px;
    }
  }

  .main {
    width: 100%;
    height: 100%;
    // margin-top: 46px;
    // height: calc(100% - @top);
    // overflow: scroll;

    .bg {
      z-index: 1;
      position: fixed;
      left: 0;
      top: 0;
      right: 0px;
      width: 100%;
      height: 100%;
    }

    .content_from {
      background-color: #ffffff;
      .top_left {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        // color: red;
        margin-top: 10px;
        height: 53px;
        line-height: 53px;
        margin-left: 15px;
      }
      .grounp_btn {
        // margin-top: 30px;
      }
      // display: flex;
      // justify-content: center;
      // align-items: center;
      .captche {
        position: relative;
        .captche_code::before {
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
        .captche_code {
          position: absolute;
          right: 0px;
          bottom: 0px;
          font-size: 13px;
          padding: 13px 10px;
          box-sizing: border-box;
          color: #01afb7ff;
          //           width:83px;
          // height:43px;
          // background: rgba(148, 190, 50, 1);
          opacity: 1;
          border-radius: 18px;
        }
        .send {
          position: absolute;
          right: 0px;
          bottom: 0px;
          font-size: 13px;
          padding: 13px 27px;
          box-sizing: border-box;
          color: #000000;
          //           width:83px;
          // height:43px;
          // background: rgba(148, 190, 50, 1);
          opacity: 1;
          border-radius: 18px;
        }
      }
      .count_down {
        position: absolute;
        font-size: 16px;
        color: #f57008;
        /* bottom: 80%; */
        top: 8%;
        right: 18px;
      }

      .reset_code {
        position: absolute;
        font-size: 16px;
        color: #f57008;
        /* bottom: 80%; */
        top: 30%;
        right: 18px;
      }

      /deep/ .van-field__label {
        display: none;
      }

      /deep/ .van-button--primary {
        padding: 12px 117px;
        box-sizing: border-box;
      }

      /deep/ .van-button--primary {
        background-color: #e4e4e4;
        border: none;
      }
      /deep/ .van-field__control {
        color: #000000;
      }
      /deep/ .van-cell {
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;

        // margin-bottom: 60px;
        background-color: #ffffff;
        // border-bottom: 1px solid red;
        color: #ffffff;
        width: 100%;
        height: 53px;
        // background: rgba(245, 246, 246, 1);
        opacity: 1;
        // border-radius: 18px;
      }

      .btotom_message {
        font-size: 15px;
        text-align: center;
        margin-top: 21px;
        color: #999999;

        .num {
          color: #f57008;
        }
      }

      .top {
        position: relative;

        .captcha {
          position: absolute;
          top: 8%;
          right: 34%;
          font-size: 0.42667rem;
          color: #999999;
        }
      }
    }

    .content {
      position: fixed;
      top: 0px;
      left: 0px;
      z-index: 2;
      margin-top: calc(@top + 70px);
      overflow: scroll;
      height: calc(100% - 46px);
      padding: 0px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      /* align-items: ; */
      /* text-align: center; */
      font-size: 15px;
      line-height: 30px;
      color: #000000;
      flex-direction: column;

      .sub_btn {
        position: fixed;
        bottom: calc(@bottom + 60px);
        width: 100%;
        left: 0px;
        justify-content: center;
        display: flex;
        // bottom: 30px;
        flex-direction: column;
        align-items: center;

        .Outer {
          width: 16px;
          height: 16px;
          background-color: #ffffff;
          border: 1px solid #94be32ff;
          line-height: 15px;
          margin-right: 4px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;

          .Inner {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #94be32ff;
            display: inline-block;
          }
        }

        /deep/ .van-button--primary {
          border: none;
        }

        .btn_check {
          margin-bottom: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          /* /deep/ .van-checkbox__icon--round .van-icon{
                          background-color: #ffffff;

                      } */
        }

        /deep/ .van-button--normal {
          padding: 12px 117px;
          box-sizing: border-box;
        }

        .attention {
          color: #94be32ff;
          font-size: 15px;
        }
      }

      .content_top {
        margin-top: 60px;
      }

      .btn_bottom {
        margin-top: 70px;
      }

      .bg_title {
        text-align: center;
        margin-bottom: 40px;
        color: #000000;
      }
    }
  }
}
</style>