//Import the database connection
const connect = require('../../config/dbconfig')
//Import a helper function that sends query results or errors to the client.
const { queryAction } = require('../../helpers/queryAction')
//Create a common DAO object with reusable database methods.
const daoCommon = 
{
    //create methods that will query the database
    //Get all rows from a table
    findAll: (res, table)=>
    {
        //.query(sql query, callback function)
        connect.query(
            `SELECT * FROM ${table};`,
            (error, rows)=>
            {
                queryAction(res, error, rows, table)
            }
        )
    },
//Get a single row by ID
    findById: (res, table, id)=>
    {
        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
            (error, rows)=>
            {
                queryAction(res, error, rows, table)
            }
        )
    },
//Count all rows in a table
    countAll: (res, table)=>
    {
        connect.execute(
            `SELECT COUNT(*) AS count FROM ${table};`,
            (error, rows)=>
            {
                queryAction(res, error, rows, table)
            }
        )
    },
//Get all rows sorted by a column
    sort: (res, table, sorter)=>
    {
        connect.execute(
            `SELECT * FROM ${table} ORDER BY ${sorter};`,
            (error, rows)=>
            {
                queryAction(res, error, rows, table)
            }
        )
    },
//Create a new row in a table
    create: (req, res, table)=>
    {
        if(Object.keys(req.body).length ===0)
            //Object.keys(obj) => array of keys
        {
            res.json(
            {
                "error": true,
                "message": "No fields to create"
            })
        }
        else
        {
            const fields = Object.keys(req.body)//column names
            const values = Object.values(req.body)//column values
            //Insert new row into table
            connect.execute(
                `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
                values,
                (error, dbres)=>
                {
                    if (!error)
                    {
                        res.json(
                        {
                            Last_id: dbres.insertId
                        })
                    }
                    else
                    {
                        console.log(`${table}Dao error: `, error)
                    }
                }
            )
        }
    },
//Update an existing row by ID
    update: (req, res, table)=>
    {
        
        // check if id == number
        if (isNaN(req.params.id)) 
            {
            res.json(
            {
                "error": true,
                "message": "Id must be a number"
            })
        } 
        //Check if request body has fields to update
        else if (Object.keys(req.body).length == 0) 
        {
            res.json(
            {
                "error": true,
                "message": "No fields to update"
            })
        } 
        else 
        {
            const fields = Object.keys(req.body)//column names
            const values = Object.values(req.body)//column values
            //Update row in table
            connect.execute(
                `UPDATE ${table} SET ${fields.join(' = ?, ')} = ? WHERE ${table}_id = ?;`,
                [...values, req.params.id],
                (error, dbres)=> 
                {
                    if (!error) 
                    {
                        res.json(
                        {
                            "status": 'updated',
                            "changedRows": dbres.changedRows
                        })
                    } 
                    else 
                    {
                        res.json(
                        {
                            "error": true,
                            "message": error
                        })
                    }
                }
            )
        }
    }
}
//Export daoCommon so other files can use these methods.
module.exports = daoCommon