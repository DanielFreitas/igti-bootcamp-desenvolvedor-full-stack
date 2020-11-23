let a = 0;
let b = 0;

function log() {
  console.log(a + b);
}

retornaA(1000)
  .then(result => retornaB(1000))
  .then(log)
  .catch(error => console.log(error));

function retornaA(timer) {
  const promise = new Promise((resolve, reject) => {
    try {
      setTimeout(function () {
        a = 10;
        resolve(a);
      }, timer);
    } catch (error) {
      reject(error);
    }
  });
  return promise;
}

function retornaB(timer) {
  const promise = new Promise((resolve, reject) => {
    try {
      setTimeout(function () {
        b = 5;
        resolve(b);
      }, timer);
    } catch (error) {
      reject(error);
    }
  });
  return promise;
}
