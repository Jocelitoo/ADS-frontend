const table = document.querySelector('.order-table'); // Pega a <table> que vai armazenar os pedidos
const ul = document.querySelector('#navContainer');
const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

// Verificar se o usuário está logado
if (!loggedUser) location.replace('index.html')

// Função usada para preencher a tabela com os dados do pedido
const createTable = (users) => {
    users.map((user, index) => {
        // Criar a linha (row) da tabela
        const tr = document.createElement('tr');

        // Criar as colunas da tabela
        const number = document.createElement('td');
        const name = document.createElement('td');
        const email = document.createElement('td');

        // Pegar os dados do pedido que serão inseridos na tabela
        const numbertxt = document.createTextNode(index + 1);
        const nametxt = document.createTextNode(`${user.firstName} ${user.lastName}`);
        const emailtxt = document.createTextNode(user.email);

        // Juntar as colunas criadas com os dados do pedido
        number.appendChild(numbertxt);
        name.appendChild(nametxt);
        email.appendChild(emailtxt);

        // Juntar as colunas criadas com a linha (row) da tabela
        tr.appendChild(number);
        tr.appendChild(name);
        tr.appendChild(email);

        // Juntar a linha (row) da tabela com a própria tabela
        table.appendChild(tr);
    })
}


// Adicionar os links dos usuários logados
const createHtml = () => {
    // Criar os elementos html
    const ordersLi = document.createElement('li');
    const ordersA = document.createElement('a');
    const adminLi = document.createElement('li');
    const adminA = document.createElement('a');
    const configLi = document.createElement('li');
    const configA = document.createElement('a');
    const logoutLi = document.createElement('li');
    const logoutA = document.createElement('a');

    // Criar o texto dos elementos html
    const ordersTxt = document.createTextNode('PEDIDOS');
    const adminTxt = document.createTextNode('ADMIN');
    const configTxt = document.createTextNode('CONFIGURAÇÃO');
    const logoutTxt = document.createTextNode('SAIR');

    // Unir os textos/elementos filhos aos seus 'pais'
    ordersA.appendChild(ordersTxt);
    ordersLi.appendChild(ordersA);
    adminA.appendChild(adminTxt);
    adminLi.appendChild(adminA);
    configA.appendChild(configTxt);
    configLi.appendChild(configA);
    logoutA.appendChild(logoutTxt);
    logoutLi.appendChild(logoutA);

    ul.appendChild(ordersLi);
    ul.appendChild(adminLi);
    ul.appendChild(configLi);
    ul.appendChild(logoutLi);

    // Adicionar classes aos elementos criados
    ordersLi.classList.add('nav-item');
    ordersA.classList.add('nav-link');
    adminLi.classList.add('nav-item');
    adminA.classList.add('nav-link');
    configLi.classList.add('nav-item');
    configA.classList.add('nav-link');
    logoutLi.classList.add('nav-item');
    logoutA.classList.add('nav-link');

    // Adicionar atributos aos elementos criados
    ordersA.setAttribute('href', 'pedidos.html');
    adminA.setAttribute('href', 'admin.html');
    configA.setAttribute('href', 'configuração.html');
    logoutA.setAttribute('href', 'index.html');
    logoutA.setAttribute('id', 'logout');
}


if (loggedUser.token && loggedUser.user) {
    // Criar os elementos html pra usuários logados
    createHtml();

    // Lógica do logout
    const logout = document.querySelector('#logout');

    logout.addEventListener('click', () => {
        localStorage.removeItem('loggedUser'); // Remove o loggedUser do localStorage
    })

    // Pegar todos os usuários
    fetch('http://localhost:7000/users', {
        method: 'GET', // Método HTTP   
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async (response) => {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error ? errorData.error.join(', ') : response.statusText);
        }

        return response.json(); // Converte a resposta para JSON
    })
        .then(result => {
            createTable(result)
        })
        .catch(error => {
            alert(error.message)
            console.error("Erro:", error.message); // Trata erros
        });

}