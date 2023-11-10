export interface SystemInfo {
    system: {
        model: string;
        manufacturer: string;
    };
    cpu: {
        manufacturer: string;
        brand: string;
        speed: number;
        cores: number;
        physicalCores: number;
        speedMin: number;
        speedMax: number;
        governor: string;
    };
    mem: {
        total: number;
        free: number;
        used: number;
    };
    currentLoad: {
        currentLoad: number;
    };
    fsSize: Array<{
        size: number;
        used: number;
        use: number;
        mount: string;
    }>;
    wifiConnections: Array<{
        frequency: number;
        iface: string;
        model: string;
        security: string;
        signalLevel: string;
        ssid: string;
    }>;
}
