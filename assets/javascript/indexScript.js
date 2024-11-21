const ul = document.querySelector('#navContainer');
const homeButton = document.querySelector('#homeButton');
const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

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
    const homeButtonA = document.createElement('a');

    // Criar o texto dos elementos html
    const ordersTxt = document.createTextNode('PEDIDOS');
    const adminTxt = document.createTextNode('ADMIN');
    const configTxt = document.createTextNode('CONFIGURAÇÃO');
    const logoutTxt = document.createTextNode('SAIR');
    const homeButtonTxt = document.createTextNode('Visualizar catálogo');

    // Unir os textos/elementos filhos aos seus 'pais'
    ordersA.appendChild(ordersTxt);
    ordersLi.appendChild(ordersA);
    adminA.appendChild(adminTxt);
    adminLi.appendChild(adminA);
    configA.appendChild(configTxt);
    configLi.appendChild(configA);
    logoutA.appendChild(logoutTxt);
    logoutLi.appendChild(logoutA);
    homeButtonA.appendChild(homeButtonTxt);

    ul.appendChild(ordersLi);
    ul.appendChild(adminLi);
    ul.appendChild(configLi);
    ul.appendChild(logoutLi);
    homeButton.appendChild(homeButtonA)

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
    homeButtonA.setAttribute('href', 'catalogo.html');
}

// Links que aparecerão quando usuário estiver deslogado
if (!loggedUser) {
    // Criar os elementos html     
    const loginLi = document.createElement('li');
    const loginA = document.createElement('a');   
    const homeButtonA = document.createElement('a');

    // Criar o texto dos elementos html      
    const loginTxt = document.createTextNode('LOGIN');  
    const homeButtonTxt = document.createTextNode('Fazer login');

    // Unir os textos/elementos filhos aos seus 'pais'  
    loginA.appendChild(loginTxt);
    loginLi.appendChild(loginA);     
    homeButtonA.appendChild(homeButtonTxt);

    ul.appendChild(loginLi);
    homeButton.appendChild(homeButtonA)

    // Adicionar classes aos elementos criados   
    loginLi.classList.add('nav-item');
    loginA.classList.add('nav-link');

    // Adicionar atributos aos elementos criados     
    loginA.setAttribute('href', 'login.html');
    homeButtonA.setAttribute('href', 'login.html');
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


