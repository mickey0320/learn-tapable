class HookCodeFactory {
  setup(hookInstance, options) {
    hookInstance._x = options.taps.map((tap) => tap.fn);
  }
  init(options) {
    this.options = options;
  }
  deinit() {
    this.options = null;
  }
  args(config = {}) {
    const options = this.options;
    let args = options.args || [];
    if (config.before) {
      args = [config.after, ...args];
    }
    if (config.after) {
      args = [...args, config.after];
    }

    return args.join(",");
  }
  header() {
    let code = "var _x = this._x;\n";

    return code;
  }
  callTapsSeries() {
    const options = this.options;
    let code = "";
    for (let i = 0; i < options.taps.length; i++) {
      code += this.callTap(i);
    }

    return code;
  }
  callTapsParallel() {
    const options = this.options;
    let code = `
    var counter = ${options.taps.length}\n
    function done(){\n
      _callback();\n
    }\n
  `;
    for (let i = 0; i < options.taps.length; i++) {
      code += this.callTap(i);
    }

    return code;
  }
  callTap(index) {
    const options = this.options;
    const tap = options.taps[index];
    let code = `var _fn${index} = _x[${index}];\n`;
    switch (tap.type) {
      case "sync":
        code += `_fn${index}(${this.args()});\n`;
        break;
      case "async":
        code += `
          _fn${index}(${this.args({
          after: `function(){\n
            if(--counter === 0){\n
              done();\n
            }\n
          }`,
        })});\n 
        `;
        break;
    }

    return code;
  }
  create(options) {
    this.init(options);
    const { type } = options;
    let fn;
    switch (type) {
      case "sync":
        fn = new Function(this.args(), this.header() + this.content());
        break;
      case "async":
        fn = new Function(
          this.args({ after: "_callback" }),
          this.header() + this.content()
        );
        break;
    }
    this.deinit();
    return fn;
  }
}

module.exports = HookCodeFactory;
