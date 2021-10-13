const mongoose = require('mongoose');
const Warehouse = require('./model/warehouseSchema.js');


const showItem = async () => {
    await mongoose.connect('mongodb://localhost:27017/companyDB');
    // const whouse = await Warehouse.find();
    // for (i in whouse){
    //    //console.log(whouse[i].itemsStored);
    // }
    // //await upDateItem();
    // //const bool = Warehouse.findOne({wID:15,})
    // console.log('-----------------------------');
    //console.log(await Warehouse.find({"itemsStored.itemName":"Apple"}).count());
   
  // await deleteItem(25,'Bed',2);
  
   const wHouse = await Warehouse.find();
   console.log(wHouse);
    mongoose.connection.close();
}

showItem();

const upDateItem = async () => {
    const house = await Warehouse.findOne({wID:15});
    for(let i = 0; i < house.itemsStored.length; i++){
        if (house.itemsStored[i].itemName === 'Apple'){
            let value = house.itemsStored[i].itemQuantity + 10 + 3;
            console.log(value);
            await Warehouse.findOneAndUpdate({wID:15,"itemsStored.itemName":"Apple"},{$set: {'itemsStored.$.itemQuantity':value}});

        }
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
            }
        }
    }
    console.log('Check The Id or Name');

}
    
