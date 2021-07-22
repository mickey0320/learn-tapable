const { AsyncSeriesBailHook } = require("tapable");

const asyncSeriesBailHook = new AsyncSeriesBailHook(["name", "age"]);

asyncSeriesBailHook.tapPromise("1", (name, age, callback) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(name, age);
      resolve("11");
    }, 1000);
  });
});
asyncSeriesBailHook.tapPromise("1", (name, age, callback) => {
  setTimeout(() => {
    console.log(name, age);
    callback();
  }, 2000);
});
asyncSeriesBailHook.tapPromise("1", (name, age) => {
  setTimeout(() => {
    console.log(name, age);
  }, 3000);
});

asyncSeriesBailHook.promise("yanjian", 25).then(()=>{
    console.log('done')
})
