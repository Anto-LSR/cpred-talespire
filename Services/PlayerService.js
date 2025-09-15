import {PlayerInfo} from "../Models/Index.js";

export class PlayerService{
    constructor() {
        this.player = new PlayerInfo();
    }
    async isGM(){
        this.player =  await this.player.getPlayer();
        return this.player.rights.canGm;
    }
}