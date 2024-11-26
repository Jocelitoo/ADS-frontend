const form = document.querySelector('#form');
const ul = document.querySelector('#navContainer');
const deleteButton = document.querySelector('#deleteButton');
const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

// Verificar se o usuário está logado
if (!loggedUser) location.replace('index.html');

form.addEventListener('submit', (event) => {
    // Impedir o envio da requisição do form
    event.preventDefault();

    // Verificar se o usuário está logado
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    if (!loggedUser) return alert('Faça login na sua conta para realizar a alteração da senha')

    // Pegar o valor do input password
    const password = document.querySelector('#password').value

    // Validar o input 
    if (password.length < 6 || password.length > 20) return alert('Campo Senha precisa ter entre 6 e 20 caracteres')

    // Organizar os dados
    const data = {
        password: password
    }

    // Atualizar o usuário com a nova senha
    const token = loggedUser.token;

    fetch('http://localhost:7000/users', {
        method: 'PUT', // Método HTTP 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(async (response) => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error ? errorData.error : response.statusText);
            }

            return response.json(); // Converte a resposta para JSON
        })
        .then(result => {
            alert('Senha atualizada com sucesso');
            location.reload();
        })
        .catch(error => {
            alert(error.message)
            console.error("Erro:", error.message); // Trata erros
        });
})

deleteButton.addEventListener('click', () => {
    // Verificar se o usuário está logado
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    if (!loggedUser) return alert('Faça login na sua conta para realizar a alteração da senha')

    // Confirmação se o usuário quer deletar a conta
    const confirmDelete = confirm('Você tem certeza que quer deletar a conta ?');

    // Deletar o usuário
    if (confirmDelete) {
        const token = loggedUser.token

        fetch('http://localhost:7000/users', {
            method: 'DELETE', // Método HTTP
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error ? errorData.error : response.statusText);
                }

                return response.json(); // Converte a resposta para JSON
            })
            .then(result => {
                alert('Conta deletada com sucesso');
                location.replace('index.html');
                localStorage.removeItem('loggedUser'); // Remove o loggedUser do localStorage
            })
            .catch(error => {
                alert(error.message)
                console.error("Erro:", error.message); // Trata erros
            });
    }

})

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
}