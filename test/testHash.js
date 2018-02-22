const crypto = require('crypto')

const sha256 = crypto.createHash('sha256')
const result =sha256.update('alice', 'utf8').digest('base64')

console.log(result)