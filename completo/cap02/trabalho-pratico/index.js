import { promises as fs } from 'fs';

let dataStates;
let dataCities;
let dataCitiesByState;
let dataCitiesByUF = [];

start();

async function start() {
  console.log('1 - Carrega os arquivos Estados.json e Cidades.json, em seguida grava os arquivos por Estado');
  dataStates = await getDataOfFile('./json/in/Estados.json');
  dataCities = await getDataOfFile('./json/in/Cidades.json');
  dataCitiesByState = await getAllCitiesByState();
  await writeJsonFileByState();
  console.log('ok');

  console.log('2 - Lê a quantidade de cidades a partir de um arquivo: AC');
  dataCitiesByUF = await getCitiesByUF('AC');
  console.log(dataCitiesByUF.cidades.length);

  console.log('3 - UF dos cinco Estados que mais possuem cidades');
  dataCitiesByUF = await getCitiesByUF();
  let fiveLargestCitiesByPopulation = await getFiveLargestCitiesByPopulation();
  console.log(fiveLargestCitiesByPopulation);

  console.log('4 - UF dos cinco Estados que menos possuem cidades');
  let fiveLeastCitiesByPopulation = await getFiveLeastCitiesByPopulation();
  console.log(fiveLeastCitiesByPopulation);

  console.log('5 - Cidade de maior nome de cada Estado');
  console.log(await getLongestTownNamesByState());

  console.log('6 - Cidade de menor nome de cada Estado');
  console.log(await getShortestTownNamesByState());

  console.log('7 - Cidade de maior nome entre todos os Estados');
  console.log(await getLongestTownName());

  console.log('8 - Cidade de menor nome entre todos os Estados');
  console.log(await getShortestTownNames());

  console.log('Qual a soma das quantidades de cidades dos cinco estados com mais cidades?');
  console.log(fiveLargestCitiesByPopulation.reduce((acc, cur) => reduceToSumPopulation(acc, cur)));

  console.log('Qual a soma das quantidades de cidades dos cinco estados com menos cidades?');
  console.log(fiveLeastCitiesByPopulation.reduce((acc, cur) => reduceToSumPopulation(acc, cur)));
}

function getDataOfFile(filePath) {
  return new Promise((resolve, reject) => {
    try {
      resolve(fs.readFile(filePath, 'utf-8').then(result => JSON.parse(result)));
    } catch (error) {
      reject(error);
    }
  });
}

function getAllCitiesByState() {
  return new Promise((resolve, reject) => {
    try {
      const cities = dataStates.map(state => {
        return {
          ...state,
          cidades: dataCities.filter(city => city.Estado === state.ID)
        };
      });

      resolve(cities);
    } catch (error) {
      reject(error);
    }
  });
}

function writeJsonFileByState() {
  return new Promise((resolve, reject) => {
    try {
      for (const state of dataCitiesByState) {
        resolve(fs.writeFile(`./json/out/${state.Sigla}.json`, JSON.stringify(state.cidades, null, 4)));
      }
    } catch (error) {
      reject(error);
    }
  });
}

async function getCitiesByUF(UF) {
  try {
    let cities = [];

    if (typeof UF === 'undefined') {
      for await (const state of dataStates) {
        cities.push(await getDataOfFile(`./json/out/${state.Sigla}.json`));
      }

      let retorno = dataStates.map((state, index) => {
        return {
          ...state,
          cidades: cities[index].filter(city => city.Estado === state.ID)
        };
      });

      return retorno;
    } else {
      cities.push(await getDataOfFile(`./json/out/${UF}.json`));

      let retorno = dataStates
        .filter(state => {
          return state.Sigla === UF;
        })
        .map((state, index) => {
          return {
            ...state,
            cidades: cities[index].filter(city => city.Estado === state.ID)
          };
        });

      return retorno[0];
    }
  } catch (error) {
    console.log(error);
  }
}

