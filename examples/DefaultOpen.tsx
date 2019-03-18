import { action } from "@storybook/addon-actions";
import React from "react";
import Drawer from "../src";

export default function() {
    return (
        <div>
            <h1>默认打开, 非受控</h1>
            <br/>
            <div className="drawer-container" />
            <Drawer defaultOpen={true} onChange={action('可视改变')}>
                <p>抽屉里的内容</p>
            </Drawer>
        </div>
    );
}
