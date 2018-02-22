const Promise = require("bluebird")
// const fs = Promise.promisifyAll(require("fs"))
const fs = require("fs")

class FileSplit{
    async readfile(){
        const readStream = fs.createReadStream('c:/NEWS.txt', {highWaterMark:1024*10})
        readStream.on('data', function(chunk){
            console.log('data', chunk.toString())
            console.log('**************************************************************')
        }).on('end', function(){
            console.log('end...')
        })
    }
}

new FileSplit().readfile()