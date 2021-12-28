<template>
    <zPageRxc class="component-z-page-rx" ref="page" :pageId="pageId"> <!-- zindex -->
        <template v-slot:item="{type,pitem,propData}"> <!-- ,onEmit -->
            <template v-if="type == 'pLoginPopup'">
                <pLoginPopupRx
                    :key="pitem"
                    :propData="propData" 
                    @_emit="onEmit(pitem,$event)" />
            </template>
        </template>
    </zPageRxc>
</template>

<script>
    /* message */
    import zPageRxc from './zPageRxc.vue'
    import pLoginPopupRx from "./pLoginPopupRx.vue"

    export default {
        name: "z-page-rx",
        components:{
            zPageRxc,

            pLoginPopupRx,
        },
        props:{
            pageId: { type: String, default: "def" }, // 页面类型 只在指定页面弹窗
        },
        methods:{
            onEmit(pitem,event){
                this.$refs.page.onEmit(pitem,event)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-z-page-rx{
        // position: fixed;
        // left: 0;
        // right: 0;
        // top: 0;
        // bottom: 0;
        // z-index: 500;
        
    }
</style>