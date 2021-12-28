<template>
    <zPageTx class="component-p-login-popup mask" 
        :pageId="pageId"
        type="pLoginPopup"
        :visible.sync="visible_"
        :propData="{
            visible:visible_,
            text,
        }">
    </zPageTx>
</template>

<script>
    /* message */
    import zPageTx from "./zPageTx.vue"

    export default {
        name: "p-login-popup",
        props:{
            pageId: { type: String, default: "def" }, // 页面类型 只在指定页面弹窗
            visible:{type:Boolean, default: false}, // sync
            text: { type: String, default: "" },
        },
        components: {
            zPageTx,
        },
        data () {
            return {
            };
        },
        computed:{
            visible_:{
                get(){
                    return this.visible
                },
                set(val){
                    this.$emit('update:visible',val)
                }
            },
        },
        methods:{
            // 
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-p-login-popup{
        
    }
</style>