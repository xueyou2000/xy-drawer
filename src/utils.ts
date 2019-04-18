/**
 * 计算方向
 * @param placement
 * @returns [是否正向, 获取变换函数]
 */
export function calcPlacement(placement: "left" | "top" | "right" | "bottom"): [boolean, (x: string) => string] {
    const direction = placement === "left" || placement === "right" ? "X" : "Y";
    const positived = placement === "top" || placement === "left";
    const getTranslate = (distance: string) => `translate${direction}(${distance})`;
    return [positived, getTranslate];
}
