# zPage
uniapp 弹窗 appendtobody


## 目录说明

```
// 内部文件
eventBus.js - 事件总线
zPageCore.js - 内部逻辑

// 主要功能
zPage.js - 组件方法
zPageRxc.vue - 顶层组件显示容器
zPageTx.vue - 内层发送组件

// 测试文件
pLoginPopup.vue - 测试文件 登录弹窗
pLoginPopupRx.vue - 测试文件 登录弹窗
zPageRx.vue - 测试文件 zPageRx demo
```

## 组件原理

页面内部触发dialog(dialogTx)组件通过 zPageTx发送组件传递数据更新和事件，  
zPageRxc在页面外层渲染，创建组件列表，接收数据更新和传递事件，渲染实际的dialogRx组件

1. dialogTx 内引用 zPageTx组件，zPageTx会在每次create把唯一的组件实例插入队列
2. zPageRxc放在页面外层，接收到zPageTx的创建事件会创建并渲染新的dialogRx组件，并监听相应组件的event bus事件
3. dialogTx 的数据更新和 dialogRx的事件触发都会通过相应的组件实例event bus传输
4. dialogTx被销毁时 会触发zPageRxc销相应的dialogRx组件实例

## 实现一个弹窗组件的步骤
来看一下 pLoginPopup 的实现步骤

1. 创建 pLoginPopup.vue 即 pLoginPopupTx 发送组件，因为是在业务上直接使用的组件，所以省略 Tx,直接命名为pLoginPopup
2. 在 pLoginPopup.vue 里引用 zPageTx 组件， zPageTx 组件用来处理 z-page 组件的创建和销毁，数据更新和事件传递等逻辑

zPageTx包含以下参数
- pageId 页面id 用来区分不同页面，tx组件创建的组件实例只在指定的页里渲染
- type 组件类型
- propData 组件参数