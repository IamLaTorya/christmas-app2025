const router = require('express').Router()
const { actorDao : dao } = require('../../daos/dao')

router.get('/', (req, res)=>
{
    dao.findAll(res, dao.table)
})

router.get('/actor/:id', (req, res)=>
{
    dao.findProgramsByActor(res, dao.table, req.params.id)
})

router.get('/actor/actor/:id', (req, res)=>
{
    dao.findProgramsByActorId(res, dao.table, req.params.id)
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