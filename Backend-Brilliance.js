const express = require('express');
const app = express();

// 1. Basic Server Setup
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 2. Middleware for Logging
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// 3. Handling JSON Data
app.use(express.json());

app.post('/data', (req, res) => {
  console.log(req.body);
  res.send('JSON received');
});

// 4. Connecting to a MongoDB Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true });

// 5. Basic Routing
app.get('/about', (req, res) => {
  res.send('About Page');
});

// 6. Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 7. Serving Static Files
app.use(express.static('public'));

// 8. User Authentication with JWT
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  const user = { id: 3 }; // Dummy user data
  const token = jwt.sign({ user }, 'your_secret_key');
  res.json({ token });
});

// 9. REST API Endpoint
app.get('/api/items', (req, res) => {
  // Code to fetch items from a database
  res.json(items);
});

// 10. Setting up a HTTPS Server
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(3000);

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
