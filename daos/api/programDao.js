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
        connect.query(
            `SELECT * FROM program WHERE format = ?;`,
            [format],
            (error, rows)=>
            {
                queryAction(req, res, error, rows, table)
            }
        )
    },
    findProgramByRating: (res, table)=>
    {
        
        const sql = `SELECT title, program_rating, rating, FROM program ORDER BY rating ASC;`

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
