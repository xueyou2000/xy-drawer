import classNames from "classnames";
import React, { useEffect, useState, useContext } from "react";
import { useControll, usePortal, useTranstion, ENTERING, EXITED, EXITING } from "utils-hooks";
import { DrawerProps } from "./interface";
import { DrawerContext, DrawerContextType } from './DrawerContext';

function useDrawerContext() {
    const [count, setCount] = useState(0);

    function addDrawer() {
        setCount(c => c + 1);
    }

    function removeDrawer() {
        setCount(c => c - 1);
    }

    return { count, addDrawer, removeDrawer };
}

export function Drawer(props: DrawerProps) {
    const { prefixCls = "xy-drawer", className, style, getContainer, width, height, placement = "left", showMask = true, maskClose = true, moveSelector, onChange, children, ...rest } = props;
    const [open, setOpen, isControll] = useControll(props, "open", "defaultOpen", false);
    const [ref, state] = useTranstion(open);
    const context = useDrawerContext();
    const subContext = useContext(DrawerContext);
    const opening = state.indexOf("en") !== -1;
    const useFixed = !getContainer;
    const [renderPortal, container] = usePortal(getContainer);
    const direction = placement === "left" || placement === "right" ? "X" : "Y";
    const positived = placement === "top" || placement === "left";
    const getTranslate = (distance: string) => `translate${direction}(${distance})`;
    const classString = classNames(prefixCls, className, `${prefixCls}-${placement}`, `state-${state}`, {
        [`${prefixCls}-open`]: open,
        "use-container": !useFixed
    });
    const [drawerStyle, setDrawerStyle] = useState<React.CSSProperties>({});

    const contentStyle: React.CSSProperties = {
        width,
        height,
        transform: getTranslate(`${positived ? "-" : ""}${opening ? 0 : 100}%`)
    };

    useEffect(() => {
        if (context.count > 0) {
            setDrawerStyle({
                transform:  getTranslate(`${positived ? "" : "-"}${context.count * 100}px`),
                transition: 'transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86)',
            });
        } else {
            setDrawerStyle({
                transition: 'transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86)',
            });

            setTimeout(() => {
                setDrawerStyle({});
            }, 300);
        }
    }, [context.count]);

    useEffect(() => {
        if (state === ENTERING) {
            if (subContext.addDrawer) {
                subContext.addDrawer();
            }
        } else if (state === EXITING) {
            if (subContext.removeDrawer) {
                subContext.removeDrawer();
            }
        }
    }, [state]);

    useEffect(() => {
        const content = ref.current as HTMLElement;
        if (!moveSelector || !content) { return; }
        const moveEles = document.querySelectorAll(moveSelector);

        // open
        if (state.indexOf("en") !== -1) {
            [].forEach.call(moveEles, (ele: HTMLElement) => {
                ele.style.transform = getTranslate(`${positived ? "" : "-"}${content.clientWidth}px`);
                ele.style.transition = 'transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86)';
            });
        } else {
            if (state === EXITED) {
                [].forEach.call(moveEles, (ele: HTMLElement) => {
                    ele.style.transform = null;
                    ele.style.transition = null;
                });
            } else {
                [].forEach.call(moveEles, (ele: HTMLElement) => {
                    ele.style.transform = getTranslate(`${positived ? "" : "-"}${0}px`);;
                });
            }
        }
    }, [moveSelector, state]);

    useEffect(() => {
        const scrollContainer = useFixed ? document.body : container;
        if (scrollContainer) {
            if (opening) {
                scrollContainer.style.overflow = "hidden";
            } else {
                if (context.count - 1 <= 0) {
                    scrollContainer.style.overflow = null;
                }
            }
        }
    }, [opening, context.count]);

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
