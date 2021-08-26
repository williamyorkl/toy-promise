"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toyPromise_1 = __importDefault(require("../toyPromise"));
new toyPromise_1.default(function (resolve, reject) {
    debugger;
    setTimeout(function () {
        resolve(32);
    }, 1000);
})
    .then(function (res) {
    console.log('🚀 ~ file: debugTest.ts ~ line 8 ~ res', res);
    var resVal = Number(res) + 1111;
    return resVal;
})
    .then(function (res) {
    console.log('🚀 ~ file: debugTest.ts ~ line 11 ~ res', res);
});
/**
 * 多个.then调用，需要解决：
 *  1. .then执行后的return值，需要可以被下一个.then使用
 *  2. 所以.then应该返回一个Object.create(new MPromise)
 *  3. 并且这个MPromise里面的this.promiseResult的值是新的
 */
//# sourceMappingURL=debugTest.js.map