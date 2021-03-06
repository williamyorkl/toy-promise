import { resolvePlugin } from '@babel/core'
import MPromise from '../toyPromise'

/**
 * 多个.then调用，需要解决：
 *  1. .then执行后的return值，需要可以被下一个.then使用
 *  2. 所以.then应该返回一个Object.create(new MPromise)
 *  3. 并且这个MPromise里面的this.promiseResult的值是新的
 */

// new MPromise<number>((resolve, reject) => {
//   debugger
//   setTimeout(() => {
//     resolve(32)
//   }, 1000)
// })
//   .then((res) => {
//     const resVal = Number(res) + 1111
//     return resVal
//   })
//   .then((res: any) => {
//   })

/**
 * .then里面要有：
 *  1. setTimeout
 *  2. MPromise
 */

new MPromise<number>((resolve, reject) => {
  debugger
  setTimeout(() => {
    resolve(100)
  }, 300)
})
  .then((res) => {
    return new MPromise<number>((resolve) => {
      setTimeout(() => {
        resolve((res as number) + 200)
      }, 100)
    })
  }) // return mpromise2,可以通过.then拿到拿到里面res的值，通过mpromise2的resolve，可以让下一个then拿到res的值 TODO - 画图
  .then((res) => {
    return new MPromise<number>((resolve) => {
      setTimeout(() => {
        resolve((res as number) + 300)
      })
    })
  })
  .then((res) => {
    console.log(res) // 600
  })

// .then()马上执行后有一个返回值，这个返回值是一个新的MPromise；
// 其实应该等.then()里面的cb执行完，才return出去东西
//    所以当第一个.then()调用时，status 是pending，push(cb1) // [cb1]
//    然后当第二个.then()调用时, status 是pending，push(cb2) // [cb1,cb2]
//      执行[cb1,cb2]，执行cb1，返回了一个新promise，通过 .then(this.promiseResult = res),这样就可以把当前promise内的promiseResult赋到最新值
//      执行[cb1,cb2], 执行cb2, 这时传入的cbRes(this.promiseResult)已经是最新了
