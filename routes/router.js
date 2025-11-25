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

//root route => http://localhost:2025/api
router.get('/api', (req, res)=>
{
    res.json(
    {
        'All Programs': `http://localhost:${port}/api/program`,
        'All Producers': `http://localhost:${port}/api/producer`
    })
})

//endpoint
router.use('/api/program', require('./api/programRoutes'))
router.use('/api/producer', require('./api/producerRoutes'))

//error handling
router.use((req, res, next)=>
{
    res.status(404)
    .send('<h3>404 ERROR:</h3><h1> THIS PAGE DOES NOT EXISTS!</h1>')
})

//Export the router, so the server won't crash
module.exports = router