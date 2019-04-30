export type GetDrawerContainerFuc = () => HTMLElement;

export interface DrawerProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * ID
     */
    id?: string;
    /**
     * 抽屉是否打开
     */
    open?: boolean;
    /**
     * 抽屉是否默认打开
     */
    defaultOpen?: boolean;
    /**
     * 返回一个容器来装载抽屉
     * @description 默认为body内创建一个div作为容器
     */
    getContainer?: HTMLElement | GetDrawerContainerFuc;
    /**
     * 抽屉包裹内容
     */
    children?: React.ReactNode;
    /**
     * tab索引
     */
    tabIndex?: number;
    /**
     * 被推开的元素选择器
     * @description 抽屉显示时候, 将推开元素抽屉的距离
     */
    moveSelector?: string;
    /**
     * 在左右方向时, 抽屉的宽度
     */
    width?: string;
    /**
     * 在上下方向时, 抽屉的高度
     */
    height?: string;
    /**
     * 抽屉滑出方向
     */
    placement?: "left" | "top" | "right" | "bottom";
    /**
     * 是否固定
     */
    fixed?: boolean;
    /**
     * 是否显示蒙层
     */
    showMask?: boolean;
    /**
     * 蒙层是否可关闭抽屉
     */
    maskClose?: boolean;
    /**
     * 抽屉可视改变事件
     */
    onChange?: (open: boolean) => void;
    /**
     * 键盘事件
     * @description 可用于Esc关闭抽屉
     */
    onKeyPress?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    /**
     * 关闭动画结束
     */
    onUnmount?: Function;
}

export interface DrawerContextState {
    /**
     * 子元素数量
     */
    count?: number;
    /**
     * 添加子Drawer
     */
    addDrawer?: Function;
    /**
     * 移除子Drawer开始
     */
    removeDrawer?: Function;
    /**
     * 移除子Drawer完毕
     */
    removeDrawerDone?: Function;
}
