const connect = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const producerDao = 
{
    table: 'producer',
    //methods that are particular to the producer table
    //find programs by producer
    findProgramsByProducer: (res, table, id)=>
    {
        const sql = `SELECT p.producer, program.* FROM program JOIN producer p USING (producer_id) WHERE p.producer_id = ${id};`
    connect.query(
        sql,
        (error, rows)=>
        {
            console.log(rows)
            queryAction(res, error, rows, table)
        })
    },
    search: (req, res, table)=>
    {
        let sql = ''
        const query = req.query ? req.query: {}
        const title = query.title || null
        const producer = query.producer || null

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
        connect.query(
            sql,
            (error, rows)=>
            {
                console.log(sql)
                console.log(rows)
                queryAction(res, error, rows, table)
            }
        )
    },
    findProgramByProducerId: (res, table, id)=>
    {
        const sql = `SELECT producer_id, producer, program_id, title, yr_released, format, program_rating FROM program JOIN producer USING (producer_id) WHERE producer_id = ${id};`
        connect.query(
            sql,
            (error, rows)=>
            {
                console.log(sql)
                console.log(rows)
                queryAction(res, error, rows, table)
            }
        )
    }
}

module.exports = producerDao