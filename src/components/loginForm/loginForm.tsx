import React, { useRef } from "react";
import styled from "styled-components";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const StyledCard = styled.div`
    //width: 30em;
    //height: 40em;
    height: 50em;
    width: 40em;
    //margin: 2em;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
`;

export default function LoginForm() {
    const supabaseClient = useSupabaseClient();
    const user = useUser();

    return (
        <StyledCard>
            <Auth
                redirectTo="http://localhost:3000/"
                appearance={{ theme: ThemeSupa }}
                supabaseClient={supabaseClient}
                providers={["google", "github"]}
                socialLayout="horizontal"
            />
        </StyledCard>
    );
}
