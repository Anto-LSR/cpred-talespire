import {PlayerInfo} from "../Models/Index.js";

export class PlayerService{
    constructor() {
        this.player = new PlayerInfo();
    }
    async isGM(){
        this.player =  await this.getCurrentPlayer();
        return this.player.rights.canGm;
    }

    async getCurrentPlayer(){
        return await this.player.getPlayer();
    }
}