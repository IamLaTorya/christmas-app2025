const router = require('express').Router()
const axios = require('axios')
const { actorDao : dao } = require('../../daos/dao')

router.get('/', (req, res)=>
{
    //res.send('This is working')
    const url = 'http://localhost:${port}/api/actor'

    axios.get(url)
        .then(resp => 
        {
            res.render('pages/programs',
                {
                    title: 'All Actors',
                    name: 'All Actors',
                    data: resp.data,
                    endpoint: 'actor'//once the lik is click this sends the movie to it's own page.
                })
        })
})

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