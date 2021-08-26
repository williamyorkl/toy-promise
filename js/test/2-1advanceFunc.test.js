"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toyPromise_1 = __importDefault(require("../src/toyPromise"));
/**
 * 三、实现promise的.then里面的其它返回值
 *  1. setTimeout
 *  2. MPromise实例
 */
test('Promise基础功能 - 1.3then的链式调用', function (done) {
    new toyPromise_1.default(function (resolve, reject) {
        setTimeout(function () {
            resolve(111111);
        }, 2000);
    })
        .then(function (res) {
        return Number(res) + 222222;
    })
        .then(function (res) {
        return Number(res) + 222222; // 多次
    })
        .then(function (res) {
        expect(res).toBe(555555);
        done();
    });
});
//# sourceMappingURL=2-1advanceFunc.test.js.map