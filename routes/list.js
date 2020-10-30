const express = require("express");//to access Router method, import express first
const router = express.Router();//store router Method in variable router
const db = require('../db');//import db as well will be making queries to our database.
const ExpressError = require("../expressError");

router.get('/', async(req, res, next) => {
    const resp = await db.query(`
    SELECT * FROM list;
    `)
    return res.json(resp.rows);
})

router.get('/:name', async(req, res, next) => {
    const name = req.params.name
    try {
        const resp = await db.query(`
        SELECT *
        FROM list
        WHERE name=$1
        `, [name]);

        if(resp.rows.length === 0) {
            throw new ExpressError("Invalid Name", 404)
        }

        return res.json(resp.rows[0]);
    } catch (error) {
        return next(error);
    }
})

router.post('/', async(req, res, next) => {
    //adds item to list in json body
    const { name, price } = req.body;
    const resp = await db.query(`
    INSERT INTO list
    VALUES($1, $2)
    RETURNING name, price
    `, [name, price]);
    return res.status(201).json({added: resp.rows[0]});
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
