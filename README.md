| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

![NPM version](http://img.shields.io/npm/v/xy-drawer.svg?style=flat-square)
![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)
![npm download](https://img.shields.io/npm/dm/xy-drawer.svg?style=flat-square)

[![xy-drawer](https://nodei.co/npm/xy-drawer.png)](https://npmjs.org/package/xy-drawer)

# xy-drawer

抽屉组件, 从屏幕边缘滑出的浮层面板.

## 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

-   当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
-   当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

## 特性

-   [x] 能够指定窗体, 默认是 body 下创建一个空的 div
-   [x] 能够指定`moveSelector`, 让窗口仿佛推动了指定 div 的距离
-   [x] 指定宽度或高度, 在上下方向时候, 应该指定高度
-   [x] 可以定义滑出位置, 屏幕的上下左右
-   [x] 关闭时候是否销毁内部元素
-   [x] 蒙层是否显示, 是否能点击关闭
-   [x] 事件回调
-   [x] 多层次嵌套, 往前推

## 安装

```bash
# yarn
yarn add xy-drawer utils-hooks classnames
```

## 使用例子

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { Drawer } from "xy-drawer";
import "xy-drawer/assets/index.css";
ReactDOM.render(<Drawer open={true} />, container);
```

## js 方式调用

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { DrawerPopup } from "xy-drawer";

DrawerPopup({
    children: <p>js弹出的抽屉</p>
});
```

## API

| 属性         | 说明                     | 类型                                                 | 默认值                |
| ------------ | ------------------------ | ---------------------------------------------------- | --------------------- |
| open         | 抽屉是否打开             | boolean                                              | false                 |
| defaultOpen  | 抽屉是否默认打开         | boolean                                              | false                 |
| getContainer | 返回一个容器来装载抽屉   | HTMLElement                                          | GetDrawerContainerFuc | 无 |
| children     | 抽屉包裹内容             | React.ReactNode                                      | 无                    |
| moveSelector | 被推开的元素选择器       | string                                               | 无                    |
| width        | 在左右方向时, 抽屉的宽度 | string                                               | 无                    |
| height       | 在上下方向时, 抽屉的宽度 | string                                               | 无                    |
| placement    | 抽屉滑出方向             | "left"/"top"/"right"/"bottom"                        | "left"                |
| fixed        | 是否固定                 | boolean                                              | true                  |
| showMask     | 是否显示蒙层             | boolean                                              | true                  |
| maskClose    | 蒙层是否可关闭抽屉       | boolean                                              | true                  |
| onChange     | 抽屉可视改变事件         | (open: boolean) => void                              | 无                    |
| onKeyPress   | 键盘事件                 | (event: React.KeyboardEvent<HTMLDivElement>) => void | 无                    |
| onUnmount    | 关闭动画结束             | Function                                             | 无                    |

## 开发

```sh
yarn run start
```

## 例子

http://localhost:6006

## 测试

```
yarn run test
```

## 开源许可

xy-drawer is released under the MIT license.
