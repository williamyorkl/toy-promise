"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toyPromise_1 = __importDefault(require("../toyPromise"));
new toyPromise_1.default(function (resolve, reject) {
    setTimeout(function () {
        debugger;
        resolve(32);
    }, 1000);
})
    .then(function (res) {
    console.log('🚀 ~ file: debugTest.ts ~ line 8 ~ res', res);
    return Number(res) + 1111;
})
    .then(function (res) {
    console.log('🚀 ~ file: debugTest.ts ~ line 11 ~ res', res);
});
//# sourceMappingURL=debugTest.js.map