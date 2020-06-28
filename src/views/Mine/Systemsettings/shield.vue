<template>
  <div class="container shield">
    <An_Header title="屏蔽管理"></An_Header>
    <div class="main">
      <!-- <img src="@/assets/images/home/bg.png" class="bgi" alt srcset /> -->
      <ul class="System_Settting">
        <li class="system_items" @click="ToClick('block_topics',1)">
          <div class="lei">
            <!-- <img src="@/assets/images/setting/icon_set_change.png" class="bg1" alt /> -->
            <span>黑名单</span>
          </div>
          <div class="rig">
            <img src="@/assets/images/setting/icon_common_open.png" alt />
            <!-- <img src="@/assets/images/setting/icon_set_shield.png" alt=""><span>屏蔽管理</span> -->
          </div>
        </li>
        <!-- <li class="system_items" @click="ToClick('block_topics',2)">
          <div class="lei">
            <span>我屏蔽的用户</span>
          </div>
          <div class="rig">
            <img src="@/assets/images/setting/icon_common_open.png" alt />
          </div>
        </li> -->
      </ul>
    </div>
  </div>
</template>
<script>
import An_Header from "../../../components/header/an-header.vue";
export default {
  components: {
    An_Header
  },
  name: "shield",
  data() {
    return {
      // bg_url: require("../../../assets/images/home/bg.png")
    };
  },
  methods: {
    ToClick(url, type) {
      this.$router.push({
        path: `/${url}`,
        query: {
          type: type,
          title: type == 1 ? "黑名单" : "我屏蔽的用户"
        }
      });
    }
  }
};
</script>
<style scoped lang="less" scoped>
/deep/ .van-nav-bar {
  border-bottom: 2px solid #c8c8c8;
}

.shield {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /deep/ .van-nav-bar__title {
    color: #ffffff;
  }
  .main {
    width: 100%;
    height: 100%;
    overflow: scroll;
    margin-top: 46px;

    .bgi {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    /* padding:20px;
            ; */
    .System_Settting {
      padding: 0px 15px;
      box-sizing: border-box;
      position: relative;
      z-index: 2;
      /* z-index: 2; */
    }

    .system_items {
      line-height: 65px;
      border-bottom: 1px solid #cccccc;
      width: 100%;
      font-size: 16px;
      color: #000;
      padding: 0px 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .lei {
        display: flex;
        color: #ffffff;
        align-items: center;

        .bg1 {
          margin-right: 15px;
        }

        img {
          width: 14px;
          height: 14px;
        }
      }

      .rig {
        display: flex;
        align-items: center;

        /* justify-content:center; */
        img {
          width: 7px;
          height: 12px;
          margin-left: 10px;
        }
      }

      /* margin-lefr */
    }

    .btn_bottom {
      width: 100%;
      position: fixed;
      bottom: 30px;
      display: flex;
      justify-content: center;
    }

    .submit {
      padding: 15px 105px;
      text-align: center;
      box-sizing: border-box;
      background-color: #e4e4e4;
      color: #666666;
      border-radius: 5px;
      font-size: 17px;

      /* left:15%; */
    }
  }
}
</style>