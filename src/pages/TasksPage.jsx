import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const url = `http://localhost:3000`;

function TasksPage() {
  const [tasks, setTasks] = useState([]); // <- Aqui está o useState

  useEffect(() => {
    axios
      .get(`${url}/tasks`)
      .then((response) => {
        console.log("Tarefas carregadas:", response.data);
        setTasks(response.data); // <- Guardar as tarefas no estado
      })
      .catch((error) => {
        console.error("Erro ao carregar tarefas:", error);
      });
  }, []); // <- Só corre uma vez ao montar o componente

  return (
    <div className="tasks">
      <h3>Todas as Tasks!</h3>

      {tasks.map((task) => (
        <div key={task.id}>
          <Link to={`/tasks/${task.id}`}>{task.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default TasksPage;
