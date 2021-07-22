const { AsyncSeriesWaterfallHook } = require("tapable");

const asynSeriesWaterfallHook = new AsyncSeriesWaterfallHook(["name", "age"]);

asynSeriesWaterfallHook.tapAsync("1", (name, age, callback) => {
  setTimeout(() => {
    console.log(name, age);
    callback(null, 'mickey', 3);
  }, 1000);
});
asynSeriesWaterfallHook.tapAsync("1", (name, age, callback) => {
  setTimeout(() => {
    console.log(name, age);
    callback(null, 'wzs', 25);
  }, 2000);
});
asynSeriesWaterfallHook.tapAsync("1", (name, age) => {
  setTimeout(() => {
    console.log(name, age);
  }, 3000);
});

asynSeriesWaterfallHook.callAsync("yanjian", 25);
