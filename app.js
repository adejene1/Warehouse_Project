const express = require('express');
const { resolve } = require('path');


const app = express();
const port = 3000;



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/addWarehouse', require('./route/warehouse.js'));
app.use('/additem', require('./route/items.js'));
app.use('/showItems',require('./route/showItems.js'));
app.use('/delItems',require('./route/deleteItem.js'));

app.get('/',(req,res) => {
    res.sendFile(resolve('public','view','index.html'));
});


app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});