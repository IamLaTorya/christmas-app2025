const router = require('express').Router()
const { directorDao : dao } = require('../../daos/dao')

router.get('/', (req, res)=>
{
    dao.findAll(res, dao.table)
})

router.get('/director/:id', (req, res)=>
{
    dao.findProgramsByDirector(res, dao.table, req.params.id)
})

router.get('/director/director/:id', (req, res)=>
{
    dao.findProgramsByDirectorId(res, dao.table, req.params.id)
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
//http://localhost:2025/api/director/create
router.post('/create', (req, res)=>
{
    dao.create(req, res, dao.table)
})
//patch
//http:localhost:2025/api/director/update
router.patch('/update/:id', (req, res)=>
{
    dao.update(req, res, dao.table)
})


module.exports = router