import MPromise from '../toyPromise'

new MPromise<number>((resolve, reject) => {
  setTimeout(() => {
    debugger
    resolve(32)
  }, 1000)
})
  .then((res) => {
    console.log('🚀 ~ file: debugTest.ts ~ line 8 ~ res', res)
    return Number(res) + 1111
  })
  .then((res: any) => {
    console.log('🚀 ~ file: debugTest.ts ~ line 11 ~ res', res)
  })
