const router = require('express').Router()
const { producerDao : dao } = require('../../daos/dao')

router.get('/', (req, res)=>
{
    dao.findAll(res, dao.table)
})

router.get('/producer/:id', (req, res)=>
{
    dao.findProgramsByProducer(res, dao.table, req.params.id)
})

router.get('/producer/producer/:id', (req, res)=>
{
    dao.findProgramByProducerId(res, dao.table, req.params.id)
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
//http://localhost:2025/api/producer/create
router.post('/create', (req, res)=>
{
    dao.create(req, res, dao.table)
})
//patch
//http:localhost:2025/api/producer/update
router.patch('/update/:id', (req, res)=>
{
    dao.update(req, res, dao.table)
})


module.exports = router