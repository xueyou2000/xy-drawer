import React, { useContext, useEffect, useState } from "react";
import { ENTERING, EXITED, EXITING } from "utils-hooks";
import { DrawerContext, DrawerContextType } from './DrawerContext';

export const Transition = 'transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86)';

/**
 * 抽屉嵌套Context
 * @param state 
 * @param positived 
 * @param getTranslate 
 */
export function useDrawerContext(state: string, positived: boolean, getTranslate: (x: string) => string): [DrawerContextType, React.CSSProperties, DrawerContextType] {
    const context = useContext(DrawerContext);
    const [count, setCount] = useState(0);
    const [style, setStyle] = useState<React.CSSProperties>({});
    const drawerContext = { count, addDrawer, removeDrawer, removeDrawerDone };

    function addDrawer() {
        setStyle({ transform:  getTranslate(`${positived ? "" : "-"}${(count + 1) * 100}px`), transition: Transition, });
        setCount(c => c + 1);
    }

    function removeDrawer() {
        setStyle({ transition: Transition })
        setCount(c => c - 1);
    }

    function removeDrawerDone() {
        setStyle({});
    }

    /**
     * 子抽屉向父级报告状态
     */
    useEffect(() => {
        // 不在嵌套抽屉内则忽略
        if (!context) { return; }

        if (state === ENTERING) {
            context.addDrawer();
        } else if (state === EXITING) {
            context.removeDrawer();
        } else if (state === EXITED) {
            context.removeDrawerDone();
        }
    }, [state]);

    return [drawerContext, style, context];
}