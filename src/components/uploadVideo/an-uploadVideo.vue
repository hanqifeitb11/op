<template>
    <div class="ContentUpload" @click="callClick">
        <div class="upload" @click="chooseImage"  v-if="url==''">
            <img src="@/assets/images/home/icon_add.png" alt="">
            <p>添加视频</p>
        </div>
        <div class="showImage"  @click="chooseImage" v-if="url!=''">
            <video :src="url"></video>
            <p>{{url}}</p>
        </div>
        <van-popup
                @close="close"
                class="photoList"
                v-model="show"
                round
                position="bottom"
        >
            <div class="tab" @click="photo">立即拍摄</div>
            <div class="tab" @click="toMedio">本地获取</div>
        </van-popup>
    </div>
</template>

<script>
    import {getVideo} from "../../util/common";

    export default {
        name: "an-uploader",
        data(){
            return {
                show:false,
            }
        },
        props:{
            url:{
                type:String,
                default:'',
            },
            Click:{
                type:Function,
                default:()=>{}
            },
            success:{
                type:Function,
                default:()=>{}
            },
            cancel:{
                type:Function,
                default:()=>{}
            },
            fail:{
                type:Function,
                default:()=>{}
            }
        },
        methods:{
            photo(){
                this.show = false;
                getVideo().then( url => {
                    console.log(url)
                    this.$emit('success',url);
                }).catch(err=>{
                    this.$emit('fail',err);
                })
            },
            toMedio(){
                this.show = false;
                getVideo().then( url => {
                    this.$emit('success',url);
                }).catch(err=>{
                    this.$emit('fail',err);
                })
            },
            close(){
                this.$emit('cancel');
            },
            chooseImage(){
                this.show = true;
            },
            callClick(){
                this.$emit('Click');
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/safeArea";
    .ContentUpload{
        .showImage{
            width:100px;
            height:100px;
            margin-left: 15px;
            margin-top: 15px;
            border-radius:10px;
            margin-bottom: 17px;
            overflow: hidden;
            video{
                width: 100%;
                height: 100%;
                background: red;
                border-radius:10px;
            }
        }
        .upload{
            width:100px;
            height:100px;
            background:rgba(244,244,244,1);
            border-radius:10px;
            padding-top: 15px;
            box-sizing: border-box;
            margin-left: 15px;
            margin-bottom: 17px;
            margin-top: 15px;
            img{
                width:50px;
                height:50px;
                margin-bottom: 12px;
                margin-left: 25px;
            }
            p{
                color: #999999;
                font-size: 12px;
                text-align: center;
            }

        }
        .photoList{
            height: calc(150px + @bottom);
            padding-top: 30px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
            .tab{
                font-size: 16px;
                color: black;
                text-align: center;
                flex:1;
                line-height: 100%;
            }

        }
    }

</style>
