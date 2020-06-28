<template>
    <div class="userPanel">
        <div class="userInfo">
            <div class="avatar"><img src="" alt=""></div>
            <div class="message">
                <p>用户昵称<van-icon name="arrow" /></p>
                <p>1000368</p>
            </div>
        </div>
        <div class="category">
            <div class="cate" :key="index" v-for="(item,index) in list">
                <span class="num">{{item.num | getNum}}</span>
                <span class="tit">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserPanel",
        filters:{
            getNum(num){
                const currentNumber = Number(num / 10000);
                if (currentNumber > 1){
                    return `${currentNumber}w`;
                }
                return num;
            }
        },
        data(){
            return {
                list:[
                    {
                        name:"作品",
                        num:14,
                    },
                    {
                        name:"关注",
                        num:65,
                    },
                    {
                        name:"粉丝",
                        num:3698,
                    },
                    {
                        name:"获赞",
                        num:23000,
                    },
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/safeArea";
    @import "../../../assets/font";
    .userPanel{
        height: calc(@top + 200px);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        margin-bottom: 10px;
        .userInfo{
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            margin-top: 37px;
            .avatar{
                width:50px;
                height:50px;
                border-radius:50%;
                overflow: hidden;
                background: @test;
                margin-right: 15px;
                margin-left: 24px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .message{
                margin-top: 2.5px;
                p:nth-of-type(1){
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    font-size: @font16;
                    margin-bottom: 7px;
                }
                p:nth-of-type(2){
                    font-size: @font14;
                    color: @idColor;
                }
            }
        }
        .category{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:0 50px;
            box-sizing: border-box;
            width: 100%;
            margin-top: 52px;
            .cate{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
    }
</style>
