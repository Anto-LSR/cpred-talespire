export class PlayerInfo {
    constructor() {
        this.id = "";
        this.name = "";
        this.clientsIds = {};
        this.rights = {};
    }
    async getPlayer(playerFragment){
        if(!playerFragment){
            playerFragment = await TS.players.whoAmI();
        }
        let player = await TS.players.getMoreInfo([playerFragment]);
        this.id = player[0].id;
        this.name = player[0].name;
        this.clientsIds = player[0].clientsIds;
        this.rights = player[0].rights;
        return this;
    }
}