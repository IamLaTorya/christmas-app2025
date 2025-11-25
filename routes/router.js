//Import the EXPRESS library
const express = require('express')
//create router instance from express.
const router = express.Router()
//Determine which port to use.
const port = process.env.port || 2025
const axios = require('axios')
router.use(express.static('public'))

//http://localhost:2025
router.get('/', (req, res)=>
{
    //res.send("<h1>LaTorya's Christmas App</h1>")
    res.render('pages/home',
    {
        title: 'christmas-app home',
        name: "LaTorya's Christmas App"
    })
})

//root route => http://localhost:2025/api
router.get('/api', (req, res)=>
{
    res.json(
    {
        'All Programs': `http://localhost:${port}/api/program`,
        'All Producers': `http://localhost:${port}/api/producer`,
        'All Directors': `http://localhost:${port}/api/director`,
        'All Actors': `http://localhost:${port}/api/actor`,
        'All Streaming Platforms': `http://localhost:${port}/api/streaming`
    })
})

//endpoint
// router.use('/api/program', require('./api/programRoutes'))
// router.use('/api/producer', require('./api/producerRoutes'))
// router.use('/api/director', require('./api/directorRoutes'))
// router.use('/api/actor', require('./api/actorRoutes'))
// router.use('/api/streaming', require('./api/streamingRoutes'))
const endpoints = 
[
    'program',
    'producer',
    'director',
    'actor',
    'streaming'
]

endpoints.forEach(endpoint =>
{
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})

router.get('/program', (req, res)=>
{
    const url = `http://localhost:2025/api/program`

    axios.get(url).then(resp =>
    {
        res.render('pages/programs', 
        {
            title: 'program',
            name: 'Christmas Programs',
            data : resp.data,
            endpoint : 'program'
        })
    }
    )
})

router.get('/program/:id', (req, res)=>
{
    const id = req.params.id
    const url = `http://localhost:2025/api/program/${id}`

    axios.get(url).then(resp =>
    {
        res.render('pages/singleProgram', 
            {
                title: resp.data.title,
                name: resp.data.title,
                data: resp.data
            }
        )
    })
})




//error handling
router.use((req, res, next)=>
{
    res.status(404)
    // .send('<h3>404 ERROR:</h3><h1> THIS PAGE DOES NOT EXISTS!</h1>')
    .render('pages/error', 
    {
        title: 'ERROR PAGE',
        name: 'ERROR'
    })
})

//Export the router, so the server won't crash
module.exports = router