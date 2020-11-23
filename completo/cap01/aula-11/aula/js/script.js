window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
});

// O método map() invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado.
function doMap() {
  const nameEmailArray = people.results.map(person => {
    return {
      name: person.name,
      email: person.email
    };
  });

  console.log(nameEmailArray);

  return nameEmailArray;
}

// O método filter() cria um novo array com todos os elementos que passaram no teste implementado pela função fornecida.
function doFilter() {
  const olderThan50 = people.results.filter(person => {
    return person.dob.age > 50;
  });

  console.log(olderThan50);
}

function doForEach() {
  const mappedPeople = doMap();

  mappedPeople.forEach(person => {
    person.nameSize = person.name.title.length + person.name.first.length + person.name.last.length;
  });

  console.log(mappedPeople);
}

// O método reduce()executa uma função reducer (fornecida por você) para cada elemento do array, resultando num único valor de retorno.
function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);

  console.log(totalAges);

  // let sumAges = 0;

  // for (let i = 0; i < people.results.length; i++) {
  //   var current = people.results[i];
  //   sumAges += current.dob.age;
  // }

  // console.log(sumAges);
}

// O método find() retorna o valor do primeiro elemento do array que satisfizer a função de teste provida. Caso contrario, undefined é retornado.
function doFind() {
  const found = people.results.find(person => {
    return person.location.state === 'Minas Gerais';
  });

  console.log(found);
}

// O método some() testa se ao menos um dos elementos no array passa no teste implementado pela função atribuída e retorna um valor true ou false.
function doSome() {
  const found = people.results.some(person => {
    return person.location.state === 'Amazonas';
  });

  console.log(found);
}

// O método every() testa se todos os elementos do array passam pelo teste implementado pela função fornecida.
function doEvery() {
  const every = people.results.every(person => {
    return person.nat === 'BR';
  });

  console.log(every);
}

function doSort() {
  const mappedNames = people.results
    .map(person => {
      return {
        name: person.name.first
      };
    })
    .filter(person => person.name.startsWith('A'))
    .sort((a, b) => {
      return b.name.length - a.name.length;
      // return a.name.localeCompare(b.name);
    });

  console.log(mappedNames);
}
