let a = 0;
let b = 0;

function retornaA(timer) {
  a = 10;
}

function retornaB(timer) {
  b = 5;
}

function log() {
  console.log(a + b);
}

retornaA();
retornaB();
log();
