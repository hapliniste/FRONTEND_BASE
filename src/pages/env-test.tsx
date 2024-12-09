export default function EnvTest({ props }: { props: any }) {
    return (
        <div>
            <h1>Environment Variables Test</h1>
            <pre>
                {JSON.stringify({
                    NEXT_PUBLIC_HASURA_URL: process.env.NEXT_PUBLIC_HASURA_URL,
                    NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
                    //NEXTAUTH_URL: process.env.NEXTAUTH_URL,
                    props: props,
                }, null, 2)}
            </pre>
        </div>
    );
}

// Add this to test server-side
export async function getServerSideProps() {
    console.log('Server-side env:', process.env.NEXT_PUBLIC_HASURA_URL);
    console.log('nextauth url:', process.env.NEXTAUTH_URL);
    return {
        props: {
            //serverEnv: process.env.NEXT_PUBLIC_HASURA_URL || null,
            NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        },
    };
} 