let a = 0;
let b = 0;

function retornaA(timer) {
  setTimeout(function () {
    a = 10;
  }, timer);
}

function retornaB(timer) {
  setTimeout(function () {
    b = 5;
  }, timer);
}

function log() {
  console.log(a + b);
}

retornaA(1000);
retornaB(1000);
log();


function Soma(x, (resultado) =>{

}
);