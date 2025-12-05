//Import the EXPRESS library to build a web server and handle routes
const express = require('express')
//create a router object from express that lets us group related routes together, example router.get('/program',...). This helps the app stay organized because each router file handles its own section or path, like a mini-app.
const router = express.Router()
//Determine which port to use.
const port = process.env.port || 2025
//import the axios library, to make http request like calling our own api or other websites.
const axios = require('axios')
//import helper functions from the pagination file. paginationResults helps figure out which page of the data to show, while buildProgramArr helps organize program data into an array for display.
const { paginationResults, buildProgramArr }= require('../helpers/pagination')
//tell express to serve static files from the public folder, by loading things like images directly from that folder when the browser requests them.
router.use(express.static('public'))


//HOME PAGE route => http://localhost:2025
router.get('/', (req, res)=>
{
    //res.send("<h1>LaTorya's Christmas App</h1>")
    //res.render looks for the ejs file called home inside the pages folder, then it will then build an html page using that template
    res.render('pages/home',
    {
        //this will give the template some data, the title is the variabe that template can show on the page.
        title: 'christmas-app home',
        //name is another variable the template can show, (in the ejs file whenever you see <%= name %> on the homepage it will display this text)
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
router.get('/api', (req, res)=>//
{
    res.json(//This sends back JSON the links to the api resources, which are programs, producers, directors, actors, and streaming platforms. It sets the right headers and turns the object into JSON
    {
        'All Programs': `http://localhost:${port}/api/program`,//A link to get all programs from the localhost.
        'All Producers': `http://localhost:${port}/api/producer`,//A link to get all of the producers from the localhost.
        'All Directors': `http://localhost:${port}/api/director`,//A link to get all of the directors from the localhost.
        'All Actors': `http://localhost:${port}/api/actor`,//A link to get all of the actors from the localhost.
        'All Streaming Platforms': `http://localhost:${port}/api/streaming`//A link to get all of the streaming platforms from the localhost.
    })
})

//endpoint
// router.use('/api/program', require('./api/programRoutes'))
// router.use('/api/producer', require('./api/producerRoutes'))
// router.use('/api/director', require('./api/directorRoutes'))
// router.use('/api/actor', require('./api/actorRoutes'))
// router.use('/api/streaming', require('./api/streamingRoutes'))
//This is an array of all of the different API endpoints we want to set up, and each word matches a resource in the app.
const endpoints = 
[
    'program',
    'producer',
    'director',
    'actor',
    'streaming'
]
//This will loop through each item in the enpoints array. The forEach will do something once for every item in the list.
endpoints.forEach(endpoint =>
{
    //for each endpoint, set up a route in express, for example...router.use('api/program', require('./api/programRoutes')). This is because require(...) loads the router file for that endpoint.
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})

//main page routers
//localhost:2025/program
router.get('/program', (req, res)=>
{
    //define the url for the api endpoint that returns all programs, which will get called with axios to get data from.
    const url = `http://localhost:2025/api/program`
    /**pagination (splitting results into pages)*/
    //this is a helper that reads query params like ?page=2 and returns info such as startIdx, endIdx, and the current page number.
    const pageData = paginationResults(req)

    /**will store programs in here */
    //Create an empty array to hold the programs we’ll display on this page. Then fill this array after we fetch data from the API.
    let programsArr = []
    //axios.get(url) this goes to the web address or api and asks for data, .then then when the data comes back, (resp=> {...} it contains everything that the server sent back.
    axios.get(url).then(resp =>
    {
        //Use a helper function to build the final array for this page. The buildProgramArr filters or slices the API data based on the pagination (startIdx, endIdx). The programs, local array to fill, index to start slicing from, index to end slicing, and current page number.
        const programsArrData = buildProgramArr(resp.data, programsArr, pageData.startIdx, pageData.endIdx, pageData.page)
        //Render the ejs template to pass in variables the template can use to show data and pagination links.
        res.render('pages/programs', 
        {
            //page title for the browser
            title: 'program',
            //heading name on the page
            name: 'Christmas Programs',
            // data : resp.data,
            //a string to help the template know which endpoint that is being used
            endpoint : 'program',
            //it returns an object with
            //the programs for the current page
            data: programsArrData.arr,
            //the previous page number or null
            prev: programsArrData.prev,
            //the next page number or null
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
//This (:id) means that the route will accept a variable in the URL, like /program/5.
router.get('/program/:id', (req, res)=>
{
    //this will get the id value from the url. Like the example above with /program/5, the req.params.id will be 5.
    const id = req.params.id
    //this will build the api url using the id, which will get the data for juse that one program from the api.
    const url = `http://localhost:2025/api/program/${id}`
    //this will handle pagination, eventhough it is a single program, it will still call paginationResults
        const pageData = paginationResults(req)

    /**will store programs in here */
    //Create an empty array to hold the program data, which will be filled later by buildProgramArr.
    let programsArr = []
    //this will make a get request to the api to fetch the program with the given id.
    axios.get(url).then(resp =>
    {
        //use this helper fuction to build the program array for this page, by filtering data based on pagination info.
        const programsArrData = buildProgramArr(resp.data, programsArr, pageData.startIdx, pageData.endIdx, pageData.page)
        //variable to hold the previous and next program ids
        let prev
        let next 
        //if the current program_id is 1 or higher
        if (resp.data.program_id >= 1) 
        {
            //then set prev to one less than the current id
            prev = resp.data.program_id - 1
        } 
        //if it is less than 1
        else 
        {
            //then there is no previous program
            prev = null
        }
        //if the current program_id is less than 25
        if  (resp.data.program_id < 25) 
        {
            //then set next to one or more than the current id
            next = resp.data.program_id + 1
        } 
        //if it is 25 or higher
        else 
        {
            //then there is no next program.
            next = null
        }
        //render ejs template to pass in variables the template can use to display the program details.
        res.render('pages/singleProgram', 
            {
                //use the program's title for the page title
                title: resp.data.title,
                //use the program's title for the heading
                name: resp.data.title,
                //send the full program data so the template can show details
                data: resp.data,
                //previous program id
                prev: prev,
                //next program id
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
    //this sets the http status code of response to 404 meaning not found 
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