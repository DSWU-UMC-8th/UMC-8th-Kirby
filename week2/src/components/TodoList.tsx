import { useTodo } from "../context/TodoContext";

const TodoList = () => {
  const { todos, completeTodo } = useTodo();

  return (
    <div className="todo-list-box">
      <h2>할 일</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="item">
            {todo.text}
            <button
              className="complete-btn"
              onClick={() => completeTodo(todo.id)}
            >
              완료
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
