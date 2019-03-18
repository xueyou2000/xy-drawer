import React, { useState } from "react";
import Drawer from "../src";

export default function() {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<"left" | "top" | "right" | "bottom">('left');

    return (
        <div>
            <h1>插入方向, 支持上下左右4种方向弹出抽屉</h1>
            <button onClick={() => setOpen(true)}>点击打开抽屉</button>
            <div>
                <br/>
                <label>选择方向</label>
                <select value={placement} onChange={e => setPlacement(e.target.value as any)}>
                    <option value="left">左边</option>
                    <option value="right">右边</option>
                    <option value="top">上边</option>
                    <option value="bottom">左下</option>
                </select>
            </div>

            <Drawer open={open} onChange={setOpen} placement={placement}>
                <p>抽屉里的内容</p>
            </Drawer>
        </div>
    );
}
