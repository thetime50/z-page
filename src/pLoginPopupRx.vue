<template>
    <view :class="'component-p-login-popup-rx mask ' + transClass" v-if="visible" @touchmove.stop.prevent @click.stop="maskClick">
        <view class="content"  @touchmove.stop.prevent @click.stop>
            <view class="title">提示</view>
            <view class="text" v-if="text">{{text}} {{cnt}}</view>
            <view class="info">
                当前为游客状态，无法进行筛选操作，请先前往登录账号。
            </view>
            <view class="button" @click="loginClick">立即登录</view>
        </view>
    </view>
</template>

<script>
    /* message */
    import {
        getPageRxMixin,
    } from "./zPage.js"

    export default {
        name: "p-login-popup-rx",
        mixins: [
            getPageRxMixin({
                props:{
                    visible:{type:Boolean, default: false,sync:true}, // sync
                    text: { type: String, default: "" },
                },
            })
        ],
        props:{
            // propData:{type:Object,default:()=>({})},
        },
        data () {
            return {
                cnt:0,
                transClass:'',
            };
        },
        created(){
            console.log(`p-login-popup-rx created`, this.text)
        },
        beforeDestroy(){
            console.log(`p-login-popup-rx beforeDestroy`, this.text)
        },
        computed:{
            // 
        },
        methods:{
            maskClick(){
                this.visible = false
            },
            loginClick(){
                this.visible = false
                uni.showToast({
                    title: 'navigateTo /login',
                    icon: 'none',
                    duration: 2000
                })
            }
        },
        watch:{
            visible(after){
                this.cnt++
                console.log(`p-login-popup-rx this.text,visible,this.cnt`, this.text,after,this.cnt)
                if(after){
                    this.transClass = 'dialog-enter dialog-enter-active' 
                    this.$nextTick(()=>{
                        this.transClass = 'dialog-enter-active' 
                    })
                    this._emit('open')
                }else{
                    this._emit('close')
                }
            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-p-login-popup-rx{
        
    }

    .dialog-enter-active{
        transition: opacity 03s ease-out;
        >.content{
            transition: transform 03s ease-out;
        }
    }
    .dialog-enter{
        opacity: 0;
        >.content{
                transform: 
                    perspective(200px) 
                    scale(0.7,0.5)
                    rotateX(30deg);
                // translate3d(-150%,-150%,0);
        }
    } 

    .mask{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 500;
        background: rgba(0, 0, 0, 0.5);
    }
    .content{
        margin:auto;
        margin-top: 30vh;
        width: 560rpx;
        padding: 40rpx 24rpx;
        background: #FFFFFF;
        box-shadow: 0px 5px 140px rgba(62, 62, 62, 0.1);
        border-radius: 8px;
        white-space: normal;
    }

    
    .title{
        font-weight: 500;
        font-size: 32rpx;
        line-height: 48rpx;
        text-align: center;
        color: #333333;
    }
    .info{
        margin-top: 40rpx;
        font-size: 28rpx;
        line-height: 48rpx;
        color: #666666;
    }
    .button{
        width: 228rpx;
        margin:auto;
        margin-top: 40rpx;
        font-size: 28rpx;
        line-height: 48rpx;
        color: #FFFFFF;
        background: linear-gradient(138.76deg, #6098F7 -2.7%, #4975E9 104.79%);
        border-radius: 8rpx;
        text-align: center;
        padding: 16rpx;
    }
</style>