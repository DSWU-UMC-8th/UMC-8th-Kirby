export interface Todo {
  id: number;
  text: string;
}

export interface TodoContextProps {
  todos: Todo[];
  dones: Todo[];
  addTodo: (text: string) => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}
