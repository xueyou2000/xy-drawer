import React, { useState } from "react";
import { popDrawer } from "../src";

export default function() {
    function pop() {
        popDrawer({
            children: <p>js弹出的抽屉</p>
        });
    }

    return (
        <div>
            <h1>js主动弹出</h1>
            <br />
            <button onClick={pop}>点击打开抽屉</button>
            <div className="drawer-container" />
        </div>
    );
}
