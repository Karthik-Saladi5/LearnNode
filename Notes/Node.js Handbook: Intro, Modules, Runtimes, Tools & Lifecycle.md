# Node.js Handbook — Intro, Modules, Runtimes, Tools & Lifecycle

---

## Topic 1: Introduction & Installation

### 1. What is Node.js?
A runtime environment that runs JavaScript code on a server, not in a browser.

**Primary use:** Building the back-end (server logic, APIs) for web and mobile apps.

### 2. Why Node.js?
- **Speed & Efficiency:** Its non-blocking architecture allows it to handle many simultaneous connections, making it perfect for real-time, data-intensive applications.
- **Unified Language:** Use JavaScript for both the front-end and back-end.
- **NPM Ecosystem:** Access to a massive library (NPM) of free, reusable code modules that dramatically speed up development.

### 3. Core Concept: The "Efficient Chef" Analogy
Node.js acts like a single chef (single thread) who doesn't wait for slow tasks (non-blocking I/O).  
The chef starts a slow task, moves on to other work, and is notified by an event when the task is complete.

### 4. Installation & Verification
**Source:** https://nodejs.org/  
**Version recommendation:** Always download the LTS (Long Term Support) version for stability.

**Verification commands (terminal):**
```bash
# Check Node.js version
node -v

# Check NPM version
npm -v
```

---

## Topic 2: Understanding Modules

### 1. What is a Module?
A module is a reusable block of code organized in a separate file. Think of them like individual LEGO bricks; you combine them to build a larger application.

This practice is called **modularity**, and it keeps code organized, reusable, and easier to manage. You load a module into your code using the built-in `require()` function.

### 2. The Three Types of Modules

| Type | Description | How to Use |
|---|---|---|
| **Built-in** | Modules included with Node.js; handle core functionality like networking and file system access. | Require them by name. Example: `const http = require('http');` |
| **Local** | Modules you create in your project (split code across files). | Export using `module.exports`, then require with file path: `const myModule = require('./my-module.js');` |
| **Third-Party** | Modules from the NPM registry created by other developers. | 1. Install: `npm install <package-name>` 2. Require: `const pkg = require('<package-name>');` |

### 3. Key Syntax: `require` vs `module.exports`
- `require('./my-file.js')`: The *importer* — reads and executes a JS file and returns the exported content. The `./` tells Node.js to look for a local file.
- `module.exports`: The *exporter* — assign to this to expose a file's public API to other files.

### 4. Module Examples

#### Local Module Example
**employee.js**
```js
// This class is currently private to this file.
class Employee {
    constructor(name, title) {
        this.name = name;
        this.title = title;
    }

    info() {
        console.log(`My name is ${this.name} and I am a ${this.title}.`);
    }
}

// We assign the class to module.exports to make it public.
module.exports = Employee;
```

**index.js**
```js
// We import the Employee class from our local file.
const Employee = require('./employee.js');

const employee1 = new Employee('Gaurav', 'Freelancer');
const employee2 = new Employee('Vaibhav', 'Graphics Designer');

employee1.info();
employee2.info();
```

#### Third-Party Module Example (npm `superheroes`)
1. Install:
```bash
npm install superheroes
```
2. Use:
```js
const superheroes = require('superheroes');

const randomHero = superheroes.random();
console.log(`My favorite superhero is ${randomHero}!`);
```

### 5. Common Core Modules
| Module | Description |
|---|---|
| `http` | Create HTTP servers and clients (web servers). |
| `https` | Like `http`, but for secure servers (SSL/TLS). |
| `fs` | File System — read/write/update/delete files. |
| `path` | Utilities for working with file and directory paths (cross-platform). |
| `os` | Info about the operating system (CPU, network interfaces, etc.). |
| `events` | Event-driven architecture (create and listen for custom events). |
| `crypto` | Cryptographic functions (hashing, encryption, decryption). |
| `url` | Utilities for URL resolution and parsing. |

---

## Topic 3: Browser vs. Server Environment

### 1. What is a JavaScript Runtime Environment?
It's the "container" where your JavaScript code actually runs — includes a JS engine (e.g., V8) and provides APIs specific to its purpose.

### 2. Key Differences: Browser vs. Node.js
The environment determines what your code can and cannot do.

