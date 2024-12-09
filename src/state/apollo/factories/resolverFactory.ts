import { gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

interface Field {
  name: string;
  type: string;
}

export function generateResolvers(typeName: string, pluralTypeName: string, fields: Field[]) {
  // Create a query to read the items from the cache
  const GET_ITEMS_QUERY = gql`
    query Get${capitalize(pluralTypeName)} {
      ${pluralTypeName} @client {
${fields.map((field) => `        ${field.name}`).join('\n')}
      }
    }
  `;

  return {
    Query: {
      [pluralTypeName]: (_: any, __: any, { cache }: any) => {
        const data = cache.readQuery({ query: GET_ITEMS_QUERY }) || { [pluralTypeName]: [] };
        return data[pluralTypeName];
      },
      [`${pluralTypeName}_by_pk`]: (_: any, { id }: { id: string }, { cache }: any) => {
        const data = cache.readQuery({ query: GET_ITEMS_QUERY }) || { [pluralTypeName]: [] };
        return data[pluralTypeName].find((item: any) => item.id === id);
      },
    },
    Mutation: {
      [`insert_${pluralTypeName}_one`]: (_: any, { object }: any, { cache }: any) => {
        const data = cache.readQuery({ query: GET_ITEMS_QUERY }) || { [pluralTypeName]: [] };
        const newItem = { id: uuidv4(), ...object };
        const updatedItems = [...data[pluralTypeName], newItem];
        cache.writeQuery({
          query: GET_ITEMS_QUERY,
          data: { [pluralTypeName]: updatedItems },
        });
        return newItem;
      },
      [`update_${pluralTypeName}_by_pk`]: (_: any, { pk_columns, _set }: any, { cache }: any) => {
        const data = cache.readQuery({ query: GET_ITEMS_QUERY }) || { [pluralTypeName]: [] };
        const updatedItems = data[pluralTypeName].map((item: any) =>
          item.id === pk_columns.id ? { ...item, ..._set } : item
        );
        cache.writeQuery({
          query: GET_ITEMS_QUERY,
          data: { [pluralTypeName]: updatedItems },
        });
        return updatedItems.find((item: any) => item.id === pk_columns.id);
      },
      [`delete_${pluralTypeName}_by_pk`]: (_: any, { id }: { id: string }, { cache }: any) => {
        const data = cache.readQuery({ query: GET_ITEMS_QUERY }) || { [pluralTypeName]: [] };
        const updatedItems = data[pluralTypeName].filter((item: any) => item.id !== id);
        cache.writeQuery({
          query: GET_ITEMS_QUERY,
          data: { [pluralTypeName]: updatedItems },
        });
        return { id };
      },
    },
  };
}

// Helper function to capitalize the first letter
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
