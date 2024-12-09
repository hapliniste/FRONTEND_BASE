import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Toast from "@/components/shared/Toast";
import styled from "styled-components";

const LoginFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const LoginInput = styled.input`
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 0.25rem;
`;

const LoginButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.white};
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
`;

const LoginForm: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (provider: "email" | "google" | "github") => {
        try {
            if (provider === "email") {
                if (!email || !password) {
                    setError("Please enter your email and password");
                    return;
                }
                // Perform email login
                const result = await signIn("credentials", {
                    redirect: false,
                    email,
                    password,
                });
                if (!result?.ok) {
                    setError(result?.error || "Failed to login");
                }
            } else {
                // Perform provider login
                await signIn(provider);
            }
        } catch (error) {
            setError("An error occurred during login");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEmail("");
        setPassword("");
        setError("");
    };

    return (
        <>
            {/*<Modal isOpen={isModalOpen} onClose={handleCloseModal}>*/}
            <LoginFormWrapper>
                <h2>Sign In</h2>
                {error && (
                    <Toast
                        message={error}
                        type="error"
                        onClose={() => setError("")}
                    />
                )}
                <LoginInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <LoginInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <LoginButton onClick={() => handleLogin("email")}>
                    Sign In with Email
                </LoginButton>
                <LoginButton onClick={() => handleLogin("google")}>
                    Sign In with Google
                </LoginButton>
                <LoginButton onClick={() => handleLogin("github")}>
                    Sign In with GitHub
                </LoginButton>
            </LoginFormWrapper>
            {/*</Modal>*/}
        </>
    );
};

export default LoginForm;