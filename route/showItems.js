const router = require('express').Router();
const { resolve } = require('path');
const getAllItems  = require('../controler/showAllItems.js');




router.get('/', async (req,res) => {
    try{
        const items = await getAllItems();
        res.status(200).json(items);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;