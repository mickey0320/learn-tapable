const { AsyncSeriesHook } = require("tapable");

const asynSeriescHook = new AsyncSeriesHook(["name", "age"]);

asynSeriescHook.tapAsync("1", (name, age, callback) => {
  setTimeout(() => {
    console.log(name, age);
    callback(null);
  }, 1000);
});
asynSeriescHook.tapAsync("1", (name, age, callback) => {
  setTimeout(() => {
    console.log(name, age);
    callback(null);
  }, 2000);
});
asynSeriescHook.tapAsync("1", (name, age) => {
  setTimeout(() => {
    console.log(name, age);
  }, 3000);
});

asynSeriescHook.callAsync("yanjian", 25);
