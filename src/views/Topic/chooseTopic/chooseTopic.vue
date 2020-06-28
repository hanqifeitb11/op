<template>
  <div class="chooseTopic container">
    <!-- <img src="@/assets/images/home/bg.png" alt class="bgi" /> -->
    <an-header title="选择Ya组" />
    <div class="main">
      <div class="search_content">
        <div class="search">
          <van-icon class="iconSearch" v-show="title==''" size="18" color="#999999" name="search" />
          <input type="text" v-model="title" placeholder="搜索Ya组" />
        </div>
        <!-- <d> -->
          <van-pull-refresh class="topicList" v-model="refreshing" @refresh="onRefresh">
            <van-list
              class="list"
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :immediate-check="false"
              @load="onLoad"
            >
              <an-topic
                type="choose"
                v-for="(item,index) in subList"
                :item="item"
                :key="index"
                :is_close="num"
                :is_back="is_to"
              />
            </van-list>
          </van-pull-refresh>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import AnHeader from "../../../components/header/an-header";
import { subList } from "../../../api/modules/home";
import AnTopic from "../../Home/components/an-topic";
var setTimer = null;
export default {
  name: "chooseTopic",
  components: { AnTopic, AnHeader },
  data() {
    return {
      is_to: 0, //0是不跳的意思1是跳的意思
      refreshing: false,
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
      subList: [],
      title: "",
      num: 1
    };
  },
  watch: {
    title(val) {
      clearTimeout(setTimer);
      setTimer = setTimeout(() => {
        this.getTalk(true);
      }, 300);
    }
  },
  mounted() {
    this.getTalk();
  },
  methods: {
    getTalk(clear = false) {
      const { page, limit, title } = this;
      subList({ page, limit, title: title ? title : undefined }).then(res => {
        this.loading = false;
        this.refreshing = false;
        console.log(res, "这....");
        if (res.length == 0) {
          this.finished = true;
        }

        if (clear) {
          this.subList = [];
        }
        this.subList = [...this.subList, ...res];
      });
    },
    onLoad() {
      if (this.refreshing) {
        this.refreshing = false;
      }
      this.page++;
      this.getTalk();
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true;
      this.page = 1;
      this.getTalk(true);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/safeArea";
.chooseTopic {
  .bgi {
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .header {
    background: #000000;
    opacity: 0.6;
  }
  .main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .search_content {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      height: calc(100% - @top);
      margin-top: calc(@top + 46px);
      z-index: 1;
      .search {
        width: 345px;
        height: 35px;
        background: rgba(0, 0, 0, 1);
        opacity: 0.6;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-left: 15px;
        overflow: hidden;
        margin-top: 10px;
        margin-bottom: 10px;
        .iconSearch {
          position: absolute;
          left: 15px;
          top: 10px;
          z-index: 3;
        }
        input {
          background: transparent;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          margin-left: 41px;
          text-align: left;
          width: 100%;
        }
      }
      .topicList {
        height: calc(100% - @top - 60px);
        overflow: scroll;
      }
      //   .topicList {
      //     margin-top: 20px;
      //     overflow-y: auto;
      //     position: fixed;
      //     bottom: @bottom;
      //     left: 0;
      //     width: 100%;
      //     height: calc(100% - 110px - @top);
      //   }
    }
    // padding-top: 50px;
    // position: relative;
    // z-index: 2;
    // .search{
    //     width:345px;
    //     height:35px;
    //     background:rgba(0,0,0,1);
    //     opacity:0.6;
    //     border-radius:6px;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     position: relative;
    //     margin-left: 15px;
    //     overflow: hidden;
    //     margin-top: 10px;
    //
    // }
  }
}
</style>
