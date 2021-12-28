<template>
    <view class="component-z-page-rxc"> <!-- zindex -->
        <!-- <view>
            {{pageId_}}
            {{JSON.stringify(pageList)}}
        </view> -->
        <template v-for="(pitem,pindex) in pageList">
            <!-- {{ JSON.stringify(pageMap[pitem].propData) }} -->
            <!-- <template v-if="pageMap[pitem].type === 'pLoginPopup'">
                <pLoginPopupRx 
                    :key="pitem"
                    :propData="pageMap[pitem].propData" 
                    @_emit="onEmit(pitem,$event)"/>
            </template> -->
            <view :key="pitem"> <!-- key 好像并不太会引发重新渲染 -->
                <slot 
                    name="item"
                    :type="pageMap[pitem].type" 
                    :pitem="pitem" 
                    :propData="pageMap[pitem].propData">
                    <!-- :onEmit="onEmit"  -->
                        {{pageMap[pitem].type}} / {{pitem}}
                </slot>
            </view>
                <!-- <slot 
                    :pitem="pitem" 
                    :pindex="pindex" /> -->
        </template>
    </view>
</template>

<script>
    /* message */
    import {
        pageBus,
        getZPageMixin,
    } from "./zPageCore.js"

    export default {
        name: "z-page-rxc",
        mixins: [getZPageMixin(true)],
        props:{
            pageId: { type: String, default: "def" }, // 页面类型 只在指定页面弹窗
        },
        data () {
            return {
                pageMap:{},
                // l:[
                //     'create',
                //     'destroy',
                // ],
            };
        },
        created(){
            pageBus.$on('$pageMap-create',this.pageMapCreate)
            pageBus.$on('$pageMap-destroy',this.pageMapDestroy)
        },
        destroyed(){
            pageBus.$off('$pageMap-create',this.pageMapCreate)
            pageBus.$off('$pageMap-destroy',this.pageMapDestroy)
        },
        computed:{
            pageList(){
                return Object.keys(this.pageMap)
            },
        },
        methods:{
            pageMapCreate(e){
                if(e.pageId === this.pageId_){
                    this.$set(this.pageMap,e.pkey,  e)
                    // this.pageMap[e.pkey] = e
                    pageBus.$on(`${e.pkey}-tx`,this.onTxEvent)
                }
            },
            pageMapDestroy(pkey){
                if(this.pageMap[pkey]){
                    this.$delete(this.pageMap,pkey)
                    pageBus.$off(`${pkey}-tx`,this.onTxEvent)
                }else{
                    throw new Error(`${this.pageId_} pageMapDestroy: unknown pkey ${pkey}`)
                }
            },
            onTxEvent({event,date}){
                let eventCb = {
                    update:this.onUpdateEvent,
                }
                if(eventCb[event]){
                    eventCb[event](date)
                }else{
                    throw new Error(`${this.pageId_} onTxEvent: unknown event ${event}`)
                }
            },
            onUpdateEvent(data){
                if(this.pageMap[data.pkey]){
                    // this.$set(this.pageMap[data.pkey],'propData' , data.propData)
                    this.pageMap[data.pkey].propData = data.propData
                }else{
                    throw new Error(`${this.pageId_} onUpdateEvent: unknown pkey ${data.pkey}`)
                }
            },
            onEmit(pkey,[event,data]){
                pageBus.$emit(`${pkey}-rx`,{
                    event:'emit',
                    data: {
                        event,
                        data
                    }
                })
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-z-page-rxc{
        // position: fixed;
        // left: 0;
        // right: 0;
        // top: 0;
        // bottom: 0;
        // z-index: 500;
        
    }
</style>