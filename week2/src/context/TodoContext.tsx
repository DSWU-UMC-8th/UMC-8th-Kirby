import { createContext, useContext, useState } from "react";
import { Todo, TodoContextProps } from "../types/todo";

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dones, setDones] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
    };
    setTodos([...todos, newTodo]);
  };

  const completeTodo = (id: number) => {
    const completed = todos.find((todo) => todo.id === id);
    if (!completed) return;
    setTodos(todos.filter((todo) => todo.id !== id));
    setDones([...dones, completed]);
  };

  const deleteTodo = (id: number) => {
    setDones(dones.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, dones, addTodo, completeTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
