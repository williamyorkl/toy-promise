import MPromise from '../src/toyPromise'

/**
 * 二、实现promise进一步功能
 *  1. executor里面的异步函数
 *  2. .then最基本的链式调用
 */

test('Promise基础功能 - 处理内部回调函数', () => {
  new MPromise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(32)
    }, 1000)
  }).then((res) => {
    console.log('test ~ res', res)
    expect(res).toBe(32)
  })
})
