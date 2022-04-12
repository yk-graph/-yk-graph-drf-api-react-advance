import React from "react";
import { useDispatch } from "react-redux";
import { completeTask, deleteTask } from "./taskSlice";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <li>
      <input
        type="checkbox"
        defaultChecked={task.completed}
        onClick={() => dispatch(completeTask(task))}
      />
      <span>{task.title}</span>
      <button onClick={() => dispatch(deleteTask(task))}>delete</button>
    </li>
  );
};

export default TaskItem;
