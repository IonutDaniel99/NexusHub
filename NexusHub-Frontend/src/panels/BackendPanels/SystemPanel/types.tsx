export interface SystemInfo {
    system: {
        model: string;
        manufacturer: string;
    };
    default_interface: NetworkInterface,
    inetLatency: number,
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
    fsSize: FileSystem;
    wifiConnections: Array<{
        frequency: number;
        iface: string;
        model: string;
        security: string;
        signalLevel: string;
        ssid: string;
    }>;
}

export interface NetworkInterface {
    iface: string;
    ifaceName: string;
    default: boolean;
    ip4: string;
    ip4subnet: string;
    ip6: string;
    ip6subnet: string;
    mac: string;
    virtual: boolean;
    operstate: string;
    type: string;
    duplex: string;
    mtu: string;
    speed: number;
    dhcp: boolean;
    dnsSuffix: string;
    ieee8021xAuth: string;
    ieee8021xState: string;
    carrierChanges: number;
}


export interface FileSystemSize {
    size: number;
    used: number;
    use: number;
    mount: string;
}

export interface FileSystem {
    fsSize: FileSystemSize[];
}
