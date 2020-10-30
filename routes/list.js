const express = require("express");//to access Router method, import express first
const router = express.Router();//store router Method in variable router
const db = require('../db');//import db as well will be making queries to our database.

router.get('/', async(req, res, next) => {
    //returns a list of all items on shopping list
})

router.get('/:name', async(req, res, next) => {
    //returns single item
})

router.post('/', async(req, res, next) => {
    //adds item to list in json body

    //returns {“added”: {“name”: “popsicle”, “price”: 1.45}}
})

router.patch('/:name', async(req, res, next) => {
    //selects item by name. updates properties

    //returns {“updated”: {“name”: “new popsicle”, “price”: 2.45}}
})

router.delete('/:name', async(req, res, next) => {
    //deletes item by name

    //returns {message: “Deleted”}
})

module.exports = router; //export router so all may benefit
