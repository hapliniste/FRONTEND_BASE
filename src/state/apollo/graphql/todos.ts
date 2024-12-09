// src/apollo/local/todo.ts

import { gql } from '@apollo/client';
import { generateTypeDefs } from '../factories/typedefFactory';
import { generateResolvers } from '../factories/resolverFactory';

/**
 * Define the fields for the Todo type
 */
const fields = [
  { name: 'id', type: 'ID!' },
  { name: 'name', type: 'String!' },
  { name: 'completed', type: 'Boolean!' },
  { name: 'selected', type: 'Boolean!' },
];

const typeName = 'todo';
const pluralTypeName = 'todos';

/**
 * Generate type definitions and resolvers using factories
 */
const typeDefs = generateTypeDefs(typeName, pluralTypeName, fields);
const resolvers = generateResolvers(typeName, pluralTypeName, fields);

/**
 * Export typeDefs and resolvers
 */
export { typeDefs, resolvers };

/**
 * Define and export GraphQL queries and mutations for Todo
 */

// Queries
export const GET_TODOS = gql`
  query GetTodos {
    todos @client {
      id
      name
      completed
      selected
    }
  }
`;

export const GET_TODO_BY_PK = gql`
  query GetTodosByPk($id: ID!) {
    todos_by_pk(id: $id) @client {
      id
      name
      completed
      selected
    }
  }
`;

// Mutations
export const INSERT_TODO = gql`
  mutation InsertTodosOne($object: todo_insert_input!) {
    insert_todos_one(object: $object) @client {
      id
      name
      completed
      selected
    }
  }
`;

export const UPDATE_TODO_BY_PK = gql`
  mutation UpdateTodosByPk($pk_columns: todo_pk_columns_input!, $_set: todo_set_input!) {
    update_todos_by_pk(pk_columns: $pk_columns, _set: $_set) @client {
      id
      name
      completed
      selected
    }
  }
`;

export const DELETE_TODO_BY_PK = gql`
  mutation DeleteTodosByPk($id: ID!) {
    delete_todos_by_pk(id: $id) @client {
      id
    }
  }
`;
