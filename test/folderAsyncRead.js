const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs"))

async function test (){
    const list = await fs.readdirAsync('./sample')
    const max = list
    // .sort((a,b)=>a<b)
    .map((v)=>parseInt(v))
    .reduce(function(a, b) {
        return Math.max(a, b);
    });

    console.log('max', max)

}

test()