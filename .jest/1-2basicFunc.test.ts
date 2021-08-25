import MPromise from '../src/toyPromise'
/**
 * 二、实现promise进一步功能
 *  1. executor里面的异步函数,如setTimeout()
 *  2. .then最基本的链式调用
 */

test('Promise基础功能 - 1.1处理内部回调函数（executor内部异步执行速度比.then的回调函数快）', () => {
  new MPromise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(32)
    })
  }).then((res) => {
    expect(res).toBe(32)
  })
})

test('Promise基础功能 - 1.2处理内部回调函数（executor内部异步执行速度比.then的回调函数慢）', (done) => {
  new MPromise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(111111)
    }, 2000)
  }).then((res) => {
    expect(res).toBe(111111)
    done()
  })
})

// test('Promise基础功能 - 1.3then的链式调用', (done) => {
//   new MPromise<number>((resolve, reject) => {
//     setTimeout(() => {
//       resolve(111111)
//     }, 2000)
//   })
//     .then((res) => {
//       return Number(res) + 222222
//     })
//     .then((res) => {
//       expect(res).toBe(333333)
//       done()
//     })
// })

new MPromise<number>((resolve, reject) => {
  setTimeout(() => {
    resolve(111111)
  }, 2000)
}).then((res) => {
  expect(res).toBe(111111)
})
