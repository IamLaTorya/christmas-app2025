const router = require('express').Router()
const { actorDao : dao } = require('../../daos/dao')
//http://localhost:2025/api/actor
router.get('/', (req, res)=>
{
    dao.findAll(res, dao.table)
})
//http://localhost:2025/api/actor/find_actor/:id
router.get('/find_actor/:id', (req, res)=>
{
    dao.findProgramsByActor(res, dao.table, req.params.id)
})
//http://localhost:2025/api/actor_program/:id
router.get('/actor_program/:id', (req, res)=>
{
    dao.findProgramsByActorId(res, dao.table, req.params.id)
})
//http://localhost:2025/api/actor/sort/:id
router.get('/sort/:sorter', (req, res)=>
{
    dao.sort(res, dao.table, req.params.sorter)
})
//http://localhost:2025/api/actor/search
router.get('/search', (req, res)=>
{
    dao.search(req, res, dao.table)
})
//http://localhost:2025/api/actor/count
router.get('/count', (req, res)=>
{
    dao.countAll(res, dao.table)
})
//http://localhost:2025/api/actor/:id
router.get('/:id', (req, res)=>
{
    dao.findById(res, dao.table, req.params.id)
})
//post
//http://localhost:2025/api/actor/create
router.post('/create', (req, res)=>
{
    dao.create(req, res, dao.table)
})
//patch
//http:localhost:2025/api/actor/update
router.patch('/update/:id', (req, res)=>
{
    dao.update(req, res, dao.table)
})


module.exports = router