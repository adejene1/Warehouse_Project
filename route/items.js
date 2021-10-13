const router = require('express').Router();
const { resolve } = require('path');
const addItem = require('../controler/addItems.js');


router.get('/',(req,res) => {
    res.sendFile(resolve('public','view','addItem.html'));
});

router.post('/', async (req,res) => {
    await addItem(req.body.itemType,req.body.itemName,req.body.itemQ,req.body.itemWID,req.body.itemWName);
    await res.sendFile(resolve('public','view','index.html'));
})


module.exports = router;