export interface Todo {
  id: number;
  text: string;
}

export interface TodoContextProps {
  todos: Todo[];
  dones: Todo[];
  addTodo: (text: string) => void;
  completeTodo: (id: number) => void; // ✅ 이 줄 추가
  deleteTodo: (id: number) => void;
}
