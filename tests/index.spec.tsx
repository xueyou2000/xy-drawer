import React from "react";
import { render, fireEvent } from "react-testing-library";
import Drawer from "../src";

describe("Drawer", () => {

    test("render by default open", () => {
        const container = document.createElement('div');
        document.body.append(container);
        const wrapper = render(<Drawer defaultOpen={true} getContainer={container}><p>抽屉里的内容</p></Drawer>, { container });

        const content = wrapper.getByText('抽屉里的内容').parentElement;
        expect(content.style.transform).toBe("translateX(-0%)");
        const drawer = wrapper.container.querySelector('.xy-drawer');
        expect(drawer.classList.contains('xy-drawer-open')).toBeTruthy();
        const mask = wrapper.container.querySelector('.xy-drawer-mask');
        expect(mask).toBeDefined();

        // 模拟关闭
        fireEvent.click(mask);
        expect(drawer.classList.contains('xy-drawer-open')).toBeFalsy();
    });

    test('placement right', () => {
        const container = document.createElement('div');
        document.body.append(container);
        const wrapper = render(<Drawer open={false} placement="right" getContainer={container}><p>抽屉里的内容</p></Drawer>, { container });

        const content = wrapper.getByText('抽屉里的内容').parentElement;
        expect(content.style.transform).toBe("translateX(100%)");

        wrapper.rerender(<Drawer open={true} placement="right" getContainer={container}><p>抽屉里的内容</p></Drawer>);
        expect(content.style.transform).toBe("translateX(0%)");

        const drawer = wrapper.container.querySelector('.xy-drawer');
        expect(drawer.classList.contains('xy-drawer-right')).toBeTruthy();
    });

    test('placement top', () => {
        const container = document.createElement('div');
        document.body.append(container);
        const wrapper = render(<Drawer open={false} placement="top" getContainer={container}><p>抽屉里的内容</p></Drawer>, { container });

        const content = wrapper.getByText('抽屉里的内容').parentElement;
        expect(content.style.transform).toBe("translateY(-100%)");

        wrapper.rerender(<Drawer open={true} placement="top" getContainer={container}><p>抽屉里的内容</p></Drawer>);
        expect(content.style.transform).toBe("translateY(-0%)");

        const drawer = wrapper.container.querySelector('.xy-drawer');
        expect(drawer.classList.contains('xy-drawer-top')).toBeTruthy();
    });

    test('placement bottom', () => {
        const container = document.createElement('div');
        document.body.append(container);
        const wrapper = render(<Drawer open={false} placement="bottom" getContainer={container}><p>抽屉里的内容</p></Drawer>, { container });

        const content = wrapper.getByText('抽屉里的内容').parentElement;
        expect(content.style.transform).toBe("translateY(100%)");

        wrapper.rerender(<Drawer open={true} placement="bottom" getContainer={container}><p>抽屉里的内容</p></Drawer>);
        expect(content.style.transform).toBe("translateY(0%)");

        const drawer = wrapper.container.querySelector('.xy-drawer');
        expect(drawer.classList.contains('xy-drawer-bottom')).toBeTruthy();
    });


    test('hide mask', () => {
        const container = document.createElement('div');
        document.body.append(container);
        const wrapper = render(<Drawer defaultOpen={true} showMask={false} getContainer={container}><p>抽屉里的内容</p></Drawer>, { container });

        const mask = wrapper.container.querySelector('.xy-drawer-mask');
        expect(mask).toBeNull();
    });

    test('mask can not close', () => {
        const container = document.createElement('div');
        document.body.append(container);
        const wrapper = render(<Drawer defaultOpen={true} maskClose={false} getContainer={container}><p>抽屉里的内容</p></Drawer>, { container });
        const drawer = wrapper.container.querySelector('.xy-drawer');
        const mask = wrapper.container.querySelector('.xy-drawer-mask');

        // 模拟关闭
        fireEvent.click(mask);
        expect(drawer.classList.contains('xy-drawer-open')).toBeTruthy();

    });

    test('use width', () => {
        const container = document.createElement('div');
        document.body.append(container);
        const wrapper = render(<Drawer defaultOpen={true} width="500px" getContainer={container}><p>抽屉里的内容</p></Drawer>, { container });

        const content = wrapper.container.querySelector('.xy-drawer-content') as HTMLElement;
        expect(content.style.width).toBe('500px');
    });


});
