<template>
  <div class="search">
    <div class="header_search">
      <!-- <van-icon name="arrow-left"  @click="Toback"/> -->
      <div class="search_inoput">
        <input type="text" name :placeholder="placeholder" v-model.trim="searchKey" maxlength="25" />
        <span class="icon_search">
          <van-icon name="search" />
        </span>
      </div>
      <div class="search_select">
        <div :class="selectItem==1?'ative':''" @click="onchange(1)">图文</div>
        <div :class="selectItem==2?'ative':''" @click="onchange(2)">Ya组</div>
        <div :class="selectItem==3?'ative':''" @click="onchange(3)">用户</div>
      </div>
      <div class="UserS"></div>
      <div class="search_content">
        <div v-show="selectItem==1" class="bottom_content">
           <an-commmend
          v-show="selectItem==1"
          v-for="(item,index) in datalist_Tuwen"
          :item="item"
         :key="item.id"
          />
        </div>

        <div class="UserS"></div>

        <div v-show="selectItem==2" class="bottom_content">
          <an-topic v-for="(item,index) in datalist_Topic" :item="item" :key="item.id" :is_close="sum" />
        </div>
        <div class="UserS"></div>
        <div v-show="selectItem==3" class="bottom_content">
          <User v-for="(item,index) in datalist_User" :item="item" :key="item.id" />
        </div>

        <!-- <van-empty
          v-if="selectItem==1?datalist_Tuwen.length==0:(selectItem==2?datalist_Topic.length===0:(selectItem==3?datalist_User.length==0:''))"
          class="custom-image"
          :image="require(`@/assets/images/home/icon_empty.png`)"
          description
        >
          <div>Hey,man</div>
          <div>这里找不到你想要的结果</div>
        </van-empty> -->
      </div>
    </div>
  </div>
</template>
<script>
import User from "./user";
import Topci from "../../Topic/chooseTopic/Topcic";
import { Search, Popup } from "vant";
import { Field, Dialog, Empty } from "vant";
import { index, getSubjectList } from "@/api/modules/home";
import { getData, find } from "@/api/modules/search";
import { getUserList } from "@/api/modules/search";
import AnCommmend from "../../Home/components/an-recommend";
import AnHeader from "../../../components/header/an-header";
import AnTopic from "../../Home/components/an-topic";
export default {
  name: "search",
  components: {
    AnHeader,
    Search,
    Field,
    Empty,
    Popup,
    Topci,
    AnCommmend,
    AnTopic,
    User
  },
  activated() {},
  methods: {
    getUserListS() {
      getUserList({
        name: this.searchKey
      }).then(res => {
        this.datalist_User = [];
        res.forEach(element => {
          this.datalist_User.push(element);
        });
        var data = Array.from(new Set(this.datalist_User));
        // console.log(this.datalist)
        this.datalist_User = data;
      });
    },
    getTopciInfo() {
      getSubjectList({
        title: this.searchKey
      }).then(res => {
        this.datalist_Topic = [];
        res.forEach(element => {
          this.datalist_Topic.push(element);
        });
        var data = Array.from(new Set(this.datalist_Topic));
        // console.log(this.datalist)
        this.datalist_Topic = data;

      });
    },
    _getTuWen() {
      index({
        desc: this.searchKey
      }).then(res => {
        this.datalist_Tuwen = [];
        res.forEach(element => {
          this.datalist_Tuwen.push(element);
        });
      });
    },
    onchange(v) {
      this.selectItem = v;
      if (v == 1) {
        this._getTuWen();
      } else if (v == 2) {
        this.getTopciInfo();
      } else if (v == 3) {
        this.getUserListS();
      }
    }
  },
  watch: {
    searchKey: {
      immediate: true,
      handler: function(newval, oldVal) {
        // console.log(newval != oldVal);
        // console.log(newval)
        if (newval.length == 0) {
          this.datalist = [];
        } else if (newval != oldVal) {
          this._getTuWen();
        }
      }
    }
  },
  data() {
    return {
      datalist_User: [], //这是搜索过后的结果数据
      datalist_Topic: [], 
      datalist_Tuwen: [], 
      value: "",
      selectItem: 1,
      doing: false,
      show: false,
      sum: 1,
      searchKey: "",
      placeholder: "大家都在搜 大神在下",
      hot: [],
      history: []
    };
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/safeArea";
.search {
  width: 100%;
  height: 100%;

  overflow: hidden;
  .bottom_content{
    margin-bottom: 20px;
  }
  .header_search {
    position: fixed;
    top: calc(@top + 70px);
    left: 0px;
    bottom: 0;
    right: 0;
    z-index: 12;

    width: 100%;
    height: calc(100% - @top - 70px);
    margin: 0px auto;
    /deep/ .van-empty__image {
      width: 142px;
      height: 110px;
    }
    /deep/ .van-empty__bottom {
      text-align: center;
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(97, 107, 126, 1);
      line-height: 24px;
    }
    // 搜索内容开始
    .search_content {
      width: 100%;
      height: 100%;
      overflow: scroll;
      // margin-bottom: 20px;
      .UserS {
        margin-top: 20px;
      }
      // display: ;
    }
    .search_inoput {
      padding: 0px 15px;
      box-sizing: border-box;
      width: 100%;
      position: relative;
      height: 50px;
    }
    .search_select {
      width: 100%;
      // width:750px;
      height: 50px;
      background: rgba(30, 31, 49, 1);
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 50px;
      padding: 0px 55px;
      box-sizing: border-box;
      div {
        // padding: 0px 5px;
        flex: 1;
        text-align: center;
      }
      .ative {
        border-bottom: 2px solid #007bff;
      }
    }

    input {
      /* border: 1px solid red; */
      background: #000000;

      font-size: 15px;
      width: 100%;
      height: 34px;
      border-radius: 10px;
      position: relative;
      text-indent: 3em;
    }

    .icon_search {
      position: absolute;
      /* position: absolute; */
      left: 5%;
      top: 18%;
      font-size: 16px;

      /deep/ .van-icon {
        font-size: 20px;
        margin-right: 18px;
      }
    }

    /deep/ .van-icon {
      font-size: 16px;
      margin-right: 18px;
    }

    .right_search {
      /* width: 20px; */
      display: inline-block;
      width: 1.5rem;
      font-size: 16px;
      color: #666666;
      text-align: center;
      display: inline-block;
      margin-left: 13px;
    }
  }

  .bg {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>
