const connectToDB = require('./db.js')
const express = require('express')

connectToDB()
const app = express();
const port = 5000;

