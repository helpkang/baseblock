module.exports = {
    stringToBuffer(str) {
        const strBuffer = Buffer.from(str)

        const length = strBuffer.length

        const retBuffer = new Buffer(length + 1)

        retBuffer.writeInt8(length, 0)
        strBuffer.copy(retBuffer, 1)

        return retBuffer
    },

    merge() {
        const buffers = [...arguments]
        const length = buffers.reduce((len, buffer) => len + buffer.length, 0)
        const mergeBuffer = new Buffer(length)
        let position = 0
        buffers.forEach((buffer) => {
            buffer.copy(mergeBuffer, position)
            position += buffer.length
        })

        return mergeBuffer

    },

    makeCommandData(command, data) {
        const commandBuffer = this.stringToBuffer(command)
        if(!data) return commandBuffer
        const merge = this.merge(commandBuffer, data)
        return merge
    },

    paseCommandData(buffer) {
        const commandLen = buffer.readUInt8(0)
        
        const commandStr = buffer.slice(1, commandLen+1).toString()
        const data = buffer.length> commandLen+1 ?  buffer.slice(commandLen+1) : new Buffer(0)

        return { commandStr, data }
    },

}