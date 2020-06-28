<template>
  <div id="app">
    <transition :name="animate">
      <navigation>
        <router-view class="Router" />
      </navigation>
    </transition>
    <foorbar :isShow="isshow" :routername="routernameSS"></foorbar>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { Toast } from "vant";
import { installCordova } from "./util/common";
import foorbar from "./components/footbar/footbar";
var _this;
export default {
  name: "app",
  data() {
    return {
      animate: "",
      isshow: 0,
    routernameSS:'',
    };
  },
  components: {
    Toast,
    foorbar
  },
  computed: {
    ...mapState({
      isProps: state => state.home.isProps,
      userInfo: state => state.user.userInfo
    })
    //     isProps(){
    //         if(this.state.home.isProps==1){
    // console.log('---1')
    //         }else{
    //           console.log('22')
    //         }
    //     }
  },
  mounted() {
    _this = this;
    console.log(_this);
  },
  created() {
    /**
     * 代码千万行，注释第一行，
     * 编程不规范，同事两行泪
     * @type {default}
     * @private
     */

    installCordova();
    this.listenNavigation();
    this.getAutoLogin();
  },
  watch: {
    isProps: {
      immediate: true,
      deep: true,
      handler: function(val) {
        if (val == 1) {
          this.isshow = 0;
        } else {
          this.isshow = 1;
        }
      }
    },
    $route: {
      deep: true,
      immediate: true,
      handler: function(val) {
        if (
          val.name == "home" ||
          val.name == "mine" ||
          val.name == "myMessageList"
        ) {
          // this.routername=val.name;
          this.getChangeHome({
            key:'routerName',
            val:val.name
          })
          console.log(val.name)
          this.isshow = 1;
        } else if (val.path == "/") {
          //
          this.$nextTick(function() {
            this.isshow = 0;
          });
        } else {
          this.isshow = 0;
        }
      }
    }
  },
  methods: {
    getAutoLogin() {
      let token = localStorage.getItem("token");
      this.changeData({ key: "token", val: token });
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (token) {
        this.getUserInfo({
          id: userInfo.id
        });
      }
    },
    ...mapActions({
      getUserInfo: "user/getUserInfo"
    }),
    ...mapMutations({
      changeData: "user/changeData",
      getChangeHome:'home/changeData',
      changeDevice: "changeData"
    }),
    listenNavigation() {
      this.$navigation.on("forward", (to, from) => {
        const { name } = to.route;
        if (
          name != "home" &&
          name != "welfare" &&
          name != "message" &&
          name != "mine"
        ) {
          this.animate = "slide-left";
        } else {
          this.animate = "";
        }
      });
      this.$navigation.on("back", (to, from) => {
        this.animate = "slide-right";
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "assets/public.css";
</style>
