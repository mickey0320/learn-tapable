const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");

class ASyncParallelHookCodeFactory extends HookCodeFactory {
  content() {
    return this.callTapsParallel();
  }
}

const factory = new ASyncParallelHookCodeFactory();

class AsyncParallelHook extends Hook {
  compile(options) {
    factory.setup(this, options);

    return factory.create(options);
  }
}

module.exports = AsyncParallelHook;
