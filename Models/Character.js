class Character{
    constructor(id, firstname, lastname, description, age, characteristics = [], skills = [], background, appearance, personality, backstory, note) {
        this._id = id;
        this._firstname = firstname;
        this._lastname = lastname;
        this._description = description;
        this._age = age;
        this._characteristics = characteristics;
        this._skills = skills;
        this._background = background;
        this._appearance = appearance;
        this._personality = personality;
        this._backstory = backstory;
        this._note = note;
    }

    get id(){
        return this._id;
    }
    set id(id){
        this._id = id;
    }

    get firstname(){
        return this._firstname;
    }
    set firstname(firstname){
        this._firstname = firstname;
    }

    get lastname(){
        return this._lastname;
    }
    set lastname(lastname){
        this._lastname = lastname;
    }

    get description(){
        return this._description;
    }
    set description(description){
        this._description = description;
    }

    get age(){
        return this._age;
    }
    set age(age){
        this._age = age;
    }

    get characteristics(){
        return this._characteristics;
    }
    set characteristics(characteristics){
        this._characteristics = characteristics;
    }

    get skills(){
        return this._skills;
    }
    set skills(skills){
        this._skills = skills;
    }

    get background(){
        return this._background;
    }

    set background(background){
        this._background = background;
    }

    get appearance(){
        return this._appearance;
    }
    set appearance(appearance){
        this._appearance = appearance;
    }

    get personality(){
        return this._personality;
    }
    set personality(personality){
        this._personality = personality;
    }

    get backstory(){
        return this._backstory;
    }

    set backstory(backstory){
        this._backstory = backstory;
    }

    get note(){
        return this._note;
    }
    set note(note){
        this._note = note;
    }
    toJSON() {
        return {
            id: this._id,
            firstname: this._firstname,
            lastname: this._lastname,
            fullname: `${this._firstname} ${this._lastname}`.trim(),
            description: this._description,
            age: this._age,
            characteristics: Array.isArray(this._characteristics) ? [...this._characteristics] : [],
            skills: Array.isArray(this._skills) ? [...this._skills] : [],
            background: this._background,
            appearance: this._appearance,
            personality: this._personality,
            backstory: this._backstory,
            note: this._note,
            metadata: {
                type: 'Character',
                timestamp: new Date().toISOString()
            }
        };
    }
}