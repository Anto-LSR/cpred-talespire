import {UiService} from "../../Services/UiService.js"

const ui = new UiService();
// Monter le header de l'app
let mount = document.getElementById("CPR-main-header")
ui.createTabsHeader(mount, {
    characterViewPath: './CharacterView.html',
    inventoryViewPath: './../Inventory/InventoryView.html',
    equipmentViewPath: './../Equipment/EquipmentView.html',
    GMViewPath: './../GM/GMView.html',
    active: 'personnage' // ou 'inventaire' | 'equipement' | 'mj'
});


// Hooks globaux liés au manifest
window.handleSymbioteStateChange = async function (evt) {
    if (evt && evt.kind === "hasInitialized") {
        const players = await TS.players.getPlayersInThisCampaign();
        const infos = await TS.players.getMoreInfo([players[0]?.id])
        console.log(infos)
    }
};