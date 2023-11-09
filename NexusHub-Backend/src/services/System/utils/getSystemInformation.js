import * as si from 'systeminformation'
import {logger} from "../../../utils/winston_logger.js";

export const getSystemInformation = async () => {
    const startTime = new Date().getTime();
    let valueObject = {
        system: 'model, manufacturer',
        cpu: "manufacturer, brand, speed, cores, physicalCores",
        mem: "total, free, used",
        currentLoad: 'currentLoad',
        processes: "all, blocked",
        wifiConnections: "*",
    }

    return si.get(valueObject).then(data => {
        return data;
    }).catch(error => {
        logger.error("SystemInformation failed with error:", error)
        return error
    })
}