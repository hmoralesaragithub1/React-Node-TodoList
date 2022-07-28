import React from "react";
import Task from "./Task";
const TasksList = ({ tasks, getTasks }) => {
  return (
    <div className="card">
      <h3>Tareas agregadas</h3>
      <ul className="list-group list-group-flush" id="listatarea">
        {tasks.map((task) => (
          <Task key={task.id} task={task} getTasks={getTasks} />
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
