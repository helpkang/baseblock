const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs"))

const crypto = require('crypto')

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

   async makeHash(){
        const stream = fs.createReadStream(this.fileName, {
            highWaterMark: 1024
        })

        const wfd = await fs.openAsync(this.fileName+'.hash', 'w')

        
        stream.on('data', (chunk) => {
            const sha256 = crypto.createHash('sha256')
            const hash = sha256.update(chunk).digest('base64')+'\n'
            fs.write(wfd, hash)

        }).on('end', () => {
            fs.close(wfd)
        })

    }

}

async function read() {
    const frr = new FileRandomRead()
    let l
    l = await frr.read(100)
    if(l)console.log(l.toString())
}

// read()
const frr = new FileRandomRead()
frr.makeHash()
