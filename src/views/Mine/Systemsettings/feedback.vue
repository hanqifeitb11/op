<template>
    <div class="feedback container">
        <An_header title="帮助与反馈"></An_header>
        <div class="main">
            <div class="top_bg">
            </div>
            <div class="content-title">
                <div class="lei">
                    <van-icon name="fire" />热门问题</div>
                <div class="rig">全部问题
                    <van-icon name="arrow" />
                </div>
            </div>
            <ul class="content">
                <li v-for="(v,i) in content_Data">{{v.name}}</li>
            </ul>
            <div class="footbar">
                <div class="btn_right">查看反馈</div>
                <div class="btn_left" @click.stop="editFreack"><van-icon name="edit" />我要写反馈</div>
            </div>
        </div>
    </div>
</template>
<script>
    import An_header from '../../../components/header/an-header.vue'
    export default {
        components: {
            An_header
        },
        methods: {
            editFreack(){
// 用户反馈
this.$router.push({path:"/Feedback_edit"})
            },
        },
        data() {
            return {
                content_Data: [{
                    name: "发布的帖子/评论去哪里了",
                    id: '1'
                }, {
                    name: "发布的帖子/评论去哪里了",
                    id: '1'
                }, {
                    name: "发布的帖子/评论去哪里了",
                    id: '1'
                }, {
                    name: "发布的帖子/评论去哪里了",
                    id: '1'
                }]
            }
        },
        name: 'feedback'
    }
</script>
<style lang="less" scoped>
    .feedback {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #ffffff;

        .main {
            width: 100%;
            height: 100%;
            margin-top: 46px;
            overflow: scroll;

            .top_bg {
                width: 100%;
                height: 150px;
                background-color: #cccccc;
            }

            .content-title {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                box-sizing: border-box;

                .lei {
                    display: flex;
                    align-items: center;

                    /deep/ .van-icon {
                        color: red;
                        margin-right: 10px;
                    }
                }

                .rig {
                    display: flex;
                    align-items: center;

                    /deep/ .van-icon {
                        /* color: red; */
                        margin-left: 10px;
                    }
                }
            }

            .content {
                padding: 10px;
                box-sizing: border-box;
                font-size: 14px;
                color: #000;

                li {
                    line-height: 60px;
                    border-bottom: 1px solid #ccc;
                }
            }

            .footbar {
                width: 100%;
                display: flex;
                justify-content: space-between;

                .btn_right,
                .btn_left {
                    width: 50%;
                    text-align: center;
                display:flex;
                align-items:center;
                justify-content:center;
                /deep/ .van-icon{
                    margin-right: 5px;
                }

                }

                .btn_right {
                    border-right: 1px solid #cccccc;
                }
                .btn_left{
                    color: blue;
                }
            }

        }


    }
</style>
