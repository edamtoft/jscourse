/** 
 * javascript is really good at doing stuff "async" because
 * it has to be. It can only do one thing at a time, so its
 * really not very well suited for tasks like the project well
 * just did (running a lot of computation in a single, linear 
 * "train of thought"). If it takes 30 seconds for it to run, the
 * browser will be entierly frozen for 30 seconds.
 */

// ------- Synchronous Code --------

/**
 * As an example, let's bake a cake, using the following general
 * algorithm.
 */

function bakeCake(oven, ingredients) {
  let cake = new Cake(ingredients);
  oven.preHeat({ until: 350 });
  oven.open();
  cake.putIn(oven);
  oven.close();
  wait({ minutes: 10 });
  oven.open();
  cake.takeOutOf(oven);
  oven.close();
  return cake;
}

let cake = bakeCake(myOven, myIngredients);
eat(cake);

/**
 * Unfortunately, this wouldn't work in javascript. At a minimum, preheating the oven
 * and waiting 10 minutes all take time, and it's not acceptable to completely freeze
 * the runtime. We want to be able to do something else while we're waiting on those tasks.
 * 
 * 
 * The old-school answer is to add a "callback" to each action that takes time, which is a function
 * that will be called when the task is done. A classic example is setTimeout.
 * 
 * setTimeout(function() {
 *  console.log("done");
 * }, 1000);
 * 
 * In the above code, the function that contains "console.log" will be called after 1000ms (1 second)
 * 
 * So our cake example might look like: 
 */


function bakeCake(oven, ingredients, onDoneCallback) {
  let cake = new Cake(ingredients);
  oven.preHeat({ until: 350 }, function() {
    oven.open();
    cake.putIn(oven);
    oven.close();
    wait({ minutes: 10 }, function() {
      oven.open();
      cake.takeOutOf(oven);
      oven.close();
      onDoneCallback(cake); // call the callback
    });
  });
}

bakeCake(myOven, myIngredients, function(cake) {
  eat(cake);
});

/**
 * Unfortunately, this gets really messy when you remember that almost nothing is instantaneous.
 * Reading a file, making a network request, opening an oven, etc. All take some ammount of time.
 * 
 * So you'd end up with:
 */

function bakeCake(oven, ingredients, onDoneCallback) {
  let cake = new Cake(ingredients);
  oven.preHeat({ until: 350 }, function() {
    oven.open(function() {
      cake.putIn(oven, function() {
        oven.close(function() {
          wait({ minutes: 10 }, function() {
            oven.open(function() {
              cake.takeOutOf(oven, function() {
                oven.close(function() {
                  onDoneCallback(cake); // call the callback
                });
              });
            });
          });
        });
      });
    });
  });
}

bakeCake(myOven, myIngredients, function(cake) {
  eat(cake);
});

/**
 * And welcome to "Callback Hell".
 * Good luck being able maintain/debug code that looks like that.
 * 
 * Also, any of those operations can fail, so we'd need to either add a second callback function
 * that handles an error, just to further add to that mess (not going to write that out, but you can immagine);
 * 
 * Fortunately, Promises come along, which allow a couple of things:
 * 1) An async function no longer has be responsible for calling a callback. It instead returns an object which represents a "promise" of a future result.
 * 2) A standard interface for handling async code
 * 3) The ability to "chain" together promises.
 * 
 * 
 * Promises all have a .then method which registers a callback function to handle the result of the operation.
 * 
 * So baking our cake might look like:
 */


function bakeCake(oven, ingredients) {
  let cake = new Cake(ingredients);
  return oven.preHeat({ until: 350 })
  .then(() => oven.open())
  .then(() => cake.putIn(oven))
  .then(() => oven.close())
  .then(() => wait({ minutes: 10 }))
  .then(() => oven.open())
  .then(() => cake.takeOutOf(oven))
  .then(() => oven.close())
  .then(() => cake);
}

bakeCake(myOven, myIngredients).then(cake => eat(cake));

/**
 * If we need to handle an error, we can use the promise.catch method
 */

function bakeCake(oven, ingredients) {
  let cake = new Cake(ingredients);
  return oven.preHeat({ until: 350 })
  .then(() => oven.open())
  .then(() => cake.putIn(oven))
  .then(() => oven.close())
  .then(() => wait({ minutes: 10 }))
  .then(() => oven.open())
  .then(() => cake.takeOutOf(oven))
  .then(() => oven.close())
  .then(() => cake)
  .catch(err => {
    console.log(err);
    return null;
  });
}

bakeCake(myOven, myIngredients).then(cake => {
  if (cake !== null) {
    eat(cake);
  }
});

/**
 * Promises are defined using a function that has a resolve and reject method, both to "trigger" failure of success
 * of the operation. Using the example of the wait function that's used above, that might look like:
 */

function wait({ minutes }) {  // destructure
  return new Promise(function(resolve,reject) {
    setTimeout(function() {
      resolve();
    }, minutes * 60 * 1000);
  });
}

/**
 * This basically "wraps" the native setTimeout function in a promise.
 * It takes in an object with a "minutes" property, and then returns a promise object. The promise will *almost* immediately
 * call the function it takes in it's constructor, which will set the timeout (which is a native JS function). When the timeout
 * comes due, it will call the function which contains resolve(); which will "resolve" the promise and call anything that has been
 * registerd with .then(). A timeout can't fail, but if it could, we'd call reject(). A promise can only have one state. It can't be
 * both resolved and rejected. If you call one after calling another, it will cause an error.
 */


/**
 * So basically, callbacks are the past, and promises are the present. For what it's worth, async functions are looking like they are
 * close on the horizon (ECMA2017 probably) and are already beginning to see support in tools (typescript supports it out of the box and 
 * can transpile it to work in any browser, and Babel can transpile it with a plugin), and in browsers (preview build of Edge)
 * 
 * Async functions read a lot like the original synchrounous example we wrote. It's conceptually syntactic sugar for Promises 
 * (though works slightly differently under the hood)
 * 
 * So depending on what tooling you use, you should definitely be aware of this, but don't try to use it in a browser right now.
 */

async function bakeCake(oven, ingredients) {
  let cake = new Cake(ingredients);
  await oven.preHeat({ until: 350 });
  await oven.open();
  await cake.putIn(oven);
  await oven.close();
  await wait({ minutes: 10 });
  await oven.open();
  await cake.takeOutOf(oven);
  await oven.close();
  return cake;
}


// async function returns a Promise, so they can be used interchangably.
bakeCake(myOven, myIngredients).then(cake => eat(cake));
