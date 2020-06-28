<template>
    <div class="mypost container">
        <an-header title="我的发布">
            <span slot="right" class="rightTitle" @click="toRouter">发布</span>
        </an-header>
        <!-- <img src="@/assets/images/home/bg.png" alt="" class="bgi"> -->
        <van-pull-refresh  class="content"  v-model="refreshing" @refresh="onRefresh">
             <van-list
                    class="list"
                    v-model="loading"
                    ref="list"
                    :finished="finished"
                    finished-text=""
                    :immediate-check="false"
                    @load="onLoad"
            >
                <an-empty v-if="list.length == 0 && refreshing == false" :url="require('@/assets/images/home/pic_nodynamic.png')" title="暂无发布内容" />
                <an-recommend @getList="getIndex" :from="3" :id="'item'+index" ref="item" :item="item" v-for="(item,index) in list" :key="index"/>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import AnHeader from "../../../components/header/an-header";
    import {other} from "../../../api/modules/home";
    import {mapState} from 'vuex';
    import AnRecommend from "../components/an-recommend";
    import AnEmpty from "../components/an-empty";
    export default {
        name: "mypost",
        components: {AnEmpty, AnRecommend, AnHeader},
        data(){
            return {
                refreshing: false,
                loading:false,
                finished:false,
                page:1,
                limit:10,
                list:[],
            }
        },
        activated() {
            this.getIndex(true);
        },
        computed:{
            ...mapState({
                token:state =>state.user.token
            })
        },
        methods:{
            toRouter(){
                if (this.token == ''){
                    Toast('您还没登陆，请先登陆');
                    setTimeout(()=>{
                        this.$router.push('/login')
                    },1500)
                }else {
                    this.$router.push('/Upload')
                }
            },
            getIndex(clear=false){
                const {page,limit} = this
                other({page,limit}).then(res=>{
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
.mypost{
    .rightTitle{
        color: #F57008;
        font-size: 16px;
    }
    .bgi {
        z-index: 1;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .content{
        position: fixed;
        height: calc(100% - @top - 50px);
        left: 0;
        bottom: @bottom;
        /* padding-left: 15px; */
        box-sizing: border-box;
        overflow-y: auto;
        z-index: 2;
        width: 100%;
        .list{
            width: 100%;
        }
    }
}
</style>
