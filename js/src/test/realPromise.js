"use strict";
new Promise(function (resolve, reject) {
    debugger;
    setTimeout(function () {
        resolve(100);
    }, 2000);
})
    .then(function (res) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(res + 200);
        }, 1000);
    });
})
    .then(function (res) {
    console.log('res3', res);
});
//# sourceMappingURL=realPromise.js.map