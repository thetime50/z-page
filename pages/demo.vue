<template>
    <view class="component-demo">
        demo
        <zPageRx />
        <!-- 在父级 加 z-index -->
        <!-- <view class="mask"></view> -->
        <view class="content">
            <button @click="btnClick">visible {{visible}}</button>
            <button @click="visible1 =! visible1">visible1 {{visible1}}</button>
            <button @click="popupClick">popup {{popup}}</button>
            <input type="" placeholder="" password />
            <pLoginPopup v-if="popup" :visible.sync="visible" text="popup-0"/>
            <pLoginPopup :visible.sync="visible1" text="popup-1"/>

            <!-- 在末尾 加 z-index -->
            <!-- <view class="mask"></view>  -->

        </view>
    </view>
</template>

<script>
    /* 测试页面demo */
    import zPageRx from "@/components/zPage/zPageRx.vue"
    import pLoginPopup from "@/components/zPage/pLoginPopup.vue"

    export default {
        name: "demo",
        components: {
            zPageRx,
            pLoginPopup,
        },
        data () {
            return {
                popup:true,
                visible:false,
				visible1:false,
            };
        },
        methods:{
            btnClick(){
                this.visible = !this.visible
            },
            popupClick(){
                this.popup = !this.popup
            },
		},
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-demo{
        
    }
    .content{
        position:relative;
    }
    .mask{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        background-color: rgba(255,100,100,0.3);
    }
</style>