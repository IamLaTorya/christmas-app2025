//1. Import DAO
const daoCommon = require('./common/daoCommon')
//2.Create a new object called programDao using the spread operator to copy everything from daoCommon loading it the api/programDao.

const programDao =
{
    ...daoCommon,
    ...require('./api/programDao')
}
//3.Export programDao so other files can use it.
module.exports = 
{
    programDao
}