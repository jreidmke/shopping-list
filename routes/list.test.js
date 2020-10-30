const request = require("supertest");//import supertest 

const app = require("../app");
const db = require("../db");
const User = require("../models/user");