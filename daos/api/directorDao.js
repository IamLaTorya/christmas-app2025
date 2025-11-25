const connect = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const directorDao = 
{
    table: 'director',
    findProgramsByDirector: (res, table, id)=>
    {
        const programs = []
        const sql = `SELECT * FROM program p JOIN program_to_director USING (program_id) JOIN director d USING (director_id) WHERE director_id = ${id};`
        connect.execute(
            sql,
            (error, rows)=> 
            {
                if (!error) 
                {
                    Object.values(rows).forEach(obj => 
                    {
                        programs.push(obj)
                    })
                    connect.execute(
                        `SELECT first_name as first, last_name as last FROM ${table} WHERE ${table}_id = ${id};`,
                        (error, rows)=> 
                        {
                            rows.forEach(row => 
                            {
                                row.programs = programs
                            })
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
                } else {
                    res.json({
                        message: 'error',
                        table: `${table}`,
                        error: error
                    })
                }
            }
        )
    },
    search: (req, res, table)=> 
    {
        let sql = ''
        const query = req.query ? req.query : {}

        let first_name = req.query.first_name || null
        let last_name = req.query.last_name || null

        if (first_name == null && last_name == null) {
            sql = `SELECT * FROM ${table};`
        } else if (last_name == null) {
            sql = `SELECT * FROM ${table} WHERE first_name LIKE '%${first_name}%';`
        } else if (first_name == null) {
            sql = `SELECT * FROM ${table} WHERE last_name LIKE '%${last_name}%';`
        } else {
            sql = `SELECT * FROM ${table} WHERE first_name LIKE '%${first_name}%' AND last_name LIKE '%${last_name}%';`
        }
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
    findProgramsByDirectorId: (res, table, id)=>
    {
        const programs = []
        const sql = `SELECT program_id, title, yr_released, runtime, producer_id, format, program_rating, rating, director_id, description FROM program JOIN program_to_director USING (program_id) JOIN director d USING (director_id) WHERE director_id = ${id};`
        connect.execute(
            sql,
            (error, rows)=> 
            {
                if (!error) 
                    {
                    Object.values(rows).forEach(obj => 
                    {
                        programs.push(obj)
                    })
                    connect.execute(
                        `SELECT first_name as first, last_name as last FROM ${table} WHERE ${table}_id = ${id};`,
                        (error, rows)=> 
                        {
                            rows.forEach(row => 
                            {
                                row.programs = programs
                            })
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





module.exports = directorDao