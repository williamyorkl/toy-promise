"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toyPromise_1 = __importDefault(require("../src/toyPromise"));
/**
 * 二、实现promise进一步功能
 *  1. executor里面的异步函数,如setTimeout()
 *  2. .then最基本的链式调用
 */
test('Promise基础功能 - 1.1处理内部回调函数（executor内部异步执行速度比.then的回调函数快）', function () {
    new toyPromise_1.default(function (resolve, reject) {
        setTimeout(function () {
            resolve(32);
        });
    }).then(function (res) {
        expect(res).toBe(32);
    });
});
test('Promise基础功能 - 1.2处理内部回调函数（executor内部异步执行速度比.then的回调函数慢）', function (done) {
    new toyPromise_1.default(function (resolve, reject) {
        setTimeout(function () {
            resolve(111111);
        }, 2000);
    }).then(function (res) {
        expect(res).toBe(111111);
        done();
    });
});
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
        expect(res).toBe(333333);
        done();
    });
});
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
//# sourceMappingURL=1-2basicFunc.test.js.map