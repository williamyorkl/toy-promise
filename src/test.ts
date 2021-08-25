let p = new MPromise((resolve, reject) => {
  reject(3);
  resolve(4);
});


console.log("🚀 ~ file: test.ts ~ line 7 ~ p.toString()", p.toString())