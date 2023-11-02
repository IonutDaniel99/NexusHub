import ConsolePanel from "@/panels/BackendPanels/ConsolePanel/ConsolePanel";
import OnboardingPanel from "@/panels/BackendPanels/OnboardingPanel/OnboardingPanel";
import WeatherPanel from "@/panels/BackendPanels/WeatherPanel/WeatherPanel";
import React, { ReactElement } from "react";
import SettingsPanel from "@/panels/ClientPanels/SettingsPanel/SettingsPanel";

export const GLOBAL_PANELS_CONFIG: Record<string, ReactElement> = {
    "Onboarding": <OnboardingPanel />,
    "Weather": <WeatherPanel />,
    "Console": <ConsolePanel />,
    "Settings": <SettingsPanel />
};