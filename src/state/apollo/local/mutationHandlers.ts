import { ApolloCache, gql } from '@apollo/client';

export const handleFetchAll = (cache: ApolloCache<any>, query: any) => {
  const queryResult = cache.readQuery<{ items: any[] }>({ query }) || { items: [] };
  return queryResult.items;
};

export const handleFetchByPk = (cache: ApolloCache<any>, query: any, id: string) => {
  const queryResult = cache.readQuery<{ items: any[] }>({ query }) || { items: [] };
  return queryResult.items.find((item: any) => item.id === id);
};

export const handleInsertItem = (cache: ApolloCache<any>, query: any, newItem: any) => {
  const queryResult = cache.readQuery<{ items: any[] }>({ query }) || { items: [] };
  const data = {
    items: [...queryResult.items, newItem],
  };
  cache.writeQuery({ query, data });
  return newItem;
};

export const handleUpdateItem = (cache: ApolloCache<any>, query: any, updatedItem: any) => {
  const queryResult = cache.readQuery<{ items: any[] }>({ query }) || { items: [] };
  const data = {
    items: queryResult.items.map((item: any) =>
      item.id === updatedItem.id ? { ...item, ...updatedItem } : item
    ),
  };
  cache.writeQuery({ query, data });
  return updatedItem;
};

export const handleDeleteItem = (cache: ApolloCache<any>, query: any, id: string) => {
  const queryResult = cache.readQuery<{ items: any[] }>({ query }) || { items: [] };
  const data = {
    items: queryResult.items.filter((item: any) => item.id !== id),
  };
  cache.writeQuery({ query, data });
  return id;
};
