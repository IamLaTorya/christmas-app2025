const connect = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const streamingDao = 
{
    table: 'streaming_platform',
    //methods that are particular to the streaming platform table
    //find programs by streaming platform
    findProgramsByStreamingPlatform: (res, table, id)=>
    {
        const sql = `SELECT * FROM program p JOIN program_to_streaming USING (program_id) JOIN streaming_platform s USING (streaming_platform_id) WHERE streaming_platform_id = ${id};`
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
        const streaming_platform = query.streaming_platform || null

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
    findProgramsByStreamingPlatformId: (res, table, id)=>
    {
        const sql = `SELECT program_id, title, yr_released, runtime, producer_id, format, program_rating, rating, streaming_platform_id, streaming_platform, description FROM program JOIN program_to_streaming USING (program_id) JOIN streaming_platform s USING (streaming_platform_id) WHERE streaming_platform_id = ${id};`
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

module.exports = streamingDao