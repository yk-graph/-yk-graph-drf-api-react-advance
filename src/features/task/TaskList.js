import React from "react";
import { useSelector } from "react-redux";
import { selectTasks } from "./taskSlice";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const tasks = useSelector(selectTasks);
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
