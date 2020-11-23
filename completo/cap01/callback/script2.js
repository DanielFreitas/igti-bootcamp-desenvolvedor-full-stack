let a = 0;
let b = 0;

function retornaA() {
  setTimeout(function () {
    a = 10;
  }, 1000);
}

function retornaB() {
  b = 5;
}

function log() {
  console.log(a + b);
}

retornaA();
retornaB();
log();
