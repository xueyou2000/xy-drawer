import classNames from "classnames";
import React, { useEffect, useState, useContext } from "react";
import { useControll, usePortal, useTranstion, ENTERING, EXITED, EXITING } from "utils-hooks";
import { DrawerProps } from "./interface";
import { DrawerContext, DrawerContextType } from './DrawerContext';

const Transition = 'transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86)';

/**
 * 抽屉嵌套Context
 * @param state 
 * @param positived 
 * @param getTranslate 
 */
function useDrawerContext(state: string, positived: boolean, getTranslate: (x: string) => string): [DrawerContextType, React.CSSProperties, DrawerContextType] {
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

function usePlacement(placement: "left" | "top" | "right" | "bottom"): [boolean, (x: string) => string] {
    const direction = placement === "left" || placement === "right" ? "X" : "Y";
    const positived = placement === "top" || placement === "left";
    const getTranslate = (distance: string) => `translate${direction}(${distance})`;
    return [positived, getTranslate];
}

export function Drawer(props: DrawerProps) {
    const { prefixCls = "xy-drawer", defaultOpen, className, style, getContainer, width, height, placement = "left", showMask = true, maskClose = true, moveSelector, onChange, children, ...rest } = props;
    const [renderPortal, container] = usePortal(getContainer);
    const [open, setOpen, isControll] = useControll(props, "open", "defaultOpen", false);
    const [ref, state] = useTranstion(open, true);
    const [positived, getTranslate] = usePlacement(placement);
    const [context, drawerStyle, currentContext] = useDrawerContext(state, positived, getTranslate);
    const opening = state.indexOf("en") !== -1;
    const useFixed = !getContainer;
    const classString = classNames(prefixCls, className, `${prefixCls}-${placement}`, `state-${state}`, { [`${prefixCls}-open`]: open, "use-container": !useFixed });
    const contentStyle: React.CSSProperties = { width, height, transform: getTranslate(`${positived ? "-" : ""}${opening ? 0 : 100}%`) };

    /**
     * 处理推开元素过度样式
     */
    useEffect(() => {
        const content = ref.current as HTMLElement;
        if (!moveSelector || !content) { return; }
        const moveEles = document.querySelectorAll(moveSelector);

        function setMoveElesStyle(sty: React.CSSProperties) {
            [].forEach.call(moveEles, (ele: HTMLElement) => {
                for (let key in sty) {
                    ele.style[key] = sty[key];
                }
            });
        }

        if (state.indexOf("en") !== -1) {
            setMoveElesStyle({ transform: getTranslate(`${positived ? "" : "-"}${content.clientWidth}px`), transition: Transition,});
        } else if (state === EXITED) {
            setMoveElesStyle({ transform: null, transition: null, });
        } else {
            setMoveElesStyle({ transform:  getTranslate(`${positived ? "" : "-"}${0}px`),});
        }
    }, [state]);

    /**
     * 处理 Container 滚动条的隐藏和还原
     */
    useEffect(() => {
        const scrollContainer = useFixed ? document.body : container;
        if (scrollContainer) {
            if (opening) {
                scrollContainer.style.overflow = "hidden";
            } else if (state === EXITED && currentContext === null) {
                scrollContainer.style.overflow = null;
            }
        }
    }, [state]);

    function handleChange(_open: boolean) {
        if (!isControll) {
            setOpen(_open);
        }
        if (onChange) {
            onChange(_open);
        }
    }

    function handleMaskClick() {
        if (maskClose) {
            handleChange(false);
        }
    }

    return renderPortal(
        <DrawerContext.Provider value={context}>
            <div className={classString} style={Object.assign({}, style, drawerStyle)} {...rest}>
                {showMask && <div className={`${prefixCls}-mask`} onClick={handleMaskClick} />}
                <div className={`${prefixCls}-content`} style={contentStyle} ref={ref}>
                    {children}
                </div>
            </div>
        </DrawerContext.Provider>
    );
}

export default React.memo(Drawer);
