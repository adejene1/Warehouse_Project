const mongoose = require('mongoose');
const Warehouse = require('../model/warehouseSchema.js');


const addItems = async (iType,iName,itemQ,itemWID,itemWName) => {
    try {
        await mongoose.connect('mongodb://localhost:27017/companyDB');
        const data = await addNewItem(iType,iName,itemQ,itemWID,itemWName);

    }catch(err){
        console.log(err);
    }
}

const addNewItem = async (iType,iName,itemQ,itemWID,itemWName) => {
    const val = await Warehouse.find({"itemsStored.itemName":iName}).count();

    if (val > 0){
        const house = await Warehouse.findOne({wID:Number(itemWID)});
        for(let i = 0; i < house.itemsStored.length; i++){
            if (house.itemsStored[i].itemName === iName){
                let value = house.itemsStored[i].itemQuantity + Number(itemQ);
                await Warehouse.findOneAndUpdate({wID:Number(itemWID),"itemsStored.itemName":iName},{$set: {'itemsStored.$.itemQuantity':value}});

            }
        }
    }else {
        const warehouse = await Warehouse.find();
            for (i in warehouse){
                if (warehouse[i].wID === Number(itemWID) && warehouse[i].warehouseName === itemWName){
                    await Warehouse.updateOne({wID:Number(itemWID),warehouseName:itemWName},{$push:{itemsStored:[{
                        itemType:iType,
                        itemName:iName,
                        itemQuantity:itemQ
                    }]}})
                    return
                }
            }
        console.log('Warehouse not exist, add the warehouse first');
        }
}

module.exports = addItems;


