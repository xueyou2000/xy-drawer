import React, { useEffect } from "react";
import { EXITED } from "utils-hooks";
import { DrawerContextState, DrawerProps } from "../interface";
import { Transition } from "./useDrawerContext";
import { UseDrawerStateReturn } from "./useDrawerState";

/**
 * 推开元素
 * @description 抽屉打开时候推开元素, 抽屉关闭时候还原
 */
function pushElements(props: DrawerProps, params: UseDrawerStateReturn) {
    const [ref, state, opening, positived, getTranslate] = params;

    const { moveSelector } = props;
    const content = ref.current as HTMLElement;
    let moveEles: NodeListOf<Element>;
    function setMoveElesStyle(sty: React.CSSProperties) {
        [].forEach.call(moveEles, (ele: HTMLElement) => {
            for (let key in sty) {
                ele.style[key] = sty[key];
            }
        });
    }

    if (content && moveSelector) {
        moveEles = document.querySelectorAll(moveSelector);
        if (state.indexOf("en") !== -1) {
            setMoveElesStyle({ transform: getTranslate(`${positived ? "" : "-"}${content.clientWidth}px`), transition: Transition });
        } else if (state === EXITED) {
            setMoveElesStyle({ transform: null, transition: null });
        } else {
            setMoveElesStyle({ transform: getTranslate(`${positived ? "" : "-"}${0}px`) });
        }
    }
}

/**
 * 切换显示滚动条
 * @description 显示抽屉时隐藏滚动条， 显示时恢复
 */
function toggleScrollDisplay(props: DrawerProps, params: UseDrawerStateReturn, container: HTMLElement, context: DrawerContextState) {
    const { fixed = true } = props;
    const [_, state, opening] = params;

    const scrollContainer = fixed ? document.body : container;
    if (scrollContainer) {
        if (opening) {
            scrollContainer.style.overflow = "hidden";
        } else if (state === EXITED && context === null) {
            scrollContainer.style.overflow = "auto";
        }
    }
}

export default function useDrawerVisible(props: DrawerProps, params: UseDrawerStateReturn, container: HTMLElement, context: DrawerContextState) {
    const { onUnmount } = props;
    const [_, state] = params;

    useEffect(() => {
        pushElements(props, params);
        toggleScrollDisplay(props, params, container, context);

        // 关闭动画完毕触发onUnmount事件
        if (state === EXITED && onUnmount) {
            onUnmount();
        }
    }, [params[1]]);
}
