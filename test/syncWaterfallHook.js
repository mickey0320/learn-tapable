const { SyncWaterfallHook } = require("tapable");

const syncWaterfallHook = new SyncWaterfallHook(["name", "age"]);

syncWaterfallHook.tap("1", function (name, age) {
  console.log(name, age);
  return "mickey";
  // this.callback('mickey',3)
});
syncWaterfallHook.tap("1", function (name, age) {
  console.log(name, age);
  return "wzs";
});
syncWaterfallHook.tap("1", function (name, age) {
  console.log(name, age);
});

syncWaterfallHook.call("yanjian", 25);
