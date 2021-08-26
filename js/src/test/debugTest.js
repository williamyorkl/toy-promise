"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toyPromise_1 = __importDefault(require("../toyPromise"));
/**
 * 多个.then调用，需要解决：
 *  1. .then执行后的return值，需要可以被下一个.then使用
 *  2. 所以.then应该返回一个Object.create(new MPromise)
 *  3. 并且这个MPromise里面的this.promiseResult的值是新的
 */
// new MPromise<number>((resolve, reject) => {
//   debugger
//   setTimeout(() => {
//     resolve(32)
//   }, 1000)
// })
//   .then((res) => {
//     const resVal = Number(res) + 1111
//     return resVal
//   })
//   .then((res: any) => {
//   })
/**
 * .then里面要有：
 *  1. setTimeout
 *  2. MPromise
 */
new toyPromise_1.default(function (resolve, reject) {
    debugger;
    setTimeout(function () {
        resolve(100);
    }, 2000);
})
    .then(function (res) {
    return new toyPromise_1.default(function (resolve) {
        setTimeout(function () {
            resolve(res + 200);
        }, 1000);
    });
})
    .then(function (res) {
    console.log('res3', res);
});
//# sourceMappingURL=debugTest.js.map