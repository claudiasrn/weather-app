export default class State {
    #location;
    #unit;
    #currentData

    constructor(location = null, unit = "C", currentData = {}) {
        this.#location = location;
        this.#unit = unit;
        this.#currentData = currentData;
    }

    get location() {
        return this.#location;
    }

    set location(newLocation) {
        this.#location = newLocation;
    }

    get unit() {
        return this.#unit;
    }

    set unit(newUnit) {
        if (newUnit !== 'C' && newUnit !== 'F') {
        throw new Error('Unit must be "C" or "F"');
        }
        this.#unit = newUnit;
    }

    get currentData() {
        return this.#currentData;
    }

    set currentData(newData) {
        this.#currentData = newData;
    }
}