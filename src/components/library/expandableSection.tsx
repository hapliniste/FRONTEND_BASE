import React, { useState } from 'react';
import styled from 'styled-components';

const ExpandableWrapper = styled.section<{ isExpanded: boolean }>`
    width: 100%;
    transition: all 0.3s ease;
    overflow: hidden;
    max-height: ${props => props.isExpanded ? '2000px' : '600px'};
`;

const ExpandButton = styled.button`
    width: 100%;
    padding: ${({ theme }) => theme.spacing.medium};
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.accent.primary};
    cursor: pointer;
    
    &:hover {
        text-decoration: underline;
    }
`;

interface ExpandableSectionProps {
    children: React.ReactNode;
    previewHeight?: string;
    id?: string;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({ 
    children, 
    id 
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <ExpandableWrapper id={id} isExpanded={isExpanded}>
            {children}
            <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Voir moins' : 'En savoir plus'}
            </ExpandButton>
        </ExpandableWrapper>
    );
}; 