import {UiService} from "../../../Services/UiService.js"
const relative = "./../../"

const ui = new UiService();
// Monter le header de l'app
let mount = document.getElementById("CPR-main-header")
ui.createTabsHeader(mount, {
    characterViewPath: relative + 'Character/CharacterView.html',
    inventoryViewPath: relative + 'Inventory/InventoryView.html',
    equipmentViewPath: relative + 'Equipment/EquipmentView.html',
    GMViewPath: './../GMView.html',
    active: 'mj'
});

