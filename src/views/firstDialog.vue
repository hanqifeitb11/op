<template>
  <div class="container firstDialog">
   
  </div>
</template>
<script>
import { GetCode, Login } from "../api/modules/mine.js";
import { mapActions, mapMutations, mapState } from "vuex";
import { Toast } from "vant";
export default {
    name:"firstDialog",
  components: {
    Toast
  },
  created() {
    // ...
    let token = localStorage.getItem('token');
    this.changeData({ key: "token", val: token });
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (token) {
        this.getUserInfo({id:userInfo.id}).then(res=>{
          this.$router.push({
              path:'/home'
            })
        })
    }
    else{
        this.$router.push({
              path:'/login'
        })
    }
  },

  computed: {

  },
  mounted() {},
  data() {
    return {

    };
  },
  watch: {
  },
  methods: {
    ...mapMutations({
      changeData: "user/changeData",
      changeDevice: "changeData"
    }),
      ...mapActions({
      getUserInfo: "user/getUserInfo"
    }),
  }
};
</script>
<style scoped lang="less">

</style>
