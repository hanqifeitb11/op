<template>
    <div class="container contact">
        <An_NavBar title="联系方式"></An_NavBar>
        <div class="main">
            <!-- <img src="@/assets/images/home/bg.png" alt="" class="bg"> -->
            <div class="content">
                <div class="emails">
                    <div class="three">
                        <div>官方邮箱</div>
                        <div>Longqin62595@163.com</div>
                    </div>
                    <div class="footbar">

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import An_NavBar from '../../../components/header/an-header'
    export default {
        name: "contact",
        components: {
            An_NavBar
        },
        mounted() {

        },
    }
</script>
<style scoped lang="less">
    @import "../../../assets/safeArea";

    .contact {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .main {
            width: 100%;
            height: 100%;
            // overflow: scroll;
            // margin-top: 46px;

            .bg {
                position: fixed;
                top: 0px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                width: 100%;
                height: 100%;
            }

            .content {
                position: fixed;
                top: 0px;
                padding: 0px 22px;
                box-sizing: border-box;
                left: 0px;
                right: 0px;
                width: 100%;
                height: calc(100% - @top);
                overflow: scroll;
                margin-top: 46px;
                display: flex;
                justify-content: center;
                align-items: center;

                .emails {

                    flex-direction: column;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    font-size: 15px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                    line-height: 30px;

                    .three {
                        margin-top: 20px;
                    }

                    .footbar {
                        margin-top: 165px;
                        text-align: center;

                        img {
                            width: 62px;
                            height: 62px;
                        }

                        display:flex;
                        justify-content: center;
                        flex-direction: column;

.miaoshu{
    margin-top: 15px;
}
                        /* align-items: center; */
                    }

                }

            }
        }
    }
</style>