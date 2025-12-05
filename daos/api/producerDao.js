//import the database connection configuration
const connect = require('../../config/dbconfig')
//import the helper function
const { queryAction } = require('../../helpers/queryAction')
//create an object to organize the database queries for the producer table
const producerDao = 
{
    //name of the table this dao works with
    table: 'producer',
    //methods that are particular to the producer table
    //find programs by producer id
    findProgramsByProducer: (res, table, id)=>
    {
        //sql query: join program and producer tables to get all of the programs for a give producer_id.
        const sql = `SELECT p.producer, program.* FROM program JOIN producer p USING (producer_id) WHERE p.producer_id = ${id};`
    //execute the query
    connect.query(
        sql,
        (error, rows)=>
        {
            //debug: log the rows returned
            console.log(rows)
            //pass results to helper
            queryAction(res, error, rows, table)
        })
    },
    //this method's purpose is to search for the programs by title, producer name, or both.
    search: (req, res, table)=>
    {
        let sql = ''
        const query = req.query ? req.query: {}
        //get query parameters from the request
        const title = query.title || null
        const producer = query.producer || null
        //build sql based on which parameters were provided
        if (title == null && producer == null)
        {
            sql = `SELECT * FROM program;`
        }
        else if (title == null)
        {
            sql = `SELECT program.*, p.producer_id, p.producer FROM program p JOIN producer USING (producer_id) WHERE p.producer LIKE '%${producer}%';`
        }
        else if (producer == null)
        {
            sql = `SELECT * FROM program WHERE title LIKE '%${title}%';`
        }
        else
        {
            sql = `SELECT program_id, title, producer_id, producer FROM program p JOIN producer USING (producer_id) WHERE producer LIKE '%${producer}%' AND title LIKE '%${title}%';`

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
    //the purpose of this method is to get all programs for the specific producer id, with selected columns.
    findProgramByProducerId: (res, table, id)=>
    {
        const sql = `SELECT producer_id, producer, program_id, title, yr_released, format, program_rating FROM program JOIN producer USING (producer_id) WHERE producer_id = ${id};`
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
//export the producerDao object so other files can use it.
module.exports = producerDao