function getFiveLargestCitiesByPopulation() {
  return new Promise((resolve, reject) => {
    try {
      let numberCitiesByState = [];

      for (const state of dataCitiesByUF) {
        numberCitiesByState.push(`${state.Sigla} - ${state.cidades.length}`);
      }

      resolve(
        numberCitiesByState
          .sort((a, b) => {
            let x = parseInt(b.substring(b.indexOf('-') + 1, b.length));
            let y = parseInt(a.substring(a.indexOf('-') + 1, a.length));
            return x - y;
          })
          .slice(0, 5)
      );
    } catch (error) {
      reject(error);
    }
  });
}

function getFiveLeastCitiesByPopulation() {
  return new Promise((resolve, reject) => {
    try {
      let numberCitiesByState = [];

      for (const state of dataCitiesByUF) {
        numberCitiesByState.push(`${state.Sigla} - ${state.cidades.length}`);
      }

      resolve(
        numberCitiesByState
          .sort((a, b) => {
            let x = parseInt(b.substring(b.indexOf('-') + 1, b.length));
            let y = parseInt(a.substring(a.indexOf('-') + 1, a.length));
            return x - y;
          })
          .slice(-5)
      );
    } catch (error) {
      reject(error);
    }
  });
}

function getLongestTownNamesByState() {
  return new Promise((resolve, reject) => {
    try {
      let citiesByState = [];

      citiesByState.push(
        dataCitiesByUF.map(state => {
          return state.cidades
            .map(citie => {
              return `${citie.Nome} - ${state.Sigla}`;
            })
            .reduce((acc, cur) => reduceToLongName(acc, cur), '');
        })
      );

      resolve(citiesByState.flat());
    } catch (error) {
      reject(error);
    }
  });
}

function getShortestTownNamesByState() {
  return new Promise((resolve, reject) => {
    try {
      let citiesByState = [];

      citiesByState.push(
        dataCitiesByUF.map(state => {
          return state.cidades
            .map(citie => {
              return `${citie.Nome} - ${state.Sigla}`;
            })
            .reduce((acc, cur) => reduceToShortName(acc, cur));
        })
      );

      resolve(citiesByState.flat());
    } catch (error) {
      reject(error);
    }
  });
}

function getLongestTownName() {
  return new Promise((resolve, reject) => {
    try {
      let citiesByState = [];

      citiesByState.push(
        dataCitiesByUF
          .map(state => {
            return state.cidades.map(citie => {
              return `${citie.Nome} - ${state.Sigla}`;
            });
          })
          .flat()
          .reduce((acc, cur) => reduceToLongName(acc, cur), '')
      );

      resolve(citiesByState);
    } catch (error) {
      reject(error);
    }
  });
}

function getShortestTownNames() {
  return new Promise((resolve, reject) => {
    try {
      let citiesByState = [];

      citiesByState.push(
        dataCitiesByUF
          .map(state => {
            return state.cidades.map(citie => {
              return `${citie.Nome} - ${state.Sigla}`;
            });
          })
          .flat()
          .reduce((acc, cur) => reduceToShortName(acc, cur))
      );

      resolve(citiesByState);
    } catch (error) {
      reject(error);
    }
  });
}

function reduceToShortName(acc, cur) {
  if (acc.length < cur.length) {
    return acc;
  }

  if (acc.length === cur.length) {
    if (acc.localeCompare(cur) < 0) {
      return acc;
    } else {
      return cur;
    }
  }

  return cur;
}

function reduceToLongName(acc, cur) {
  if (acc.length < cur.length) {
    return cur;
  }

  if (acc.length === cur.length) {
    if (acc.localeCompare(cur) < 0) {
      return acc;
    } else {
      return cur;
    }
  }

  return acc;
}

function reduceToSumPopulation(acc, cur) {
  if (!Number.isInteger(acc)) {
    acc = parseInt(acc.substring(acc.indexOf('-') + 1, acc.length));
  }
  if (!Number.isInteger(cur)) {
    cur = parseInt(cur.substring(cur.indexOf('-') + 1, cur.length));
  }
  return acc + cur;
}
