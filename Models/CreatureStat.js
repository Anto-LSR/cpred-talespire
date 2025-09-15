class CreatureStat
{
    constructor() {
        "use scrict"
        this.name = "";
        this.value = 0.0;
        this.max = 0.0;
        Object.preventExtensions(this);
    }
}