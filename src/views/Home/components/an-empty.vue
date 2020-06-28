<template>
    <van-empty
            class="custom-image"
            :image="url"
            :description="title"
    >
        <slot slot="description" name="description"></slot>
    </van-empty>
</template>

<script>
    export default {
        name: "an-empty",
        props:['url','title']
    }
</script>

<style lang="less" scoped>
    .custom-image{
        /deep/ .van-empty__image{
            width:197px;
            height:149px;
        }
        /deep/ .van-empty__description{
            text-align: center;
        }
    }
</style>
