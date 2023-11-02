import { IPanelConfig } from "@/Pages/Dashboard/types";
import { CogIcon, User } from "lucide-react";
import { ReactElement } from "react";

export const CLIENT_SERVICES_CONFIG: Record<string, IPanelConfig> = {
    "Settings": { "icon": <CogIcon />, "selectable": false },
}

export const CLIENT_PANELS_OBJECT = [
    {
        "service_name": "Settings",
    }
]