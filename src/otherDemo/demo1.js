let promiseCount = 1
//完整的实现 测试Demo
class Promise {
  callbacks = []
  name = ''
  state = 'pending' //增加状态
  value = null //保存结果
  constructor(fn) {
    this.name = `Promse-${promiseCount++}`
    console.log('[%s]:constructor', this.name)
    fn(this._resolve.bind(this))
  }
  then(onFulfilled) {
    console.log('[%s]:then', this.name)
    // return的这个行为会马上触发了一次promise实例的创建
    return new Promise((resolve) => {
      this._handle({
        onFulfilled: onFulfilled || null,
        resolve: resolve,
      })
    })
  }
  // 这个_handle只有调用当前的promise的then，才是当前promise的_handle
  _handle(callback) {
    console.log('[%s]:_handle', this.name, 'state=', this.state)

    if (this.state === 'pending') {
      this.callbacks.push(callback)
      console.log('[%s]:_handle', this.name, 'callbacks=', this.callbacks)
      return
    }
    //如果then中没有传递任何东西(.then的透传)
    if (!callback.onFulfilled) {
      callback.resolve(this.value)
      return
    }
    var ret = callback.onFulfilled(this.value) // 执行第一个.then的cb
    callback.resolve(ret) // 第一个.then的cb的返回值为空
  }
  _resolve(value) {
    console.log('[%s]:_resolve', this.name)
    console.log('[%s]:_resolve', this.name, 'value=', value)

    // 处理value为promise
    if (value && (typeof value === 'object' || typeof value === 'function')) {
      var then = value.then
      if (typeof then === 'function') {
        /** 注意: bind不会马上执行，而是返回新函数；apply和call都会马上执行 */
        then.call(value, this._resolve.bind(this)) // 往.then传入了_resolve()的执行值，但是没执行
        return
      }
    }

    this.state = 'fulfilled' //改变状态
    this.value = value //保存结果
    this.callbacks.forEach((callback) => this._handle(callback)) // [Promise-3]没有callbacks
  }
}

/**
 *  promise测试
 *
 */

new Promise((resolve) => {
  setTimeout(() => {
    resolve(100)
  }, 1000)
})
  .then((res) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res + 300)
      })
    })
  })
  .then((res) => {
    console.log(res) // 400
  })
