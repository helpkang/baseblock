const Promise = require("bluebird")
// const fs = Promise.promisifyAll(require("fs"))
const fs = require("fs")

class FileSplit{
    constructor(){
        this.stream = fs.createReadStream('c:/NEWS.txt', {highWaterMark:1024*10})
        this.stream.pause
        this.stream.on('data', function(chunk){
            this.stream.pause()
            resolver(chunk)
        
        }).on('end', function(){
            resolver(null)
        })

    } 
    readfile(){
        if(stream.isPaused()){
            this.stream.resume()
        }
        return new Promise((resolver, reject)=>{
        })
    }
}

new FileSplit().readfile()