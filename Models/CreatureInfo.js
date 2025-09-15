export class CreatureInfo {
    constructor() {
        "use strict"
        this.id = "";
        this.isUnique = false;
        this.name = "";
        this.nameSet = false;
        this.link = "";
        this.position = new Position();
        this.rotation = new EulerRotation();
        this.boardId = "";
        this.morphs = Array[new Morph()];
        this.activeMorphIndex = 0;
        this.hp = new CreatureStat();
        this.stats= Array[new creatureStat()];
        this.torchIsOn = false;
        this.isExplicitlyHidden = false;
        this.isFlying = false;
        this.idsOfActivePersistentEmotes = Array[""];
        this.ownerIds = Array[""];
        Object.preventExtensions(this);
    }
}