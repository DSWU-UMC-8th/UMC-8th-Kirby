import { useTodo } from "../context/TodoContext";

const DoneList = () => {
  const { dones, deleteTodo } = useTodo();

  return (
    <div className="done-list-box">
      <h2>완료</h2>
      <ul>
        {dones?.map((todo) => (
          <li key={todo.id} className="item">
            {todo.text}
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoneList;
