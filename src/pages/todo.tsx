// src/pages/todo.tsx

import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_TODOS,
  INSERT_TODO,
  UPDATE_TODO_BY_PK,
  DELETE_TODO_BY_PK,
} from '@/state/apollo/graphql/todos';

const TodoPage: React.FC = () => {
  const { data, loading, error } = useQuery(GET_TODOS);

  const [insertTodo] = useMutation(INSERT_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO_BY_PK);
  const [deleteTodo] = useMutation(DELETE_TODO_BY_PK);
  const [newTodoName, setNewTodoName] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos.</p>;

  const handleAddTodo = () => {
    if (newTodoName.trim() === '') return;

    insertTodo({
      variables: {
        object: {
          name: newTodoName,
          completed: false,
          selected: false,
        },
      },
    });

    setNewTodoName('');
  };

  const handleToggleCompleted = (id: string, currentStatus: boolean) => {
    updateTodo({
      variables: {
        pk_columns: { id },
        _set: { completed: !currentStatus },
      },
    });
  };

  const handleToggleSelected = (id: string, currentStatus: boolean) => {
    updateTodo({
      variables: {
        pk_columns: { id },
        _set: { selected: !currentStatus },
      },
    });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo({
      variables: { id },
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Todo List</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
          placeholder="New todo name"
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button onClick={handleAddTodo} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
          Add Todo
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.todos.map((todo: any) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem',
              background: '#f9f9f9',
              padding: '0.5rem',
              borderRadius: '4px',
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id, todo.completed)}
              style={{ marginRight: '0.5rem' }}
            />
            <span
              style={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleToggleSelected(todo.id, todo.selected)}
            >
              {todo.name}
              {todo.selected && ' 🔍'}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              style={{
                padding: '0.25rem 0.5rem',
                background: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
