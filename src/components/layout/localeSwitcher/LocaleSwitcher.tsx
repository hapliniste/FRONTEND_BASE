import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { motion, AnimatePresence } from "framer-motion";
import * as Flags from 'country-flag-icons/react/3x2';

const LocaleSwitcherWrapper = styled.div`
    position: relative;
    display: inline-block;
    z-index: 1000;
`;

const LocaleDropdownContainer = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: calc(100% + 0.5rem);
    z-index: 1000;
`;

const LocaleButton = styled(motion.button)`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
    border-radius: 2px;
    max-width: 2.5em;
    max-height: 2.5em;//27px;
    transition: all 0.3s ease;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    svg {
        width: 100%;
        height: 100%;
        border-radius: 0px;
    }
`;

const LocaleDropdown = styled(motion.div)`
    background: ${({ theme }) => theme.colors.backgrounds.default};
    border-radius: 1.25rem;
    padding: ${({ theme }) => theme.spacing.small};
    min-width: 180px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
`;

const LocaleItem = styled(motion.div)<{ $active?: boolean }>`
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: ${({ theme, $active }) => $active ? theme.colors.accent.primary : theme.colors.text.primary};
    background: ${({ theme, $active }) => $active ? `${theme.colors.accent.primary}10` : 'transparent'};
    border-radius: 0.75rem;
    font-weight: ${({ $active }) => $active ? '500' : '400'};
    transition: all 0.2s ease;
    white-space: nowrap;
    font-size: 1rem;
    
    &:hover {
        background: ${({ theme }) => `${theme.colors.accent.primary}10`};
        color: ${({ theme }) => theme.colors.accent.primary};
    }

    svg {
        width: 24px;
        height: 16px;
        border-radius: 2px;
    }
`;

const dropdownVariants = {
    hidden: { 
        opacity: 0,
        y: -10,
        scale: 0.95
    },
    visible: { 
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    },
    exit: { 
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: custom * 0.05,
            duration: 0.2,
            ease: "easeOut"
        }
    })
};

const LocaleSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const router = useRouter();
    const { locales, asPath } = router;
    const [$isopen, set$isopen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        set$isopen(!$isopen);
    };

    const handleLocaleChange = async (locale: string) => {
        // Change the language in i18next
        await i18n.changeLanguage(locale);
        
        // Update the URL without refreshing
        router.push(router.asPath, router.asPath, { 
            locale,
            scroll: false,
            shallow: true
        });
        
        set$isopen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                set$isopen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    if (!locales) return null;

    const getLocaleInfo = (locale: string): { name: string; Flag: React.ComponentType } => {
        switch(locale) {
            case 'fr':
                return { name: 'Français', Flag: Flags.FR };
            case 'en':
                return { name: 'English', Flag: Flags.GB };
            case 'de':
                return { name: 'Deutsch', Flag: Flags.DE };
            case 'it':
                return { name: 'Italiano', Flag: Flags.IT };
            default:
                return { name: locale.toUpperCase(), Flag: Flags.GB };
        }
    };

    const currentLocale = getLocaleInfo(i18n.language || 'fr');
    const CurrentFlag = currentLocale.Flag;

    return (
        <LocaleSwitcherWrapper ref={dropdownRef}>
            <LocaleButton 
                onClick={toggleDropdown}
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
            >
                <CurrentFlag />
            </LocaleButton>
            <AnimatePresence>
                {$isopen && (
                    <LocaleDropdownContainer>
                        <LocaleDropdown
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {locales.map((locale, index) => {
                                const localeInfo = getLocaleInfo(locale);
                                const Flag = localeInfo.Flag;
                                return (
                                    <LocaleItem
                                        key={locale}
                                        $active={locale === i18n.language}
                                        onClick={() => handleLocaleChange(locale)}
                                        variants={itemVariants}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <Flag />
                                        {localeInfo.name}
                                    </LocaleItem>
                                );
                            })}
                        </LocaleDropdown>
                    </LocaleDropdownContainer>
                )}
            </AnimatePresence>
        </LocaleSwitcherWrapper>
    );
};

export default LocaleSwitcher;
