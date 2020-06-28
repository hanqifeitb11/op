<template>
    <div class="pushedSuccess container">
        <an-header title="" >
            <span slot="right" class="rightTitle" @click="toRouter">我的发布</span>
        </an-header>
        <div class="main">
            <div class="successfulIcon">
                <!-- <img src="@/assets/images/home/pic_publishsuccess.png" alt=""> -->
            </div>
            <p class="tit">发布成功！</p>
            <p class="message">发布的内容在通过官方审核后
                才会被看到哦，请耐心等待~</p>
        </div>
    </div>
</template>

<script>
    import AnHeader from "../../../components/header/an-header";
    export default {
        name: "success",
        components: {AnHeader},
        methods:{
            toRouter(){
                this.$router.push('/mypost')
            }
        }
    }
</script>

<style lang="less" scoped>
.pushedSuccess{
    .rightTitle{
        color: #F57008;
        font-size: 16px;
    }
    .main{
        padding-top: 50px;
        .successfulIcon{
            width:197px;
            height:150px;
            margin:116px auto 38px auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .tit{
            color: #00B94E;
            font-size: 18px;
            text-align: center;
            margin-bottom: 15px;
        }
        .message{
            width:233px;
            margin: 0 auto;
            font-size:15px;
            color: #999999;
        }
    }
}
</style>
