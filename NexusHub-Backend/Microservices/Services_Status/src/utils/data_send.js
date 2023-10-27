export const objectToSendFunc = (type, message, microservice) => {
    const current_unix = new Date().valueOf()
    const objectToEmit = {
        type: type,
        message: message,
        service: microservice,
        recivedDate: current_unix,
    }
    return objectToEmit
}