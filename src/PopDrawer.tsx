import React from "react";
import ReactDOM from "react-dom";
import Drawer from "./index";
import { DrawerProps } from "./interface";

export function popDrawer(config: DrawerProps) {
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
