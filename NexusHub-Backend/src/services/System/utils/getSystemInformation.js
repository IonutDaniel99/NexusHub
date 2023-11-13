import * as si from 'systeminformation'
import {logger} from "../../../utils/winston_logger.js";


export const getSystemInformation = async () => {

    const default_interface = await si.networkInterfaces('default').then(data => {
        return data
    });

    let valueObject = {
        cpu: "manufacturer, brand, speed, cores, physicalCores, speedMin, speedMax",
        mem: "total, free, used",
        currentLoad: 'currentLoad',
        fsSize: "size, used, use, mount | *",
        wifiConnections: "frequency, iface, model, security, signalLevel, ssid | *",
        inetLatency: "*"
    }

    return si.get(valueObject).then(data => {
        return {
            ...data,
            default_interface
        };
    }).catch(error => {
        logger.error("SystemInformation failed with error:", error)
        return error
    })
}