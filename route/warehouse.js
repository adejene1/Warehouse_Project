const router = require('express').Router();
const { resolve } = require('path');
const { addWarehouse } = require('../controler/addWarehouse.js');



router.get('/', (req,res) => {
    res.sendFile(resolve('public','view','addWarehouse.html'));
});

router.post('/',async (req,res) => {
    try{
        const data = await addWarehouse(req.body);
        res.sendFile(resolve('public','view','index.html'));
    } catch(err) {
        console.log(err);
    }
});



module.exports = router;
