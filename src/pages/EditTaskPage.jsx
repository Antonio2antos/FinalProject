import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const url = `http://localhost:3000`;

function EditTaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(undefined);
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("");

  useEffect(() => {
    axios.get(`${url}/tasks/${taskId}`).then((response) => {
      setTask(response.data);
    });
  }, [taskId]);

  const addSubTask = () => {
    if (newSubTaskTitle.trim() === "") return;

    const newSubTask = {
      id: uuidv4(),
      title: newSubTaskTitle,
      done: false,
    };

    setTask((prev) => ({
      ...prev,
      subtasks: [...(prev.subtasks || []), newSubTask],
    }));
    setNewSubTaskTitle("");
  };

  const removeSubTask = (id) => {
    setTask((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((sub) => sub.id !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${url}/tasks/${taskId}`, task).then((response) => {
      if (response.status === 200) {
        navigate(`/tasks`);
      }
    });
  };

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Editar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            name="description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="priority">Prioridade:</label>
          <select
            name="priority"
            id="priority"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <option value="">Selecione</option>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
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
            {task.subtasks?.map((sub) => (
              <li key={sub.id}>
                {sub.title} — {sub.done ? "✅" : "❌"}{" "}
                <button type="button" onClick={() => removeSubTask(sub.id)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Guardar Alterações</button>
      </form>
    </div>
  );
}

export default EditTaskPage;
