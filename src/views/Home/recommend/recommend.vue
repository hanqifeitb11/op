<template>
  <div @touchend="update">
    <van-pull-refresh
      class="homeContent common"
      :class="type==1?'content_update':'content'"
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        class="list"
        v-model="loading"
        ref="list"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <an-recommend
          @updateItemIsBoth="getUpdate"
          @getList="getIndex"
          :from="0"
          @item_delete="getDeleteItem"
          :id="'item'+index"
          ref="item"
          :item="item"
          v-for="(item,index) in list"
          @leave="close"
          :key="index"
        />
        <!-- <div class="release" @click="toRouter">
                <img class="air" src="@/assets/images/home/icon_publish.png" alt="">
                <span>发布</span>
        </div>-->
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { index } from "../../../api/modules/home";
import AnRecommend from "../components/an-recommend";
import { mapState } from "vuex";
import $ from "jquery";
import { TabbarItem } from "vant";
export default {
  name: "recommend",
  props: ["type", "sort"],
  components: { AnRecommend },
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,

      is_delete_id: 1,

      page: 1,
      limit: 10,
      list: [],
      isActive: true
    };
  },
  created() {},
  computed: {
    ...mapState({
      subject_id: state => state.home.subject_id
    })
  },
  watch: {
    sort: function(val) {
      this.sort = val;
      console.log("---------cewshi");
      this.getIndex();
    }
  },
  //   activated(){
  // console.log('sadasdsadasdsadasd');
  //   },
  mounted() {
    console.log("----执行了吗");
    this.getIndex();
  },
  methods: {
    getUpdate(item) {
      //   /**
      //    *   let tempitem = item;
      //         console.log(tempitem);
      //         tempitem.is_watch = !item.is_watch;
      //         this.list.splice(i, 1, tempitem);
      //    */
      //   // console.log(item);
      //  this.list.forEach((v,i)=>{
      //    console.log(v.id==item.id)
      //   if(v.id==item.id){
      //   //  let tempitem = item;
      //    item.isshowBoth=!item.isshowBoth;
      //   //  console.log(tempitem)
      //   debugger
      //    this.list.splice(i,1,item)
      //   }
      //  })
    },
    getDeleteItem(id) {
      console.log(id);
      // //   console.log(id);
      //   this.list.forEach((v, i) => {
      //     if (v.id == id) {
      //         this.list=this.list.splice(id,1)
      //         this.is_delete_Id=2;
      //         //   this.list.slice(0, i).concat(this.list.slice(i + 1, this.list.length))
      //     }
      //   });
    },
    update() {
      if (this.isActive) {
        this.timer = setTimeout(() => {
          this.doUpdate();
        }, 200);
      }
    },
    doUpdate() {
      if (!this.isActive || !this.$refs.item) {
        return;
      }
      const winHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      for (let i = 0; i < this.$refs.item.length; i++) {
        let item = this.$refs.item[i];
        if (item.isVideo) {
          //获取位置
          var tx = $("#item" + i).offset().top;
          if (tx > -100 && winHeight - tx > 100) {
            this.setSelect(item);
            break;
          } else if (item == this.selectItem) {
            this.setSelect(null);
          }
        }
      }
    },
    close() {
      this.isActive = false;
      this.setSelect(null);
    },
    show() {
      this.isActive = true;
    },
    setSelect(item) {
      if (this.selectItem != item) {
        if (this.selectItem) {
          this.selectItem.stop();
        }
        this.selectItem = item;
        if (this.selectItem) {
          this.selectItem.play();
        }
      }
    },
    getIndex(clear = false) {
      // debugger
      const { page, limit } = this;
      index({
        page,
        limit,
        type: 2
        // subject_id: this.subject_id ? this.subject_id : "",
        // sort: this.sort ? this.sort : ""
      }).then(res => {
        this.loading = false;
        this.refreshing = false;
        if (res.length == 0) {
          this.finished = true;
        }
        if (clear) {
          this.list = [];
        }
        this.list = [...this.list, ...res];
        this.list.forEach(v => {
          if (v.content.length > 112) {
            v.isShowBoth = true;
          } else {
            v.isShowBoth = false;
          }
        });
      });
    },
    onLoad() {
      if (this.refreshing) {
        this.refreshing = false;
      }
      console.log("-------" + this.is_delete_Id);
      //   if(this.is_delete_Id!=2){
      this.page++;
      this.getIndex();
      //   }
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.page = 1;
      this.getIndex(true);
    },
    toRouter() {
      this.$router.push({
        path: "/Upload"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/safeArea";
@import "../../../assets/font";
.homeContent {
}
.content {
  height: calc(100% - 50px - @top - @bottom);
}
.common {
  position: fixed;
  box-sizing: border-box;
  z-index: 2;
  overflow-y: auto;
  width: 100%;
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
.content_update {
  height: calc(100% - 195px - @top - @bottom);
}
.release {
  position: fixed;
  bottom: calc(75px + @bottom);
  right: 25px;
  z-index: 2;
  padding: 5px 7.5px;
  background: linear-gradient(0deg, rgba(255, 167, 13, 1), rgba(236, 51, 0, 1));
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  .air {
    width: 18px;
    height: 18px;
  }
  span {
    font-size: 12px;
    color: white;
    text-align: center;
  }
}
</style>


