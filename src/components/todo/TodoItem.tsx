import React from 'react';

interface TodoProps {
  id: number;
  title: string;
  status: string;
  onComplete: (id: number) => void;
}

const TodoItem: React.FC<TodoProps> = ({ id, title, status, onComplete }) => {
  return (
    <div>
      <p>{title} - {status}</p>
      {status === 'pending' && <button onClick={() => onComplete(id)}>Complete</button>}
    </div>
  );
}

export default TodoItem;
