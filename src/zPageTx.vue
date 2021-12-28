<template>
    <view class="component-z-page-tx">
        <!-- {{pageId_}} -->
    </view>
</template>

<script>
    /* message */
    import {
        getZPageMixin,
        pageBus,
        createPage,
        destroyPage,
        updateProps,
    } from "./zPageCore.js"

    export default {
        name: "z-page-tx",
        mixins: [getZPageMixin()],
        props:{
            pageId: { type: String, default: "def" }, // 页面类型 只在指定页面弹窗
            type: { type: String, default: "dialog" }, // 组件类型
            propData:{type:Object,default:()=>({})},
            visible:{type:Boolean, default: false}, // sync
        },
        data () {
            return {
                pkey: '',
            };
        },
        created(){
            this.pkey = createPage(this.pageId_, this.type, this.propData);
            if(this.pkey){
                pageBus.$on(`${this.pkey}-rx`,this.onTxEvent)
            }
        },
        beforeDestroy(){
            if(this.pkey){
                destroyPage(this.pkey);
                pageBus.$off(`${this.pkey}-rx`,this.onTxEvent)
            }
        },
        methods:{
            onTxEvent({event,data}){
                let eventCb = {
                    emit:this.onEmitEvent,
                }
                if(eventCb[event]){
                    eventCb[event](data)
                }else{
                    throw new Error(`${this.pageId_} onTxEvent: unknown event ${event}`)
                }
            },
            onEmitEvent({event,data}){
                this.$emit(event,...data)
            },
        },
        watch:{
            propData:{
                handler(newVal,oldVal){
                    updateProps(this.pkey,newVal);
                },
                deep:true,
                // immediate:true,
            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-z-page-tx{
        
    }
</style>