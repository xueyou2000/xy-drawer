import React, { useState } from "react";
import { Drawer } from "../src";
import "../src/assets/index";

export default function() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="move">
                <button onClick={() => setOpen(true)}>点击打开抽屉</button>
                <Drawer open={open} onChange={setOpen} moveSelector=".xy-manual-container">
                    <p>抽屉里的内容</p>
                </Drawer>
            </div>
        </div>
    );
}
