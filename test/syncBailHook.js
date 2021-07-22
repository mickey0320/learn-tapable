const { SyncBailHook } = require("tapable");

const syncBailHook = new SyncBailHook(["name", "age"]);

syncBailHook.tap("1", (name, age) => {
  console.log(name, age);
});
syncBailHook.tap("1", (name, age) => {
  console.log(name, age);
  return true;
});
syncBailHook.tap("1", (name, age) => {
  console.log(name, age);
});

syncBailHook.call("yanjian", 25);
