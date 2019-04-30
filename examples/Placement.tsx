import React, { useState } from "react";
import { Drawer } from "../src";
import "../src/assets/index";

export default function() {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<"left" | "top" | "right" | "bottom">("left");

    return (
        <div>
            <button onClick={() => setOpen(true)}>点击打开抽屉</button>
            <div>
                <br />
                <label>选择方向</label>
                <select value={placement} onChange={(e) => setPlacement(e.target.value as any)}>
                    <option value="left">左边</option>
                    <option value="right">右边</option>
                    <option value="top">上边</option>
                    <option value="bottom">下边</option>
                </select>
            </div>

            <Drawer open={open} onChange={setOpen} placement={placement}>
                <p>抽屉方向 {placement}</p>
            </Drawer>
        </div>
    );
}
