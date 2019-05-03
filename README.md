# definitive.js
Definitive.js - Simple Script helper for AJAX paging loaders.

![Overview](https://github.com/jay94ks/definitive.js/blob/master/definitive.png?raw=true)

# APIs
## define( NAME, DEFAULT-OBJECT [, FLAGS] )
defines an object in window.~~ space absolutely.

Available flags:
  * RESET: resets the original object and define it new one.

#### Usage:

```
define( 'sample.object', { counter: 0 } )
   .then('defined', function() {
      sample.object.counter++;
      console.log('First execution... ' + sample.object.counter);
   })
   .then('kept', function() {
      sample.object.counter++;
      console.log('Duplicated execution... ' + sample.object.counter);
   });
```

Output from the console of Chrome browser:
```
define( 'sample.object', { counter: 0 } )
   .then('defined', function() {
      sample.object.counter++;
      console.log('First execution... ' + sample.object.counter);
   })
   .then('kept', function() {
      sample.object.counter++;
      console.log('Duplicated execution... ' + sample.object.counter);
   });

VM108:5 First execution... 1
{_0: false, _1: "defined", _2: Array(0), _4: null, _5: {…}, …}

define( 'sample.object', { counter: 0 } )
   .then('defined', function() {
      sample.object.counter++;
      console.log('First execution... ' + sample.object.counter);
   })
   .then('kept', function() {
      sample.object.counter++;
      console.log('Duplicated execution... ' + sample.object.counter);
   });
   
VM110:9 Duplicated execution... 2
{_0: false, _1: "kept", _2: Array(0), _4: null, _5: {…}, …}

define( 'sample.object', { counter: 0 } )
   .then('defined', function() {
      sample.object.counter++;
      console.log('First execution... ' + sample.object.counter);
   })
   .then('kept', function() {
      sample.object.counter++;
      console.log('Duplicated execution... ' + sample.object.counter);
   });
   
VM112:9 Duplicated execution... 3
{_0: false, _1: "kept", _2: Array(0), _4: null, _5: {…}, …}
```
