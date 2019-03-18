import React, { useState } from "react";
import Drawer from "../src";

export default function() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <h1>推开元素</h1>
            <button onClick={() => setOpen(true)}>点击打开抽屉</button>

            <div className="drawer-container" />

            <Drawer open={open} onChange={setOpen} moveSelector=".drawer-container">
                <p>抽屉里的内容</p>
            </Drawer>
        </div>
    );
}