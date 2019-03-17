import { useCallback, useEffect, useRef } from "react";

export enum TransitionState {
    /**
     * 进入过渡前
     */
    EnterBefore = "EnterBefore",
    /**
     * 进入过渡中
     */
    Entering = "Entering",
    /**
     * 进入过渡完毕
     */
    Entered = "Entered",
    /**
     * 离开过渡前
     */
    ExitBefore = "ExitBefore",
    /**
     * 离开过渡中
     */
    Exiting = "Exiting",
    /**
     * 离开过渡完毕
     */
    Exited = "Exited",
    /**
     * 无状态
     */
    None = "None"
}

export function useTranstion(visible: boolean, name: string) {
    const ref = useRef();

    const transitionClass = {
        enter: `${name}-enter`,
        enterActive: `${name}-enter-active`,
        enterTo: `${name}-enter-to`,
        leave: `${name}-leave`,
        leaveActive: `${name}-leave-active`,
        leaveTo: `${name}-leave-to`
    };

    const handleTransitionEnter = useCallback((e: TransitionEvent) => {
        const element = ref.current as HTMLElement;
        if (e.target === element) {
            element.classList.remove(transitionClass.enterActive, transitionClass.enterTo);
        }
    }, []);

    const handleTransitionLeave = useCallback((e: TransitionEvent) => {
        const element = ref.current as HTMLElement;
        if (e.target === element) {
            element.classList.remove(transitionClass.leaveActive, transitionClass.leaveTo);
            element.style.display = "none";
        }
    }, []);

    useEffect(() => {
        const element = ref.current as HTMLElement;
        if (!element) {
            return;
        }
        const { classList } = element;

        if (visible) {
            // 重置离开的样式和事件
            element.removeEventListener("transitionend", handleTransitionLeave);
            element.removeEventListener("animationend", handleTransitionLeave);
            classList.remove(transitionClass.leave, transitionClass.leaveActive, transitionClass.leaveTo);

            // 1. 监听过度完毕事件
            element.addEventListener("transitionend", handleTransitionEnter);
            element.addEventListener("animationend", handleTransitionEnter);

            // 2. 设置进入开始样式
            element.style.display = null;
            classList.add(transitionClass.enter, transitionClass.enterActive);

            requestAnimationFrame(() => {
                // 3. 设置进入中样式
                classList.remove(transitionClass.enter);
                classList.add(transitionClass.enterTo);
            });
        } else {
            // 重置离开的样式和事件
            element.removeEventListener("transitionend", handleTransitionEnter);
            element.removeEventListener("animationend", handleTransitionEnter);
            classList.remove(transitionClass.enter, transitionClass.enterActive, transitionClass.enterTo);

            // 1. 监听过度完毕事件
            element.addEventListener("transitionend", handleTransitionLeave);
            element.addEventListener("animationend", handleTransitionLeave);

            // 2. 设置进入开始样式
            classList.add(transitionClass.leave, transitionClass.leaveActive);
            element.style.display = null;

            requestAnimationFrame(() => {
                // 3. 设置进入中样式
                classList.remove(transitionClass.leave);
                classList.add(transitionClass.leaveTo);
            });
        }
    }, [visible]);

    return ref;
}
