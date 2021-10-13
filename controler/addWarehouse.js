const mongoose = require('mongoose');
const Warehouse = require('../model/warehouseSchema.js');


const addWarehouse = async ({wID,warehouseName}) => {
    try{
        await mongoose.connect('mongodb://localhost:27017/companyDB');
        const warehouseExist = await Warehouse.exists({wID:wID});
        if (warehouseExist === true){
            console.log('Warehouse already existed');
        }else{
           const warehouses = Warehouse({wID,warehouseName});
           await warehouses.save(); 
        }
        mongoose.connection.close();
        
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    addWarehouse
}
