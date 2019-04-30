import React, { useState } from "react";
import { Drawer } from "../src";
import "../src/assets/index";

export default function() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setOpen(true)}>点击打开抽屉</button>
            <Drawer open={open} onChange={setOpen}>
                <p>简单使用</p>
            </Drawer>
        </div>
    );
}
