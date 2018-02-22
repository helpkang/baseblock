const Promise = require("bluebird")
// const fs = Promise.promisifyAll(require("fs"))
const fs = require("fs")

class FileSplitRead {
    constructor() {
        this.stream = fs.createReadStream('./sample/sample.txt', {
            highWaterMark: 1024 * 10
        })
        this.stream.on('data', (chunk) => {
            this.stream.pause()
            this.resolver(chunk)

        }).on('end', () => {
            this.resolver(null)
        })

    }
    read() {
        const p = new Promise(this.makeResolver())
        return p
    }

    makeResolver() {
        return (resolver, reject) => {
            this.resolver = resolver
            if (this.stream.isPaused()) {
                this.stream.resume()
            }
        }
    }
}

async function read() {
    const fs = new FileSplitRead()
    let l
    do {
        l = await fs.read()
        if(l)console.log(l.toString())
    } while (l)
}

read()