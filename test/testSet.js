const A= {a:1}
const B= {a:1}

const s = new Set()

s.add(A)
console.log(s.has(B))
s.add(B)

Array.from(s).map((a)=>console.log(a))