# Die

Loaded die simulator

### Example

~~~js
const Die = require('spb14-die');

let config = new Map([
        ['Exo'  , 30],
        ['Hopar', 60],
        ['Venus', 10]
    ]);

let coin = new Die(config);

die.get().then(console.log); // more likely 'Hopar'
~~~


## Install

~~~sh
npm install spb14-die
~~~


### License

MIT License
