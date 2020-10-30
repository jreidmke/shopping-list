process.env.NODE_ENV = "test";// this will set DB_URI to list-test

const request = require("supertest");//import supertest to make requests to server

const app = require("../app");
const db = require("../db");

//need a beforeEach, an afterEach, and a afterAll

//so here's where we test

//we'll need one for get

//two for get by name (success and 404)

//two for post (success and wrong json body)

//three for patch (success, 404, and wrong json body)

//two for delete (success and 404)