import * as React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

export interface ICardProps {
    title?: string;
    content?: string[] | string;
    image?: string;
    icon?: string; // Assuming this is a path to an icon image
}

const StyledCard = styled.div`
    height: auto; // This allows the card to grow based on content
    min-height: 20em; // Set a minimum height to prevent the card from shrinking too much
    max-width: 35em; // Use em for max-width for scalability
    border-radius: ${(props) => props.theme.borderRadius || '0.5em'};
    background-color: ${(props) => props.theme.white};
    box-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.1);
    padding: 1em;
    position: relative; // For absolute positioning of the icon
`;

const StyledIcon = styled.img`
    position: absolute;
    top: 1em;
    left: 1em;
    max-height: 2em; // Use em to ensure scalability
`;

const StyledImage = styled.img`
    width: 100%;
    border-radius: ${(props) => props.theme.borderRadius} ${(props) => props.theme.borderRadius} 0 0;
    object-fit: cover; // Ensures the image covers the area without stretching
    height: auto; // Maintain aspect ratio
`;

const StyledTitle = styled.p`
    font-size: ${(props) => props.theme.fontSize * 2};// Use em for font sizes
    font-weight: bold;
    margin: 1em 0;
`;

const StyledContent = styled.div`
    font-size: ${(props) => props.theme.fontSize } // Use em for font sizes
    margin: 0.5em 0;

    &.list-content {
        list-style: inside; // For list items
    }
`;

export default function Card({ title, content, image, icon }: Partial<ICardProps>) {
    return (
        <StyledCard>
            {image && <StyledImage src={image} />}
            {icon && <StyledIcon src={icon} />}
            {title && <StyledTitle>{title}</StyledTitle>}
            {content && (
                Array.isArray(content) ? (
                    <ul className="list-content">
                        {content.map((line) => (
                            <li key={uuid()}>{line}</li>
                        ))}
                    </ul>
                ) : (
                    <StyledContent>{content}</StyledContent>
                )
            )}
        </StyledCard>
    );
}
