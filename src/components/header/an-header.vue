<template>
    <van-nav-bar
            :title="title"
            :left-text="leftText"
            :right-text="rightText"
            :left-arrow="leftArrow"
            class="header"
            :border="false"
            @click-left="back"
            @click-right="rightEvent"
    >
    <slot slot="left"></slot>
        <slot slot='title' name="title"></slot>
        <van-icon size="16" name="arrow-left" />
        <slot slot='right' name="right"></slot>
    </van-nav-bar>
</template>

<script>

    export default {
        name: "an-header",
        props:{
            title:{
                type:String,
                default:''
            },
            rightEvent:{
                type:Function,
                default:()=>{}
            },
            leftText:{
                type:String,
                default:''
            },
            rightText:{
                type:String,
                default:''
            },
            rightIcon:{
                type:Boolean,
                default:false
            },
            styles:{
                type:Object,
            },
            leftArrow:{
                type:Boolean,
                default:true
            }
        },
        computed:{
        },
        mounted() {

        },
        methods:{
            back(){
                this.$router.back()
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/safeArea";
    .header{
        position: fixed;
        top: @top;
        left: 0;
        width: 100%;
        z-index: 999;
        // background: black;
        color:#000000;
        background:#ffffff;
    }
    /deep/ .van-nav-bar__title{
        color: #000000;
    }
    .box{
        width:35px;
        height:35px;
        background:rgba(255,255,255,1);
        box-shadow:1px 1px 3px rgba(0,0,0,0.16);
        border-radius:50%;
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
    }
    /deep/ .van-icon-arrow-left::before{
        color: #01AEB7FF;
    }
</style>
