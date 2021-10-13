const router = require('express').Router();
const { resolve } = require('path');
const deleteItem = require('../controler/deleteItems.js');


router.get('/',(req,res) => {
    res.sendFile(resolve('public','view','deleteItem.html'));
});

router.post('/',async (req,res) => {
    try{
        await deleteItem(req.body.idW,req.body.itmRm,req.body.amtRm);
        res.sendFile(resolve('public','view','index.html'));

    }catch(err){
        console.log(err);
    }
});



module.exports = router;