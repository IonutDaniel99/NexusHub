import ConsolePanel from "@/panels/ConsolePanel/ConsolePanel";
import OnboardingPanel from "@/panels/OnboardingPanel/OnboardingPanel";
import WeatherPanel from "@/panels/WeatherPanel/WeatherPanel";
import React, { ReactElement } from "react";
import { ExpandButton, RemoveButton, SplitButton } from "react-mosaic-component";
import { IPanel, IPanelConfig } from "./types";
import { Console, Temperature, User } from "@blueprintjs/icons";

export const PANELS_CONFIG: Record<string, ReactElement> = {
    "Onboarding": <OnboardingPanel />,
    "Weather": <WeatherPanel />,
    "Console": <ConsolePanel />,
};

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
        title: "Console",
        component: <ConsolePanel />
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

export const SERVICES_CONFIG: Record<string, IPanelConfig> = {
    "Onboarding": { "icon": <User />, "selectable": false },
    "Weather": { "icon": <Temperature />, "selectable": true },
    "Console": { "icon": <Console />, "selectable": true },
}