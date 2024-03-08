import React from "react";
import styled from "styled-components";

const Section = styled.div`
    background: ${(props) => props.theme.backgroundColor};
    height: 100vh;
    text-transform: uppercase;

    //scroll-snap-align: start;
    //scroll-margin-top: ${({ theme }) => theme.appBarHeight};
`;

const TextWrapper = styled.div`
    width: "60%";
    padding: ${(props) => props.theme.spacing};
`;

const Portfolio: React.FC = () => {
    return (
        <Section>
            <TextWrapper>
            TODO : Portfolio
            </TextWrapper>
        </Section>
    );
};
export default Portfolio;
