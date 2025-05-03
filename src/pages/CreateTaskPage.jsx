import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const url = `http://localhost:3000`;

function CreateTaskPage() {
  const navigate = useNavigate();

  const [priority, setPriority] = useState("");
  const [done, setDone] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("");

  const addSubTask = () => {
    if (newSubTaskTitle.trim() === "") return;

    const newSubTask = {
      id: uuidv4(),
      title: newSubTaskTitle,
      done: false,
    };

    setSubtasks((prev) => [...prev, newSubTask]);
    setNewSubTaskTitle("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    const newTask = {
      id: uuidv4(),
      name: e.target[0].value,
      description: e.target[1].value,
      priority,
      done,
      subtasks,
    };

    axios.post(`${url}/tasks`, newTask).then((response) => {
      if (response.status === 201) {
        navigate(`/tasks`);
      }
    });
  };

  return (
    <div>
      <h2>Criar Nova Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input type="text" name="name" />
        </div>

        <div>
          <label htmlFor="description">Descrição:</label>
          <input type="text" name="description" />
        </div>

        <div>
          <label htmlFor="priority">Prioridade:</label>
          <select
            name="priority"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div>
          <label>Concluída:</label>
          <input
            type="checkbox"
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
          />
        </div>

        <div>
          <label>Subtarefas:</label>
          <input
            type="text"
            value={newSubTaskTitle}
            onChange={(e) => setNewSubTaskTitle(e.target.value)}
            placeholder="Nova subtarefa"
          />
          <button type="button" onClick={addSubTask}>
            Adicionar Subtarefa
          </button>

          <ul>
            {subtasks.map((sub) => (
              <li key={sub.id}>
                {sub.title} — {sub.done ? "✅" : "❌"}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Criar Task</button>
      </form>
    </div>
  );
}

export default CreateTaskPage;
