//import the database connection configuration
const connect = require('../../config/dbconfig')
//import helper function
const { queryAction } = require('../../helpers/queryAction')
//create an object for the actor table
const actorDao = 
{
    //name of the table DAO works with
    table: 'actor',
    //this function's purpose is the find all programs linked to the specific actor by their actor id.
    findProgramsByActor: (res, table, id)=>
    {
        //create an empty array to store programs
        const programs = []
        //sql query join program, program_to_actor, and actor table to get all programs for a given actor_id.
        const sql = `SELECT * FROM program p JOIN program_to_actor USING (program_id) JOIN actor a USING (actor_id) WHERE actor_id = ${id};`
        //execute the sql query
        connect.execute(
            sql,
            (error, rows)=> 
            {
                //if there is no error
                if (!error) 
                {
                    //then loop through each row 
                    Object.values(rows).forEach(obj => 
                    {
                        //and push into programs array
                        programs.push(obj)
                    })
                    //run another query to get the actor's first and last name
                    connect.execute(
                        `SELECT first_name as first, last_name as last FROM ${table} WHERE ${table}_id = ${id};`,
                        (error, rows)=> 
                        {
                            //attach the programs array to the actor row
                            rows.forEach(row => 
                            {
                                row.programs = programs
                            })
                            //if no error
                            if (!error) 
                            {
                                //return the actor and their program as json
                                res.json(...rows)
                            } 
                            else//if an error
                            {
                                //console.log message
                                console.log('DAO Error', error)
                            }
                        }
                    )
                } 
                //if there was an error in the first query
                else 
                {
                    //return an error JSON
                    res.json({
                        message: 'error',
                        table: `${table}`,
                        error: error
                    })
                }
            }
        )
    },
    //this function's purpose is to search for actors by first name, last name, or both.
    search: (req, res, table)=> 
    {
        let sql = ''
        //check query, if req.query exists then store it in query, but if not (no query parameters were sent) just use an empty object instead
        const query = req.query ? req.query : {}
        //get query parameters from the request like ?first_name=tom&last_name=hanks
        let first_name = req.query.first_name || null
        let last_name = req.query.last_name || null
        //build sql based on which parameters were provided
        if (first_name == null && last_name == null) 
        {
            sql = `SELECT * FROM ${table};`
        } 
        else if (last_name == null) 
        {
            sql = `SELECT * FROM ${table} WHERE first_name LIKE '%${first_name}%';`
        } 
        else if (first_name == null) 
        {
            sql = `SELECT * FROM ${table} WHERE last_name LIKE '%${last_name}%';`
        } 
        else 
        {
            sql = `SELECT * FROM ${table} WHERE first_name LIKE '%${first_name}%' AND last_name LIKE '%${last_name}%';`
        }
        //execute the search query
        connect.execute(
            sql, 
            (error, rows)=> 
            {
                //if no results
                if (rows.length == 0) 
                {
                    //then send this message
                    res.send('<h1>No data to send</h1>')
                } 
                //if there are results
                else 
                {
                    //then pass results to queryAction helper
                    queryAction(res, error, rows, table)
                }
            }
        )
    },
    //this function's purpose is similar to findProgramsByActor, but selects specific columns
    findProgramsByActorId: (res, table, id)=>
    {
        const programs = []
        //sql query: get program details for a given actor_id
        const sql = `SELECT actor_id, program_id, title, yr_released, format, program_rating, description FROM program JOIN program_to_actor USING (program_id) JOIN actor a USING (actor_id) WHERE actor_id = ${id};`
        //execute the query
        connect.execute(
            sql,
            (error, rows)=> 
            {
                if (!error) 
                    {
                    //collect all program rows into programs array
                    Object.values(rows).forEach(obj => 
                    {
                        programs.push(obj)
                    })
                    //query again to get actor's name
                    connect.execute(
                        `SELECT first_name as first, last_name as last FROM ${table} WHERE ${table}_id = ${id};`,
                        (error, rows)=> 
                        {
                            //attach programs to the actor row
                            rows.forEach(row => 
                            {
                                row.programs = programs
                            })
                            //if no error
                            if (!error) 
                            {
                                //return json
                                res.json(...rows)
                            } 
                            else 
                            {
                                console.log('DAO Error', error)
                            }
                        }
                    )
                } 
                else 
                {
                    //handle error case
                    res.json(
                    {
                        message: 'error',
                        table: `${table}`,
                        error: error
                    })
                }
            }
        )
    }
}




//export the actorDao object so other files can use it.
module.exports = actorDao