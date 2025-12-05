//import the database connection configuration
const connect = require('../../config/dbconfig')
//import a helper
const { queryAction } = require('../../helpers/queryAction')
//const { findAll } = require('../dao')
//create an object to organize the database queries for program table
const programDao = 
{
    //name of the table the dao works with
    table: 'program',
    //this method's purpose is to get the general information about all of the programs
    findProgramInfo: (res, table)=>
    {
        const sql = `SELECT program_id, title, yr_released, runtime, producer_id, format, program_rating, rating, description FROM program;`
        //execute the query
    connect.query(
        sql,
        (error, rows)=>
        {
            //pass results to helper function
            queryAction(res, error, rows, table)
        })
    },
    //this method's purpose is to search for programs by format, rating, or both.
    search: (req, res, table)=>
    {
        let sql = ''
        const query = req.query ? req.query: {}
        const format = query.format || null
        // console.log(format)
        const rating = query.program_rating || null
        //build sql based on which parameters were provided
        if (rating == null && format == null)
        {
            sql = 'SELECT * FROM program;'
        }
        else if (rating == null)
        {
            sql = `SELECT * FROM program WHERE format = '${format}';`
        }
        else if (format == null)
        {
            sql = `SELECT * FROM program WHERE program_rating = '${rating}';`
        }
        else 
        {
            sql = `SELECT * FROM program WHERE program_rating = '${rating}' AND format = '${format}';`
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
    //method's purpose is to get all programs orderd by their rating (highest first)
    findProgramByRating: (res, table)=>
    {
        
        const sql = `SELECT program_id, title, program_rating, rating FROM program ORDER BY rating DESC;`
        //execute the query
        connect.execute(
            sql,
            (error, rows)=>
            {
                queryAction(res, error, rows, table)
            }
        )
    }
}
//export the programDao object so other files can use it.
module.exports = programDao
