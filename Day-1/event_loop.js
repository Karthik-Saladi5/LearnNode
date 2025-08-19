// event-loop-demo.js
const fs = require('fs');
const path = require('path');

console.log('--- Start of script (mainline) ---');

// Create a dummy file for our I/O operation
const dummyFilePath = path.join(__dirname, 'dummy.txt');
fs.writeFileSync(dummyFilePath, 'Hello from the event loop!');

// Phase 1: Timers
setTimeout(() => {
  console.log('setTimeout 1 (Timers Phase)');
}, 0);

// Phase 3: Poll (I/O)
fs.readFile(dummyFilePath, 'utf8', () => {
  console.log('fs.readFile (Poll Phase)');
});

// Phase 4: Check
setImmediate(() => {
  console.log('setImmediate (Check Phase)');
});

// Phase 5: Close Callbacks
const readableStream = fs.createReadStream(__filename);
readableStream.on('close', () => {
  console.log('Stream "close" event (Close Callbacks Phase)');
});

// The VIPs that cut the line (run before the first tick)
process.nextTick(() => {
  console.log('process.nextTick 1 (Highest Priority)');
});

Promise.resolve().then(() => {
  console.log('Promise.resolve().then() 1 (Microtask)');
});

// Add another round to show the order
process.nextTick(() => {
  console.log('process.nextTick 2 (Highest Priority)');
});

Promise.resolve().then(() => {
  console.log('Promise.resolve().then() 2 (Microtask)');
});


// We call destroy() to synchronously schedule the 'close' event for the next tick.
readableStream.destroy();

console.log('--- End of script (mainline) ---');