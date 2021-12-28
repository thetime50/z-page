/**
 * 组件应用层方法
 */

import store from "@/store"

/**
 * 
 * vuex 相关方法
 * 
 * */

// 获取vuex配置结构
export function getStoreModule() {
    return ({
        namespaced: true,
        state: {
            pageId: 'def',
            ignorePage: [],
        },
        mutations: {
            setPageId(state, data) {
                state.pageId = data
            },
            setIgnorePage(state, data) {
                state.ignorePage = data
            }
        },
    })
}

// 注册vuex pageId更新
export function zPageSetup(ignorePage = []) {
    store.commit('zPage/setIgnorePage', ignorePage)
    uni.onAppRoute((route) => {
        store.commit('zPage/setPageId', route.path)
    })
}

/** 
 * 
 * 实例组件 tx 方法
 * 
 * */


/** 
 * 
 * 实例组件 rx 方法
 * 
 * */
/**
 * 获取接收组件混合参数
 * 参数
 *{
 *    props: ["page"],
 *    props: {
 *        page: {
 *            type: Object, // 类型
 *            default: () => ({}), // 默认值
 *            required: true, // 必须的
 *            sync: true, // 同步
 *        }
 *    },
 *}
 * 
 * 
 */
export function getPageRxMixin(cfg) {
    let res = {
        props: {},
        computed: {},
        methods: {},
    }
    res.props = {
        propData: {
            type: Object,
            default: () => ({})
        },
    }
    res.methods._emit = function (event, ...data) {
        this.$emit('_emit', [event, data])
    }

    if (Array.isArray(cfg.props)) {
        cfg.props.forEach((v, i, a) => {
            res.computed[v] = function () {
                return this.propData[v]
            }
        })
    } else {
        function getGetFun(field, pconfig) {
            return function () {
                if (!this.propData.hasOwnProperty(field)) {
                    if (pconfig.hasOwnProperty('default')) {
                        if (typeof (pconfig.default) == 'function') {
                            return pconfig.default()
                        } else {
                            return pconfig.default
                        }
                    }
                }
                return this.propData[field]
            }
        }
        Object.keys(cfg.props).forEach((v, i, a) => {
            if (!cfg.props[v].sync) {
                res.computed[v] = getGetFun(v, cfg.props[v])
            } else {
                res.computed[v] = {
                    get: getGetFun(v, cfg.props[v]),
                    set(val) {
                        if (v == 'value') {
                            this._emit(`input`, val)
                        } else {
                            this._emit(`update:${v}`, val)
                        }
                    }
                }
            }
        })
    }
    return res
}

