const router = require('express').Router()
const { streamingDao : dao } = require('../../daos/dao')

router.get('/', (req, res)=>
{
    dao.findAll(res, dao.table)
})

router.get('/find_streaming/:id', (req, res)=>
{
    dao.findProgramsByStreamingPlatform(res, dao.table, req.params.id)
})

router.get('/streaming_program/:id', (req, res)=>
{
    dao.findProgramsByStreamingPlatformId(res, dao.table, req.params.id)
})

router.get('/sort/:sorter', (req, res)=>
{
    dao.sort(res, dao.table, req.params.sorter)
})

router.get('/search', (req, res)=>
{
    dao.search(req, res, dao.table)
})

router.get('/count', (req, res)=>
{
    dao.countAll(res, dao.table)
})

router.get('/:id', (req, res)=>
{
    dao.findById(res, dao.table, req.params.id)
})
//post
//http://localhost:2025/api/streaming/create
router.post('/create', (req, res)=>
{
    dao.create(req, res, dao.table)
})
//patch
//http:localhost:2025/api/streaming/update
router.patch('/update/:id', (req, res)=>
{
    dao.update(req, res, dao.table)
})


module.exports = router