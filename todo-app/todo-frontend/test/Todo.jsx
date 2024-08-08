// create a todo-element for testing
import React from 'react';

const Todo = ({ todo }) => {
  return (
    <div>
      <p>{todo.text}</p>
      <p>{todo.done ? 'Done' : 'In Progress'}</p>
    </div>
  );
};

export default Todo;
