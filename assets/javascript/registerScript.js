const form = document.querySelector('#form');
const ul = document.querySelector('#navContainer');
const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

if (loggedUser) location.replace('index.html'); // Redireciona o usuário logado para a tela inicial

form.addEventListener('submit', (event) => {
    // Impedir o envio do formulário
    event.preventDefault();

    // Pegar os valores dos inputs
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Validar os dados
    if (!firstName || !lastName || !email || !password) return alert('Preencha todos os campos');
    if (firstName.length < 2 || firstName.length > 15) return alert('Campo NOME precisa ter entre 2 e 15 caracteres')
    if (lastName.length < 2 || lastName.length > 15) return alert('Campo SOBRENOME precisa ter entre 2 e 15 caracteres')
    if (password.length < 6 || password.length > 20) return alert('Campo Senha precisa ter entre 6 e 20 caracteres')

    // Organizar os dados
    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
    }

    // Criar o usuário na base de dados
    fetch('https://ads-api-kohl.vercel.app/users', {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(async (response) => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors[0] ? errorData.errors[0] : response.statusText);
            }

            return response.json(); // Converte a resposta para JSON
        })
        .then(result => {
            alert('Usuário criado com sucesso');
            location.replace('login.html');
        })
        .catch(error => {
            alert(error.message)
            console.error("Erro:", error.message); // Trata erros
        });
})

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
