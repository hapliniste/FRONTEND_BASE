import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, PerspectiveCamera, Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useTheme } from "styled-components";

// Configuration constants
const SCROLL_SPEED = 0.5;
const FONT_SIZE_BASE = 16;
const DEPTH_RANGE = { MIN: -10, MAX: -5 };
const VELOCITY_DECAY = 0.95;
const FOG_COLOR = "#ffffff";
const FOG_NEAR = 1;
const FOG_FAR = 15;
const MOMENTUM_MULTIPLIER = 0.5;
const MOMENTUM_DURATION = 2000;
const MOMENTUM_FRICTION = 0.98;
const AUTO_SCROLL_SPEED = -0.8;
const TRANSITION_DURATION = 1500;
const BUFFER_MULTIPLIER = 3; // How many screens worth of items to keep in DOM

// Configuration constants for layout
const LAYOUT_CONFIG = {
    center: {
        width: 8,     // Width of center area to avoid
        height: 5,    // Height of center area to avoid
        offsetX: -2.5,   // Horizontal offset of center area
        offsetY: 1    // Vertical offset of center area (positive moves it up)
    },
    spacing: {
        minDistance: 2,   // Minimum distance between cards
        maxAttempts: 5,  // Max attempts to find non-colliding position
        distribution: {
            minRadius: 7,    // Base minimum distance from center
            maxRadius: 9,   // Base maximum distance from center
            yScale: 0.4,    // Scale factor for vertical distribution (makes it more elliptical)
            responsive: {
                breakpoint: 12,  // Width at which base values are meant for
                minScale: 1,     // Minimum scale factor for smaller screens
                maxScale: 1.5     // Maximum scale factor for larger screens
            }
        }
    }
};
/*
 minRadius: 6,    // Minimum distance from center
            maxRadius: 7,   // Maximum distance from center
            yScale: 0.4     // Scale factor for vertical distribution (makes it more elliptical)
*/

interface Testimonial {
    id: string;
    type: 'client' | 'value' | 'feature';
    author?: {
        name: string;
        company?: string;
    };
    content: string;
    featured: boolean;
}

const testimonials: Testimonial[] = [
    {
        id: 'client-1',
        type: 'client',
        author: {
            name: "Marie L.",
            company: "Studio ML",
        },
        content: "Un site qui capture parfaitement notre essence.",
        featured: true
    },
    {
        id: 'client-2',
        type: 'client',
        author: {
            name: "Thomas D.",
        },
        content: "+45% de conversions en 3 mois",
        featured: true
    },
    {
        id: 'client-3',
        type: 'client',
        author: {
            name: "Sophie M.",
            company: "Boutique en Ligne",
        },
        content: "Notre e-commerce a doublé ses ventes",
        featured: true
    },
    {
        id: 'value-1',
        type: 'value',
        content: "Innovation et excellence technique",
        featured: false
    },
    {
        id: 'feature-1',
        type: 'feature',
        content: "Sites web performants et élégants",
        featured: false
    },
    {
        id: 'client-4',
        type: 'client',
        author: {
            name: "Jean-Pierre R.",
            company: "Cabinet JR",
        },
        content: "Une refonte qui a modernisé notre image",
        featured: true
    },
    {
        id: 'value-2',
        type: 'value',
        content: "Expertise et créativité",
        featured: false
    },
    {
        id: 'feature-2',
        type: 'feature',
        content: "Sécurité et performance",
        featured: false
    }
];

interface TestimonialPosition {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    text: string;
    author?: string;
    type: string;
}

const Section = styled.section`
    position: relative;
    overflow: hidden;
    width: 100%;
    min-height: 600px; // Default for desktop
    display: flex;
    align-items: center;
    padding: 4rem 0;

    @media (max-width: 1024px) {
        min-height: unset;
        height: auto;
        padding: 0;
    }
`;

const CanvasContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    
    @media (max-width: 1024px) {
        display: none;
    }
`;

const CarouselContainer = styled(motion.div)`
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 1rem 0;
    z-index: 2;
    touch-action: pan-y pinch-zoom;
    background: ${props => props.theme.colors.backgrounds.default};
    
    @media (min-width: 1024px) {
        display: none;
    }
`;

const CarouselContent = styled(motion.div)`
    position: relative;
    height: 120px; // Adjust based on your content
    width: 100%;
