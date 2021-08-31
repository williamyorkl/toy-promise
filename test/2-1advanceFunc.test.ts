import MPromise from '../src/toyPromise'
/**
 * 三、实现promise的.then里面的其它返回值
 *  1. setTimeout      // 下一个.then调用会直接undefined
 *  2. new MPromise()  // 下一个.then可以通过res接收到上一个的值
 */

/**
 * 关于return MPromise的思路
// .then()马上执行后有一个返回值，这个返回值是一个新的MPromise；
// 其实应该等.then()里面的cb执行完，才return出去东西
//    所以当第一个.then()调用时，status 是pending，push(cb1) // [cb1]
//    然后当第二个.then()调用时, status 是pending，push(cb2) // [cb1,cb2]
//      执行[cb1,cb2]，执行cb1，返回了一个新promise，通过 .then(this.promiseResult = res),这样就可以把当前promise内的promiseResult赋到最新值
//      执行[cb1,cb2], 执行cb2, 这时传入的cbRes(this.promiseResult)已经是最新了

 */

test('Promise基础功能 - 2.1then的链式调用：返回普通值', (done) => {
  new MPromise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(111111)
    }, 2000)
  })
    .then((res) => {
      return Number(res) + 222222
    })
    .then((res) => {
      expect(res).toBe(333333)
      done()
    })
})

test('Promise基础功能 - 2.1then的链式调用：返回普通值', (done) => {
  new MPromise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(100)
    }, 200)
  })
    .then((res) => {
      return new MPromise<number>((resolve) => {
        setTimeout(() => {
          resolve((res as number) + 200)
        }, 100)
      })
    })
    .then((res) => {
      expect(res).toBe(300)
      done()
    })
})
