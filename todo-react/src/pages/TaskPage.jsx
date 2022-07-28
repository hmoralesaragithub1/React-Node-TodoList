import { useState, useEffect } from "react";
import Search from "../components/Search";
import TasksList from "../components/TasksList";

const TaskPage = () => {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);

  const baseUrl = "http://localhost:3000";

  const getTasks = async () => {
    try {
      const response = await fetch(`${baseUrl}/tasks`);
      const data = await response.json();
      setTasks(data.tasks);
      console.log("tareas", tasks);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <h1>Todo App</h1>

      <Search setTasks={setTasks} getTasks={getTasks} />

      {tasks.length > 0 ? (
        <TasksList tasks={tasks} getTasks={getTasks} />
      ) : (
        <h3>No hay tareas para mostrar</h3>
      )}
    </>
  );
};

export default TaskPage;
