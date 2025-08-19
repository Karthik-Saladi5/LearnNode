# **Node.js Core Concepts: A Guide**

### **Topic 1: Basic Routing & Creating a Web Server**

#### **1\. What is a Web Server?**

A web server is a program that listens for incoming network requests (typically over HTTP) from clients (like a web browser) and sends back responses. In Node.js, you can create a web server using built-in modules or third-party frameworks.

#### **2\. What is Routing?**

Routing is the process of determining how a web server responds to a client request for a specific endpoint. An endpoint is defined by a URL (e.g., /about, /users/123) and an HTTP request method (e.g., GET, POST, PUT, DELETE). In simple terms, routing is the code that decides "what to do" when a user visits a specific page or interacts with an API endpoint.

#### **3\. Method 1: Using the Built-in http Module (The Manual Way)**

You can create a basic server and handle routing from scratch using Node.js's built-in http module. This gives you full control but requires more manual setup.

**Example:**

```js
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (url === '/about') {
        res.write('<h1>Welcome to the About Us page</h1>');
    } else if (url === '/contact') {
        res.write('<h1>Welcome to the Contact Us page</h1>');
    } else {
        res.write('<h1>Hello World!</h1>');
    }
    res.end();
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
```

#### **4\. Method 2: Using the Express.js Framework (The Standard Way)**

Frameworks like Express.js provide a much cleaner, more powerful, and more organized way to create servers and handle routing. It is the most popular web framework for Node.js.

**Example:**
```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Homepage</h1>');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
```

### **Topic 2: A Deeper Dive into Express.js**

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's built on top of the built-in http module to provide a higher level of abstraction and simplify development.

#### **Why Use Express?**

* **Simplified Routing:** Provides a simple but powerful way to handle different HTTP requests (GET, POST, etc.) to different URLs.  
* **Middleware:** Express is built around the concept of middleware—functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. This is perfect for tasks like logging, authentication, and data parsing.  
* **Abstraction:** Hides the complex, low-level details of Node's http module, allowing you to write cleaner and more readable code.  
* **Performance:** Adds a thin layer of fundamental web application features without obscuring Node.js features.

#### **Serving Content with Express**

Once your server is running, you can easily send different types of content back to the client.

1. Serving HTML  
You can send HTML directly as a string in your response. The res.send() method automatically sets the Content-Type header to text/html.  
2. Serving JSON  
For APIs, you'll commonly send JSON data. The res.json() method automatically converts a JavaScript object or array into a JSON string and sets the Content-Type header to application/json.

### **Topic 3: Dynamic Pages with Template Engines**

While serving HTML strings is fine for simple pages, it's not practical for complex sites. Dynamic pages are rendered by the server and filled with data before being sent to the client. To do this, we use a **template engine**.

#### **What is a Template Engine?**

A template engine lets you use static template files in your application. At runtime, the engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. Popular options include **Pug**, **EJS**, and **Handlebars**.

### **Topic 4: Asynchronous Database Queries (The Node.js Way)**

When a Node.js application needs to communicate with a database, it must do so asynchronously to avoid blocking the event loop. This topic covers the *how* of connecting, while the next topic covers the *what* (SQL vs. NoSQL).

#### **The Standard Way: Asynchronous Queries with mysql2**

The mysql2 library with async/await is the standard for interacting with MySQL (a relational/SQL database) in Node.js.

**Step 1: Installation**
```bash
npm install mysql2
```

**Step 2: Code Example**
```js
const mysql = require('mysql2/promise');

async function queryDatabase() {
    let connection; 
    try {
        connection = await mysql.createConnection({
            host: 'localhost', user: 'root', password: 'password', database: 'demo'
        });
        const [rows, fields] = await connection.execute('SELECT NOW()');
        console.log("Database query result:", rows);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        if (connection) await connection.end();
    }
}
queryDatabase();
```

### **Topic 5: Understanding NoSQL and MongoDB**

Not all databases are structured like the traditional tables of a relational (SQL) database. NoSQL databases offer a different approach that is very popular in modern applications.

#### **What is a NoSQL Database?**

The term "NoSQL" means "non-relational." It's a type of database that stores and retrieves data using models other than the tabular relations used in relational databases. They often prioritize scalability and flexibility.

