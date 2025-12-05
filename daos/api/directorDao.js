//import the database connection configuration.
const connect = require('../../config/dbconfig')
//import helper function
const { queryAction } = require('../../helpers/queryAction')
//create an object to organize all database queries for director table
const directorDao = 
{
    //name of the table this DAO works with
    table: 'director',
    //the function's purpose is to find all programs linked to a specific director by their id.
    findProgramsByDirector: (res, table, id)=>
    {
        const programs = []
        //sql query: join program, program_to_director, and director table to get all programs for a given director_id.
        const sql = `SELECT * FROM program p JOIN program_to_director USING (program_id) JOIN director d USING (director_id) WHERE director_id = ${id};`
        //execute the sql query
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
                    //query again to get the director's first and last name
                    connect.execute(
                        `SELECT first_name as first, last_name as last FROM ${table} WHERE ${table}_id = ${id};`,
                        (error, rows)=> 
                        {
                            //attach programs to the director row
                            rows.forEach(row => 
                            {
                                row.programs = programs
                            })
                            //return json if no error
                            if (!error) 
                            {
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
                    res.json({
                        message: 'error',
                        table: `${table}`,
                        error: error
                    })
                }
            }
        )
    },
    //this function's purpose is to search for directors by first name, last name, or both.
    search: (req, res, table)=> 
    {
        let sql = ''
        const query = req.query ? req.query : {}
        //get query parameters from the request
        let first_name = req.query.first_name || null
        let last_name = req.query.last_name || null
        //build sql based on which parameters were provided
        if (first_name == null && last_name == null) {
            sql = `SELECT * FROM ${table};`
        } else if (last_name == null) {
            sql = `SELECT * FROM ${table} WHERE first_name LIKE '%${first_name}%';`
        } else if (first_name == null) {
            sql = `SELECT * FROM ${table} WHERE last_name LIKE '%${last_name}%';`
        } else {
            sql = `SELECT * FROM ${table} WHERE first_name LIKE '%${first_name}%' AND last_name LIKE '%${last_name}%';`
        }
        //execute the search query
        connect.execute(
            sql, 
            (error, rows)=> {
                if (rows.length == 0) {
                    res.send('<h1>No data to send</h1>')
                } else {
                    queryAction(res, error, rows, table)
                }
            }
        )
    },
    //this function's purpose is similar to the findProgramsByDirector, but selects specific columns.
    findProgramsByDirectorId: (res, table, id)=>
    {
        const programs = []
        //sql query: get program details for a given director_id
        const sql = `SELECT director_id, program_id, producer_id, title, yr_released, format, program_rating FROM program JOIN program_to_director USING (program_id) JOIN director d USING (director_id) WHERE director_id = ${id};`
        //execute the query
        connect.execute(
            sql,
            (error, rows)=> 
            {
                //collect all program rows into programs array
                if (!error) 
                    {
                    Object.values(rows).forEach(obj => 
                    {
                        programs.push(obj)
                    })
                    //query again to get director's name
                    connect.execute(
                        `SELECT first_name as first, last_name as last FROM ${table} WHERE ${table}_id = ${id};`,
                        (error, rows)=> 
                        {
                            //attach programs to the director row
                            rows.forEach(row => 
                            {
                                row.programs = programs
                            })
                            //return json if no error
                            if (!error) 
                            {
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




//export the directorDao object so other files can use it.
module.exports = directorDao