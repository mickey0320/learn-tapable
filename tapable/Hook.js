const CALL_DELEGATE = function (...args) {
  this.call = this._createCall("sync");
  return this.call(...args);
};
const CALL_ASYNC_DELEGATE = function (...args) {
  this.callAsync = this._createCall("async");
  return this.callAsync(...args);
};
const PROMISE_DELEGATE = function (...args) {
 this.promise = this._createCall("promise");
 return this.promise(...args); 
};

class Hook {
  constructor(args) {
    this.args = args;
    this.taps = [];
    this.call = CALL_DELEGATE;
    this.callAsync = CALL_ASYNC_DELEGATE
    this.promise = PROMISE_DELEGATE
    // 存放的真正的回调函数,也就是通过tab注册的
    this._x = undefined;
  }
  tap(options, fn) {
    this._tap("sync", options, fn);
  }
  tapAsync(options, fn){
    this._tap('async', options, fn)
  }
  _tap(type, options, fn) {
    if (typeof options === "string") {
      options = {
        name: options,
      };
    }
    const tapInfo = {
      type,
      fn,
      ...options,
    };

    this._insert(tapInfo);
  }
  _insert(tapInfo) {
    this._resetComplilation();
    this.taps.push(tapInfo);
  }
  _resetComplilation() {
    this.call = CALL_DELEGATE;
  }
  compile() {
    throw new Error("请在在子类重写compile");
  }
  _createCall(type) {
    return this.compile({
      type,
      taps: this.taps,
      args: this.args,
    });
  }
}

module.exports = Hook;
