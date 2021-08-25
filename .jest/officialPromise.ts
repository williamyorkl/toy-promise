// test('官方Promise - 丢出异常', () => {
//   let f1 = function () {
//     return new Promise<number>((resolve, reject) => {
//       throw Error('error')
//     })
//   }

//   expect(f1()).rejects.toMatch('error')
// })

// test('官方Promise - 丢出异常2', () => {
//   new Promise<number>((resolve, reject) => {
//     throw Error('error')
//   }).catch((e) => {
//     console.log(
//       '🚀 ~ file: 1-2basicFunc.test.ts ~ line 28 ~ test ~ e',
//       typeof e
//     )

//     expect(e).toMatch('error')
//   })
// })
