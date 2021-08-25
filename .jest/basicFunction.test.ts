import MPromise from '../src/toyPromise'

test('Promise基础功能 - 状态status只可以被改变一次', () => {
  let p = new MPromise((resolve, reject) => {
    resolve(1)
    reject(2)
  })

  expect(p.toString().includes('promiseResult: 1')).toBe(true)
})

test('Promise基础功能 - 状态status只可以被改变一次', () => {
  let p = new MPromise((resolve, reject) => {
    reject(3)
    resolve(4)
  })

  expect(p.toString().includes('promiseResult: 3')).toBe(true)
})
