import React from "react";
import { useSelector } from "react-redux";
import { selectTasks } from "./taskSlice";
import TaskItem from "./TaskItem";
import TaskInput from "./TaskInput";

const TaskList = () => {
  const tasks = useSelector(selectTasks);
  return (
    <>
      <TaskInput />
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
