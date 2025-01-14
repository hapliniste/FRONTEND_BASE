import React from 'react';
import styled from 'styled-components';
import { SectionTitle } from '@/components/library/typography';

const Section = styled.section`
    overflow: hidden;
    position: relative;
    padding: ${({theme}) => `${theme.spacing.section.paddingY.mobile} ${theme.spacing.section.paddingX.mobile}`};
    margin: 0;
    padding: 0;
    
    @media (min-width: 1024px) {
        padding: ${({theme}) => `${theme.spacing.section.paddingY.desktop} ${theme.spacing.section.paddingX.desktop}`};
        margin: 0;
    }
`;

const ContentWrapper = styled.div`
    width: 100%;
    max-width: ${({theme}) => theme.sizes.maxWidth};
    margin: 0 auto;
`;

const LoadingSkeleton = styled.div`
    width: 100%;
    height: 500px;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 200% 100%;
    animation: shimmer 1.5s linear infinite;
    border-radius: ${({theme}) => theme.borders.radius};
    
    @keyframes shimmer {
        to {
            background-position: 200% 0;
        }
    }
`;

const ServicesLoading: React.FC = () => {
    return (
        <Section>
            <ContentWrapper>
                <SectionTitle $centered $noUnderline>Nos Services</SectionTitle>
                <LoadingSkeleton />
            </ContentWrapper>
        </Section>
    );
};

export default ServicesLoading; 