import React from "react";
import styled from "styled-components";

type Props = {
    children: React.ReactNode
  }

const Section = styled.div`
    overflow: hidden;
    height: 100%;//calc(100vh - ${({ theme }) => theme.appBarHeight});
    scroll-snap-align: start;
    //scroll-margin-top: ${({ theme }) => theme.appBarHeight};
`;

const ScrollSection: React.FC<Props> = (props) => {
    return (
        <Section>
            {props.children}
        </Section>
    );
};
export default ScrollSection;