`;

const CarouselCard = styled(motion.div)<{ $type: string }>`
    position: absolute;
    padding: 0.75rem 1.25rem;
    min-width: 250px;
    max-width: 80vw;
    font-size: 0.85rem;
    color: ${props => props.theme.colors.text.primary};
    opacity: ${props => props.$type === 'client' ? 0.9 : 0.7};
    font-weight: ${props => props.$type === 'client' ? '400' : '300'};
    background: ${props => `${props.theme.colors.backgrounds.default}80`};
    border-radius: ${props => props.theme.borders.radius};
    backdrop-filter: blur(8px);
    margin-right: 1.5rem; // Gap between items
    top: 50%;
    transform-origin: 0 50%;
`;

const Separator = styled.div`
    height: 1px;
    width: 2rem;
    background: ${props => props.theme.colors.text.primary};
    opacity: 0.2;
    margin: 0.5rem 0;
`;

const AuthorInfo = styled.div`
    font-size: 0.75rem;
    opacity: 0.8;
`;

const Card = styled.div`
    width: 180px;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    //border-top: 2px solid rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    //border-radius: 10px;
    backdrop-filter: blur(10px);
    transform-origin: center center;
`;

const CardText = styled.div`
    color: black;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
`;

const AuthorText = styled.div`
    color: black;
    font-size: 12px;
    margin-top: 0.5rem;
    text-align: center;
    opacity: 0.7;
