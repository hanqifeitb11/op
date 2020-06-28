<template>
  <van-pull-refresh class="content" v-model="refreshing" @refresh="onRefresh">
    <van-list
      class="list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <an-topic v-for="(item,index) in subList" :item="item" :key="index" :is_close="sum" />
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { getSubjectList } from "../../api/modules/home";
import AnTopic from "../Home/components/an-topic";
export default {
  name: "topic",
  components: { AnTopic },
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
      subList: [],
      sum: 1
    };
  },
  mounted() {
  },
  methods: {
    ToUSerList(id) {
    },

    onLoad() {
      if (this.refreshing) {
        this.refreshing = false;
      }
      this.page++;
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true;
      this.page = 1;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/safeArea";
@import "../../assets/font";
.content {
  position: fixed;
  box-sizing: border-box;
  z-index: 2;
  overflow-y: auto;
  width: 100%;
  height: calc(100% - 50px - @top - @bottom);
  bottom: @bottom;
  left: 0;
  .list {
    padding-bottom: calc(@bottom);
    .loginBtn {
      width: 140px;
      height: 40px;
      background: linear-gradient(
        90deg,
        rgba(255, 167, 13, 1),
        rgba(236, 51, 0, 1)
      );
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
      color: white;
      font-size: @font18;
      margin: 0 auto;
    }
  }
}
</style>


