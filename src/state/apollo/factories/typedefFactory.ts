import { gql } from '@apollo/client';

interface Field {
  name: string;
  type: string;
}

export function generateTypeDefs(typeName: string, pluralTypeName: string, fields: Field[]) {
  // Define the type fields
  const typeFields = fields.map((field) => `  ${field.name}: ${field.type}`).join('\n');

  // Define input fields for insert and update mutations
  const insertInputFields = fields
    .filter((field) => field.name !== 'id') // Exclude 'id' for insert input
    .map((field) => `  ${field.name}: ${field.type.replace('!', '')}`) // Make fields optional
    .join('\n');

  const setInputFields = fields
    .filter((field) => field.name !== 'id') // Exclude 'id' for set input
    .map((field) => `  ${field.name}: ${field.type.replace('!', '')}`)
    .join('\n');

  const pkColumnsInputFields = `  id: ID!`;

  return gql`
    type ${capitalize(typeName)} {
${typeFields}
    }

    input ${capitalize(typeName)}_insert_input {
${insertInputFields}
    }

    input ${capitalize(typeName)}_set_input {
${setInputFields}
    }

    input ${capitalize(typeName)}_pk_columns_input {
${pkColumnsInputFields}
    }

    extend type Query {
      ${pluralTypeName}: [${capitalize(typeName)}]!
      ${pluralTypeName}_by_pk(id: ID!): ${capitalize(typeName)}
    }

    extend type Mutation {
      insert_${pluralTypeName}_one(object: ${capitalize(typeName)}_insert_input!): ${capitalize(typeName)}
      update_${pluralTypeName}_by_pk(
        pk_columns: ${capitalize(typeName)}_pk_columns_input!
        _set: ${capitalize(typeName)}_set_input!
      ): ${capitalize(typeName)}
      delete_${pluralTypeName}_by_pk(id: ID!): ${capitalize(typeName)}
    }
  `;
}

// Helper function to capitalize the first letter
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
