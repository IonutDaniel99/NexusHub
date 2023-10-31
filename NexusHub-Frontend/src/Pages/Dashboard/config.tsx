import ConsolePanel from "@/panels/ConsolePanel/ConsolePanel";
import OnboardingPanel from "@/panels/OnboardingPanel/OnboardingPanel";
import WeatherPanel from "@/panels/WeatherPanel/WeatherPanel";
import React, { ReactElement } from "react";
import { ExpandButton, RemoveButton, SplitButton } from "react-mosaic-component";
import { IPanel } from "./types";

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


export const PANELS_MAP: Record<string, IPanel> = {
    a: {
        title: "a",
        component: <ConsolePanel />
    },
    b: {
        title: "b",
        component: null
    },
    c: {
        title: "c",
        component: null
    },
    d: {
        title: "d",
        component: null
    },
    e: {
        title: "e",
        component: null
    },
};