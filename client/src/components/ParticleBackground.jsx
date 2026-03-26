import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const { isDarkMode } = useTheme();
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 3 + 1;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.life = Math.random() * 100;
            }

            update(mouse) {
                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);
                    this.vx -= Math.cos(angle) * force * 0.2;
                    this.vy -= Math.sin(angle) * force * 0.2;
                }

                // Update position
                this.x += this.vx;
                this.y += this.vy;

                // Damping
                this.vx *= 0.99;
                this.vy *= 0.99;

                // Boundary check
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Keep within bounds
                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));

                this.life += 0.5;
            }

            draw(ctx, isDark) {
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.radius * 2
                );

                if (isDark) {
                    gradient.addColorStop(0, `rgba(139, 92, 246, ${0.6 * Math.sin(this.life * 0.05)})`);
                    gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.3 * Math.sin(this.life * 0.05)})`);
                    gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
                } else {
                    gradient.addColorStop(0, `rgba(139, 92, 246, ${0.4 * Math.sin(this.life * 0.05)})`);
                    gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.2 * Math.sin(this.life * 0.05)})`);
                    gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
                }

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        const particleCount = 50;
        particlesRef.current = Array.from({ length: particleCount }, () => new Particle());

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            particlesRef.current.forEach((particle, i) => {
                particle.update(mouseRef.current);
                particle.draw(ctx, isDarkMode);

                // Draw connections between nearby particles
                particlesRef.current.slice(i + 1).forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = isDarkMode
                            ? `rgba(139, 92, 246, ${0.1 * (1 - distance / 100)})`
                            : `rgba(139, 92, 246, ${0.05 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isDarkMode]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: isDarkMode ? 0.6 : 0.4 }}
        />
    );
};

export default ParticleBackground;
