import { useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoInput = () => {
  const [input, setInput] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="input-box">
      <input
        id="todo-input"
        type="text"
        placeholder="할 일 입력"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button id="add-btn" type="submit">
        할 일 추가
      </button>
    </form>
  );
};

export default TodoInput;
