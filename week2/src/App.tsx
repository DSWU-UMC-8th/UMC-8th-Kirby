import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import DoneList from "./components/DoneList";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { TodoProvider } from "./context/TodoContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <div className="relative">
          <ThemeToggleButton />
          <div className="todo-container">
            <h1>TODO</h1>
            <TodoInput />
            <div className="list-container">
              <TodoList />
              <DoneList />
            </div>
          </div>
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
