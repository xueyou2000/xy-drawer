import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import useControll from "utils-hooks/es/useControll";
import { DrawerProps, GetDrawerContainerFuc } from "./interface";

function useContainer(getContainer: HTMLElement | GetDrawerContainerFuc) {
    const containerRef = useRef<HTMLElement>(null);

    // 在组件装卸时, 清除 container
    useEffect(() => {
        return () => {
            if (containerRef.current) {
                document.body.removeChild(containerRef.current);
            }
        };
    }, []);

    let container: HTMLElement;
    if (!getContainer) {
        // 未提供 container 则在Body下创建div作为容器
        if (!containerRef.current) {
            containerRef.current = document.createElement("div");
            document.body.append(containerRef.current);
        } else {
            return containerRef.current;
        }
        container = containerRef.current;
    } else if (getContainer instanceof Function) {
        container = getContainer();
    } else {
        container = getContainer;
    }

    return containerRef.current;
}

function useFixBodyStyle(open: boolean) {
    const { body } = document;
    if (open) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = null;
    }
}

export function Drawer(props: DrawerProps): React.ReactPortal {
    const { prefixCls = "xy-drawer", className, style, defaultOpen, getContainer, moveSelector, width, height, placement = "left", showMask = true, maskClose = true, onChange, children, ...rest } = props;
    const [open, setOpen, isControll] = useControll(props, "open", "defaultOpen", false);
    const classString = classNames(prefixCls, className, `${prefixCls}-${placement}`, {
        [`${prefixCls}-open`]: open
    });

    const direction = placement === "left" || placement === "right" ? "X" : "Y";
    const contentStyle: React.CSSProperties = {
        width,
        height,
        transform: open ? null : `translate${direction}(${placement === "bottom" || placement === "left" ? "-" : ""}100%)`
    };

    useFixBodyStyle(open);

    const container = useContainer(getContainer);

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

    if (!container) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className={classString} style={style} {...rest}>
            {showMask && <div className={`${prefixCls}-mask`} onClick={handleMaskClick} />}
            <div className={`${prefixCls}-content`} style={contentStyle}>
                {children}
            </div>
        </div>,
        container
    );
}

export default React.memo(Drawer);
