const express = require("express");//to access Router method, import express first
const router = express.Router();//store router Method in variable router
const db = require('../db');//import db as well will be making queries to our database.

router.get('/', async(req, res, next) => {
    return res.send("afdafdsfdas");
})

module.exports = router; //export router so all may benefit
