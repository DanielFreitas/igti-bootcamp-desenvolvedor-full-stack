let a = 0;
let b = 0;

function log() {
  console.log(a + b);
}

Soma();

function retornaA(timer) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(function () {
        a = 10;
        resolve(a);
      }, timer);
    } catch (error) {
      reject(error);
    }
  });
}

function retornaB(timer) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(function () {
        b = 5;
        resolve(b);
      }, timer);
    } catch (error) {
      reject(error);
    }
  });
}

async function Soma() {
  await retornaA(1000);
  await retornaB(1001);
  log();
}
