// const MPromise = require("../js/src/toyPromise.js");
const MPromise = require("../src/toyPromise.ts");

test("Promise基础功能 - 状态status只可以被改变一次", () => {
  let p = new MPromise((resolve, reject) => {
    resolve(1);
    reject(2);
  });
  expect(p.promiseResult).toBe(1);
});


test("Promise基础功能 - 状态status只可以被改变一次", () => {
  let p = new MPromise((resolve, reject) => {
    reject(3);
    resolve(4);
  });
  expect(p.promiseResult).toBe(3);
});


let p =  new MPromise((resolve) => {
  resolve(3);
});

console.log("p.promiseResult", p.promiseResult)