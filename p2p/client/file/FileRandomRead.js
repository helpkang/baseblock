const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs"))


const crypto = require('crypto')

const zlib = require('zlib');

class FileRandomRead {
    constructor() {
        this.fileName = './sample/sample.txt'
        this.hashFileName = './dist/sample'
        this.createDir('./dist')
    }
    createDir(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
    async read(length = 10) {
        const fd = await fs.openAsync(this.fileName, 'r')


        const buffer = new Buffer(length);
        const start = 0

        await fs.readAsync(fd, buffer, 0, length, start);
        return buffer

    }

    async makeHash(encoding = '') {
        const stream = fs.createReadStream(this.fileName, {
            highWaterMark: 1024
        })

        const wfd = await fs.openAsync(this.hashFileName + '.hash' + encoding, 'w')


        stream.on('data', (chunk) => {
            console.log(chunk.length)
            const hashfunc = crypto.createHash('rmd160')
            const hash = hashfunc.update(chunk).digest(encoding)
            console.log('hash len', hash.length)
            fs.writeAsync(wfd, hash)

        }).on('end', async () => {
            // await fs.flush()
            await fs.closeAsync(wfd)
        })

    }
    async makeHashGzip() {
        const stream = fs.createReadStream(this.fileName, {
            highWaterMark: 1024
        })

        const out = fs.createWriteStream(this.hashFileName + '.hash.gzip');
        const zipStream = zlib.createGzip();
        zipStream.pipe(out)
        stream.on('data', (chunk) => {
            console.log(chunk.length)
            const hashfunc = crypto.createHash('rmd160')
            const hash = hashfunc.update(chunk).digest()
            console.log('hash len', hash.length)
            zipStream.write(hash, () => {})

        }).on('end', () => {
            zipStream.flush()
            // zipStream.close(()=>{})
        })

    }

}

async function read() {
    const frr = new FileRandomRead()
    let l
    l = await frr.read(100)
    if (l) console.log(l.toString())
}

// read()
const frr = new FileRandomRead()
frr.makeHashGzip()
frr.makeHash()
frr.makeHash('base64')