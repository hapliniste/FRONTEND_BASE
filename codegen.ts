import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env.local' });

const config: CodegenConfig = {
  schema: process.env.HASURA_URL,  //it works with http://localhost:8080/v1/graphql
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;
