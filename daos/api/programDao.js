const connect = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')
//const { findAll } = require('../dao')

const programDao = 
{
    table: 'program',

    findProgramInfo: (res, table)=>
    {
        const sql = `SELECT program_id, title, rating, yr_released FROM program;`
    connect.query(
        sql,
        (error, rows)=>
        {
            queryAction(res, error, rows, table)
        })
    },
    search: (req, res, table)=>
    {
        let sql = ''
        const query = req.query ? req.query: {}
        const format = query.format || null
        // console.log(format)
        const rating = query.program_rating || null
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
    findProgramByRating: (res, table)=>
    {
        
        const sql = `SELECT title, program_rating, rating FROM program ORDER BY rating DESC;`

        connect.execute(
            sql,
            (error, rows)=>
            {
                queryAction(res, error, rows, table)
            }
        )
    }
}

module.exports = programDao
