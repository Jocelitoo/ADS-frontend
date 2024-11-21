const form = document.querySelector('#form');
const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
const ul = document.querySelector('#navContainer');


form.addEventListener('submit', async (event) => {
    // Impedir que o formulário faça a requisição
    event.preventDefault();

    // Verificar se o usuário está logado
    if (!loggedUser) return alert('Faça login na sua conta para realizar a compra')

    // Pegar os valores dos inputs
    const name = document.querySelector('#name').textContent;
    const price = 994.34;
    const address = document.querySelector('#address').value;
    const city = document.querySelector('#city').value;
    const state = document.querySelector('#state').value;
    const payment = document.querySelector('#payment').value;

    // Validar os dados
    if (!address || !city || !state) return alert('Preencha todos os campos')

    // Organizar os dados
    const data = {
        productName: name,
        price: price,
        address: {
            address: address,
            city: city,
            state: state,
        },
        paymentMethod: payment,
    }

    // Criar o pedido na base de dados
    const token = loggedUser.token;

    fetch('https://ads-api-kohl.vercel.app/orders', {
        method: 'POST', // Método HTTP   
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
            alert('Pedido realizado com sucesso');
            location.reload();
        })
        .catch(error => {
            alert(error.message)
            console.error("Erro:", error.message); // Trata erros
        });
})


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

// Links que aparecerão quando usuário estiver deslogado
if (!loggedUser) {
    // Criar os elementos html     
    const loginLi = document.createElement('li');
    const loginA = document.createElement('a');   

    // Criar o texto dos elementos html      
    const loginTxt = document.createTextNode('LOGIN');  

    // Unir os textos/elementos filhos aos seus 'pais'  
    loginA.appendChild(loginTxt);
    loginLi.appendChild(loginA);     

    ul.appendChild(loginLi);

    // Adicionar classes aos elementos criados   
    loginLi.classList.add('nav-item');
    loginA.classList.add('nav-link');

    // Adicionar atributos aos elementos criados     
    loginA.setAttribute('href', 'login.html');    
}


// Links que aparecerão quando usuário estiver logado
if (loggedUser.token && loggedUser.user) {
    // Criar os elementos html pra usuários logados
    createHtml();

    // Lógica do logout
    const logout = document.querySelector('#logout');

    logout.addEventListener('click', () => {
        localStorage.removeItem('loggedUser'); // Remove o loggedUser do localStorage
    })
}


