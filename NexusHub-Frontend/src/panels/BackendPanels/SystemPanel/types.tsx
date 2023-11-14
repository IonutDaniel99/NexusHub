export interface SystemInfo {
    cpu: {
        manufacturer: string;
        brand: string;
        speed: number;
        cores: number;
        physicalCores: number;
        speedMin: number;
        speedMax: number;
    };
    mem: {
        total: number;
        free: number;
        used: number;
    };
    currentLoad: {
        currentLoad: number;
    };

    fsSize: FileSystemSize[];
    wifiConnections: Array<{
        frequency: number;
        iface: string;
        model: string;
        security: string;
        signalLevel: string;
        ssid: string;
    }>;
    inetLatency: number;
    osInfo: {
        platform: string;
        distro: string;
        release: string;
        arch: string;
    };
    versions: {
        kernel: string;
        openssl: string;
        systemOpenssl: string;
        systemOpensslLib: string;
        node: string;
        v8: string;
        npm: string;
        yarn: string;
        pm2: string;
        gulp: string;
        grunt: string;
        git: string;
        tsc: string;
        mysql: string;
        redis: string;
        mongodb: string;
        apache: string;
        nginx: string;
        php: string;
        docker: string;
        postfix: string;
        postgresql: string;
        perl: string;
        python: string;
        python3: string;
        pip: string;
        pip3: string;
        java: string;
        gcc: string;
        virtualbox: string;
        bash: string;
        zsh: string;
        fish: string;
        powershell: string;
        dotnet: string;
    };
    graphics: {
        controllers: GraphicsController[];
        displays: Display[];
    };
    battery: {
        cycleCount: number;
        isCharging: boolean;
        designedCapacity: number;
        currentCapacity: number;
        voltage: number;
        percent: number;
        timeRemaining: number | null;
        acConnected: boolean;
        manufacturer: string;
    };
    default_interface: NetworkInterface;
}

export interface FileSystemSize {
    size: number;
    used: number;
    use: number;
    mount: string;
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

export interface GraphicsController {
    vendor: string;
    model: string;
    bus: string;
    vram: number;
    vramDynamic: boolean;
    subDeviceId?: string;
    driverVersion?: string;
    name?: string;
    pciBus?: string;
    memoryTotal?: number;
    memoryFree?: number;
    temperatureGpu?: number;
    clockCore?: number;
    clockMemory?: number;
}

export interface Display {
    vendor: string;
    model: string;
    deviceName: string;
    main: boolean;
    builtin: boolean;
    connection: string;
    resolutionX: number;
    resolutionY: number;
    sizeX: number;
    sizeY: number;
    pixelDepth: string;
    currentResX: number;
    currentResY: number;
    positionX: number;
    positionY: number;
    currentRefreshRate: number;
}