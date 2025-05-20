📝 Task Manager - Página de Tarefas
Este projeto é uma aplicação React que permite visualizar, editar e eliminar tarefas individuais. A funcionalidade apresentada nesta componente (TaskPage) corresponde à visualização detalhada de uma tarefa específica.

🚀 Funcionalidades
Buscar uma tarefa individual pela API.

Apresentar os detalhes da tarefa:

- Nome

- Descrição

- Prioridade

- Estado (concluída ou por fazer)

- Lista de subtarefas (caso existam)

- Eliminar uma tarefa existente.

- Aceder à edição da tarefa.

- Navegar de volta à lista de tarefas.

🛠️ Tecnologias Utilizadas
React

React Router

Axios

CSS (ficheiro App.css)

📂 Estrutura do Código
jsx
Copiar
Editar
useEffect(() => {
  axios.get(readTask(taskId)).then((response) => {
    setTask(response.data);
  });
}, []);
Ao montar o componente, é feita uma chamada à API para obter os dados da tarefa com o ID fornecido pela URL.

jsx
Copiar
Editar
const deleteTask = () => {
  axios.delete(deleteTaskRoute(taskId)).then(() => {
    navigate(`/tasks`);
  });
};
A função deleteTask permite eliminar a tarefa atual e redirecionar para a lista de tarefas.

📎 Rotas Utilizadas
readTask(taskId) – rota que devolve os dados da tarefa.

deleteTaskRoute(taskId) – rota que elimina a tarefa com o ID fornecido.

🧪 Requisitos
Node.js e npm/yarn instalados.

Backend funcional que disponibilize as rotas readTask e deleteTask.

▶️ Como Executar
Clona o repositório:

bash
Copiar
Editar
git clone https://github.com/seu-utilizador/task-manager.git
cd task-manager
Instala as dependências:

bash
Copiar
Editar
npm install
# ou
yarn
Inicia a aplicação:

bash
Copiar
Editar
npm start
# ou
yarn start
Acede à aplicação no browser:

bash
Copiar
Editar
http://localhost:3000/tasks

✨ Contribuições:
Contribuições são bem-vindas! Podes abrir issues ou pull requests para melhorias ou correções.
