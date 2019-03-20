import React, { useState } from "react";
import Drawer from "../src";
import "./index.scss";

export default function() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <h1>通过覆盖css, 来自定义抽屉打开, 关闭动画</h1>
            <br />
            <button onClick={() => setOpen(true)}>点击打开抽屉</button>
            <div className="drawer-container" />
            <Drawer open={open} onChange={setOpen}>
                <p>抽屉里的内容</p>
            </Drawer>
        </div>
    );
}
