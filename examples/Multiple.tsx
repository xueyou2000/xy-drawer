import React, { useState } from "react";
import { Drawer } from "../src";
import "../src/assets/index";

export default function() {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const container = document.querySelector(".xy-manual-container") as HTMLElement;
    if (container) {
        container.style.transform = `rotateY(${open ? "-16" : "0"}deg)`;
    }

    return (
        <div style={{ perspective: "1500px" }}>
            <div>
                <h1>多个抽屉嵌套</h1>
                <br />
                <button onClick={() => setOpen(true)}>点击打开抽屉</button>

                <Drawer open={open} onChange={setOpen} id="抽屉1">
                    <p>抽屉1内容</p>
                    <button onClick={() => setOpen2(true)}>打开子抽屉</button>

                    <Drawer open={open2} onChange={setOpen2} id="抽屉2">
                        <p>抽屉2内容</p>
                        <button onClick={() => setOpen3(true)}>打开子子抽屉</button>

                        <Drawer open={open3} onChange={setOpen3} id="抽屉3">
                            <p>抽屉3内容</p>
                        </Drawer>
                    </Drawer>
                </Drawer>
            </div>
        </div>
    );
}
