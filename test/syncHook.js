const { SyncHook } = require('../tapable')

const syncHook = new SyncHook(['name', 'age'])

syncHook.tap('1', (name, age) => {
    console.log(name, age)
})
syncHook.tap('1', (name, age) => {
    console.log(name, age)
})

syncHook.call('yanjian',25)