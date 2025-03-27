import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import DoneList from "./components/DoneList";
import { TodoProvider } from "./context/TodoContext";
import "./App.css";

function App() {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1>TODO</h1>
        <TodoInput />
        <div className="list-container">
          <TodoList />
          <DoneList />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
