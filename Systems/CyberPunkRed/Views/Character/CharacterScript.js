import {UiService} from "../../Services/UiService.js"
import {PlayerService} from "../../../../Services/Index.js";



window.handleSymbioteStateChange = async function (evt) {
    if (evt && evt.kind === "hasInitialized") {
        const ui = new UiService();
        const playerService = new PlayerService();
        // Monter le header de l'app
        let mount = document.getElementById("CPR-main-header")
        ui.createTabsHeader(mount,playerService.isGM(), {
            characterViewPath: './CharacterView.html',
            inventoryViewPath: './../Inventory/InventoryView.html',
            equipmentViewPath: './../Equipment/EquipmentView.html',
            GMViewPath: './../GM/GMView.html',
            active: 'personnage' // ou 'inventaire' | 'equipement' | 'mj'
        });
        // Hooks globaux liés au manifest
        const players = await TS.players.getPlayersInThisCampaign();
        const infos = await playerService.getCurrentPlayer();
        console.log(infos)
    }
};