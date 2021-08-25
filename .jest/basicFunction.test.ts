import MPromise from '../src/toyPromise'

/**
 * 一、实现promise最基本
 *  1. 状态只可以被修改一次
 *  2. 最简陋的.then()回调
 */

test('Promise基础功能 - 状态status只可以被改变一次', () => {
  let p = new MPromise<number>((resolve, reject) => {
    resolve(1)
    reject(2)
  }).then((res) => {
    expect(res).toBe(1)
  })
})

test('Promise基础功能 - 状态status只可以被改变一次', () => {
  let p = new MPromise<number>((resolve, reject) => {
    reject(3)
    resolve(4)
  }).then((rej) => {
    expect(rej).toBe(3)
  })
})
