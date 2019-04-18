import React from "react";
import ReactDOM from "react-dom";
import Drawer from "./Drawer";
import { DrawerProps } from "./interface";

/**
 * js方式弹出抽屉
 * @param config
 */
export default function DrawerPopup(config: DrawerProps) {
    const div = document.createElement("div");
    document.body.appendChild(div);

    ReactDOM.render(
        <Drawer
            {...config}
            defaultOpen={true}
            getContainer={div}
            onUnmount={() => {
                ReactDOM.unmountComponentAtNode(div);
                div.parentNode.removeChild(div);
            }}
        />,
        div
    );
}
