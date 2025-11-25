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

router.get('/:id', (req, res)=>
{
    dao.findById(res, dao.table, req.params.id)
})

router.get('/count', (req, res)=>
{
    dao.countAll(res, dao.table)
})

module.exports = router