<template>
    <div class="container upload">
        <an-header title="发趣事">
            <div slot="right" :style="{color:content!='' && currentSubject.title && imagesList[0].url ? '#F57008':'#999999' }" class="send_title" @click="create">发布</div>

        </an-header>
        <div class="main"
             :style="{'background': 'url('+bg_url+')',backgroundSize:'cover',backgroundRepeat:'no-repeat'}">
            <div class="top" v-show="false">
                <div :class="isSelect==1?'isAction':'isSend'" @click="changeType(1)">图片</div>
            </div>
            <div class="content">
                <Field v-model="content" label="留言" type="textarea" maxlength="300" show-word-limit
                       placeholder="请输入留言" />
            </div>
            <div class="tag" @click="toRouter('chooseTopic')">
                {{currentSubject.title?currentSubject.title:'#添加Ya组,可以被更多人看到哦~  >'}}
            </div>
            <div class='list'>
                <an-uploader  :key="index" v-for="(item,index) in imagesList" @Click="saveIndex(index)"  :url="item.url" @success="getImage" />
            </div>
        </div>
    </div>
</template>
<script>
    import { Field, Toast } from 'vant'
    import { Dialog } from 'vant';
    import An_head from '../../../components/header/an-header'
    import AnUploader from "../../../components/uploader/an-uploader";
    import {upload,photoPush} from "../../../api/modules/home";
    import AnHeader from "../../../components/header/an-header";
    import AnuploadVideo from '../../../components/uploadVideo/an-uploadVideo'
    import {mapState} from 'vuex';
    import {mapMutations} from 'vuex';
    export default {
        name: "uplaod",
        components: {
            AnHeader,
            AnUploader,
            An_head,
            Field,
            Dialog,
            AnuploadVideo
        },
        computed:{
            ...mapState({
                token:state =>state.user.token,
                currentSubject: state=> state.home.currentSubject
            })
        },
        data() {
            return {
                // bg_url: require('../../../assets/images/home/bg.png'),
                isSelect: 1,
                content:'',
                imagesList:[{status:0,url:''}],// 图片列表
                currentImageIndex:0,// 当前选中的图片下标
                videoUrl:'',
            }
        },
        beforeDestroy() {
            this.changeData({key:'currentSubject',val:{}})
        },
        methods: {
            ...mapMutations({
                changeData:'home/changeData',
            }),
            create(){
                const {content,imagesList} = this;
                const {id} = this.currentSubject;
                photoPush({content,subject_id:id,imagesList}).then(res=>{
                    this.$router.push('/pushedSuccess')
                })
            },

            changeType(i){
                // this.isSelect = i;
            },
            toRouter(path){
                if (this.token == ''){
                    Toast('您还没有登陆，请先登陆');
                    setTimeout(()=>{
                        this.$router.push({
                            path:'/login'
                        })
                    },1500)
                }else {
                    this.$router.push({path});
                }

            },
            getImage(imgUrl){
                upload(imgUrl,{name:this.currentImageIndex}).then(res=>{
                    this.imagesList[this.currentImageIndex] = res;
                    if (this.imagesList.length < 9 && this.imagesList.length - 1 <= this.currentImageIndex){
                        this.imagesList.push({status:0,url:''});

                    }
                })
            },
            saveIndex(index){
                this.currentImageIndex = index;
            },

        },
    }
</script>
<style lang="less" scoped>
    /* let  */
    @hiddle: hiddle;
    @auto: 100%;

    .upload {
        width: @auto;
        height: @auto;
        overflow: @hiddle;

        .send_title {
            color: #999999;
            font-size: 16px;
        }

        .main {
            width: @auto;
            height: calc(100% - 1.22557rem);
            margin-top: 46px;
            overflow: scroll;
            padding: 15px;
            box-sizing: border-box;
            .top {
                display: flex;
                justify-content: flex-start;
                div{
                    width:173px;
                    height:35px;
                    text-align: center;
                    line-height: 35px;
                    border-radius:10px 10px 0px 0px;
                }
                .isAction {
                    background-color: #EEEEEE;
                    color: #F57008;
                }

                .isSend {
                    background-color: #FFFFFF;
                    color: #DDDDDD;
                }

            }
            .content {
                /deep/ .van-cell {
                    min-height: 200px;
                    background: #F4F4F4;
                }

                /deep/ .van-field__label {
                    display: none;
                }

                /deep/ .van-field__word-limit {
                    position: absolute;
                    bottom: 0px;
                    right: 0px;
                }
            }
            .tag {
                margin-top: 20px;
                display: inline-block;
                border-radius:5px;
                color: #999999;
                padding: 0 8px;
                background:#EEEEEE;
            }
            .list{
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
                justify-content: flex-start;
            }

        }

    }
</style>

