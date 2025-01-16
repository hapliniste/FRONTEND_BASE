import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HamburgerButton = styled.button<{ isOpen: boolean }>`
    display: none;
    background: ${({ theme }) => theme.colors.backgrounds.white};
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        display: flex;
    }
`;

const HamburgerIcon = styled.div<{ isOpen: boolean }>`
    width: 20px;
    height: 2px;
    background: ${props => props.isOpen ? 'transparent' : props.theme.colors.text.primary};
    position: relative;
    transition: all 0.3s ease;
    transform: translateY(${props => props.isOpen ? '1px' : '0'});

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 20px;
        height: 2px;
        background: ${props => props.theme.colors.text.primary};
        transition: all 0.3s ease;
    }

    &::before {
        transform: ${props => props.isOpen ? 'rotate(45deg)' : 'translateY(-6px)'};
    }

    &::after {
        transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'translateY(6px)'};
    }
`;

const MenuDropdown = styled.div<{ isOpen: boolean }>`
    display: none;
    position: absolute;
    top: 4rem;
    right: ${({ theme }) => theme.spacing.medium};
    width: 240px;
    background: ${props => props.theme.colors.backgrounds.white};
    border-radius: 1.25rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    opacity: ${props => props.isOpen ? 1 : 0};
    transform: translateY(${props => props.isOpen ? '0' : '-1rem'});
    pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
    transition: all 0.3s ease;
    z-index: 1000;

    @media (max-width: 768px) {
        display: block;
    }
`;

const MobileLink = styled.div`
    display: block;
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    font-size: 1rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text.primary};
    transition: all 0.2s ease;
    border-radius: 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    &:hover {
        background: ${({ theme }) => `${theme.colors.accent.primary}10`};
        color: ${({ theme }) => theme.colors.accent.primary};
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
`;

const Divider = styled.div`
    height: 1px;
    background: ${props => `${props.theme.colors.borders.color}40`};
    margin: ${({ theme }) => theme.spacing.xsmall} ${({ theme }) => theme.spacing.small};
`;

interface NavLink {
    href?: string;
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

interface HamburgerMenuProps {
    links: NavLink[];
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
            
            <MenuDropdown ref={menuRef} isOpen={isOpen}>
                {links.map((link, index) => (
                    <React.Fragment key={link.label}>
                        <MobileLink>
                            {link.href ? (
                                <StyledLink href={link.href} onClick={handleClick}>
                                    {link.icon}
                                    {link.label}
                                </StyledLink>
                            ) : (
                                <div onClick={() => {
                                    if (link.onClick) link.onClick();
                                    handleClick();
                                }}>
                                    {link.icon}
                                    {link.label}
                                </div>
                            )}
                        </MobileLink>
                        {index < links.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </MenuDropdown>
        </>
    );
}; 