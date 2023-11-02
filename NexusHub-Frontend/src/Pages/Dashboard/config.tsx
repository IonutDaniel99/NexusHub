
import React, { ReactElement } from "react";
import { ExpandButton, RemoveButton, SplitButton } from "react-mosaic-component";
import { IPanel, IPanelConfig } from "./types";

export const DEFAULT_CONTROLS_WITH_CREATION = React.Children.toArray([
    <ExpandButton />,
    <SplitButton />,
    <RemoveButton />,
]);

export const INITIAL_TREE_VALUE = {
    first: {
        direction: "column",
        first: {
            direction: "row",
            second: "e",
            first: "b"
        },
        second: {
            direction: "row",
            first: "d",
            second: "c"
        }
    },
    second: "a",
    direction: "row",
    splitPercentage: 75
}

export const PANELS_MAP: Record<string, IPanel> = {
    a: {
        title: "Free",
        component: null
    },
    b: {
        title: "Free",
        component: null
    },
    c: {
        title: "Free",
        component: null
    },
    d: {
        title: "Free",
        component: null
    },
    e: {
        title: "Free",
        component: null
    },
};
