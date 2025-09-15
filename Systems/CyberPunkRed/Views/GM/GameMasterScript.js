import {UiService} from "../../Services/UiService.js"

const ui = new UiService();
// Monter le header de l'app
let mount = document.getElementById("CPR-main-header")
ui.createTabsHeader(mount, {
    characterViewPath: './../Character/CharacterView.html',
    inventoryViewPath: './../Inventory/InventoryView.html',
    equipmentViewPath: './../Equipment/EquipmentView.html',
    GMViewPath: 'GMView.html',
    active: 'mj'
});

