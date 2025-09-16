import {UiService} from "../../Services/UiService.js"
import {PlayerService} from "../../../../Services/Index.js";


window.handleSymbioteStateChange = async function (evt) {
    if (evt && evt.kind === "hasInitialized") {
        const ui = new UiService();
        const playerService = new PlayerService();
        // Monter le header de l'app
        let mount = document.getElementById("CPR-main-header")
        ui.createTabsHeader(mount,playerService.isGM(), {
            characterViewPath: './../Character/CharacterView.html',
            inventoryViewPath: './../Inventory/InventoryView.html',
            equipmentViewPath: './../Equipment/EquipmentView.html',
            GMViewPath: 'GMView.html',
            active: 'mj'
        });
    }
};