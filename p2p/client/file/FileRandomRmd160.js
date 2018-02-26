const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs"))


const crypto = require('crypto')

const zlib = require('zlib');

class FileRandomRmd160 {

    makeHash(options) {

        const mergeOptions = {
            encoding: '',
            algorithum: 'rmd160',
            fileName: null,
            split: 1024,
            ...options,
        }

        const {
            encoding,
            algorithum,
            fileName,
            split,
        } = mergeOptions

        const stream = fs.createReadStream(fileName, {
            highWaterMark: split
        })

        const rest = []
        return new Promise((resolve) => {
            stream.on('data', (chunk) => {
                const hashfunc = crypto.createHash(algorithum)
                const hash = hashfunc.update(chunk).digest(encoding)
                rest.push(hash)
            }).on('end', async () => {
                resolve(rest)
            })
        })

    }

}

module.exports = FileRandomRmd160

// (async () => {
//     const frr = new FileRandomRead()
//     const hashes = await frr.makeHash(
//         {
//             encoding: 'base64',
//             fileName: './sample/sample.txt',
//             split: 2*1024
//         }
//     )
//     console.log(hashes)
// })()
