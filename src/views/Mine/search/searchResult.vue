<template>
    <div class="container search">
        <div class="header_search">
            <van-icon name="arrow-left"  @click="Toback"/>
            <div class="search_inoput">
                <input type="text" name="" :placeholder="placeholder" v-model="searchKey" maxlength="25">
                <span class="icon_search">
                    <van-icon name="search" /></span>
            </div>
            <span class="right_search" @click="doSearch">搜索</span>
        </div>

        <div class="links">
            <ul>
                <li><span :class="type==1?'selected':'normal'" @click="toSearch(1)">作品</span></li>
                <li><span :class="type==2?'selected':'normal'" @click="toSearch(2)">Ya组</span></li>
                <li><span :class="type==3?'selected':'normal'" @click="toSearch(3)">用户</span></li>
            </ul>
        </div>

        <div v-if="type==1" class="content">
            <an-recommend :from="1" :id="'item'+index" ref="item" :item="item" v-for="(item,index) in list" :key="index
            "/>
        </div>

        <div v-if="type==2" class="content">
            <an-topic v-for="(item,index) in subjectList" :item="item" :key="index" />
        </div>
        <div v-if="type==3" class="content">
            <uitem v-for="(item,index) in userList" :item="item" :key="index"></uitem>
        </div>
    </div>
</template>
<script>
    import { Search,Popup } from 'vant';
    import { Field } from 'vant';
    import { find } from "@/api/modules/search";
    import AnRecommend from "@/views/Home/components/an-recommend";
    import AnTopic from "@/views/Home/components/an-topic";
    import uitem from "./userItem"
    export default {
        name: "search",
        components: {
            AnRecommend,
            AnTopic,
            Search,
            Field,
            Popup,
            uitem
        },
        activated(){
            if(this.searchKey != this.$route.query.searchKey){
                this.searchKey = this.$route.query.searchKey;
                this.doSearch();
            }
        },
        methods: {
            Toback(){
                this.$router.go(-1)
            },
            toSearch(type){
                this.type = type;
                this.doSearch();
            },
            /**
             * content	搜索内容	是	搜索内容
                type	搜索内心	否	默认 空返回全部 1-作品搜索 2-Ya组搜索 3-用户搜索
             */
            doSearch(){
                if(this.searchKey.length>0){
                    find({
                        type:this.type,
                        content:this.searchKey
                    }).then(res=>{
                        console.log("xxx-------------->>",res)
                        if(this.type == 1){
                            res.topicList || (res.topicList=[])
                            this.list = [...res.topicList]
                        }else if(this.type == 2){
                            res.subjectList || (res.subjectList=[])
                            this.subjectList = [...res.subjectList]
                        }else if(this.type == 3){
                            res.userList || (res.userList=[])
                            this.userList = [...res.userList]
                        }
                    })
                }
            }
        },
        data() {
            return {
                searchKey:'',
                placeholder:'',
                type:1,
                list:[],//文章列表
                subjectList:[],
                userList:[]
            }
        },
    }
</script>
<style lang="less" scoped>
    @import "../../../assets/safeArea";
    .search {
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding-top: @top;
        .header_search {
            position: fixed;
            top: @top;
            left: 0px;
            bottom: 0;
            right: 0;
            z-index: 12;

            padding: 0px 15px;
            width: 100%;
            height: 46px;
            /* background-color: #ffffff; */
            box-sizing: border-box;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .search_inoput {
                width: 90%;
                position: relative;
            }
            input {
                /* border: 1px solid red; */
                background: rgba(238, 238, 238, 1);

                font-size: 15px;
                width: 100%;
                height: 34px;
                border-radius: 10px;
                position: relative;
                text-indent: 3em;
            }
            .icon_search {
                position: absolute;
                /* position: absolute; */
                left: 5%;
                top: 23%;
                font-size: 16px;

                /deep/ .van-icon {
                    font-size: 20px;
                    margin-right: 18px;
                }
            }
            /deep/ .van-icon {
                font-size: 16px;
                margin-right: 18px;
            }
            .right_search {
                /* width: 20px; */
                display: inline-block;
                width: 1.5rem;
                font-size: 16px;
                color: #666666;
                text-align: center;
                display: inline-block;
                margin-left: 13px;
            }
        }



        .links{
            margin-top:50px;
            display: flex;
            padding-bottom: 16px;
            flex-direction: row;
            justify-content: center;
            ul{
                width: 75%;
                display: flex;
                flex-direction: row;
                align-items: center;
                li{
                    width: 33.3%;
                    text-align: center;
                    font-size: 16px;
                    span{
                        padding-bottom: 10px;
                    }
                }
            }
            .selected{
                border-bottom: 2px solid #FFA70D;
                color: #FFA70D;
            }
            .normal{
                border-bottom: none;
                color: #000000;
            }
        }

        .content{
            overflow: scroll;
            height: calc(100% - 80px);
        }
    }
</style>
