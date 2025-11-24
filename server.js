//Buid server
//1. Import EXPRESS application to start the HTTP server, 
const express = require('express')
//2. Create an EXPRESS application to start the server
const server = express()
//3. Import the router 
const router = require('./routes/router')
//4. Determine which port to listen to...I used 2025
const port = process.env.port || 2025

//handle Security
//5. Import helmet to add security & cors to control requests.
const helmet = require('helmet')
const cors = require('cors')

//configure helmet
//6. Configure content security policy via helmet. This will restrict what resources the browser will load.
server.use(helmet.contentSecurityPolicy(
{
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directives:
    {
        "ing-src": ["'self'", "https: data"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]
    }
}))

//7-8.Enable CORS middleware, add body-parsing middleware so JSON and URL-encoded form bodies are parsed and avaliable.
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

//9. Mount the imported router at the root path.
server.use('/', router)//this code will cause a crash until you export your router

//10.Start the HTTP server and listen to the port.
server.listen(port, ()=> console.log(`Merry Christmas, Santa's checking the list twice at port: ${port}`))
