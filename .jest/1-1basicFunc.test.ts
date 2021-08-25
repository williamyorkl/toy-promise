import MPromise from '../src/toyPromise'

/**
 * 一、实现promise最基本
 *  1. 状态只可以被修改一次
 *  2. 最简陋的.then()  // 不支持异步
 *  3. 最简陋的.catch
 */

test('Promise基础功能 - 状态status;resolve', () => {
  new MPromise<number>((resolve, reject) => {
    resolve(1)
    reject(2)
  }).then((res) => {
    expect(res).toBe(1)
  })
})

test('Promise基础功能 - 状态status; reject', () => {
  new MPromise<number>((resolve, reject) => {
    reject(3)
    resolve(4)
  }).then(null, (rej) => {
    expect(rej).toBe(3)
  })
})

test('Promise基础功能：抛出异常2 - .catch()与.then的并列', () => {
  new MPromise<number>((resolve, reject) => {
    throw new Error('error') // 注意，这里是new Error才会有报错
  }).catch((reject) => {
    expect(reject && reject.toString()).toMatch('error')
  })
})

test('Promise基础功能：抛出异常1 - .then()内部的reject', () => {
  new MPromise<number>((resolve, reject) => {
    throw new Error('error')
  }).then(null, (reject) => {
    expect(reject && reject.toString()).toMatch('error')
  })
})
