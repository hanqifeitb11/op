<template>
    <div class="userItem">
        <div class="lft" @click="toHome">
            <img v-if="item.avatar" :src="item.avatar" alt="" class="avator_img">
            <!-- <img v-else src="@/assets/images/mine/icon_head.png" alt="" class="avator_img"> -->
            <div class="name">{{item.nickname}}</div>
        </div>
        <div v-if="!type">
            <div v-if="item.is_watch==0" class="btn" @click="toWatch">关注</div>
            <div v-else class="btn2" @click="toWatch">已关注</div>
        </div>
        <div v-if="type">
            <div v-if="item.status==1" class="btn" @click="tolahei">取消屏蔽</div>
            <div v-else class="btn2" @click="tolahei">屏蔽Ta</div>
        </div>
    </div>
</template>
<script>
import {changeCare} from "../../../api/modules/home";
import {dislikeSomeone,cancelLahei} from "../../../api/modules/mine";
import {mapState} from 'vuex'

export default {
    name: "userItem",
    props:['item','type'],
    data(){
        return {

        }
    },
    computed:{

    },
    methods:{
        toWatch(){
            let target = this.item.is_watch==1?0:1
            changeCare(this.item.id, target).then(res => {
                this.item.is_watch = target;
            })
        },
	    tolahei(){
		    let status = this.item.status;
		    if (status == 1){
			    cancelLahei({blackUserId:this.item.user_block_id}).then(res => {
				    this.item.status = 0;
			    })
            }else {
			    dislikeSomeone({block_user_id:this.item.user_block_id}).then(res => {
				    this.item.status = 1;
			    })
            }

        },
        toHome(){
            this.$router.push({
                    path: "/OthersUserInfo", query: {
                        id: this.item.id
                    }
                })
        }
    }
}
</script>
<style lang="less" scoped>
    .userItem{
        margin-left: 15px;
        margin-right: 15px;
        width: calc(100% - 30px);
        box-sizing: border-box;
        height: 90px;
        line-height: 90px;
        padding-left: 15px;
        padding-right: 15px;
        box-shadow:0px 4px 10px 0px rgba(0,0,1,0.3);
        border-radius:10px;
        margin-bottom: 10px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;


        .lft{
            display: flex;
            flex-direction: row;
            align-items: center;
            span{
                margin-left: 15px;
            }
        }

        .btn{
            width: 60px;
            height: 24px;
            line-height: 24px;
            border-radius: 5px;
            border: 1px solid #F57008;
            font-size: 12px;
            color: #F57008;
            text-align: center;
        }

        .btn2{
            width: 60px;
            height: 24px;
            line-height: 24px;
            border-radius: 5px;
            border: 1px solid #DDDDDD;
            font-size: 12px;
            color: #DDDDDD;
            text-align: center;
        }

        .avator_img{
            width:35px;
            height: 35px;
            border-radius: 50%;
        }
        .name{
            margin-left: 15px;
        }
    }
</style>
