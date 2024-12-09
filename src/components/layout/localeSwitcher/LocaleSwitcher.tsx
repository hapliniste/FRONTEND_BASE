import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { motion, AnimatePresence } from "framer-motion";

const LocaleSwitcherWrapper = styled.div`
    position: relative;
    display: inline-block;
    z-index: 1000;
`;

const LocaleButton = styled(motion.button)`
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    background: ${({ theme }) => theme.colors.backgrounds.default};
    border: none;
    border-radius: 99em;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
    min-width: 72px;
    justify-content: center;
    
    &:hover {
        color: ${({ theme }) => theme.colors.accent.primary};
    }

    &:after {
        content: '▼';
        font-size: 0.7em;
        transition: transform 0.2s ease;
    }

    &[data-open="true"]:after {
        transform: rotate(180deg);
    }
`;

const LocaleDropdown = styled(motion.div)`
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 50%;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.colors.backgrounds.default};
    border-radius: ${({ theme }) => theme.borders.radius};
    padding: 0.5rem;
    min-width: 72px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
`;

const LocaleItem = styled(motion.div)<{ $active?: boolean }>`
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    cursor: pointer;
    text-align: center;
    color: ${({ theme, $active }) => $active ? theme.colors.accent.primary : theme.colors.text.primary};
    background: ${({ theme, $active }) => $active ? `${theme.colors.accent.primary}12` : 'transparent'};
    border-radius: ${({ theme }) => theme.borders.radius};
    font-weight: ${({ $active }) => $active ? '600' : '400'};
    transition: all 0.2s ease;
    white-space: nowrap;
    
    &:hover {
        background: ${({ theme }) => `${theme.colors.accent.primary}12`};
        color: ${({ theme }) => theme.colors.accent.primary};
    }
`;

const dropdownVariants = {
    hidden: { 
        opacity: 0,
        y: -10,
        scale: 0.95,
        x: "-50%"
    },
    visible: { 
        opacity: 1,
        y: 0,
        scale: 1,
        x: "-50%",
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    },
    exit: { 
        opacity: 0,
        y: -10,
        scale: 0.95,
        x: "-50%",
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

    const handleLocaleChange = (locale: string) => {
        i18n.changeLanguage(locale);
        router.push(asPath, asPath, { locale });
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

    return (
        <LocaleSwitcherWrapper>
            <LocaleButton 
                onClick={toggleDropdown}
                data-open={$isopen}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
            >
                {i18n.language?.toUpperCase() || 'LANG'}
            </LocaleButton>
            <AnimatePresence>
                {$isopen && (
                    <LocaleDropdown
                        ref={dropdownRef}
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {locales.map((locale, index) => (
                            <LocaleItem
                                key={locale}
                                $active={locale === i18n.language}
                                onClick={() => handleLocaleChange(locale)}
                                variants={itemVariants}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                            >
                                {locale.toUpperCase()}
                            </LocaleItem>
                        ))}
                    </LocaleDropdown>
                )}
            </AnimatePresence>
        </LocaleSwitcherWrapper>
    );
};

export default LocaleSwitcher;
