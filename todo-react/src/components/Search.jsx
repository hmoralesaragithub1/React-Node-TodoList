import React, { useState, useRef } from "react";

const Search = ({ setTasks, getTasks }) => {
  const [nameTask, setNameTask] = useState("");

  const baseUrl = "http://localhost:3000";

  const inputTask = useRef(null);

  /*
  const getTasks = async () => {
    try {
      const response = await fetch(`${baseUrl}/tasks`);
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.log("error", error);
    }
  };
  */

  const addTask = async () => {
    const body = {
      text: nameTask,
    };

    try {
      const response = await fetch(`${baseUrl}/task`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.message !== "ok") return;

      inputTask.current.value = "";
      inputTask.current.focus();

      getTasks();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form
          className="input-group"
          id="formulario_agregar"
          action="http://localhost:3000/task"
          method="post"
        >
          <input
            name="task_text"
            type="text"
            className="form-control"
            placeholder="New task..."
            id="input-text"
            ref={inputTask}
            onChange={(e) => setNameTask(e.target.value)}
          />
          <button type="button" className="btn btn-primary" onClick={addTask}>
            <i className="fa-solid fa-plus"></i>
            {""}
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
