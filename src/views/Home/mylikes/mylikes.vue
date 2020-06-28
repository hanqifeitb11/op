<template>
    <div class="mylikes container">
        <an-header >
            <van-tabs title-inactive-color="#333333" color="#FFA70D" title-active-color="#FFA70D"	 swipeable :border="false" background="transparent" slot="title" v-model="active">
                <van-tab title-style="font-size:18px" title="我关注的Ya组" />
                <van-tab title-style="font-size:18px" title="我点赞的内容" />
            </van-tabs>
        </an-header>
        <!-- <img src="@/assets/images/home/bg.png" alt="" class="bgi"> -->
        <van-pull-refresh  class="content"  v-model="refreshing" @refresh="onRefresh">
            <van-list
                    class="list"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    :immediate-check="false"
                    @load="onLoad"
            >
                <an-topic v-show="active == 0" v-for="(item,index) in subList" :item="item" :key="index" />
                <an-recommend v-show="active == 1" v-for="(item,index) in list" :item="item" :key="`${item.id}${index}answer`" />
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import AnHeader from "../../../components/header/an-header";
    import {subjectList,saveList} from "../../../api/modules/home";
    import AnTopic from "../components/an-topic";
    import AnRecommend from "../components/an-recommend";
    export default {
        name: "mylikes",
        components: {AnRecommend, AnTopic, AnHeader},
        data(){
            return {
                active:'',
                refreshing: false,
                loading:false,
                finished:false,
                page:1,
                limit:10,
                subList:[],
                list:[],
                obj:{
                    page:1,
                    limit:10,
                },
                owr:{
                    page:1,
                    limit:10,
                }
            }
        },

        watch:{
            active(val){
                    this.refreshing = false
                    this.loading = false
                    this.finished = false

                    if (val == 0 && this.subList == 0){
                        this.getTalk();
                    }
                   if (val == 1 && this.list == 0){
                       this.getIndex();
                   }
            }
        },
        methods:{
            getIndex(clear=false){
                const {page,limit} = this.obj;
                saveList({page,limit}).then(res=>{
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
            getTalk(clear = false){
                const {page,limit} = this.owr;
                subjectList({page,limit,type:1}).then(res=>{
                    this.loading = false;
                    this.refreshing = false;
                    if (res.length == 0){
                        this.finished = true;
                    }
                    res.forEach(r=>{
                        r.showBoth = false;
                    })
                    if (clear){
                        this.subList = [];
                    }
                    this.subList = [...this.subList,...res];

                })
            },
            getList(clear){
                const {active} = this;
                switch (active) {
                    case 0:
                        this.getTalk(clear);
                        break;
                    case 1:
                        this.getIndex(clear);
                        break;
                    default:
                        break;
                }
            },
            onLoad() {
                if (this.refreshing) {
                    this.refreshing = false;
                }
                switch (this.active) {
                    case 0:
                        this.owr.page ++;
                        break;
                    case 1:
                        this.obj.page ++;
                        break;
                     default:
                         break;
                }
                this.getList();

            },
            onRefresh() {
                // 清空列表数据
                this.finished = false;
                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                // this.loading = true;
                switch (this.active) {
                    case 0:
                        this.owr.page = 1;
                        break;
                    case 1:
                        this.obj.page = 1;
                        break;
                    default:
                        break;
                }
                this.getList(true);
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/safeArea";
.mylikes{
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
        height: calc(100% - @top - 70px);
        left: 0;
        bottom:0;
        box-sizing: border-box;
        overflow-y: auto;
        z-index: 2;
        width: 100%;
    }
}
</style>
