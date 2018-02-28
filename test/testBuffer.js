const haha = Buffer.from("가나다")

const length = haha.length

const a = new Buffer(length+1)
a.writeInt8(length, 0)
haha.copy(a, 1)

console.log(a.toString().length)