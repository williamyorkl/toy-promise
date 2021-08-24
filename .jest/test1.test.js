const Promise = require("../toyPromise.ts");

test('Promise基础功能 - 状态status只可以被改变一次',()=>{
  let a = new Promise((resolve, reject) => {
    resolve(1);
    reject(2);
  });
  expect(a.status).toBe(1)
})


  