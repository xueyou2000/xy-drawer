import React from 'react';

export interface DrawerContextType {
    /**
     * 子元素数量
     */
    count?: number;
    /**
     * 添加子Drawer
     */
    addDrawer?: Function;
    /**
     * 移除子Drawer
     */
    removeDrawer?: Function;
}

export const DrawerContext = React.createContext<DrawerContextType>({});