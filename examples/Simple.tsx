import React, { useState } from "react";
import { Drawer } from "../src";

export default function() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <h1>简单演示</h1>
            <br />
            <button onClick={() => setOpen(true)}>点击打开抽屉</button>
            <div className="drawer-container" />
            <Drawer open={open} onChange={setOpen}>
                <p>抽屉里的内容</p>
            </Drawer>
        </div>
    );
}
