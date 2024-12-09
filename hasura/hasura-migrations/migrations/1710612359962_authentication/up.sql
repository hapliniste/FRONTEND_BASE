CREATE TABLE "public"."users" (
  "id" uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text,
  "email" text UNIQUE,
  "emailVerified" timestamp with time zone,
  "image" text
);

CREATE TABLE "public"."accounts" (
  "id" uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" uuid NOT NULL REFERENCES "public"."users"("id") ON DELETE CASCADE,
  "type" text NOT NULL,
  "provider" text NOT NULL,
  "providerAccountId" text NOT NULL,
  "refresh_token" text,
  "refresh_token_expires_in" bigint,
  "access_token" text,
  "expires_at" bigint,
  "token_type" text,
  "scope" text,
  "id_token" text,
  "session_state" text,
  "oauth_token_secret" text,
  "oauth_token" text,
  UNIQUE ("provider", "providerAccountId")
);

CREATE TABLE "public"."sessions" (
  "id" uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" uuid NOT NULL REFERENCES "public"."users"("id") ON DELETE CASCADE,
  "expires" timestamp with time zone NOT NULL,
  "sessionToken" text NOT NULL UNIQUE
);

CREATE TABLE "public"."verification_tokens" (
  "identifier" text NOT NULL,
  "token" text NOT NULL UNIQUE,
  "expires" timestamp with time zone NOT NULL
);