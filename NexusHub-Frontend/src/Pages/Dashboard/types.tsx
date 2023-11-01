import { ReactElement } from "react";
export interface IServiceData {
    "service_name": string,
    "status_code": number,
    "error": string | null | any
}

export interface IErrorResponse {
    // Define the structure of your error response if applicable
    // For example:
    // errorCode: number;
    // errorMessage: string;
    // ...
}


export interface IPanel {
    title: string;
    component: ReactElement | null;
}

export interface IPanelConfig {
    icon: any,
    selectable: boolean,
}
