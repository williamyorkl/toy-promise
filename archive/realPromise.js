new Promise((resolve, reject) => {
  throw TypeError('抛出异常')
}).catch((rej) => {
  reject(rej)
  // console.log('🚀 ~ file: realPromise.js ~ line 4 ~ newPromise ~ rej', rej)
})
