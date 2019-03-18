import React, { useState, useRef } from "react";
import Drawer from "../src";
import "./index.scss";

export default function() {
    const ref = useRef();
    const [open, setOpen] = useState(false);

    return (
        <div>
            <h1>指定抽屉所在容器</h1>
            <button onClick={() => setOpen(true)}>点击打开抽屉</button>

            <div className="drawer-container" ref={ref} />

            <Drawer open={open} onChange={setOpen} getContainer={() => ref.current}>
                <p style={{ height: '100%', margin: '0', padding: '10px', background: 'aqua' }}>抽屉里的内容</p>
            </Drawer>
        </div>
    );
}
