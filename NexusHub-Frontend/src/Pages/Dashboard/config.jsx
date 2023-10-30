import ConsolePanel from "@/src/panels/ConsolePanel/ConsolePanel";
import OnboardingPanel from "@/src/panels/OnboardingPanel/OnboardingPanel";
import WeatherPanel from "@/src/panels/WeatherPanel/WeatherPanel";
import React from "react";
import { ExpandButton, RemoveButton, SplitButton } from "react-mosaic-component";

export const PANELS_CONFIG = {
    "Onboarding": <OnboardingPanel />,
    "Weather": <WeatherPanel />,
    "Console": <ConsolePanel />,
}

export const DEFAULT_CONTROLS_WITH_CREATION = React.Children.toArray([
    <ExpandButton />,
    <SplitButton />,
    <RemoveButton />,
]);

export const PANELS_MAP = {
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