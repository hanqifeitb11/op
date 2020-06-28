<template>
  <div class="user" @click="toRouterOtherUser(item)">
    <!-- <div class="title" >推荐用户</div> -->
    <div class="userItem">
      <img :src="item.avatar" alt  v-if="item.avatar"/>
      <!-- <img src="@/assets/images/home/icon_head.png" alt="" srcset="" v-else> -->
      <div class="right_icon">
        <div class="nickname">{{item.nickname}}</div>
        <div class="sing">{{item.sign}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods:{
          toRouterOtherUser(item) {
      console.log(item);
      this.$router.push({
        path: "/OthersUserInfo",
        query: {
          id: item.userId
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
.user {
  // margin-top: 50px;
  padding-left: 15px;
  box-sizing: border-box;
  .title{
      color: #2395FFFF;
      font-size:18px;
font-family:Source Han Sans CN;
margin: 20px 0px;
font-weight:400;
color:rgba(35,149,255,1);
  }
}
img {
  width: 39px;
  height: 39px;
  border-radius: 50%;
}
.userItem {
  display: flex;
  //   margin-left: 15px;
  align-items: center;
  margin-bottom: 30px;
}
.right_icon {
  margin-left: 10px;
  .nickname {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .sing {
    font-size: 15px;
     overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分文字以...显示*/
            width: 300px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
}
</style>