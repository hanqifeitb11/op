<template>
  <div class="videoCache">
    <Anheader title="我的下载" :rightText="getStr()" :rightEvent="isEdit?cancel:edit"></Anheader>
    <div class="main">
      <van-checkbox-group
        icon-size="16px"
        v-model="selectList"
        checked-color="#71D9B9"
        ref="videoList"
      >
        <van-checkbox
          class="videoInfo"
          v-for="(item,index) in videoList"
          :key="index"
          :name="item[3]"
        >
          <span class="left"
                @click="playVideo(item)"
          >
          <!-- [名字,副标题,封面,下载地址,总大小，100%，缓存地址] -->
            <img class="poster" :src="item[2]" alt />
            <img class="playIcon" src="@/assets/images/home/icon_play.png" alt="">
          </span>
          <span class="right"
                @click="playVideo(item)"
          > 
            <div class="txtDesc line1hidden">{{item[0]}}</div>
            <Progress :percentage="item[5]" stroke-width="3" :show-pivot=false class="progress"></Progress>
            <div class="videoname">{{item[5]}}%</div>
          </span>
        </van-checkbox>
      </van-checkbox-group>
    </div>

    <van-popup v-model="isEdit" position="bottom" :overlay="false">
      <div class="editBtn">
        <div @click="checkAll" class="lBtn" v-if="isChooseAll===false">全选</div>
        <div @click="checkAllCancle" class="lBtn" v-if="isChooseAll===true">取消全选</div>
        <div @click="deleteVideo" class="rBtn">删除({{selectList.length}})</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Anheader from "../../components/header/an-header.vue";
import { Checkbox, CheckboxGroup, Popup ,Progress,Toast} from "vant";
import $ from "jquery";
import {mapState} from 'vuex';
export default {
  name: "videoCache",
  data() {
    return {
      timer:null,

      isEdit: false,
      selectList: [],
      isChooseAll: false,
      videoList:[],
    };

  },

  components: { Anheader, Checkbox, CheckboxGroup, Popup,Progress},
  activated() {
    this.isEdit = false;
    this.videoList.length = 0;
    $(".van-checkbox__icon--round").css("display", "none");
    this.selectList = [];
    this.getList();
  },
  beforeRouteLeave(to,from,next) {
    clearInterval(this.timer);
    this.timer = null;
    next();
  },
  computed:{

  },
  mounted() {},
  methods: {

    getList() {
      var _this = this;
      if(this.isEdit)
       return;
      this.videoList = [];

      // this.videoList=[['发动机声卡丽枫酒店萨克雷锋就打开了房间的范德萨范德萨范德萨',1,'http://tv.yoweidao.com/image_short/bbda8256010158bbda4eb397b78f72e0/900k/9b528a0eecaf7c00f76f213068c7bf2f.jpg',1,1,1]];
      if (typeof cordova !== "undefined") {
        console.log("getAllLoadStatus");
          cordova.exec(
            this.loadCallBack,
            err => {},
            "IOSPlugin",
            "getAllLoadStatus",
            []
          );
      }
    },


      loadCallBack(res){
        var arr = [];
        this.videoList = res;
        console.log('缓存地址集合=========' + res);
        if(res.length && !this.timer)
        {
          this.timer = setInterval(this.getList, 1000);
        }
    },
    getStr(){
      if (!this.videoList.length){
        return '';
      }
      return this.isEdit?'取消':'编辑';
    },
    edit() {
      if (!this.videoList.length){
        return;
      }
      this.isEdit = true;
      $(".van-checkbox__icon--round").css("display", "block");
      this.selectList = [];
      this.isChooseAll = false;
    },
    cancel() {
      this.isEdit = false;
      $(".van-checkbox__icon--round").css("display", "none");
    },
    playVideo(item) {
      if(this.isEdit)return;
      if(item.length > 6)
      {
        this.$router.push({path:'video_plug',query:{data:item[6]}})
        return;
      }
      Toast('还没下载完成，请耐心等待');
    },
    checkAll() {
      this.selectList = [];
      this.videoList.forEach(r=>{
        this.selectList.push(r[3])
      })
      this.isChooseAll = true;
    },
    checkAllCancle() {
      this.selectList = [];
      this.isChooseAll = false;
    },
    deleteVideo() {
      this.selectList.forEach(r=>{
        for (let i in this.videoList){
          if (this.videoList[i][3] == r) {

            var item = this.videoList[i];
            if (item.length >0){
                this.removeFile(item)
            }
          }

        }
      })
      this.isEdit = false;
      this.selectList = [];
       $(".van-checkbox__icon--round").css("display", "none");
  
    },
    //删除文件
    removeFile(item) {
      var _this = this;
      if (typeof cordova !== "undefined") {

          cordova.exec(
            res => {
            },
            error => {},
            "IOSPlugin",
            "deleteCache",
            [item[3]]
          );

          Toast("删除成功");
          _this.getList();

      }
    }
  }
};
</script>


<style lang="less" scoped>
@import "../../assets/safeArea.less";
/deep/ .van-progress__portion{
    background:#6DDAB8;
  }

 /deep/ .van-progress{
    width: 151px;
    display: inline-block;
    color: #2F2729 !important;
    background:#D3D3D3;
    margin-top: 30px;
  }


/deep/ .van-checkbox-group {
  .van-checkbox {
    width: 100%;
    height: 170px;
  }

  .van-checkbox__icon--round {
    padding-right: 24px;
    display: none;
  }

  .van-checkbox__label {
    width: 100%;
  }
}

.videoCache {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:rgba(255,255,255,1);
  position: relative;
  .main {
    width: calc(100% - 48px);
    height: 100%;
    padding: 0px 24px;
    padding-bottom: 150px;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-top: calc(@top + 46px);
    position: relative;
    border-top: #F5F6F6;
    p {
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 50px;
      color: rgba(0, 0, 0, 1);
    }

    .videoInfo {
      width:328px;
      height:110px;
      background:rgba(245,246,246,1);
      border-radius:11px;
      margin-top: 14px;

    /deep/ .van-checkbox__label{
      display: inline-flex;
  
      .left {
            width:133px;
            .poster {
              width:133px;
              height:84px;
              border-radius: 10px;
              object-fit: cover;
            }
            .playIcon{
              position: absolute;
              width: 30px;
              margin-left: 50px;
              margin-top: -55px;
            }
          }

          .right {
            margin-left: 15px;
            width: calc(100% - 150px);
            height:84px;

            .videoname{
              font-size:12px;
              font-family:PingFang SC;
              font-weight:400;
            }
          }
    }
          
    }
  }

          .txtDesc{
              // width: 10px !important;
              width: 140px;
              // padding-right: 120px;
              margin-top: 10px;
              font-size: 14px;
          }

  .editBtn {
    width: 80%;
    height: 100px;
    display: flex;
    margin-left: 10%;
    justify-content: space-between;
    .lBtn {
      width: 130px;
      height: 43px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 36px;
      font-family: PingFang SC;
      color:rgba(255,255,255,1);
      background:rgba(148,190,50,1);
      border-radius:12px;
    }

    .rBtn {
      width: 130px;
      height: 43px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 36px;
      font-family: PingFang SC;
      color:rgba(255,255,255,1);
      background:rgba(255,110,110,1);
      box-shadow:0px 3px 6px rgba(0,0,0,0.16);
      border-radius:12px;
    }
  }
}
</style>
