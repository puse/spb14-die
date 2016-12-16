import test from 'ava';

import Die from '..';

test.beforeEach(t => {
    t.context.exo   = 0;
    t.context.hopar = 0;
    t.context.venus = 0;
});

test('Produce less `exo`s', async t => {
    let map = new Map([
            ['exo'  , 1],
            ['hopar', 2],
            ['venus', 3]
        ]);

    let die = new Die(map);

    (await times(die)(1000))
        .forEach(count(t.context));

    t.true(t.context.exo < t.context.hopar);
    t.true(t.context.hopar < t.context.venus);
});


test('Behave fair', async t => {
    let set = new Set(['exo', 'hopar', 'venus']);

    let die = new Die(set);

    (await times(die)(1000))
        .forEach(count(t.context));

    t.true(t.context.exo   > 300);
    t.true(t.context.hopar > 300);
    t.true(t.context.venus > 300);
});


let count = stat => i => stat[i]++;

let times = die => n => {
        let promises = [], p,
            i = 0;

        for (p of die)
            if (i++ < n)
                promises.push(p);
            else
                break;

        return Promise.all(promises);
    };
