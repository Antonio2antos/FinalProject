import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const url = `http://localhost:3000`;

function EditTaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");


  // Adicionar! Autopreencher dados existentes
  useEffect(() => {
    axios.get(`${url}/tasks/${taskId}`).then((response) => {
      const task = response.data;
      setName(task.name);
      setDescription(task.description);
      setPriority(task.priority);
    });
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${url}/tasks/${taskId}`, {
        name,
        description,
        priority,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate(`/tasks`);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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

        <button type="submit">Editar Task</button>
      </form>
    </div>
  );
}

export default EditTaskPage;
