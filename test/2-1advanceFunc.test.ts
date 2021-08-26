import MPromise from '../src/toyPromise'
/**
 * 三、实现promise的.then里面的其它返回值
 *  1. setTimeout
 *  2. MPromise实例
 */

test('Promise基础功能 - 1.3then的链式调用', (done) => {
  new MPromise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(111111)
    }, 2000)
  })
    .then((res) => {
      return Number(res) + 222222
    })
    .then((res: number) => {
      return Number(res) + 222222 // 多次
    })
    .then((res: number) => {
      expect(res).toBe(555555)
      done()
    })
})
