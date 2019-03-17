import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import useControll from "utils-hooks/es/useControll";
import { DrawerProps, GetDrawerContainerFuc } from "./interface";
import { useTranstion } from "./useTranstion";
import { useTrans } from "./useTrans";

function useContainer(getContainer: HTMLElement | GetDrawerContainerFuc) {
    const containerRef = useRef<HTMLElement>(null);

    // 在组件装卸时, 清除再body内创建的 container
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
            container = document.createElement("div");
            document.body.append(container);
            containerRef.current = container;
        } else {
            return containerRef.current;
        }
    } else if (getContainer instanceof Function) {
        container = getContainer();
    } else {
        container = getContainer;
    }

    return container;
}

function useChangeStyle(open: boolean, container: HTMLElement | null, getContainer: HTMLElement | GetDrawerContainerFuc) {
    const containerBody = getContainer ? container : document.body;
    if (!containerBody) {
        return;
    }
    if (open) {
        containerBody.style.overflow = "hidden";
    } else {
        containerBody.style.overflow = null;
    }
}

export function Drawer(props: DrawerProps): React.ReactPortal {
    const { prefixCls = "xy-drawer", className, style, defaultOpen, getContainer, moveSelector, width, height, placement = "left", showMask = true, maskClose = true, onChange, children, ...rest } = props;
    const [open, setOpen, isControll] = useControll(props, "open", "defaultOpen", false);
    const container = useContainer(getContainer);
    const [ref, state] = useTrans(open);
    const classString = classNames(prefixCls, className, `${prefixCls}-${placement}`, `state-${state}`, {
        [`${prefixCls}-open`]: open,
        "use-container": Boolean(getContainer)
    });

    const direction = placement === "left" || placement === "right" ? "X" : "Y";
    const contentStyle: React.CSSProperties = {
        width,
        height,
        transform: `translate${direction}(${placement === "bottom" || placement === "left" ? "-" : ""}${state.indexOf("en") !== -1 ? "0" : "100"}%)`
    };

    // if (open) {
    //     if (contentRef.current && moveSelector) {
    //         const content = contentRef.current as HTMLElement;
    //         const moveEles = document.querySelectorAll(moveSelector);
    //         [].forEach.call(moveEles, (ele: HTMLElement) => {
    //             ele.style.transform = `translate${direction}(${placement === "bottom" || placement === "left" ? "-" : ""}${content.clientWidth})`;
    //         });
    //     }
    // }

    useChangeStyle(state.indexOf("en") !== -1, container, getContainer);

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
            <div className={`${prefixCls}-content`} style={contentStyle} ref={ref}>
                {children}
            </div>
        </div>,
        container
    );
}

export default React.memo(Drawer);
