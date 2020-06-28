<template>
    <div class="username container">
        <An_header title="修改用户名" />
        <div class="main">
            <input type="text" name="" id="">
        </div>
    </div>
</template>
<script>
    import { Field } from 'vant';

    import An_header from '../../../components/header/an-header.vue'
    export default {
        components: {
            An_header,
            Field
        },
        data() {
            return {
                nickname: ""
            }
        },
        mounted() {

        },
    }
</script>
<style lang="less" scoped>
    .username {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .main {
            width: 100%;
            height: 100%;
            overflow: scroll;
            margin-top:46px;

            input {
                line-height: 40px;
                width: 100%;
                padding: 0px 20px;
                background-color: none;
                box-sizing: border-box;
                border-top: 1px solid #cccccc;
                border-bottom: 1px solid #cccccc;
            }
        }
    }
</style>
