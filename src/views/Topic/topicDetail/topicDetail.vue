<template>
    <div class="topicDetail container">
        <an-header title="Ya组详情">
            <img @click="toRouter" slot="right" src="@/assets/images/home/icon_home_search.png" alt="" class="rightIcon">
        </an-header>
      <div>
        <van-pull-refresh  class="Detail"  v-model="refreshing" @refresh="onRefresh">
            <van-list
                    class="list"
                    v-model="loading"
                    ref="list"
                    :finished="finished"
                    finished-text="没有更多了"
                    :immediate-check="false"
                    @load="onLoad"
            >
                <div class="background">
                    <div class="head">
                        <div class="photo">
                            <img :src="obj.icon" alt="">
                            <div :class="obj.type==1?'is_status':'status'" @click="is_watch">{{obj.type==1?'已关注':'关注'}}</div>
                        </div>
                        <p class="tit">{{obj.title}}</p>
                    </div>
                    <div class="content">
                        {{obj.desc}}
                    </div>
                </div>
                <an-recommend :from="1" :id="'item'+index" ref="item" :item="item" v-for="(item,index) in list" :key="index"/>
            </van-list>
        </van-pull-refresh>
      </div>
    </div>
</template>

<script>
    import AnHeader from "../../../components/header/an-header";
    import AnRecommend from "../../Home/components/an-recommend";
    import {index,subjectDetail,subjectDel,delSubject} from "../../../api/modules/home";

    export default {
        name: "topicDetail",
        components: {AnRecommend, AnHeader},
        data(){
            return {
                subject_id:-1,
                refreshing: false,
                loading:false,
                finished:false,
                page:1,
                list:[],
                limit:10,
                obj:{}
            }
        },
        mounted() {
            this.subject_id = this.$route.query.id;
            this.getIndex();
            subjectDetail({id:this.subject_id}).then(res=>{
                this.obj = res;
                console.log(this.obj)
            })
        },
        methods:{
            is_watch(){
                if(this.obj.type==1){
                    delSubject({
                        id:this.subject_id
                    }).then(res=>{
                        this.obj['type']=0;
                    })
                }else{
  subjectDel({
                    subject_id:this.subject_id,
                    type:1
                }).then(res=>{
                    console.log(res)
                    this.obj['type']=1;
                })
                }
              
            },
            toRouter(){
                this.$router.push('/search')
            },
            getIndex(clear=false){
                const {page,limit,subject_id} = this
                index({page,limit,subject_id}).then(res=>{
                    this.loading = false;
                    this.refreshing = false;
                    if (res.length == 0){
                        this.finished = true;
                    }
                    if (clear){
                        this.list = [];
                    }
                    this.list = [...this.list,...res];
                })
            },
            onLoad() {
                if (this.refreshing) {
                    this.refreshing = false;
                }
                this.page ++;
                this.getIndex();

            },
            onRefresh() {
                // 清空列表数据
                this.finished = false;
                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.page = 1;
                this.getIndex(true);

            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/safeArea";
.topicDetail{
    background: #FFFFFF;
    .Detail{
        position: fixed;
        box-sizing: border-box;
        z-index: 2;
        overflow-y: auto;
        width: 100%;
        height: calc(100% - 50px - @top - @bottom);
        bottom: @bottom;
        left:0;
    }
    .header{
        background: transparent;
        .rightIcon{
            width: 18px;
        }
        font-size: 18px;
        font-weight: 100;
    }
    .background{
        width: 100%;
        height: auto;
        min-height: 190px;
        background-size: cover;
        background-repeat: no-repeat;
        // background-image: url("../../../assets/images/home/bg_con.png");
        background-position-y: -50px;
        box-sizing: border-box;
        .head{
            display: flex;
            align-items: center;
            .photo{
                width:99px;
                height:100px;
                position: relative;
                margin-left: 15px;
                margin-right: 24px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius:10px;
                }
                .status{
                    width:55px;
                    height:21px;
                    background:#F57008;
                    color: #FFFFFF;
                    border-radius:11px;
                    text-align: center;
                    line-height: 21px;
                    position: absolute;
                    left: 23px;
                    bottom: -10px;
                }
                .is_status{
                    width:55px;
                    height:21px;
                    background:#BBBBBB;
                    color: #FFFFFF;
                    border-radius:11px;
                    text-align: center;
                    line-height: 21px;
                    position: absolute;
                    left: 23px;
                    bottom: -10px;
                }
            }
            .tit{
                color: #333333;
                font-size: 16px;
            }
        }
        .content{
            width:328px;
            margin:25px auto 0 auto;
            color: #FFFFFF;
            font-size: 12px;
        }

    }
}
</style>
