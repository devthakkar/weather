var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('arguments must be numbers')
      }
    }, 1500);
  })
};
asyncAdd(5,7).then((res) => {
  console.log('result', res);
  return asyncAdd(res, 33);
}).then((res) => {
  console.log (res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});
// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('hey it worked');
//     reject('rejected')
//   }, 2500)
//
//
//
// });
// somePromise.then((message) => {
//   console.log('success: ', message)
// }, (errorMessage) => {
//   console.log ('error', errorMessage)
//
// })
