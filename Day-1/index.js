// var http = require('http');
// // var Employee = require('./employee.js')

// // let employee1=new Employee('Karthik','Kollapur');
// // let employee2=new Employee('Saladi','Kakinada');
// // employee1.info()
// // employee2.info()

// // var superheroes = require('superheroes')

// // var name=superheroes.randomSuperhero();
// // console.log(name);

// http.createServer((req,res)=>{
//     res.writeHead(200,{'Content-Type':'text/html'});
//     res.write('GeeksForGeeks');
//     res.end();
// }).listen(3000);

const { Worker } = require('worker_threads');

console.log("Main thread: Starting.");

// Create a new worker, passing the path to the worker file.
const worker = new Worker('./worker.js');

// Listen for messages from the worker.
worker.on('message', (message) => {
    console.log(`Main thread: Received message from worker - ${message}`);
});

console.log("Main thread: Worker started. I can do other things now.");

let total = 0;
for (let i = 0; i <1000; i++) {
    total++;
}
console.log(total);
