// naam: Nikki Bruls

class InputError extends Error{}

function checkValue(value) {
    if (Number.isInteger(value) && value > 0){
        return true
    } else {
        throw new InputError("Foute ingave! Geef een geheel getal groter dan 0 in!");
    }
}

class Persoon {
    constructor(id, naam){
        this._id = id;
        this._naam = naam;
    }

    get naam() {
        return this._naam;
    }

    set naam(value) {
        if (typeof value == "string") {
            this._naam = value;
        } else {
            throw new InputError("Foute ingave! Naam moet een string zijn!");
        }
    }

    get id() {
        return this._id;
    }

    set id(value) {
        if (checkValue(value)) {
            this._id = value;
        }
    }

    toString() {
        return `[${this.id}] ${this.naam}`;
    }
}

class Loonwerker extends Persoon{
    constructor(id, naam, loonPerUur, aantalUrenGewerkt) {
        super(id, naam);
        this.loonPerUur = loonPerUur;
        this.aantalUrenGewerkt = aantalUrenGewerkt;
    }

    get aantalUrenGewerkt() {
        return this._aantalUrenGewerkt;
    }

    set aantalUrenGewerkt(value) {
        if (checkValue(value)) {
            this._aantalUrenGewerkt = value;
        }
    }

    get loonPerUur() {
        return this._loonPerUur;
    }

    set loonPerUur(value) {
        if (checkValue(value)) {
            this._loonPerUur = value;
        }
    }

    berekenLoon() {
        return this.aantalUrenGewerkt * this.loonPerUur;
    }

    toString() {
        return `${super.toString()} = ${this.berekenLoon()}`;
    }
}

class Manager extends Persoon {
    constructor(id, naam) {
        super(id, naam);
        this.loonWerkers = [];
    }


    get loonWerkers() {
        return this._loonWerkers;
    }

    set loonWerkers(value) {
        this._loonWerkers = value;
    }

    voegLoonWerkerToe(loonWerker) {
        if (loonWerker instanceof Loonwerker) {
            this._loonWerkers.push(loonWerker);
        } else {
            throw new InputError("Foute ingave! Waarde moet een instantie van de klasse LoonWerker zijn!");
        }
    }

    berekenLoon() {
        let som = 0;
        for (let i = 0; i < this.loonWerkers.length; i++) {
            som += this.loonWerkers[i].berekenLoon();
        }
        return Math.round(som * 0.2);
    }

    toString() {
        return `${super.toString()} = ${this.berekenLoon()}`;
    }
}

let persoon = new Persoon(1,"mieke");
let manager=new Manager(2,"jan");
let werker1=new Loonwerker(3,"tim",11,13);
let werker2=new Loonwerker(4,"sofie",2,50);
manager.voegLoonWerkerToe(werker1);
manager.voegLoonWerkerToe(werker2);
console.log(persoon.toString());
// [1] mieke 
console.log(werker1.toString());
// [3] tim = 143
console.log(werker2.toString());
// [4] sofie = 100
console.log(manager.toString());
// [2] jan = 49 

