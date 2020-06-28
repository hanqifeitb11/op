<template>
    <div class="applications">
        <p class="title">常用功能</p>
        <div class="list">
            <div class="one" :key='index' v-for="(item,index) in applications">
                <img :src="item.icon"  class="icon">
                <span class="name">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "applications",
        data(){
            return {
                applications:[],
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/font.less";
    .applications{
        width:355px;
        height:190px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        padding-top: 13px;
        margin:0 auto;
        .title{
            margin-left: 10px;
            font-size: @font17;
        }
        .list{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            .one{
                flex-shrink: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                .icon{
                    width: 20px;
                    height: 20px;
                    margin-bottom: 11px;
                }
                .name{
                    color: @mineFontColor333;
                }
            }
        }

    }
</style>
