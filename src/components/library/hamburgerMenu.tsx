import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HamburgerButton = styled.button<{ isOpen: boolean }>`
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: ${({ theme }) => theme.spacing.small};
    z-index: 1001;

    @media (max-width: 768px) {
        display: block;
    }
`;

const HamburgerIcon = styled.div<{ isOpen: boolean }>`
    width: 24px;
    height: 2px;
    background: ${props => props.isOpen ? 'transparent' : props.theme.colors.text.primary};
    position: relative;
    transition: all 0.3s ease;

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 24px;
        height: 2px;
        background: ${props => props.theme.colors.text.primary};
        transition: all 0.3s ease;
    }

    &::before {
        transform: ${props => props.isOpen ? 'rotate(45deg)' : 'translateY(-8px)'};
    }

    &::after {
        transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'translateY(8px)'};
    }
`;

const MenuPopup = styled.div<{ isOpen: boolean }>`
    display: none;
    position: absolute;
    top: ${props => props.theme.sizes.appBarHeight};
    right: 0;
    width: 200px;
    background: ${props => props.theme.colors.backgrounds.white};
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    opacity: ${props => props.isOpen ? 1 : 0};
    transform: translateY(${props => props.isOpen ? '0' : '-10px'});
    transition: all 0.2s ease;
    pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
    padding: ${({ theme }) => theme.spacing.small} 0;

    @media (max-width: 768px) {
        display: block;
    }
`;

const MobileLink = styled(Link)`
    display: block;
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    font-size: 1rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text.primary};
    transition: all 0.2s ease;
    
    &:hover {
        background: ${({ theme }) => `${theme.colors.accent.primary}10`};
        color: ${({ theme }) => theme.colors.accent.primary};
    }
`;

const Divider = styled.div`
    height: 1px;
    background: ${props => props.theme.colors.borders.color};
    margin: ${({ theme }) => theme.spacing.small} 0;
`;

interface HamburgerMenuProps {
    links: Array<{ href: string; label: string }>;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ links }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        setIsOpen(false);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current && 
                buttonRef.current && 
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <HamburgerButton 
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
                isOpen={isOpen}
            >
                <HamburgerIcon isOpen={isOpen} />
            </HamburgerButton>
            
            <MenuPopup ref={menuRef} isOpen={isOpen}>
                {links.map((link, index) => (
                    <React.Fragment key={link.href}>
                        <MobileLink 
                            href={link.href}
                            onClick={handleClick}
                        >
                            {link.label}
                        </MobileLink>
                        {index < links.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </MenuPopup>
        </>
    );
}; 