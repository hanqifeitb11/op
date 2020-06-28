<template>
  <div class="container block_topics">
    <an-header :title="title" />
    <div class="main">
      <van-pull-refresh class="content" v-model="refreshing" @refresh="onRefresh">
        <van-list
          class="list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
          <an-topic
            v-show="type == 1"
            type="pingbi"
            @deleteUserId="getShow"
            v-for="(item,index) in subList"
            :item="item"
            :key="index"
            :active="index"
          />
          <user-item
            :type="true"
            v-show="type == 2"
            v-for="(item,index) in list"
            :item="item"
            :key="index"
          />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { getBlackList } from "../../../api/modules/mine";
import { mapState } from "vuex";
import AnHeader from "../../../components/header/an-header";
import AnTopic from "../../Home/components/an-topic";
import UserItem from "../search/userItem";
import { laheiList } from "../../../api/modules/mine";

export default {
  components: {
    UserItem,
    AnTopic,
    AnHeader
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  name: "block_topics",
  data() {
    return {
      title: "黑名单",
      type: "",
      refreshing: false,
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
      subList: [],
      list: []
    };
  },
  mounted() {
    (this.type = this.$route.query.type),
      (this.title = this.$route.query.title);
    if (this.type == 1) {
      this.getTalk();
    } else {
      this.getLaheiList();
    }
  },
  methods: {
    getShow(v1) {
      this.subList.forEach((v, i) => {
        console.log(v);
        if (v.blockUserId == v1) {
          console.log(i);
          return this.subList.splice(i, 1);
        }
      });
    },
    getTalk(clear = false) {
      const { page, limit } = this;

      console.log(this.userInfo);
      let uu = JSON.parse(localStorage.getItem("userInfo")).id;
      console.log(uu);
      getBlackList({ page, limit, uid: uu }).then(res => {
        console.log(res);
        this.loading = false;
        this.refreshing = false;
        if (res.data.length == 0) {
          this.finished = true;
        }
        res.data.forEach(r => {
          r.showBoth = false;
        });
        if (clear) {
          this.subList = [];
        }
        this.subList = [...this.subList, ...res.data];
      });
    },
    getLaheiList(clear = false) {
      const { page, limit } = this;
      laheiList({ page, limit }).then(res => {
        console.log(res);
        this.loading = false;
        this.refreshing = false;
        if (res.data.length == 0) {
          this.finished = true;
        }
        res.data.forEach(r => {
          r.showBoth = false;
        });
        if (clear) {
          this.list = [];
        }

        this.list = [...this.list, ...res.data];
      });
    },
    onLoad() {
      if (this.refreshing) {
        this.refreshing = false;
      }
      this.page++;
      if (this.type == 1) {
        this.getTalk();
      } else {
        this.getLaheiList();
      }
    },
    onRefresh() {
      this.finished = false;

      this.page = 1;
      if (this.type == 1) {
        this.getTalk(true);
      } else {
        this.getLaheiList(true);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/safeArea";
@import "../../../assets/font";
.block_topics {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #ffffff;
  /deep/ .header {
    border-bottom: 1px solid #f5f6f6ff;
  }
  .main {
    width: 100%;
    .bg {
      z-index: 1;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .content {
      position: fixed;
      box-sizing: border-box;
      z-index: 2;
      overflow-y: auto;
      width: 100%;
      height: calc(100% - 50px - @top - @bottom);
      bottom: @bottom;
      left: 0;
      top: 0px;
      margin-top: calc(@top + 56px);
    }
  }
}
</style>