#### **Introducing MongoDB**

MongoDB is the most popular NoSQL database. It is a **document-oriented** database, meaning it stores data in flexible, JSON-like documents called BSON. This structure is very intuitive for JavaScript developers.

#### **Connecting to MongoDB from Node.js**

There are two primary ways to connect your Node.js application to a MongoDB database.

Method 1: Using the Native MongoDB Driver  
This is the official, low-level library for interacting with MongoDB. It gives you direct control over the database operations.  
**Installation:**
```bash
npm install mongodb
```
Method 2: Using Mongoose (The Recommended Way)  
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a higher level of abstraction, managing relationships between data, providing schema validation, and making it easier to work with your database in a more structured way.  
**Installation:**
```
npm install mongoose
```

Core Concepts of Mongoose  
To work with Mongoose, you need to understand two key concepts:

1. **Schema:** A Mongoose schema defines the structure of the documents within a collection. It specifies the fields, their types (String, Number, Date, etc.), default values, and validation rules. This brings structure to the otherwise flexible world of MongoDB.  
2. **Model:** A Mongoose model is a constructor compiled from a Schema definition. An instance of a model is a MongoDB document. The model is the primary tool you use to create, query, update, and delete documents.

### **Topic 6: Building a REST API with Express**

API stands for Application Programming Interface. A **REST API** is an architectural style for creating web services that use standard HTTP methods. Building a REST API is a primary use case for Express.

#### **Anatomy of an API Request**

When you interact with an API, your request URL is composed of several key parts:

* **Endpoint:** This is the base URL where the API lives. For example, a weather API might have an endpoint like https://api.openweathermap.org/data/2.5.  
* **Path:** The path specifies the particular resource you want to access. Appending /weather to the endpoint targets the weather resource.  
* **Parameters:** To refine your request, you can add parameters. Query parameters appear after a question mark (?) as key-value pairs (e.g., ?lat=35\&lon=139). Path parameters are part of the URL itself (e.g., /cars/123).  
* **Authentication:** Many APIs require you to identify yourself to prevent abuse and for billing. This is often done by including a unique API key as a parameter in your request (e.g., \&appid=YOUR\_API\_KEY).

#### **Principles of REST**

* **Logical Resources:** The API is divided into logical resources (e.g., cars, users).  
* **Resource-Based URLs:** Resources are exposed via intuitive, hierarchical URLs (e.g., /api/cars, /api/cars/123).  
* **Standard HTTP Methods:** The API uses HTTP verbs (GET, POST, PUT, DELETE) to perform actions on resources.  
* **JSON Data Format:** Data is exchanged between the client and server using JSON.  
* **Stateless:** Each request from a client contains all the information needed to process it. The server does not store any client state between requests.

#### **HTTP Methods and CRUD Operations**

The most common HTTP methods correspond to **C**reate, **R**ead, **U**pdate, and **D**elete (CRUD) operations on your database.

### **Topic 7: Authentication & Secure Passwords**

Most web applications need to manage users. This involves **authentication** (verifying who a user is, typically with a username and password) and **authorization** (determining what an authenticated user is allowed to do).

#### **The \#1 Rule: Never Store Passwords in Plain Text**

Storing user passwords directly in your database is a major security risk. If your database is ever compromised, all user passwords will be exposed. Instead, we must store a secure, irreversible representation of the password. This is achieved through **hashing** and **salting**.

1. Hashing  
Hashing is the process of converting information (like a password) into a fixed-length key using a hash function. The original information cannot be retrieved from the hash key. When a user logs in, we hash the password they provide and compare it to the hash stored in our database. While older algorithms like MD5 and SHA256 exist, they are no longer considered secure for passwords due to vulnerabilities.  
2. Salting  
Salting makes password hashing much more secure. A "salt" is a random string of characters that is added to the password before it gets hashed. This ensures that even if two users have the same password, their stored hashes will be completely different. This defeats common attack methods like "rainbow tables" (pre-computed lists of hashes).  
The bcrypt library is the industry standard for this. It automatically handles both hashing and the generation of a unique salt for each password.

#### **Managing Sessions with JSON Web Tokens (JWT)**

