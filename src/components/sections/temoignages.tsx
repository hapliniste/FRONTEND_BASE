import React, { useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { SectionTitle } from '@/components/library/typography';

interface Testimonial {
    id: number;
    name: string;
    role?: string;
    content: string;
    type: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Marie L.",
        role: "Restauratrice",
        content: "Un site qui capture parfaitement notre essence.",
        type: "restaurant"
    },
    // ... existing testimonials ...
];

const CarouselContainer = styled(motion.div)`
    width: 100%;
    overflow: hidden;
    position: relative;
    padding: ${({ theme }) => theme.spacing.medium} 0;
`;

const CarouselContent = styled(motion.div)`
    display: flex;
    cursor: grab;
    &:active {
        cursor: grabbing;
    }
`;

const CarouselCard = styled(motion.div)<{ $type: string }>`
    flex: 0 0 auto;
    width: 280px;
    padding: 1.5rem;
    background: ${props => props.theme.colors.backgrounds.white};
    color: ${props => props.theme.colors.text.primary};
    border-radius: ${props => props.theme.borders.radius};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    margin-right: 1.5rem;
    user-select: none;
`;

const Separator = styled.div`
    width: 2rem;
    height: 2px;
    background: ${props => props.theme.colors.text.primary};
    opacity: 0.1;
    margin: 0.5rem 0;
`;

const Card = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const CardText = styled.div`
    font-size: 1.125rem;
    line-height: 1.6;
    flex-grow: 1;
    font-style: italic;
`;

const CardAuthor = styled.div`
    font-size: 0.875rem;
    opacity: 0.8;
    margin-top: 0.5rem;
`;

const Temoignages: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const currentTranslate = useRef(0);
    const prevTranslate = useRef(0);
    const currentIndex = useRef(0);
    const momentumVelocity = useRef(0);
    const momentumStartTime = useRef(0);
    const containerWidth = useRef(0);
    const totalWidth = useRef(0);

    const updateDimensions = useCallback(() => {
        if (!carouselRef.current || !containerRef.current) return;
        
        containerWidth.current = containerRef.current.offsetWidth;
        totalWidth.current = carouselRef.current.scrollWidth;
    }, []);

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [updateDimensions]);

    const setTranslate = useCallback((translate: number) => {
        if (!carouselRef.current) return;
        currentTranslate.current = translate;
        carouselRef.current.style.transform = `translate3d(${translate}px, 0, 0)`;
    }, []);

    const handleDragStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
        isDragging.current = true;
        startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
        momentumStartTime.current = Date.now();
        momentumVelocity.current = 0;
        
        if (carouselRef.current) {
            carouselRef.current.style.transition = 'none';
        }
    }, []);

    const handleDragMove = useCallback((e: TouchEvent | MouseEvent) => {
        if (!isDragging.current) return;

        const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const diff = currentX - startX.current;
        const newTranslate = prevTranslate.current + diff;

        // Calculate momentum
        const now = Date.now();
        const dt = now - momentumStartTime.current;
        if (dt > 0) {
            momentumVelocity.current = diff / dt;
        }
        momentumStartTime.current = now;

        // Boundary checks
        if (newTranslate > 0) {
            setTranslate(0);
        } else if (newTranslate < -(totalWidth.current - containerWidth.current)) {
            setTranslate(-(totalWidth.current - containerWidth.current));
        } else {
            setTranslate(newTranslate);
        }
    }, [setTranslate]);

    const handleDragEnd = useCallback(() => {
        isDragging.current = false;
        prevTranslate.current = currentTranslate.current;

        if (carouselRef.current) {
            carouselRef.current.style.transition = 'transform 0.3s ease-out';
        }

        // Apply momentum
        if (Math.abs(momentumVelocity.current) > 0.1) {
            const momentum = momentumVelocity.current * 100;
            const newTranslate = currentTranslate.current + momentum;

            if (newTranslate > 0) {
                setTranslate(0);
            } else if (newTranslate < -(totalWidth.current - containerWidth.current)) {
                setTranslate(-(totalWidth.current - containerWidth.current));
            } else {
                setTranslate(newTranslate);
            }
        }

        momentumVelocity.current = 0;
    }, [setTranslate]);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const handleTouchMove = (e: TouchEvent) => {
            if (isDragging.current) {
                e.preventDefault();
                handleDragMove(e);
            }
        };

        carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('touchend', handleDragEnd);

        return () => {
            carousel.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [handleDragMove, handleDragEnd]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.8,
            }
        }
    };

    return (
        <section id="temoignages">
            <SectionTitle $centered>Témoignages</SectionTitle>
            <CarouselContainer
                ref={containerRef}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <CarouselContent
                    ref={carouselRef}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                >
                    {testimonials.map((testimonial) => (
                        <CarouselCard
                            key={testimonial.id}
                            $type={testimonial.type}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Card>
                                <CardText>{testimonial.content}</CardText>
                                <Separator />
                                <CardAuthor>
                                    {testimonial.name}
                                    {testimonial.role && ` - ${testimonial.role}`}
                                </CardAuthor>
                            </Card>
                        </CarouselCard>
                    ))}
                </CarouselContent>
            </CarouselContainer>
        </section>
    );
};

export default Temoignages;
