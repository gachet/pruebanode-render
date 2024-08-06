require('dotenv').config();
const bcrypt = require('bcryptjs');
const http = require('http');
const express = require('express');
const RED = require('node-red');
const app = express();
const server = http.createServer(app);
const users = [
  { username: "admin", password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin', 8), 
   permissions: "*" }
  ];
const settings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/api",
  userDir: "./",
  flowFile: 'flows.json',
  credentialSecret: process.env.CREDENTIAL_SECRET || 'diego2000',
   adminAuth: {
    type: "credentials"
  },
  functionGlobalContext: {}
};

RED.init(server, settings);

app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

const PORT = process.env.PORT || 8000;

server.listen(PORT, function() {
  console.log(`Node-RED running on port ${PORT}`);
});

RED.start();
