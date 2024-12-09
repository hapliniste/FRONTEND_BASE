# Setting Up Authentication with Next-Auth and Hasura

This guide will walk you through the process of setting up authentication in a Next.js application using Next-Auth and integrating it with Hasura for data storage and authorization.

# Hasura

## Step 1 : Run the hasura container

First, make sure you have Docker installed on your machine. 
Edit the /hasura/.env with the app name, ports, password and secret.
Then, run the following commands to start the Hasura GraphQL Engine container:

```bash
cd hasura
docker-compose up -d
```

## Step 2: Apply Hasura Migrations

To set up the required tables and schema for Next-Auth in Hasura, we'll use migrations.

1. Get the name of the Hasura GraphQL Engine container:

   ```bash
   docker ps
   ```

2. Open a bash shell inside the Hasura GraphQL Engine container:

   ```bash
   docker exec -it <container_name> /bin/bash
   ```

3. Navigate to the `/hasura-migrations` directory:

   ```bash
   cd /hasura-migrations
   ```

4. Install Curl and run the script:

   ```bash
   apt update
   apt install curl
   ./getHasuraCli.sh
   ```

   The Hasura CLI should now be installed in the container. Otherwise, refer to the official documentation: https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html

5. Check that the config.yaml in the hasura-migrations folder has the correct endpoint and admin secret. (only the secret should change normally)

    ```yaml
    version: 2
    endpoint: http://localhost:8080
    admin_secret: mysecureadminsecret
    metadata_directory: metadata
    actions:
    kind: synchronous
    handler_webhook_baseurl: http://localhost:3000
    ```

6. Apply the migrations by running the following command:

   ```bash
   hasura migrate apply
   ```

7. Apply the metadata by running the following command:

   ```bash
   hasura metadata apply
   ```

# Next-Auth
## Step 1: Install Dependencies

First, install the necessary dependencies for Next-Auth and Hasura integration:

```bash
npm install next-auth next-auth-hasura-adapter jsonwebtoken
```

## Step 2: Create the Next-Auth Configuration File

Make sure that the files from the template are present: 
- src/app/api/auth/[...nextauth]/route.ts
- src/lib/apolloClient.ts
- src/app/providers.tsx
- src/app/layout.tsx

These files are necessary for the integration to work.

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root of your Next.js project and add the following variables:

```
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
HASURA_PROJECT_ENDPOINT=your-hasura-graphql-endpoint
HASURA_ADMIN_SECRET=your-hasura-admin-secret
NEXTAUTH_SECRET=your-nextauth-secret
```

Replace the placeholders with your actual values.

## Step 4: Use Next-Auth in Your Next.js App

You can now use Next-Auth in your Next.js application. Here's an example of how to use the `useSession` hook to access the authenticated user's session information:

```typescript
import { useSession } from "next-auth/react";

function MyComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return <div>Welcome, {session.user.name}!</div>;
  }

  return <div>Please log in.</div>;
}
```

## Conclusion

Congratulations! You have successfully set up authentication with Next-Auth and integrated it with Hasura for data storage and authorization. You can now use the `useSession` hook to access the authenticated user's session information and build protected routes and components in your Next.js application.

Remember to handle authentication state appropriately and consult the official Next-Auth and Hasura documentation for more advanced use cases and configurations.