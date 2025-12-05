//import the database connection configuration.
const connect = require('../../config/dbconfig')
//import the helper function
const { queryAction } = require('../../helpers/queryAction')
//create an object to organize the database queries for the streaming platform table.
const streamingDao = 
{
    //name of the table this dao works with
    table: 'streaming_platform',
    //methods that are particular to the streaming platform table
    //find programs by streaming platform id
    findProgramsByStreamingPlatform: (res, table, id)=>
    {
        const sql = `SELECT * FROM program p JOIN program_to_streaming USING (program_id) JOIN streaming_platform s USING (streaming_platform_id) WHERE streaming_platform_id = ${id};`
        //execute the query
    connect.query(
        sql,
        (error, rows)=>
        {
            console.log(rows)//log the rows returned
            queryAction(res, error, rows, table)//pass results to helper
        })
    },
    //this method search for program by title, streaming platform name, or both.
    search: (req, res, table)=>
    {
        let sql = ''
        const query = req.query ? req.query: {}
        //get query parameters from the request
        const title = query.title || null
        const streaming_platform = query.streaming_platform || null
        //build sql based on which parameters were provided
        if (title == null && streaming_platform == null)
        {
            sql = `SELECT * FROM program;`
        }
        else if (title == null)
        {
            sql = `SELECT program.*, p.streaming_platform_id FROM program p JOIN program_to_streaming USING (streaming_platform_id) WHERE p.streaming_platform LIKE '%${streaming_platform}%';`
        }
        else if (streaming_platform == null)
        {
            sql = `SELECT * FROM program WHERE title LIKE '%${title}%';`
        }
        else
        {
            sql = `SELECT program_id, title, producer_id, streaming_platform_id FROM program p JOIN program_to_streaming USING (streaming_platform_id) WHERE streaming_platform LIKE '%${streaming_platform}%' AND title LIKE '%${title}%';`
        }
        //execute the search query
        connect.query(
            sql,
            (error, rows)=>
            {
                console.log(sql)//log the sql query
                console.log(rows)//log the rows returned
                queryAction(res, error, rows, table)//pass results to helper
            }
        )
    },
    //this method's purpose is to get all programs for a specific streaming platform by its id, with selected columns 
    findProgramsByStreamingPlatformId: (res, table, id)=>
    {
        const sql = `SELECT  program_id, title, yr_released, 
        streaming_platform_id, streaming_platform, runtime, format, program_rating, description FROM program JOIN program_to_streaming USING (program_id) JOIN streaming_platform s USING (streaming_platform_id) WHERE streaming_platform_id = ${id};`
        //execute the query
        connect.query(
            sql,
            (error, rows)=>
            {
                console.log(sql)//log the sql query
                console.log(rows)//log the rows returned
                queryAction(res, error, rows, table)//pass results to helper
            }
        )
    }
}
//export the streamingDao object so other files can use it. 
module.exports = streamingDao