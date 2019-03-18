import React, { useState } from "react";
import Drawer from "../src";

export default function() {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    return (
        <div className="move">
            <h1>多个抽屉嵌套</h1>
            <br/>
            <button onClick={() => setOpen(true)}>点击打开抽屉</button>
            <div className="drawer-container" />

            <Drawer open={open} onChange={setOpen} moveSelector=".move" id="抽屉1">
                <button onClick={() => setOpen2(true)}>打开子抽屉</button>

                <Drawer open={open2} onChange={setOpen2}  id="抽屉2">
                    <p>我是子抽屉内容</p>
                </Drawer>

            </Drawer>
        </div>
    );
}
