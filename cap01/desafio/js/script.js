let allUsers = [];
let usersMapped = [];
let btnSearch = null;
let tabUsers = null;
let tabStatistic = null;
let countUsers = 0;
let inputName = null;

window.addEventListener('load', start);

function start() {
  fetchUsers();

  tabUsers = document.querySelector('#tabUsers');
  tabStatistic = document.querySelector('#tabStatistic');
  inputName = document.querySelector('#inputName');
  btnSearch = document.querySelector('#btn_search');
  countUsers = document.querySelector('#countUsers');
  inputName.addEventListener('keyup', searchUser);
  btnSearch.addEventListener('click', searchUser);
  inputName.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchUser();
    }
  });
}

async function fetchUsers() {
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();

  allUsers = json.results.map(user => {
    const { name, gender, dob, picture, login } = user;

    return {
      id: login.uuid,
      name: name.first + ' ' + name.last,
      gender,
      age: dob.age,
      picture
    };
  });

  usersMapped = allUsers;
  render();
}

function render() {
  renderUserList();
  renderSummary();
  renderUserStatistic();
}

function renderUserList() {
  let usersHTML = "<div class='users'>";

  usersMapped.forEach((user, index) => {
    const { id, name, gender, age, picture } = user;

    const userHTML = `
      <div class='user'>
        <div>
          <img src="${picture.thumbnail}" alt="${name}" />
          <span>${name}, ${age} anos</span>
        </div>
      </div>
    `;

    usersHTML += userHTML;
  });

  tabUsers.innerHTML = usersHTML;
}

function renderUserStatistic() {
  let statisticsHTML = "<div class='statistics'>";

  const statisticHTML = `
      <div class='statistic'>
        <div>          
          <span>Sexo masculino: ${countGender('male')}</span><br />
          <span>Sexo feminino: ${countGender('female')}</span><br />
          <span>Soma das idades: ${sumAges()}</span><br />
          <span>Média das idades: ${averageAges()}</span><br />
        </div>
      </div>
    `;

  statisticsHTML += statisticHTML;

  tabStatistic.innerHTML = statisticsHTML;
}

function countGender(gender) {
  const filter = usersMapped.filter(user => {
    return user.gender === gender;
  });

  return filter.length;
}

function sumAges() {
  const totalAges = usersMapped.reduce((accumulator, user) => {
    return accumulator + user.age;
  }, 0);

  return totalAges;
}

function averageAges() {
  let media = sumAges() / usersMapped.length;
  return media.toFixed(2);
}

function renderSummary() {
  countUsers.textContent = usersMapped.length;
}

function searchUser(e) {
  usersMapped = allUsers.filter(user => user.name.toLowerCase().trim().indexOf(inputName.value.toLowerCase().trim()) > -1);

  usersMapped.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  render();
}
