//Import the EXPRESS library
const express = require('express')
//create router instance from express.
const router = express.Router()
//Determine which port to use.
const port = process.env.port || 2025
//import the axios library
const axios = require('axios')
const { paginationResults, buildProgramArr }= require('../helpers/pagination')
router.use(express.static('public'))


//HOME PAGE => http://localhost:2025
router.get('/', (req, res)=>
{
    //res.send("<h1>LaTorya's Christmas App</h1>")
    res.render('pages/home',
    {
        title: 'christmas-app home',
        name: "LaTorya's Christmas App"
    })
})

//Actor-Form => http://localhost:2025/actor-form
router.get('/actor-form', (req, res)=>
{
    res.render('pages/actor-form',
        {
            title: 'actor form',
            name: 'Actor Form'
        }
    )
})

//Program-Form => http://localhost:2025/program-form
router.get('/program-form', (req, res)=>
{
    res.render('pages/program-form',
        {
            title: 'program form',
            name: 'Program Form'
        }
    )
})

//Producer-Form => http://localhost:2025/producer-form
router.get('/producer-form', (req, res)=>
{
    res.render('pages/producer-form',
        {
            title: 'producer form',
            name: 'Producer Form'
        }
    )
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

//main page routers
//localhost:2025/program
router.get('/program', (req, res)=>
{
    const url = `http://localhost:2025/api/program`
    /**pagination */
    const pageData = paginationResults(req)

    /**will store programs in here */
    let programsArr = []

    axios.get(url).then(resp =>
    {
        const programsArrData = buildProgramArr(resp.data, programsArr, pageData.startIdx, pageData.endIdx, pageData.page)
        res.render('pages/programs', 
        {
            title: 'program',
            name: 'Christmas Programs',
            // data : resp.data,
            endpoint : 'program',
            data: programsArrData.arr,
            prev: programsArrData.prev,
            next: programsArrData.next
        })
    })
})
//localhost:2025/producer
router.get('/producer', (req, res)=>
{
    const url = `http://localhost:2025/api/producer`

    axios.get(url).then(resp =>
    {
        res.render('pages/producers', 
        { 
            title: 'producers',
            name: 'Producers of the Christmas Programs',
            //  data : resp.data,
            endpoint : 'producer',
            data: resp.data
        })
    })  
})
//localhost:2025/director
router.get('/director', (req, res)=>
{
    const url = `http://localhost:2025/api/director`

    axios.get(url).then(resp =>
    {
        res.render('pages/directors', 
        { 
            title: 'directors',
            name: 'Directors of the Christmas Programs',
            //  data : resp.data,
            endpoint : 'director',
            data: resp.data
        })
    })  
})
//localhost:2025/actor
router.get('/actor', (req, res)=>
{
    const url = `http://localhost:2025/api/actor`

    axios.get(url).then(resp =>
    {
        res.render('pages/actors', 
        { 
            title: 'actors',
            name: 'Actors of the Christmas Programs',
            endpoint : 'actor',
            data: resp.data
        })
    })  
})
//localhost:2025/streaming_platform
router.get('/streaming_platform', (req, res)=>
{
    const url = `http://localhost:2025/api/streaming`

    axios.get(url).then(resp =>
    {
        res.render('pages/streamings', 
        { 
            title: 'streaming platform', 
            name: 'Streaming Platforms of the Christmas Programs',
            //  data : resp.data,
            endpoint : 'streaming',
            data: resp.data
        })
    })  
})

//Single pages routes

//localhost:2025/program/id
router.get('/program/:id', (req, res)=>
{
    const id = req.params.id
    const url = `http://localhost:2025/api/program/${id}`
        const pageData = paginationResults(req)

    /**will store programs in here */
    let programsArr = []

    axios.get(url).then(resp =>
    {
        const programsArrData = buildProgramArr(resp.data, programsArr, pageData.startIdx, pageData.endIdx, pageData.page)

        let prev
        let next 

        if (resp.data.program_id >= 1) {
            prev = resp.data.program_id - 1
        } else {
            prev = null
        }

        if  (resp.data.program_id < 25) {
            next = resp.data.program_id + 1
        } else {
            next = null
        }

        res.render('pages/singleProgram', 
            {
                title: resp.data.title,
                name: resp.data.title,
                data: resp.data,
                prev: prev,
                next: next
            }
        )
    })
})
//localhost:2025/producer/id
router.get('/producer/:id', (req, res)=>
{
    const id = req.params.id
    const url = `http://localhost:2025/api/producer/${id}`

    axios.get(url).then(resp =>
    {
        res.render('pages/singleProducer', 
            {
                title: resp.data.producer,
                name: resp.data.producer,
                data: resp.data
            }
        )
    })
})
//localhost:2025/director/id
router.get('/director/:id', (req, res)=>
{
    const id = req.params.id
    const url = `http://localhost:2025/api/director/${id}`

    axios.get(url).then(resp =>
    {
        res.render('pages/singleDirector', 
            {
                title: resp.data.director,
                name: resp.data.director,
                data: resp.data
            }
        )
    })
})
//localhost:2025/actor/id
router.get('/actor/:id', (req, res)=>
{
    const id = req.params.id
    const url = `http://localhost:2025/api/actor/${id}`

    axios.get(url).then(resp =>
    {
        res.render('pages/singleActor', 
            {
                title: resp.data.actor,
                name: resp.data.actor,
                data: resp.data
            }
        )
    })
})
//localhost:2025/streaming/id
router.get('/streaming/:id', (req, res)=>
{
    const id = req.params.id
    const url = `http://localhost:2025/api/streaming/${id}`

    axios.get(url).then(resp =>
    {
        res.render('pages/singleStreaming', 
            {
                title: resp.data.streaming,
                name: resp.data.streaming,
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