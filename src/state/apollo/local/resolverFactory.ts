import { gql } from '@apollo/client';
import {
  handleFetchAll,
  handleFetchByPk,
  handleInsertItem,
  handleUpdateItem,
  handleDeleteItem,
} from './mutationHandlers';

export const createResolvers = (typeName: string) => {
  const FETCH_ALL = gql`
    query Fetch${typeName}s {
      ${typeName.toLowerCase()}s @client
    }
  `;

  const FETCH_BY_PK = gql`
    query Fetch${typeName}ByPk($id: ID!) {
      ${typeName.toLowerCase()}s @client {
        id
        ...otherFields
      }
    }
  `;

  const INSERT_ITEM = gql`
    mutation Insert${typeName}One($input: ${typeName}Input!) {
      insert${typeName}One(input: $input) @client
    }
  `;

  const UPDATE_ITEM_BY_PK = gql`
    mutation Update${typeName}ByPk($id: ID!, $input: ${typeName}Input!) {
      update${typeName}ByPk(id: $id, input: $input) @client
    }
  `;

  const DELETE_ITEM_BY_PK = gql`
    mutation Delete${typeName}ByPk($id: ID!) {
      delete${typeName}ByPk(id: $id) @client
    }
  `;

  return {
    Query: {
      [`fetch_${typeName.toLowerCase()}s`]: (_, __, { cache }) => handleFetchAll(cache, FETCH_ALL),
      [`fetch_${typeName.toLowerCase()}_by_pk`]: (_, { id }, { cache }) =>
        handleFetchByPk(cache, FETCH_BY_PK, id),
    },
    Mutation: {
      [`insert_${typeName.toLowerCase()}_one`]: (_, { input }, { cache }) =>
        handleInsertItem(cache, FETCH_ALL, input),
      [`update_${typeName.toLowerCase()}_by_pk`]: (_, { id, input }, { cache }) =>
        handleUpdateItem(cache, FETCH_ALL, { id, ...input }),
      [`delete_${typeName.toLowerCase()}_by_pk`]: (_, { id }, { cache }) =>
        handleDeleteItem(cache, FETCH_ALL, id),
    },
  };
};
