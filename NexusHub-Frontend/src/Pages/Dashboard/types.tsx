import { ReactElement } from "react";

export interface IServiceData {
    // Define the structure of your service data here
    // For example:
    // id: number;
    // name: string;
    // status: string;
    // ...
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