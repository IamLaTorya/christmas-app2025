//This function handles sending database results or errors.
const queryAction = (obj, e, r, t)=>
{
    if(!e)//if there is no error,
    {
        if (r.length === 1)//then check if the the results has one item,
        {
            obj.json(...r)//then send that item
        }
        else//if it has more than one iten
        {
            obj.json(r)//then send the whole array.
        }
    }
    else
    {
        console.log(`${t}DAO ERROR: ${e}`)//if there is an error, then log it
        obj.json(//send this simple erro message as json
        {
            "message": 'error',
            'table': `${t}`,
            'error': e
        })
    }
}
//Export the function so other files can use it.
module.exports = 
{
    queryAction
}