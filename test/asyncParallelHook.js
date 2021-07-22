const { AsyncParallelHook } = require("../tapable");

const asyncParallelHook = new AsyncParallelHook(["name", "age"]);

asyncParallelHook.tapAsync("1", (name, age, callback) => {
  setTimeout(() => {
    console.log(name, age);
    callback(null);
  }, 1000);
});
asyncParallelHook.tapAsync("1", (name, age, callback) => {
  setTimeout(() => {
    console.log(name, age);
    callback(null);
  }, 2000);
});
asyncParallelHook.tapAsync("1", (name, age, callback) => {
  setTimeout(() => {
    console.log(name, age);
    callback()
  }, 3000);
});

asyncParallelHook.callAsync("yanjian", 25, () => {
    console.log('done')
});

// asyncParallelHook.tapPromise("1", (name, age) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(name, age);
//       resolve();
//     }, 1000);
//   });
// });
// asyncParallelHook.tapPromise("1", (name, age, callback) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(name, age);
//       resolve();
//     }, 2000);
//   });
// });
// asyncParallelHook.tapPromise("1", (name, age, callback) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(name, age);
//       resolve();
//     }, 3000);
//   });
// });

// asyncParallelHook.promise("yanjian", 25).then(() => {
//   console.log("done");
// });
