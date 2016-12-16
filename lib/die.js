let Device = require('spb14-device');

let destruct = require('./destruct');

class Die extends Device {
    next (index, size) {
        let cursor = Math.floor(this.urv * size);

        return super.next(index[cursor]);
    }

    init (table) {
        if (String(table) == '[object Map]')
            table = destruct(table);

        return super.init([...table.keys()], table.size);
    }
}

module.exports = Die;
