const mongoose = require('mongoose');
const Warehouse = require('../model/warehouseSchema.js');


const getAllItems = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/companyDB');
        const items = await Warehouse.find();
        if (items.length === 0) throw {status:500, error:'Could not find any item'};
        mongoose.connection.close();
        return items;
    } catch(err){
        mongoose.connection.close();
        throw err;
    }
}


module.exports = getAllItems


