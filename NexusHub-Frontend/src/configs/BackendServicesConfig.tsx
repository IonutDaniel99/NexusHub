
import { Console, Temperature, User } from "@blueprintjs/icons";
import { IPanelConfig } from "@/Pages/Dashboard/types";

export const SERVICES_CONFIG: Record<string, IPanelConfig> = {
    "Onboarding": { "icon": <User />, "selectable": false },
    "Weather": { "icon": <Temperature />, "selectable": true },
    "Console": { "icon": <Console />, "selectable": true },
}