const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs"))

class FileRandomRead {
    constructor() {
        this.fileName = './sample/sample.txt'
    }

    async read(length = 10) {
        const fd = await fs.openAsync(this.fileName, 'r')

        
        const buffer = new Buffer(length);
        const start = 0

        await fs.readAsync(fd, buffer, 0, length, start);
        return buffer
        
    }

}

async function read() {
    const frr = new FileRandomRead()
    let l
        l = await frr.read(100)
        if(l)console.log(l.toString())
}

read()