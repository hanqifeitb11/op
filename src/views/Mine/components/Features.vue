<template>
    <div class="Features">
        <van-cell title="关系列表" is-link icon="shop-o" @click="getClick">
        </van-cell>
        <van-cell title="系统设置" is-link icon="shop-o">
        </van-cell>
        <van-cell title="用户反馈" is-link icon="shop-o">
        </van-cell>
    </div>
</template>

<script>
    export default {
        name: "Features",
        methods: {
            getClick(){
                // if(index==2){
this.$router.push({path:'/Tb_Video_detail'})
                // } 
            },
    
        },
    }
</script>

<style scoped>

</style>
