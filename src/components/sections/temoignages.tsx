import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, PerspectiveCamera, useTexture } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

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
        id: 'client-2',
        type: 'client',
        author: {
            name: "Thomas D.",
        },
        content: "+45% de conversions en 3 mois",
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
        content: "Design moderne et responsive",
        featured: false
    },
    {
        id: 'value-3',
        type: 'value',
        content: "Solutions sur mesure",
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
    height: 100%;
    width: 100%;
    
    @media (max-width: 1024px) {
        height: auto;
        min-height: 80px;
        margin: 0;
        padding: 0;
    }
`;

const CanvasContainer = styled.div<{ isHalfSize: boolean }>`
    position: absolute;
    top: 0;
    right: 0;
    width: ${props => props.isHalfSize ? '50%' : '100%'};
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
    padding: 0;
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

// Three.js Components
const TestimonialText = ({ position, text, author, type }: { position: THREE.Vector3, text: string, author?: string, type: string }) => {
    const { camera } = useThree();
    const groupRef = useRef<THREE.Group>();
    const [hovered, setHovered] = useState(false);
    
    const { scale } = useSpring({
        scale: hovered ? 1.2 : 1,
        config: { tension: 300, friction: 10 }
    });

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.quaternion.copy(camera.quaternion);
        }
    });

    return (
        <animated.group
            ref={groupRef}
            position={position}
            scale={scale}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Text
                color={type === 'client' ? '#000000' : '#333333'}
                fontSize={0.5}
                maxWidth={10}
                lineHeight={1.2}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
            >
                {text}
            </Text>
            {author && (
                <Text
                    position={[0, -0.6, 0]}
                    color="#666666"
                    fontSize={0.3}
                    maxWidth={10}
                    lineHeight={1}
                    textAlign="center"
                    anchorX="center"
                    anchorY="middle"
                >
                    {author}
                </Text>
            )}
        </animated.group>
    );
};

const TestimonialsScene = () => {
    const testimonialRefs = useRef<TestimonialPosition[]>([]);
    const { size, viewport } = useThree();
    const isHalfSize = size.width < viewport.width;

    useEffect(() => {
        // Initialize testimonial positions
        testimonialRefs.current = testimonials.map(() => ({
            x: (Math.random() - 0.5) * (isHalfSize ? 5 : 10),
            y: (Math.random() - 0.5) * 10,
            z: Math.random() * (DEPTH_RANGE.MAX - DEPTH_RANGE.MIN) + DEPTH_RANGE.MIN,
            vx: (Math.random() - 0.5) * 0.02,
            vy: (Math.random() - 0.5) * 0.02,
            vz: (Math.random() - 0.5) * 0.01,
            text: testimonials[0].content,
            author: testimonials[0].author?.name,
            type: testimonials[0].type
        }));
    }, [isHalfSize]);

    useFrame((state) => {
        testimonialRefs.current.forEach((testimonial) => {
            // Update positions
            testimonial.x += testimonial.vx;
            testimonial.y += testimonial.vy;
            testimonial.z += testimonial.vz;

            // Bounce off boundaries
            const bounds = isHalfSize ? 5 : 10;
            if (Math.abs(testimonial.x) > bounds) testimonial.vx *= -1;
            if (Math.abs(testimonial.y) > 5) testimonial.vy *= -1;
            if (testimonial.z < DEPTH_RANGE.MIN || testimonial.z > DEPTH_RANGE.MAX) testimonial.vz *= -1;
        });
    });

    return (
        <>
            <fog attach="fog" args={[FOG_COLOR, FOG_NEAR, FOG_FAR]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
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

const Temoignages: React.FC<{ isHalfSize?: boolean }> = ({ isHalfSize = false }) => {
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
            <CanvasContainer isHalfSize={isHalfSize}>
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
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
                                            <span> · {item.author.company}</span>
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