| Feature | Browser Environment | Node.js Server Environment |
|---|---:|---|
| **Primary Purpose** | Display documents & interact with the user on the client machine. | Run server-side logic, access resources, handle network requests. |
| **Global Object** | `window` | `global` |
| **Key APIs** | DOM (`document`), `localStorage`, `fetch`, `console`, `setTimeout` | File System (`fs`), HTTP Server (`http`), `os`, `path` |
| **DOM Access** | Yes | No |
| **File System** | No | Yes |
| **Default Modules** | ES Modules (`import`/`export`) | CommonJS (`require`/`module.exports`) |

### 3. Strengths & Weaknesses of Node.js
**Best for (I/O-intensive tasks):**
- Building fast, scalable APIs.
- Real-time apps (chat, gaming).
- Data streaming services.

**Not for (CPU-intensive tasks):**
- Video encoding/compression.
- Complex image manipulation.
- Heavy scientific computing.

---

## Topic 4: Essential Dev Tool — Nodemon

### 1. The Problem It Solves
When developing a Node.js server you typically restart the server after changes. That is tedious.

### 2. What is Nodemon?
A command-line tool that watches your project files and automatically restarts the Node process when files change.

### 3. Installation
Install globally:
```bash
npm install -g nodemon
```
Verify:
```bash
nodemon --version
```

### 4. Usage
Replace `node` with `nodemon`:
```bash
# Standard
node index.js

# With nodemon
nodemon index.js
```
Type `rs` and Enter in the terminal to force a restart.

---

## Topic 5: The Node.js Lifecycle & Event Loop (Detailed View)

### 1. Core Dependencies
- **V8 Engine:** Google's JS engine — parses and executes JS.
- **libuv:** C++ library for asynchronous I/O, provides event loop and thread pool.

### 2. The Event Loop
Mechanism that allows Node.js to be asynchronous and non-blocking while running on a single thread. After the initial script runs, the event loop begins and cycles through phases; a single cycle is called a **tick**.

### 3. Callback Queues & Priority
- **Microtask Queue (High Priority):** Promises (`.then()`, `.catch()`), `process.nextTick()`. Runs after synchronous code finishes and after each callback from the Callback Queue; the event loop empties this queue before proceeding.
- **Callback Queue / Task Queue (Normal Priority):** `setTimeout`, I/O callbacks, `setImmediate()`. Processed when the Call Stack and Microtask Queue are empty.

### 4. Phases of the Event Loop
1. **Timers:** `setTimeout`, `setInterval`.
2. **Pending Callbacks:** I/O callbacks deferred to next loop iteration.
3. **Idle, Prepare:** Internal.
4. **I/O Poll:** Retrieves new I/O events and executes callbacks.
5. **Check:** Executes `setImmediate()` callbacks.
6. **Close Callbacks:** For `socket.on('close', ...)` etc.

After each callback, the Event Loop runs the entire Microtask Queue before continuing.

### 5. Example: Queue Priority in Action
```js
console.log('Start');

setTimeout(() => {
  console.log('Timeout Callback');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise Resolved (Microtask)');
});

console.log('End');

/*
CONSOLE OUTPUT:
Start
End
Promise Resolved (Microtask)
Timeout Callback
*/
```

### 6. When Does the Program Exit?
The event loop continues as long as there are pending operations. When callback queues are empty and there are no pending tasks, the Node.js process exits.

---

## Topic 6: Frontend vs. Backend Development

### 1. Core Concepts
- **Frontend (Client-Side):** What users interact with in the browser (UI/UX).
- **Backend (Server-Side):** Server-side logic (databases, authentication, business rules).

### 2. At a Glance

| Aspect | Frontend | Backend |
|---|---:|---|
| Where it runs | User's web browser | Remote server |
| Core concerns | Layout, styling, interactivity | Data storage, security, business logic |
| Core technologies | HTML, CSS, JavaScript | Node.js, Python, Java, PHP, Ruby |
| Frameworks | React, Angular, Vue.js | Express.js, Django |
| Databases | — (localStorage for small storage) | MongoDB, PostgreSQL, MySQL |
| Example tasks | Building a login form, animations | Validating logins, saving users |

### 3. Important Clarification
Node.js is a **backend technology** (runtime environment), not a programming language or a framework.