After a user logs in, we need a way to know they are authenticated for subsequent requests. JWT is an open standard for securely transferring this information. It allows for **stateless authentication**, meaning the server doesn't need to store session information.

The Structure of a JWT  
A JWT is a long, encoded string that has three parts, separated by dots (.):  
\[header\].\[payload\].\[signature\]

1. **Header:** A JSON object that describes the token, such as the hashing algorithm used.  
   {  
     "alg": "HS256",  
     "typ": "JWT"  
   }

   This header is Base64Url encoded to form the first part of the JWT.  
2. **Payload:** A JSON object containing the "claims" or data about the user. This is information the server can use to identify the user and their permissions. **This data is readable by anyone**, so never put sensitive information here.  
   {  
     "id": "60c72b2f9b1d8c001f8e4a9c",  
     "email": "user@example.com",  
     "exp": 1623784591   
   }

   The payload is also Base64Url encoded to form the second part of the JWT.  
3. **Signature:** This is what makes the token secure. The signature is created by taking the encoded header, the encoded payload, a secret key known only to the server, and hashing them together using the algorithm specified in the header.  
   HMACSHA256(  
     base64UrlEncode(header) \+ "." \+  
     base64UrlEncode(payload),  
     your-secret-key  
   )

   If a malicious user changes the payload (e.g., tries to change the user ID), the signature will no longer be valid, and the server will reject the token.

**The JWT Workflow:**

1. **Login:** A user logs in with their credentials.  
2. **Token Creation:** If the credentials are valid, the server creates a unique, signed JWT for that user and sends it back.  
3. **Token Storage:** The client (e.g., a web browser) stores this token (in local storage or a cookie).  
4. **Authenticated Requests:** For every subsequent request to a protected route, the client sends the JWT in the Authorization header.  
5. **Token Verification:** The server receives the request, verifies the JWT's signature, and if it's valid, processes the request.

#### **Handling Logout**

Because JWTs are stateless, the server doesn't keep track of active tokens. Therefore, you can't "destroy" a token on the server like you would with a traditional session.

1. The Client-Side Approach (Required)  
The primary logout mechanism is on the client. When a user clicks "logout," the client-side application must delete the JWT from its storage (e.g., from local storage or cookies). Once the token is gone, the client can no longer make authenticated requests.  
2. The Server-Side Approach (Optional but Recommended)  
Simply deleting the token on the client means the token is still technically valid until it expires. If a token were stolen right before logout, it could still be used. To prevent this, you can implement a token blacklist on the server.

* When a user logs out, the server stores the token's ID (or the full token) in a blacklist (e.g., in a Redis cache or a database table).  
* The authentication middleware is updated to check if a token is on this blacklist before verifying it. If it is, the request is rejected.

### **Topic 8: Social Authentication with OAuth and Passport.js**

OAuth (Open Authorization) is a standard that allows a user to grant a third-party application access to their information on another service (like Google or Facebook) without sharing their password. You've seen this as "Login with Google" buttons.

#### **The Role of Passport.js**

Passport.js is authentication middleware for Node.js. It's extremely flexible and modular, using "strategies" to handle different authentication methods. For Google OAuth, we use the passport-google-oauth20 strategy.

#### **The OAuth Flow**

