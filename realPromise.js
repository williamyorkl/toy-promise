new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(111);
  });
  resolve(1);
}).then((res) => {
  console.log("newPromise ~ res", res);
});
