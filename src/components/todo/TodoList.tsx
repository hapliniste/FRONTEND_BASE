import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  title: string;
  status: string;
}

interface TodoListProps {
  todos: Todo[];
  onComplete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onComplete }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} onComplete={onComplete} />
      ))}
    </div>
  );
}

export default TodoList;
