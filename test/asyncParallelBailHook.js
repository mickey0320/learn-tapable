const { AsyncParallelBailHook } = require("tapable");

const asyncParallelBailHook = new AsyncParallelBailHook(["name", "age"]);

asyncParallelBailHook.tapPromise("1", (name, age) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(name, age);
      resolve();
    }, 1000);
  });
});
asyncParallelBailHook.tapPromise("1", (name, age, callback) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(name, age);
      resolve("xx");
    }, 2000);
  });
});
asyncParallelBailHook.tapPromise("1", (name, age, callback) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(name, age);
      resolve();
    }, 3000);
  });
});

asyncParallelBailHook.promise("yanjian", 25).then((err) => {
  console.log(err, "done");
});
