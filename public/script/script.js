function getItems() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const items = JSON.parse(xhr.response);
        const itemsContainer = document.getElementById('items');
        if (xhr.status === 200) {
            for (item of items){
                const div = document.createElement('div');
                const anotherDiv = document.createElement('div');
                div.innerText = `Warehouse ID: ${item.wID}\n Warehouse name: ${item.warehouseName}`;
                for(let i = 0; i < item.itemsStored.length; i++){
                    div.innerText = `Item Type: ${item.itemsStored[i].itemType} ===> The Item: ${item.itemsStored[i].itemName} ===> Item Amount: ${item.itemsStored[i].itemQuantity}\n`;
                }
                itemsContainer.appendChild(div);
                itemsContainer.appendChild(anotherDiv);
            }
        }
    }
    xhr.open('GET','/showItems');
    xhr.send();
}

window.addEventListener('DOMContentLoaded',() => {
    getItems();
})