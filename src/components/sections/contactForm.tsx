import React from "react";
import styled from "styled-components";

const Section = styled.div`
    background: ${(props) => props.theme.backgroundColor};
    height: 100%;
`;

const TextWrapper = styled.div`
    width: "60%";
    padding: ${(props) => props.theme.spacing};
`;

const ContactForm: React.FC = () => {
    return (
        <Section>
            <TextWrapper>
            ContactForm
            </TextWrapper>
        </Section>
    );
};
export default ContactForm;
