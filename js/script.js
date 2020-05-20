let allUsers = [];
let statiscticSearch = [];
let inputUser = null;
let eventSubmit = null;
let users = null;
let usersStatistic = null;
let numberFormat = null;
let getInput = null;
let titleUser = null;
let titleStatistc = null;

window.addEventListener('load', () => {
    console.log('js carregado');
    inputUser = document.querySelector('#inputUser');
    users = document.querySelector('#users');
    usersStatistic = document.querySelector('#usersStatistic');
    titleUser = document.querySelector('#titleUser');
    // users = document.querySelector('#users');
    titleStatistc = document.querySelector('#titleStatistc');
    fetchUsers();
    eventSubmit = document.querySelector('#formulario');
});

const fetchUsers = async () => {
    const res = await fetch(
        'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
    );
    const data = await res.json();
    console.log(data);
    allUsers = data.results.map((item) => {
        let fullName = `${item.name.first} ${item.name.last}`;
        return {
            name: fullName,
            gender: item.gender,
            age: item.dob.age,
            img: item.picture.thumbnail,
        };
    });
    render();
    console.log('USER ', inputUser.value);
};

const render = () => {
    console.log('Rendering..');
    listEmpty();
    eventSubmit.addEventListener('submit', searchUser);
};

const searchUser = (e) => {
    e.preventDefault();
    getInput = inputUser.value;
    inputUser.value = '';
    renderListFilter(getInput);
};

const renderListFilter = (query) => {
    let filterItems = allUsers.filter((item) => {
        return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });

    filterItems.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    let divUser = '<div>';

    if (filterItems.length == 0) {
        listEmpty();
        return;
    }

    filterItems.forEach((user) => {
        const { name, age, img } = user;

        const userHTML = `
            <div class="divUser">
                <img src="${img}" alt="imagem-${name}">
                <p>${name}, ${age} anos</p>
            </div>
        `;
        divUser += userHTML;
    });

    divUser += '</div>';
    users.innerHTML = divUser;

    renderStatistcList(query);
};

const renderStatistcList = (query) => {
    let filterItems = allUsers.filter((item) => {
        return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });

    let totalAge = filterItems.reduce((acc, cur) => {
        return acc + cur.age;
    }, 0);

    let rateAge = totalAge / filterItems.length;
    let totalMale = filterItems.filter((item) => item.gender === 'male');
    let totalFemale = filterItems.filter((item) => item.gender === 'female');

    let divUser = '<div>';

    const userHTML = `
        <div >
            <h5>Estatśticas</h5>
            <p>Sexo masculino: ${totalMale.length}</p>
            <p>Sexo feminino: ${totalFemale.length}</p>
            <p>Soma das idades: ${totalAge}</p>
            <p>Média das idades: ${rateAge.toFixed(2)}</p>
        </div>
    `;

    divUser += userHTML;

    divUser += '</div>';

    usersStatistic.innerHTML = divUser;
};

const listEmpty = () => {
    let divUser = '<div>';

    const userHTML = `
        <div >
            <h5>Nenhum usuário filtrado</h5>
        </div>
        `;

    divUser += userHTML;

    divUser += '</div>';

    users.innerHTML = divUser;

    let divUserStatistic = '<div>';

    const userStatisticHTML = `
    <div >
        <h5>Nada a ser exibido</h5>
    </div>
    `;

    divUserStatistic += userStatisticHTML;

    divUserStatistic += '</div>';

    usersStatistic.innerHTML = divUserStatistic;
};
