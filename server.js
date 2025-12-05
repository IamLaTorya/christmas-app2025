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

//7-8.
// Allow requests from different domains (Cross-Origin Resource Sharing). This is useful with running different servers/ports.
server.use(cors())
//tell express to automatically parse JSON data in incoming requests.
server.use(express.json())
//tell Express to parse data from HTML forms (URL-encoded data). extended: true means it can handle more complex objects, not just simple strings.
server.use(express.urlencoded({ extended: true }))

//Hey, I'm setting ejs as my view engine!
server.set('view engine', 'ejs')

//9. Mount the imported router at the root path, making all routes defined in this router file to be avaliable starting at /.
server.use('/', router)//this code will cause a crash until you export your router

//10.Start the HTTP server and listen to the port.
server.listen(port, ()=> console.log(`Merry Christmas, Santa's checking the list twice at port: ${port}`))
