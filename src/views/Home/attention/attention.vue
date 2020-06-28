<template>
    <van-pull-refresh  class="content homeContent"  v-model="refreshing" @refresh="onRefresh">
        <van-list
                class="list"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :immediate-check="false"
                @load="onLoad"
        >
            <an-recommend @getList="getWatchList"   :from="1" v-show=" token != ''" :item="item" v-for="(item,index) in watchList" :key="index"/>
            <!-- <an-empty v-if="watchList.length==0" title="暂无关注人动态" :url="require('@/assets/images/home/icon_empty.png')" /> -->
            <an-empty v-if="token ==''" :url="require('@/assets/images/home/pic_noloading.png')" title="">
                <!-- <div slot="description">
                    <p>你还没有登录</p>
                    <p>登录后，即可查看你关注的精彩内容~</p>
                </div> -->
            </an-empty>
            <!-- <div v-if="token ==''" class="loginBtn" @click="$router.push({path:'/login'})">
                登录
            </div> -->

        </van-list>
    </van-pull-refresh>
</template>

<script>
    import {mapState} from 'vuex';
    import AnEmpty from "../components/an-empty";
    import {index} from "../../../api/modules/home";
    import AnRecommend from "../components/an-recommend";

    export default {
        props:['from',],
		name: "attention",
		components: {AnRecommend, AnEmpty},
		data(){
			return {
				refreshing: false,
				loading:false,
				finished:false,
				page:1,
				limit:10,
				watchList:[],
            }
        },
        computed:{
			...mapState({
                token:state =>state.user.token
            })
        },

        mounted() {
			this.getWatchList();
        },
	    methods:{
            ToRouter(){
            //   alert('---')  
            },
	        getWatchList(clear = false){
		        const {page,limit,} = this
		        index({page,limit,is_watch:1}).then(res=>{
			        this.loading = false;
			        this.refreshing = false;
			        if (res.length == 0){
				        this.finished = true;
                    }
			        if (clear){
				        this.watchList = [];
			        }
                    this.watchList = [...this.watchList,...res];
		        })
	        },
	        onLoad() {
		        if (this.refreshing) {
			        this.refreshing = false;
		        }
		        this.page ++;
		        this.getWatchList();

	        },
	        onRefresh() {
		        // 清空列表数据
		        this.finished = false;
		        // 重新加载数据
		        // 将 loading 设置为 true，表示处于加载状态
		        this.loading = true;
		        this.page = 1;
		        this.getWatchList(true);
	        },
        }
	}
</script>

<style lang="less" scoped>
    @import "../../../assets/safeArea";
    @import "../../../assets/font";
    .content{
        position: fixed;
        box-sizing: border-box;
        z-index: 2;
        overflow-y: auto;
        width: 100%;
        height: calc(100% - 50px - @top - @bottom);
        bottom: 0;
        left:0;
        .list{
            padding-bottom:@bottom;
            .loginBtn{
                width:140px;
                height:40px;
                background:linear-gradient(90deg,rgba(255,167,13,1),rgba(236,51,0,1));
                border-radius:5px;
                text-align: center;
                line-height: 40px;
                color: white;
                font-size: @font18;
                margin:0 auto;
            }
        }
    }
</style>