`;

const TestimonialText = ({ position, text, author, type }: { position: THREE.Vector3, text: string, author?: string, type: string }) => {
    const { camera } = useThree();
    const groupRef = useRef<THREE.Group>();
    const time = useRef(Math.random() * 100);
    
    useFrame((state) => {
        if (groupRef.current) {
            // Face the camera
            groupRef.current.quaternion.copy(camera.quaternion);
            
            // Gentle floating motion
            time.current += 0.005;
            groupRef.current.position.y = position.y + Math.sin(time.current) * 0.3;
        }
    });

    return (
        <group
            ref={groupRef}
            position={position}
            scale={0.5}
        >
            <Html
                transform
                occlude
                style={{
                    transition: 'all 0.2s',
                    opacity: 1
                }}
            >
                <Card>
                    <CardText>{text}</CardText>
                    {author && (
                        <AuthorText>{author}</AuthorText>
                    )}
                </Card>
            </Html>
        </group>
    );
};

const TestimonialsScene = () => {
    const testimonialRefs = useRef<TestimonialPosition[]>([]);
    const { size, viewport } = useThree();

    // Calculate scale based on viewport width
    const getDistributionScale = () => {
        const { breakpoint, minScale, maxScale } = LAYOUT_CONFIG.spacing.distribution.responsive;
        const scale = viewport.width / breakpoint;
        return Math.max(minScale, Math.min(maxScale, scale));
    };

    const checkCollision = (pos: { x: number, y: number }, existingPositions: { x: number, y: number }[]) => {
        return existingPositions.some(existing => {
            const dx = existing.x - pos.x;
            const dy = existing.y - pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < LAYOUT_CONFIG.spacing.minDistance;
        });
    };

    const isInCenterArea = (x: number, y: number) => {
        const { width, height, offsetX, offsetY } = LAYOUT_CONFIG.center;
        const scale = getDistributionScale();
        return Math.abs(x - offsetX) < (width * scale)/2 && 
               Math.abs(y - offsetY) < (height * scale)/2;
    };

    const getRandomPosition = (index: number, existingPositions: { x: number, y: number }[]) => {
        let position;
        let attempts = 0;
        const scale = getDistributionScale();
        const { minRadius, maxRadius, yScale } = LAYOUT_CONFIG.spacing.distribution;

        // Keep trying positions until we find one without collision and not in center
        do {
            // Generate angle and radius
            const angle = (index / testimonials.length) * Math.PI * 2 + Math.random() * 0.5;
            const scaledMinRadius = minRadius * scale;
            const scaledMaxRadius = maxRadius * scale;
            const radius = scaledMinRadius + Math.random() * (scaledMaxRadius - scaledMinRadius);

            // Calculate base position
            const baseX = Math.cos(angle) * radius;
            const baseY = Math.sin(angle) * radius * yScale;

            // Add some noise
            const noise = 1.2 * scale;
            const xNoise = (Math.random() - 0.5) * noise;
            const yNoise = (Math.random() - 0.5) * noise;

            const candidateX = baseX + xNoise + LAYOUT_CONFIG.center.offsetX * scale;
            const candidateY = baseY + yNoise + LAYOUT_CONFIG.center.offsetY * scale;

            // Only accept position if it's not in center area
            if (!isInCenterArea(candidateX, candidateY)) {
                position = {
                    x: candidateX,
                    y: candidateY,
                    z: -3 + Math.random() * 2
                };
            }
            attempts++;
        } while (
            (!position || checkCollision(position, existingPositions)) && 
            attempts < LAYOUT_CONFIG.spacing.maxAttempts
        );

        // If we couldn't find a valid position, force one at a safe distance
        if (!position) {
            const angle = (index / testimonials.length) * Math.PI * 2;
            const radius = LAYOUT_CONFIG.spacing.distribution.maxRadius * scale;
            position = {
                x: Math.cos(angle) * radius + LAYOUT_CONFIG.center.offsetX * scale,
                y: Math.sin(angle) * radius * LAYOUT_CONFIG.spacing.distribution.yScale + LAYOUT_CONFIG.center.offsetY * scale,
                z: -3 + Math.random() * 2
            };
        }

        return position;
    };

    useEffect(() => {
        const positions: { x: number, y: number }[] = [];
        testimonialRefs.current = testimonials.map((testimonial, index) => {
            const pos = getRandomPosition(index, positions);
            positions.push({ x: pos.x, y: pos.y });
            return {
                ...pos,
                vx: 0,
                vy: 0,
                vz: 0,
                text: testimonial.content,
                author: testimonial.author?.name,
                type: testimonial.type
            };
        });
    }, [viewport.width]); // Re-layout when viewport width changes

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={1} />
            
            {testimonialRefs.current.map((testimonial, index) => (
                <TestimonialText
                    key={index}
                    position={new THREE.Vector3(testimonial.x, testimonial.y, testimonial.z)}
                    text={testimonial.text}
                    author={testimonial.author}
                    type={testimonial.type}
                />
            ))}
        </>
    );
};

interface PooledItem extends Testimonial {
    poolIndex: number;
    virtualIndex: number;
}

const ITEM_WIDTH = 280; // 250px width + 30px margin
const ITEM_HEIGHT = 120;

const containerVariants = {
    hidden: { 
        opacity: 0
    },
    visible: { 
        opacity: 1,
        transition: {
            delay: 0.8, // Appears after hero elements (4 * 0.2s)
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const Temoignages: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const currentTranslate = useRef(0);
    const prevTranslate = useRef(0);
    const animationRef = useRef<number>();
    const lastX = useRef(0);
    const velocity = useRef(0);
    const lastTime = useRef(Date.now());
    const momentumStartTime = useRef(0);
    
    // Virtual list state
    const [pooledItems, setPooledItems] = useState<PooledItem[]>([]);
    const itemWidth = useRef(0);
    const containerWidth = useRef(0);
    const baseOffset = useRef(0);
    const lastUpdatePosition = useRef(0);

    // Initialize the pool
    useEffect(() => {
        if (!carouselRef.current || !containerRef.current) return;
        
        // Calculate widths
        const container = containerRef.current;
        containerWidth.current = container.clientWidth;
        
        // Create initial pool
        const initialPool: PooledItem[] = [];
        const itemsNeeded = Math.ceil(containerWidth.current * BUFFER_MULTIPLIER / 250); // Assuming min item width
        
        for (let i = 0; i < itemsNeeded; i++) {
            const sourceItem = testimonials[i % testimonials.length];
            initialPool.push({
                ...sourceItem,
                poolIndex: i,
                virtualIndex: i,
            });
        }
        
        setPooledItems(initialPool);
        
        // Setup resize observer
        const observer = new ResizeObserver(() => {
            containerWidth.current = container.clientWidth;
            updatePool();
        });
        
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    const updatePool = useCallback(() => {
        if (!carouselRef.current || !containerRef.current) return;

        const currentPosition = currentTranslate.current;
        const movement = currentPosition - lastUpdatePosition.current;
        if (Math.abs(movement) < containerWidth.current / 4) return;
        
        lastUpdatePosition.current = currentPosition;
        
        const visibleStart = -currentPosition - containerWidth.current;
        const visibleEnd = -currentPosition + containerWidth.current * 2;
        
        setPooledItems(prevItems => {
            const newItems = [...prevItems];
            let needsUpdate = false;

            newItems.forEach((item, index) => {
                const itemPosition = item.virtualIndex * ITEM_WIDTH;
                
                if (itemPosition < visibleStart) {
                    const newVirtualIndex = item.virtualIndex + newItems.length;
                    const sourceItem = testimonials[newVirtualIndex % testimonials.length];
                    newItems[index] = {
                        ...sourceItem,
                        poolIndex: item.poolIndex,
                        virtualIndex: newVirtualIndex,
                    };
                    needsUpdate = true;
                } else if (itemPosition > visibleEnd) {
                    const newVirtualIndex = item.virtualIndex - newItems.length;
                    const sourceItem = testimonials[Math.abs(newVirtualIndex) % testimonials.length];
                    newItems[index] = {
                        ...sourceItem,
                        poolIndex: item.poolIndex,
                        virtualIndex: newVirtualIndex,
                    };
                    needsUpdate = true;
                }
            });

            return needsUpdate ? newItems : prevItems;
        });
    }, []);

    const setPosition = useCallback(() => {
        if (!carouselRef.current) return;
        carouselRef.current.style.transform = `translate3d(${currentTranslate.current}px, 0, 0)`;
        updatePool();
    }, [updatePool]);

    const animation = () => {
        if (isDragging.current) return;

        const now = Date.now();
        const deltaTime = now - lastTime.current;
        lastTime.current = now;

        if (momentumStartTime.current > 0) {
            const timeSinceMomentum = now - momentumStartTime.current;
            const momentumProgress = Math.min(timeSinceMomentum / MOMENTUM_DURATION, 1);
            
            if (momentumProgress < 1) {
                // Apply consistent friction regardless of direction
                const frictionFactor = Math.pow(MOMENTUM_FRICTION, deltaTime / 16);
                velocity.current *= frictionFactor;

                // Only blend with auto-scroll if we're moving slower than it
                const currentSpeed = Math.abs(velocity.current);
                const autoScrollSpeed = Math.abs(AUTO_SCROLL_SPEED / deltaTime);

                if (currentSpeed < autoScrollSpeed) {
                    const transitionProgress = Math.min(timeSinceMomentum / TRANSITION_DURATION, 1);
                    velocity.current = velocity.current * (1 - transitionProgress) + 
                                    (AUTO_SCROLL_SPEED / deltaTime) * transitionProgress;
                }

                currentTranslate.current += velocity.current * deltaTime;
            } else {
                // Momentum phase complete
                momentumStartTime.current = 0;
                velocity.current = AUTO_SCROLL_SPEED / deltaTime;
                currentTranslate.current += AUTO_SCROLL_SPEED;
            }
        } else {
            // Normal auto-scroll
            currentTranslate.current += AUTO_SCROLL_SPEED;
        }

        setPosition();
        animationRef.current = requestAnimationFrame(animation);
    };

    const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
        isDragging.current = true;
        momentumStartTime.current = 0;
        
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        const point = 'touches' in e ? e.touches[0] : e;
        startX.current = point.clientX;
        lastX.current = point.clientX;
        lastTime.current = Date.now();
        
        if (carouselRef.current) {
            const transform = getComputedStyle(carouselRef.current).transform;
            if (transform !== 'none') {
                const matrix = new DOMMatrix(transform);
                prevTranslate.current = matrix.m41;
                currentTranslate.current = matrix.m41;
            }
        }
    };

    const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging.current) return;
        
        const point = 'touches' in e ? e.touches[0] : e;
        const currentX = point.clientX;
        const diff = currentX - lastX.current;
        const now = Date.now();
        const dt = Math.max(now - lastTime.current, 1);
        
        velocity.current = diff / dt;
        lastTime.current = now;
        lastX.current = currentX;

        currentTranslate.current += diff;
        setPosition();
    };

    const handleDragEnd = () => {
        isDragging.current = false;
        momentumStartTime.current = Date.now();
        
        // Scale initial momentum
        velocity.current *= MOMENTUM_MULTIPLIER;
        
        animationRef.current = requestAnimationFrame(animation);
    };

    useEffect(() => {
        animationRef.current = requestAnimationFrame(animation);
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <Section>
            <CanvasContainer>
                <Canvas gl={{ alpha: true }}>
                    <TestimonialsScene />
                </Canvas>
            </CanvasContainer>
            
            <CarouselContainer
                ref={containerRef}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <CarouselContent
                    ref={carouselRef}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                >
                    {pooledItems.map((item) => (
                        <CarouselCard
                            key={`${item.id}-${item.poolIndex}`}
                            $type={item.type}
                            style={{
                                transform: `translate3d(${item.virtualIndex * ITEM_WIDTH}px, -50%, 0)`,
                                left: 0,
                            }}
                        >
                            {item.content}
                            {item.author && (
                                <>
                                    <Separator />
                                    <AuthorInfo>
                                        {item.author.name}
                                        {item.author.company && (
                                            <span> - {item.author.company}</span>
                                        )}
                                    </AuthorInfo>
                                </>
                            )}
                        </CarouselCard>
                    ))}
                </CarouselContent>
            </CarouselContainer>
        </Section>
    );
};

export default Temoignages;
