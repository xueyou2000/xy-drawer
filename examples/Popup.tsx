import React, { useState } from "react";
import { DrawerPopup } from "../src";
import "../src/assets/index";

export default function() {
    function pop() {
        DrawerPopup({
            children: <p>js弹出的抽屉</p>
        });
    }

    return (
        <div>
            <button onClick={pop}>点击打开抽屉</button>
        </div>
    );
}
