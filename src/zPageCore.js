/**
 * 组件传输层方法
 */

// bus
// map
import {EventBus} from "./eventBus.js"
export const pageBus = new EventBus
const pageMap = {}

/**
 * 
 * vuex 相关方法
 * 
 * */


// 公用组件计算属性
export function getZPageMixin (rx=false){
    let res = {
        props: {},
        computed: {},
        methods: {},
    }
    res.computed.pageId_  = function pageId_() {
        if (this.$store.state.zPage) {
            const ignorePage = this.$store.state.zPage.ignorePage
            const currentPage = this.$store.state.zPage.pageId
            if (rx){ // 接收组件内 如果在tab页面或者是keep-alive页面,只返回prop的zPage
                const ig = ignorePage.some((v, i, a) => {
                    return RegExp(`^/?${currentPage}$`).test(v)
                })
                if (ig) {
                    return this.pageId
                }
            }
            if (this.pageId && this.pageId!='def'){
                return this.pageId
            }else{
                return currentPage
            }
        }
        return this.pageId
    }
    return res
}


/**
 *  
 * 公共组件 tx 方法
 * 
 * */

function getPkey(pageId, type, ) {
    let pkey
    let cnt = 0
    do{
        pkey = pageId + '-' + type + '-' + Math.random().toString(36).slice(-8);
        cnt++
    }while (pageMap[pkey] && cnt < 500)
    if (pageMap[pkey]){
        return ''
    }
    return pkey
}

export function createPage(pageId, type, propData) {
    let pkey = getPkey(pageId,type)
    if (!pkey) {
        throw new Error('createPage error, cant create pkey')
    }
    let res = {
        type,
        pageId,
        pkey,
        propData,
    }
    pageMap[pkey] = res
    pageBus.$emit('$pageMap-create', pageMap[pkey]) // 全局事件
    return pkey
}

export function destroyPage(pkey) {
    if (!pkey) return 
    delete pageMap[pkey]
    pageBus.$emit('$pageMap-destroy', pkey) // 全局事件
}

export function updateProps(pkey, propData) {
    if (!pkey) return 
    pageMap[pkey].propData = propData
    // pageBus.$emit('$pageMap-update', pageMap[pkey])
    pageBus.$emit(`${pkey}-tx`, {
        event:'update',
        date:pageMap[pkey],
    })
}

/** 
 * 
 * 公共组件 rx 方法
 * 
 * */

