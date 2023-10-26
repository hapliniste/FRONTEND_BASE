import { useSession, signIn, signOut } from "next-auth/react";

function loginForm() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user.name}!</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return <button onClick={() => signIn("github")}>Sign in with GitHub</button>;
  }
}

export default loginForm;
