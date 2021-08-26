new Promise<number>((resolve, reject) => {
  debugger
  setTimeout(() => {
    resolve(100)
  }, 2000)
})
  .then((res) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve((res as number) + 200)
      }, 1000)
    })
  })
  .then((res: any) => {
    console.log('res3', res)
  })
