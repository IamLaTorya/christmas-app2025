//Import the EXPRESS library
const express = require('express')
//create router instance from express.
const router = express.Router()
//Determine which port to use.
const port = process.env.port || 2025

//http://localhost:2025
router.get('/', (req, res)=>
{
    res.send("<h1>LaTorya's Christmas App</h1>")
})

//Export the router, so the server won't crash
module.exports = router