const { parentPort } = require('worker_threads');

console.log("Worker thread: I'm starting my heavy task!");

// Simulate a heavy, blocking task.
let total = 0;
for (let i = 0; i < 10000000000; i++) {
    total++;
}

console.log("Worker thread: Heavy task finished.");

// Send a message back to the main thread.
parentPort.postMessage(`The final count is ${total}`);