import classNames from "classnames";
import React from "react";
import { useControll, usePortal } from "utils-hooks";
import { DrawerContext } from "./Context";
import { useDrawerContext } from "./Hooks/useDrawerContext";
import useDrawerState from "./Hooks/useDrawerState";
import useDrawerVisible from "./Hooks/useDrawerVisible";
import { DrawerProps } from "./interface";

export function Drawer(props: DrawerProps) {
    const { prefixCls = "xy-drawer", defaultOpen, className, style, getContainer, width, height, fixed = true, placement = "left", showMask = true, maskClose = true, moveSelector, onChange, children, onUnmount, ...rest } = props;
    const [renderPortal, container] = usePortal("", getContainer);
    const [open, setOpen, isControll] = useControll(props, "open", "defaultOpen", false);
    const stateReturn = useDrawerState(open, props);
    const [ref, state, opening, positived, getTranslate] = stateReturn;
    const [context, drawerStyle, currentContext] = useDrawerContext(state, positived, getTranslate);
    const contentStyle: React.CSSProperties = { width, height };
    const classString = classNames(prefixCls, className, `${prefixCls}-${placement}`, `state-${state}`, { [`${prefixCls}-open`]: opening, "use-container": !fixed });

    // state改变时触发
    useDrawerVisible(props, stateReturn, container, currentContext);

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
