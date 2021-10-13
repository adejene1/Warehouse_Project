const mongoose = require('mongoose');
const Warehouse = require('../model/warehouseSchema.js');


const delItems = async (idW,itmRm,amtRm) => {
    try{
        await mongoose.connect('mongodb://localhost:27017/companyDB');
        const data = await deleteItem(Number(idW),itmRm,Number(amtRm));
    } catch(err){
        console.log(err);
    }
}


const deleteItem = async (gID,gName, amtRemove) => {
    const house = await Warehouse.findOne({wID:gID});
   
    for (let i = 0; i < house.itemsStored.length; i++){
        if (house.itemsStored[i].itemName === gName){
            let amtInHand = house.itemsStored[i].itemQuantity;
            if (amtInHand >= amtRemove){
                if (amtInHand === amtRemove){
                    await Warehouse.updateOne({wID:gID,'itemsStored.itemName':gName}, {$pull:{'itemsStored':{itemName:gName}}});
                    return;
                }else{
                    let subVal = amtInHand - amtRemove;
                    await Warehouse.findOneAndUpdate({wID:gID,"itemsStored.itemName":gName},{$set: {'itemsStored.$.itemQuantity':subVal}});
                    return;

                }

            }else{
                console.log(`There is no enough amount of ${gName}`);
                return;
            }
        }
    }
    console.log('Check The Id or Name');

}

module.exports = delItems;
    
