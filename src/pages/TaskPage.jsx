import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { readTask, deleteTask as deleteTaskRoute } from "../Routes";
import './App.css';

function TaskPage() {
  const navigate = useNavigate();

  const { taskId } = useParams();
  const [task, setTask] = useState({});

  // chamar a API e obter  task
  useEffect(() => {
    axios.get(readTask(taskId)).then((response) => {
      setTask(response.data);
    });
  }, []);

  // Eliminar task e redirecionar para /tasks
  const deleteTask = () => {
    axios.delete(deleteTaskRoute(taskId)).then((response) => {
      navigate(`/tasks`);
    });
  };
  console.log(task);

  return (
    <div>
      <div>Dados da Task com o id {taskId}</div>
      <div>Nome: {task.name}</div>
      <div>Descrição: {task.description}</div>
      <div>Prioridade: {task.priority}</div>

      <button className="button" onClick={deleteTask}>
        Eliminar
      </button>

      <Link className="button-link" to={`/edit-task/${taskId}`}>
        Editar
      </Link>
      <Link className="button-link" to={`/tasks`}>
        Voltar
      </Link>
    </div>
  );
}

export default TaskPage;
