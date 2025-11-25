const paginationResults =(obj)=> {
    // empty object; store results in results
    let results = {}

    const query = obj.query ? obj.query : {}

    let page = parseInt(query.page) || 1
    let limit = parseInt(query.limit) || 5

    const startIdx = (page - 1) * limit
    const endIdx = page * limit 

    results.page = page
    results.limit = limit
    results.startIdx = startIdx
    results.endIdx = endIdx

    return results
}


// build programArr data for pagination
const buildProgramArr =(arr, arr2, start, end, page)=> 
{

    let results = {}

    for (let i = start; i < end; i++) 
    {
        if (arr[i] != undefined) 
        {
            arr2 = [...arr2, arr[i]]
        }
    }

    const prev = page > 1 ? page - 1 : null
    const next = end >= arr.length ? null : page + 1

    results.arr = arr2
    results.prev = prev
    results.next = next

    return results
}

module.exports = 
{
    paginationResults,
    buildProgramArr
}