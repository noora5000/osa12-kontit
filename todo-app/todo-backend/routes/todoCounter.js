const express = require('express');
const { getAsync } = require('../redis');
const router = express.Router();

/* GET todo count. 
return format:
{
  "added_todos": 0
}
*/
router.get('/', async (_, res) => {
    try{
        const todoCount = await getAsync('added_todos');
        res.json({ 'added_todos': todoCount ? Number(todoCount) : 0 });
    } catch(error){
        console.error(error);
        res.status(500);
    }

});

module.exports = router;
