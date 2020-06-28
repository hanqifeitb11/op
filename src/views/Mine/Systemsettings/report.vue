<template>
    <div class="container report">
        <An_NavBar title="举报">
            <span slot="right" class="header_title" :style="{'color':is_Send?'#F57008':'#999999'}"
                @click="Send">提交</span>
        </An_NavBar>
        <div class="main">
            <!-- <img src="@/assets/images/home/bg.png" alt="" class="bg"> -->
            <div class="content" v-if="!is_success">
                <div class="avator">
                    <!-- <img src="@/assets/images/setting/icon_report_red.png" alt=""> -->
                </div>
                <div class="select_items">
                    <p>请选择你想要举报的类型</p>
                    <div class="containter_select">
                        <div class="items" v-for="(v,i) in Arr" :key="i" @click="ToClick(i,v)"
                            :style="{'color':i==isSelect?'#F57008':'','border-color':i==isSelect?'#F57008':''}">
                            {{v.title}}
                        </div>
                    </div>
                </div>
                <div class="select_items_children" v-if="Arr_chilren.length>0">
                    <p>请选择你想要举报的类型</p>
                    <div class="containter_select">
                        <div class="items" v-for="(v,i) in Arr_chilren" :key="i" @click="ToClic_chidlren(i)"
                            :style="{'color':i==isSelect_item?'#F57008':'','border-color':i==isSelect_item?'#F57008':''}">
                            {{v.title}}
                        </div>
                    </div>

                </div>
                <div class="select_items_messgae" v-if="Item.type==2">
                    <p class="condition">反馈问题详情 <span class="titl">*</span></p>
                    <van-field v-model="message" rows="2" autosize label="留言" type="textarea" maxlength="140"
                        placeholder="请填写你的投诉理由" show-word-limit />
                </div>
            </div>
            <div class="Success" v-if="is_success">
                <!-- <van-empty class="custom-image" :image="require(`@/assets/images/setting/icon_report_accop.png`)"
                    description="提交成功,我们将尽快受理" /> -->

            </div>
        </div>
    </div>
</template>
<script>
    import { Field, Toast } from 'vant';
    import { Empty } from 'vant';

    import { getReport, Tip_off } from '../../../api/modules/home'
    import An_NavBar from '../../../components/header/an-header'
    export default {
        name: "report",
        components: {
            An_NavBar, Field, Empty
        },
        data() {
            return {
                report_item: {},
                Arr_chilren: [],
                message: '',
                Arr: [
                ],
                isSelect: '',
                isSelect_item: '',
                Item: {},
                is_Send: false,
                sendObj: {},
                is_success: false,
                two_Item:{}
            }
        },

        mounted() {
            console.log()
            this.getInit();
            // this.sendObj=
        },
        watch: {
            message(val) {
                if (val.length > 0) {
                    this.is_Send = true
                }
            }
        },
        methods: {

            getInit() {
                getReport().then(res => {
                    console.log(res)
                    this.Arr = res;
                    this.Arr_chilren = res[0].child;//数组默认第一项
                    this.two_Item = this.Arr_chilren[0];//二级第一项
                    this.report_item = this.Arr[0];//一级第一项
                })
            },
            Send() {
                if (this.report_item['type'] == 2) {
                    if (this.is_Send==false) {
                        Toast({
                            message: "请填写问题详情",
                            duration: 1500
                        })
                        return
                    }
                }
                console.log('------')
                this.sendObj = this.$route.query;
                    this.sendObj['type_id'] = this.two_Item.id;
                    this.sendObj['content']=this.message;
                    Tip_off(
                        this.sendObj
                    ).then(res => {
                        this.is_success = true;
                    })


            },
            ToClic_chidlren(i) {
                this.message = ''
                this.isSelect_item = i;
                this.two_Item=this.Arr_chilren[i]

            },
            ToClick(i, v) {
                this.message=''
                this.Item = v;//这是获父级
                this.isSelect = i;

                this.Arr_chilren = this.Arr[i].child;//这是单机以后获取的二级数组
                console.log(this.Arr_chilren)
                this.report_item = this.Arr[i];
                this.two_Item= this.Arr_chilren[0]
                console.log(this.report_item)
            }
        },
    }
</script>
<style scoped lang="less">
    .report {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .header_title {
            font-size: 16px;
            /* color: */
            color: #999999
        }

        .select {
            border: 1px solid rgba(245, 112, 8, 1);
            color: #F57008;

        }

        .main {
            width: 100%;
            height: 100%;
            overflow: scroll;
            margin-top: 50px;

            .bg {
                position: fixed;
                top: 0px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                width: 100%;
                height: 100%;
            }

            .Success {
                position: fixed;
                bottom: 0px;
                padding: 0px 16px;
                box-sizing: border-box;
                left: 0px;
                right: 0px;
                width: 100%;
                height: calc(100% - 50px);
                overflow: scroll;
                display: flex;
                justify-content: center;
                align-items: center;
                /* margin-top: 46px; */

            }

            .content {
                position: fixed;
                top: 0px;
                padding: 0px 16px;
                box-sizing: border-box;
                left: 0px;
                right: 0px;
                width: 100%;
                height: calc(100% - 46px);
                overflow: scroll;
                margin-top: 46px;

                .avator {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    img {
                        width: 72px;
                        height: 71px;
                        margin-top: 40px;
                    }
                }

                .select_items_messgae {
                    padding-bottom: 100px;
                    /* margin-bottom: 100px; */
                }

                .select_items_children,
                .select_items_messgae {
                    .condition {
                        position: relative;

                        .titl {
                            position: absolute;
                            top: -7px;
                            color: #F57008;
                        }
                    }

                    p,
                        {
                        margin-top: 15px;
                        font-size: 16px;
                        font-family: Source Han Sans CN;
                        color: #000000;
                        font-weight: 400;
                        margin-bottom: 15px;
                    }

                    /deep/.van-cell {
                        background: rgba(244, 244, 244, 1);
                        border-radius: 5px;
                        min-height: 200px;
                    }

                    /deep/ .van-field__label {
                        display: none;
                    }

                    /* /deep/ */

                    /* color:rgba(0,0,0,1 */
                }

                .select_items {
                    .condition {
                        position: relative;

                        .titl {
                            position: absolute;
                            top: -7px;
                            color: #F57008;
                        }
                    }

                    p,
                        {
                        margin-top: 60px;
                        font-size: 16px;
                        font-family: Source Han Sans CN;
                        color: #000000;
                        font-weight: 400;
                        margin-bottom: 15px;
                    }

                    /deep/.van-cell {
                        background: rgba(244, 244, 244, 1);
                        border-radius: 5px;
                        min-height: 200px;
                    }

                    /deep/ .van-field__label {
                        display: none;
                    }

                    /* /deep/ */

                    /* color:rgba(0,0,0,1 */
                }

                .containter_select {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-column-gap: 15px;
                    grid-row-gap: 15px;
                    font-size: 16px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);

                    .items {
                        text-align: center;


                        background: rgba(0, 0, 0, 0);
                        border: 1px solid rgba(153, 153, 153, 1);
                        border-radius: 5px;
                    }
                }


            }
        }

        /deep/ .van-empty__image {
            width: 189px;
            height: 141px;

        }

        /deep/ .van-empty__description {
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(255, 7, 1, 1);
            margin-top: 30px;
        }
    }
</style>