1. **User Action:** The user clicks the "Login with Google" button on your site.  
2. **Redirect to Provider:** Your server redirects the user to Google's authentication page.  
3. **User Consent:** The user logs into their Google account (if they aren't already) and grants your application permission to access their profile information.  
4. **Redirect Back with Code:** Google redirects the user back to a "callback URL" on your server, providing a temporary authorization code.  
5. **Token Exchange:** Your server sends this code back to Google, along with your Client ID and Client Secret, to exchange it for an access token.  
6. **Fetch Profile & Authenticate:** Your server uses the access token to request the user's profile information from Google. It then finds or creates a user in your own database and establishes a session for them.

#### **Implementation with Google OAuth**

Step 1: Get Credentials  
Go to the Google Cloud Console, create a new project, and set up an "OAuth 2.0 Client ID". You will receive a Client ID and a Client Secret.  
**Step 2: Installation**
``` bash
npm install express mongoose passport passport-google-oauth20 express-session
```
Step 3: Securely Store Credentials  
Never hard-code your credentials. Use a .env file and the dotenv package to manage them.  
npm install dotenv

Create a file named .env in your project root:
```
GOOGLE\_CLIENT\_ID=your\_client\_id\_from\_google  
GOOGLE\_CLIENT\_SECRET=your\_client\_secret\_from\_google  
SESSION\_SECRET=a\_long\_random\_string\_for\_sessions
```
Step 4: Configure Passport  
Create a file to hold your Passport configuration.  
```js
// config/passport-setup.js  
const passport \= require('passport');  
const GoogleStrategy \= require('passport-google-oauth20').Strategy;  
const User \= require('../models/user'); // Assuming you have a user model

passport.serializeUser((user, done) \=\> {  
    done(null, user.id);  
});

passport.deserializeUser((id, done) \=\> {  
    User.findById(id).then((user) \=\> {  
        done(null, user);  
    });  
});

passport.use(  
    new GoogleStrategy({  
        clientID: process.env.GOOGLE\_CLIENT\_ID,  
        clientSecret: process.env.GOOGLE\_CLIENT\_SECRET,  
        callbackURL: '/auth/google/redirect'  
    }, (accessToken, refreshToken, profile, done) \=\> {  
        // This function is called after the user grants permission  
        // Check if user already exists in your DB  
        User.findOne({ googleId: profile.id }).then((currentUser) \=\> {  
            if (currentUser) {  
                // Already have the user  
                done(null, currentUser);  
            } else {  
                // If not, create a new user  
                new User({  
                    username: profile.displayName,  
                    googleId: profile.id  
                }).save().then((newUser) \=\> {  
                    done(null, newUser);  
                });  
            }  
        });  
    })  
);
```
**Step 5: Set up Routes in app.js**
```js
require('dotenv').config(); // Load environment variables  
const express \= require('express');  
const session \= require('express-session');  
const passport \= require('passport');  
require('./config/passport-setup'); // Run the passport config

const app \= express();

// Initialize session  
app.use(session({  
    secret: process.env.SESSION\_SECRET,  
    resave: false,  
    saveUninitialized: true  
}));

// Initialize passport  
app.use(passport.initialize());  
app.use(passport.session());

// Auth routes  
app.get('/auth/google', passport.authenticate('google', {  
    scope: \['profile'\] // Requesting access to the user's profile  
}));

// Callback route for google to redirect to  
app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) \=\> {  
    res.redirect('/profile'); // Redirect to a protected profile page  
});

// A protected route  
app.get('/profile', (req, res) \=\> {  
    if (\!req.user) {  
        res.redirect('/auth/google');  
    } else {  
        res.send(\`\<h1\>Welcome, ${req.user.username}\</h1\>\`);  
    }  
});
```
### **Topic 9: Making API Requests from Node.js**

Your Node.js application can act as a client to fetch data from external APIs.

#### **The Standard Way: Using the axios Library**

axios is a popular, promise-based library that simplifies making HTTP requests.

**Step 1: Installation**
```bash
npm install axios
```
**Step 2: Code Example**
```js
const axios \= require('axios');

async function fetchPosts() {  
    try {  
        const response \= await axios.get('https://jsonplaceholder.typicode.com/posts');  
        console.log('API Response Body:', response.data.slice(0, 2));  
    } catch (error) {  
        console.error('An error occurred:', error.message);  
    }  
}  
fetchPosts();
```
### **Topic 10: Asynchronous Patterns & Error Handling**

Because Node.js is single-threaded, it handles long-running tasks asynchronously to avoid blocking other operations.

#### **1\. The Old Way: Callbacks**

A callback is a function passed into another function as an argument, which is then invoked to complete an action. This led to "Callback Hell"—deeply nested code that is hard to read.

#### **2\. The Better Way: Promises**

A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. You handle results with .then() and errors with .catch().

#### **3\. The Modern Standard: async/await**

async/await is syntactic sugar built on Promises. It lets you write asynchronous code that looks and behaves like synchronous code, using standard try...catch blocks for error handling.

---
**Reference Link:** https://g.co/gemini/share/e3e1dc320c5d