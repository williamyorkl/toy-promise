const MPromise = require("../js/toyPromise.js");

// test('Promise基础功能 - 状态status只可以被改变一次',()=>{
//   let a = new MPromise((resolve, reject) => {
//     resolve(1);
//     // reject(2);
//   });
//   expect(a.promiseResult).toBe(1)
// })


  
let a = new MPromise((resolve, reject) => {
  resolve(1);
  reject(2);
});
console.log("🚀 ~ file: test1.test.js ~ line 18 ~ a ~ a", a)
