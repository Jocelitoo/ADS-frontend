const form = document.querySelector('#form');
const ul = document.querySelector('#navContainer');
const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

if (loggedUser) location.replace('index.html'); // Redireciona o usuário logado para a tela inicial


form.addEventListener('submit', async (event) => {
  // Evitar o envio do form
  event.preventDefault();

  // Pegar os dados
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  // Organizar os dados
  const data = {
    email: email,
    password: password
  }

  // Login
  fetch('https://ads-api-kohl.vercel.app/tokens', {
    method: 'POST', // Método HTTP        
    headers: {
      'Content-Type': 'application/json', // Define o tipo de dado enviado
    },
    body: JSON.stringify(data), // Converte os dados para JSON
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error ? errorData.error.join(', ') : response.statusText);
      }

      return response.json(); // Converte a resposta para JSON
    })
    .then(result => {
      localStorage.setItem('loggedUser', JSON.stringify(result)); // Salva o token e os dados do usuário logado no localStorage
      alert('Usuário logado com sucesso'); // Aviso que o usuário foi logado
      location.replace('index.html'); // Redireciona o usuário logado para a tela inicial
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

