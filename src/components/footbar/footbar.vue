<template>
  <div class="setting_controls" v-if="isShow">
    <!-- <div @click="isClick_home(1)" class="patent"> -->
    <img
      src="@/assets/images/home/icon_home_mine.png"
      v-if="firstIndex==0"
      alt
      @click="isClick_home(1)"
      class="right_img_LEFT"
      srcset
    />
    <img src="@/assets/images/home/icon_home_minepressed.png" v-else class="is_active" alt srcset />



    <!-- </div> -->
    <!-- <div @click="isClick_home(2)"> -->
    <img
      src="@/assets/images/home/icon_home_home.png"
      v-if="curentIndex==0"
      alt
      class="center_img_LEFT"
      @click="isClick_home(2)"
      srcset
    />
    <img src="@/assets/images/home/icon_home_home_pressed.png" class="center_img"  @click="isClick_home(4)"  alt v-else srcset />
    <!-- </div> -->
    <!-- <div  class="patent"> -->
    {{routernameSS}}
    <img
      src="@/assets/images/home/icon_home_msg.png"
      v-if="threeIndex==0"
      class="right_img_RIGHT"
      @click="isClick_home(3)"
      alt
    />

    <img src="@/assets/images/home/icon_home_msg_pressed.png" class="is_active" v-else alt srcset />
    <!-- </div>  -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["isShow", "routernameSS"],
  computed: {
    ...mapState({
      routerName: state => state.home.routerName
    })
  },
  created() {

  },
  watch: {
    routerName(val) {
      console.log(val + "这是当前路由名称");
      switch (val) {
        case "home":
         this.curentIndex=1;
        this.firstIndex = 0;
        this.threeIndex = 0;
          break;
        case "myMessageList":
          console.log('----')
           this.threeIndex =1;
        this.firstIndex = 0;
        this.curentIndex = 0;
          break;
        case "mine":
           this.firstIndex = 1;
        this.curentIndex = 0;
        this.threeIndex = 0;
          break;
        default:
          break;
      }
      // alert(val + "val");
    }
  },
  data() {
    return {
      curentIndex: 0,
      threeIndex: 0,
      firstIndex: 0
    };
  },
  methods: {
    isClick_home(type) {
      if (type == 1) {
        this.firstIndex = !this.firstIndex;
        this.curentIndex = 0;
        this.threeIndex = 0;
        this.$router.push({
          path: "/mine"
        });
        // this.$emit('clicktyppe',1)
      } else if (type == 2) {
      // console.log(this.curentIndex)
      //   if(this.curentIndex){
          
      //   }else{
            
      //   }
        this.curentIndex = !this.curentIndex;
        this.firstIndex = 0;
        this.threeIndex = 0;
        console.log(this.curentIndex)
        // if(){

        // }
  //       if(this.curentIndex){
  // this.$router.push({
  //         path: "/createTopic"
  //       });
  //       }else{
  this.$router.push({
          path: "/home"
        });
  //       }
        // 
      
      } else if (type == 3) {
        this.threeIndex = !this.threeIndex;
        this.firstIndex = 0;
        this.curentIndex = 0;
        this.$router.push({
          path: "/myMessageList"
        });
      }else if(type==4){
        this.$router.push({
          path:"/createTopic"
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/safeArea.less";
.setting_controls {
  position: fixed;
  width: 186px;
  height: 43px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  left: 50%;
  margin-left: -2.3rem;
  bottom: calc(@bottom + 26px);
  z-index: 4;
  border-radius: 22px;
  // bottom: -70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 0px 20px;
  box-sizing: border-box;

  .right_img_RIGHT {
    // padding-right:
    padding: 10px 20px 10px 20px;
    width: 18px;
    height: 18px;
  }
  .right_img_LEFT {
    width: 18px;
    height: 18px;
    padding: 10px 10px 10px 20px;
    // padding: 10px;
  }
  .center_img_LEFT {
    width: 18px;
    height: 18px;
    padding: 10px;
  }
  .left_img {
    width: 19px;
    height: 17px;
    // padding: 10px;
  }

  .center_img {
    width: 56px;
    height: 56px;
    // padding: 0px 10px;
  }
  .is_active {
    width: 43px;
    height: 43px;
  }
  // display: 1;
}
</style>