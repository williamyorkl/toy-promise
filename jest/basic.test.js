const MPromise = require("../toyPromise");

/**
 * 实现Promise基础功能
 */

/** 
let a = new Promise((resolve, reject) => {
  resolve(1);
  reject(2);
});

let b = new Promise((resolve, reject) => {
  reject(2);
  resolve(1);
});

let c = new Promise((resolve, reject) => {
  throw "报错";
});

console.log(a, b, c);

*/

/**
 * 输出：
 * Promise { 1 } Promise { <rejected> 2 } Promise { <rejected> '报错' }
 *
 * 以上说明，promise的状态只会被改变一次
 */
