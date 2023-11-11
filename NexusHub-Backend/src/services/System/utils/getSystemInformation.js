import * as si from 'systeminformation'
import {logger} from "../../../utils/winston_logger.js";

export const getSystemInformation = async () => {
    let valueObject = {
        cpu: "manufacturer, brand, speed, cores, physicalCores, speedMin, speedMax",
        mem: "total, free, used",
        currentLoad: 'currentLoad',
        fsSize: "size, used, use, mount | *",
        wifiConnections: "frequency, iface, model, security, signalLevel, ssid | *",
    }

    return si.get(valueObject).then(data => {
        return data;
    }).catch(error => {
        logger.error("SystemInformation failed with error:", error)
        return error
    })
}