import MPromise from '../toyPromise'

new MPromise<number>((resolve, reject) => {
  debugger
  setTimeout(() => {
    resolve(32)
  }, 1000)
})
  .then((res) => {
    console.log('🚀 ~ file: debugTest.ts ~ line 8 ~ res', res)
    const resVal = Number(res) + 1111
    return resVal
  })
  .then((res: any) => {
    console.log('🚀 ~ file: debugTest.ts ~ line 11 ~ res', res)
  })

/**
 * 多个.then调用，需要解决：
 *  1. .then执行后的return值，需要可以被下一个.then使用
 *  2. 所以.then应该返回一个Object.create(new MPromise)
 *  3. 并且这个MPromise里面的this.promiseResult的值是新的
 */
