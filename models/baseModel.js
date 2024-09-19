

export default class BaseModel {

    constructor() {

    }

    toJSON() {
        let props = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        console.log(props);
        let json = {};
        for(let prop of props) {
            if(this[prop])
                json[prop] = this[prop]
        }

        return json;
    }
}