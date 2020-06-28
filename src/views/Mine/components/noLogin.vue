<template>
    <div class="bgiTop">
        <div class="loginContainer">
            <div class="black"></div>
            <div class="loginContent">
                登录
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "noLogin"
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/safeArea";
    @import "../../../assets/font";
    .bgiTop{
        height: calc(@top + 199px);
        padding-top: 30px;
        margin-bottom: 10px;
        .loginContainer{
            width:108px;
            height:108px;
            position: relative;
            margin:0 auto;
            padding-top: 9px;
            box-sizing: border-box;
            margin-bottom: 43px;
            .black{
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                background:linear-gradient(0deg,rgba(142,30,179,1),rgba(223,125,255,1));
                border-radius:50%;
                opacity:0.16;
            }
            .loginContent{
                position: relative;
                margin:0 auto;
                width:90px;
                height:90px;
                background:linear-gradient(0deg,rgba(142,30,179,1),rgba(223,125,255,1));
                border-radius:50%;
                font-size: @font18;
                text-align: center;
                line-height: 90px;
                color: @white;
            }
        }
    }
</style>
