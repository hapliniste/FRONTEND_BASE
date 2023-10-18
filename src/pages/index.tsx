import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      status
      created_at
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>Neuchatech base</p>
      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
