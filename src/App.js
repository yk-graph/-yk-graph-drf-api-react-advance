import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import TaskList from "./features/task/TaskList";
import Fetch from "./features/fetch/Fetch";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <TaskList />
        <Fetch />
      </header>
    </div>
  );
};

export default App;
