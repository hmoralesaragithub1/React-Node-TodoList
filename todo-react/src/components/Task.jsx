import { useState } from "react";

import Swal from "sweetalert2";

import TodoApi from "../services/TodoApi";

const Task = ({ task, getTasks }) => {
  const checkTask = async () => {
    const response = await Swal.fire({
      title: "Estas seguro de marcar como hecha la tarea?",
      text: "No podras revertir este cambio!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Estoy seguro, completar la tarea!",
    });

    if (response.isConfirmed) {
      TodoApi.doneTask(task.id);
      getTasks();
      Swal.fire(
        "Completada!",
        "Completaste la tarea satisfactoriamente",
        "success"
      );
    }
  };

  const editTask = async () => {
    const response = await Swal.fire({
      title: "Enter your IP address",
      input: "text",
      inputLabel: "Your IP address",
      inputValue: task.text,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Escribe algo";
        }
      },
    });

    if (response.isConfirmed) {
      await TodoApi.updateTask(task.id, response.value);
      getTasks();
    }
  };

  const deleteTask = async () => {
    const response = await Swal.fire({
      title: "Estas seguro de eliminar la tarea?",
      text: "No podras revertir este cambio!",
      icon: "error",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Estoy seguro, eliminar la tarea!",
    });

    if (response.isConfirmed) {
      TodoApi.deleteTask(task.id);
      getTasks();
      Swal.fire(
        "Eliminada!",
        "Eliminaste la tarea satisfactoriamente",
        "success"
      );
    }
  };

  const bgStatus = {
    todo: "bg-primary",
    done: "bg-success",
    delete: "bg-danger",
  };

  return (
    <>
      <li className={`list-group-item ${bgStatus[task.status]} bg-opacity-25`}>
        <div className="row">
          <div className="col-md-8"> {task.text}</div>
          <div className="col-md-4 ">
            {task.status !== "done" && task.status !== "delete" && (
              <>
                <button className="btn btn-sm btn-success" onClick={checkTask}>
                  <i className="fa fa-check"></i>
                </button>
                <button className="btn btn-sm btn-warning" onClick={editTask}>
                  <i className="fa fa-edit"></i>
                </button>
                <button className="btn btn-sm btn-danger" onClick={deleteTask}>
                  <i className="fa fa-trash"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default Task;
