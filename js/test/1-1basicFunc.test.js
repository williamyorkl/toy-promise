"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toyPromise_1 = __importDefault(require("../src/toyPromise"));
/**
 * 一、实现promise最基本
 *  1. 状态只可以被修改一次
 *  2. 最简陋的.then()  // 不支持异步
 *  3. .catch和.reject
 */
test('Promise基础功能 - 状态status;resolve', function () {
    new toyPromise_1.default(function (resolve, reject) {
        resolve(1);
        reject(2);
    }).then(function (res) {
        expect(res).toBe(1);
    });
});
test('Promise基础功能 - 状态status; reject', function () {
    new toyPromise_1.default(function (resolve, reject) {
        reject(3);
        resolve(4);
    }).then(null, function (rej) {
        expect(rej).toBe(3);
    });
});
test('Promise基础功能：抛出异常2 - .catch()与.then的并列', function () {
    new toyPromise_1.default(function (resolve, reject) {
        throw new Error('error'); // 注意，这里是new Error才会有报错
    }).catch(function (reject) {
        expect(reject && reject.toString()).toMatch('error');
    });
});
test('Promise基础功能：抛出异常1 - .then()内部的reject', function () {
    new toyPromise_1.default(function (resolve, reject) {
        throw new Error('error');
    }).then(null, function (reject) {
        expect(reject && reject.toString()).toMatch('error');
    });
});
//# sourceMappingURL=1-1basicFunc.test.js.map