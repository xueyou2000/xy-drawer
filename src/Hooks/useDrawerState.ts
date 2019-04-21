import { DrawerProps } from "../interface";
import { calcPlacement } from "../utils";
import { useTranstion } from "utils-hooks";

export type UseDrawerStateReturn = [React.MutableRefObject<undefined>, string, boolean, boolean, (x: string) => string];

export default function useDrawerState(open: boolean, props: DrawerProps): UseDrawerStateReturn {
    const { placement = "left" } = props;
    const [ref, state] = useTranstion(open);
    const opening = state.indexOf("en") !== -1;
    const [positived, getTranslate] = calcPlacement(placement);

    return [ref, state, opening, positived, getTranslate];
}
