let Coin = require('spb14-coin');

/**
 * Get min/max/etc. element
 *
 * @param  {Function} fn comparator
 * @return {Number}      index of element
 */
let indexOf = fn => arr => arr.reduce((m, a, i) => {
        return !arr[m] || a && fn(a, arr[m]) ? i : m;
    }, 0);

let min = indexOf((a, b) => a < b),
    max = indexOf((a, b) => a > b);

let sum = arr => arr.reduce((s, a) => s + a);

/**
 * Alias method
 * @param  {Map} table
 * @return {Set}
 */
module.exports = table => {
    let index = [...table.keys()],
        ratio = [...table.values()];

   // collection for values and aliased coins
    let stack = new Set();

    let
        mean = sum(ratio) / ratio.length,
        load, delta;

    let i, j;

    while (load = ratio[i = min(ratio)]) {
        let entry;

        delta = mean - load;

        // case exactly full
        if (!delta)
            entry = index[i];
        // case underfull
        else {
            // get corresponding overfull
            j = max(ratio);
            // make a coin with it's alias
            let stack = new Map([
                    [ index[i], load ],
                    [ index[j], delta]
                ]);

            entry = new Coin(stack);

            ratio[j] -= delta;
        }

        ratio[i] = null;

        stack.add(entry);
    }

    return stack;
}
