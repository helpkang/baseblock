module.exports = class CommandHandler {

    /**
     * 
     * @param {command distingush string} commandStr 
     * @param {data Buffer except command} buffer 
     * @param {udp remote info} remote 
     */
    handle(commandStr, buffer, remote) {
        throw new Error('handle function must implmented.')
    }

}