### 4. Full-Stack Development
A **full-stack developer** works on both frontend and backend technologies.

---

## Topic 7: Synchronous vs. Asynchronous Programming

### 1. The Core Difference
- **Synchronous:** Tasks execute sequentially; each waits for the previous (blocking).
- **Asynchronous:** Start long-running tasks and continue executing; handle results later (non-blocking via callbacks/promises/async-await).

### 2. Why This Matters for Node.js
Node.js is designed around non-blocking, asynchronous operations to handle many concurrent connections efficiently.

### 3. Node.js Example: Reading a File

**Synchronous (`readFileSync`)**
```js
const fs = require('fs');

console.log('Starting...');

const data = fs.readFileSync('./myFile.txt', 'utf-8');
console.log(data);

console.log('...Finished.');
```

**Asynchronous (`readFile`)**
```js
const fs = require('fs');

console.log('Starting...');

fs.readFile('./myFile.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

console.log('...Finished.');
```

Output order demonstrates non-blocking behavior: `...Finished.` prints before the file contents in the async example.

---

## Topic 8: Asynchronous Callbacks

### 1. What is a Callback Function?
A function passed as an argument to another function and executed later — fundamental for handling actions after a task completes.

### 2. Callbacks ≠ Asynchronous
A callback doesn't automatically make code asynchronous. Asynchronicity depends on the *host function* (e.g., `setTimeout` vs `Array.prototype.map`).

### 3. Example: Sync vs. Async Callbacks

**Synchronous callback (`.map`)**
```js
console.log("Start");

const numbers = [1, 2, 3];
const doubled = numbers.map((n) => {
    console.log(`Processing ${n}`);
    return n * 2;
});

console.log("End");

/*
CONSOLE OUTPUT:
Start
Processing 1
Processing 2
Processing 3
End
*/
```

**Asynchronous callback (`setTimeout`)**
```js
console.log("Start");

setTimeout(() => {
    console.log("This message appears after 3 seconds.");
}, 3000);

console.log("End");

/*
CONSOLE OUTPUT:
Start
End
(after 3 seconds)
This message appears after 3 seconds.
*/
```

---

## Topic 9: Blocking vs. Non-Blocking I/O

### 1. Defining the Terms
- **Blocking:** Synchronous execution that blocks the main thread.
- **Non-Blocking:** Asynchronous execution that runs in the background, freeing the main thread.

### 2. Why It's Core to Node.js Performance
Because Node.js runs a single main thread, blocking operations freeze the whole application; non-blocking operations allow concurrency and scalability.

---

## Topic 10: Process, Threads, and Worker Threads

### 1. Basic Definitions
- **Process:** A running program (`node my_app.js` creates a Node.js process).
- **Thread:** Sequence of instructions within a process. Node's default is a single main thread.

### 2. The Problem: CPU-Intensive JavaScript
I/O tasks are offloaded to libuv's thread pool; heavy JavaScript computation runs on the main thread and can block the event loop.

### 3. The Solution: `worker_threads`
The `worker_threads` module allows creating threads that run JavaScript in parallel (each with its own V8 instance) — ideal for CPU-bound tasks.

### 4. Libuv Thread Pool vs. Worker Threads

| Feature | libuv Thread Pool | worker_threads |
|---|---:|---|
| Purpose | Handle async I/O operations | Run CPU-intensive JS |
| Runs | Internal C++ code (fs, some crypto, etc.) | Your JS code |
| Use | Automatic | Create/manage with `worker_threads` |

### 5. Simplified `worker_threads` Example

**index.js (Main Thread)**
```js
const { Worker } = require('worker_threads');

console.log("Main thread: Starting.");

const worker = new Worker('./worker.js');

worker.on('message', (message) => {
    console.log(`Main thread: Received message from worker - ${message}`);
});

console.log("Main thread: Worker started. I can do other things now.");
```

**worker.js (Worker Thread)**
```js
const { parentPort } = require('worker_threads');

console.log("Worker thread: I'm starting my heavy task!");

let total = 0;
for (let i = 0; i < 10000000000; i++) {
    total++;
}

console.log("Worker thread: Heavy task finished.");

parentPort.postMessage(`The final count is ${total}`);
```

---
**Link to Reference:** https://g.co/gemini/share/b1ea57f8c3c8
