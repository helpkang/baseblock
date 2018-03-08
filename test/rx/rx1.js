const Rx = require('rxjs/Rx')

var observable = Rx.Observable.from([1,2,3,4,5])
.filter(x=>x>3).map((x)=>{
    if(x>4) throw Error('x is ', x)
    return x*10
})
  
  console.log('just before subscribe');
  observable.subscribe({
    next: x => console.log('got value ' + x),
    error: err => console.error('something wrong occurred: ' + err),
    complete: () => console.log('done'),
  });
  console.log('just after subscribe');