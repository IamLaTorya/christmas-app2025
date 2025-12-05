//this function figures out pagination details, like which page, how many items per page, etc.
const paginationResults =(obj)=> {
    //start with an empty object to store the results
    let results = {}
    //get the query parameters from the request object, example: ?page=2&limit=10. if there are no query parameters, use the empty object.
    const query = obj.query ? obj.query : {}
    //convert the page query string into a number, default it to 1. do the same for limit, but le the default be 5.
    let page = parseInt(query.page) || 1
    let limit = parseInt(query.limit) || 5
    //calculate the starting and ending index for this page. 
    //example page 2 with limit of 5 items per page => startIdx = (1 - 1) * 5 = 5. Start at index 5 skips the first 5 items to show items 6-10.
    const startIdx = (page - 1) * limit
    //example page 3 with limit 5 => endIdx = 3 * 5 = 15. End at index 15 shows items 11 through 15
    const endIdx = page * limit 
    //save all the pagination info into the results object
    results.page = page
    results.limit = limit
    results.startIdx = startIdx
    results.endIdx = endIdx
    //return the results
    return results
}


// build programArr data for pagination
//this function builds the array of programs for the current page
const buildProgramArr =(arr, arr2, start, end, page)=> 
{
    //start with an empty results object
    let results = {}
    //loop through the array from start index to end index
    for (let i = start; i < end; i++) 
    {
        //only add items if they exist (not undefined)
        if (arr[i] != undefined) 
        {
            //then add the item to arr2 (spread operator makes a new array with the old items + new one). This will replace arr2 with this new array, by adding arr[i] to the end of arr2. example: arr2 = [1,2,3] arr = [10,20,30] let i = 1 now arr2 = [1,2,3,20]
            arr2 = [...arr2, arr[i]]
        }
    }
    //figure out the previous page number, if it is on page 1, there is no previous page (set to null)
    const prev = page > 1 ? page - 1 : null
    //figure out the next page number, if it is at the end of the array, there is no next page (set to null).
    const next = end >= arr.length ? null : page + 1
    //save the sliced array and page info into the results objecgt
    results.arr = arr2
    results.prev = prev
    results.next = next
    //return the results
    return results
}
//export the functions
module.exports = 
{
    paginationResults,
    buildProgramArr
}