import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Laptop3DProps {
  className?: string;
}

const Laptop3D = ({ className = '' }: Laptop3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 4);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Colors
    const greenPrimary = 0x22c55e;
    const greenGlow = 0x4ade80;
    const darkGray = 0x1a1a2e;
    const black = 0x0a0a0f;

    // Laptop Group
    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);

    // Create laptop base (keyboard part)
    const baseGeometry = new THREE.BoxGeometry(3, 0.1, 2);
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: darkGray,
      specular: 0x333333,
      shininess: 30,
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.5;
    base.castShadow = true;
    base.receiveShadow = true;
    laptopGroup.add(base);

    // Create keyboard keys pattern on base
    const keysGroup = new THREE.Group();
    const keyGeometry = new THREE.BoxGeometry(0.12, 0.02, 0.12);
    const keyMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a3e });

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 14; col++) {
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        key.position.set(-1.3 + col * 0.19, -0.43, -0.5 + row * 0.22);
        keysGroup.add(key);
      }
    }
    laptopGroup.add(keysGroup);

    // Create trackpad
    const trackpadGeometry = new THREE.BoxGeometry(0.8, 0.01, 0.5);
    const trackpadMaterial = new THREE.MeshPhongMaterial({ color: 0x252535 });
    const trackpad = new THREE.Mesh(trackpadGeometry, trackpadMaterial);
    trackpad.position.set(0, -0.44, 0.5);
    laptopGroup.add(trackpad);

    // Create screen frame (lid)
    const lidGeometry = new THREE.BoxGeometry(3, 2, 0.1);
    const lidMaterial = new THREE.MeshPhongMaterial({
      color: darkGray,
      specular: 0x333333,
      shininess: 30,
    });
    const lid = new THREE.Mesh(lidGeometry, lidMaterial);
    lid.position.set(0, 0.5, -1);
    lid.rotation.x = -0.2;
    lid.castShadow = true;
    laptopGroup.add(lid);

    // Create screen (display)
    const screenGeometry = new THREE.PlaneGeometry(2.7, 1.7);

    // Create canvas for screen content
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d')!;

    // Screen texture
    const screenTexture = new THREE.CanvasTexture(canvas);
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 0.5, -0.94);
    screen.rotation.x = -0.2;
    laptopGroup.add(screen);

    // Screen content animation
    const codeLines = [
      '> Initializing developer profile...',
      '> Loading skills: React, Node.js, Python',
      '> Loading experience: 5+ years',
      '> Status: Available for hire',
      '',
      '┌──────────────────────────────────┐',
      '│                                  │',
      '│    🚀 HIRE ME                    │',
      '│                                  │',
      '│    Full-Stack Developer          │',
      '│    AI/ML Engineer                │',
      '│                                  │',
      '│    ✓ Clean Code                  │',
      '│    ✓ Fast Delivery               │',
      '│    ✓ 24/7 Communication          │',
      '│                                  │',
      '│    Let\'s build something        │',
      '│    amazing together!             │',
      '│                                  │',
      '└──────────────────────────────────┘',
    ];

    let charIndex = 0;
    let lineIndex = 0;
    let displayedLines: string[] = [];
    let matrixColumns: number[] = [];
    const matrixChars = '01アイウエオカキクケコサシスセソ';

    // Initialize matrix rain columns
    for (let i = 0; i < 30; i++) {
      matrixColumns.push(Math.random() * canvas.height);
    }

    const updateScreen = () => {
      // Clear with dark background
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw matrix rain in background
      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';

      for (let i = 0; i < matrixColumns.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * 17;
        ctx.fillText(char, x, matrixColumns[i]);

        matrixColumns[i] += 10;
        if (matrixColumns[i] > canvas.height && Math.random() > 0.98) {
          matrixColumns[i] = 0;
        }
      }

      // Draw scan line effect
      const scanLineY = (Date.now() / 20) % canvas.height;
      ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
      ctx.fillRect(0, scanLineY, canvas.width, 2);

      // Draw terminal content
      ctx.font = 'bold 12px "Courier New", monospace';

      // Type writer effect
      if (lineIndex < codeLines.length) {
        const currentLine = codeLines[lineIndex];
        if (charIndex < currentLine.length) {
          charIndex++;
        } else {
          if (displayedLines.length < 15) {
            displayedLines.push(currentLine);
          } else {
            displayedLines.shift();
            displayedLines.push(currentLine);
          }
          lineIndex++;
          charIndex = 0;
        }
      } else {
        // Reset after all lines are shown
        setTimeout(() => {
          lineIndex = 0;
          charIndex = 0;
          displayedLines = [];
        }, 3000);
      }

      // Draw displayed lines
      displayedLines.forEach((line, index) => {
        const y = 25 + index * 18;

        // Highlight special lines
        if (line.includes('HIRE ME')) {
          ctx.fillStyle = '#4ade80';
          ctx.font = 'bold 14px "Courier New", monospace';
        } else if (line.includes('✓')) {
          ctx.fillStyle = '#22c55e';
          ctx.font = '12px "Courier New", monospace';
        } else if (line.includes('│') || line.includes('┌') || line.includes('└') || line.includes('─')) {
          ctx.fillStyle = '#22c55e';
          ctx.font = '12px "Courier New", monospace';
        } else if (line.includes('>')) {
          ctx.fillStyle = '#86efac';
          ctx.font = '11px "Courier New", monospace';
        } else {
          ctx.fillStyle = '#d1d5db';
          ctx.font = '12px "Courier New", monospace';
        }

        ctx.fillText(line, 15, y);
      });

      // Draw current typing line with cursor
      if (lineIndex < codeLines.length) {
        const currentLine = codeLines[lineIndex];
        const typedText = currentLine.substring(0, charIndex);
        const y = 25 + displayedLines.length * 18;

        if (currentLine.includes('HIRE ME')) {
          ctx.fillStyle = '#4ade80';
          ctx.font = 'bold 14px "Courier New", monospace';
        } else {
          ctx.fillStyle = '#86efac';
          ctx.font = '11px "Courier New", monospace';
        }

        ctx.fillText(typedText, 15, y);

        // Blinking cursor
        if (Math.floor(Date.now() / 500) % 2 === 0) {
          const textWidth = ctx.measureText(typedText).width;
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(15 + textWidth, y - 10, 8, 14);
        }
      }

      // Draw screen border glow
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.5)';
      ctx.lineWidth = 2;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

      screenTexture.needsUpdate = true;
    };

    // Create screen glow
    const glowGeometry = new THREE.PlaneGeometry(3.2, 2.1);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: greenGlow,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    });
    const screenGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    screenGlow.position.set(0, 0.5, -0.9);
    screenGlow.rotation.x = -0.2;
    laptopGroup.add(screenGlow);

    // Create Apple logo (or your logo)
    const logoGeometry = new THREE.CircleGeometry(0.1, 32);
    const logoMaterial = new THREE.MeshBasicMaterial({
      color: greenPrimary,
      transparent: true,
      opacity: 0.8,
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.5, -1.06);
    logo.rotation.x = -0.2;
    laptopGroup.add(logo);

    // Add floating particles around laptop
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: greenGlow,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(greenGlow, 1, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    const screenLight = new THREE.PointLight(greenPrimary, 0.5, 5);
    screenLight.position.set(0, 0.5, -0.5);
    scene.add(screenLight);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / height) * 2 + 1;

      targetRotationY = mouseX * 0.3;
      targetRotationX = mouseY * 0.15;
    };

    // Touch support for mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        mouseX = ((touch.clientX - rect.left) / width) * 2 - 1;
        mouseY = -((touch.clientY - rect.top) / height) * 2 + 1;

        targetRotationY = mouseX * 0.3;
        targetRotationX = mouseY * 0.15;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Animation loop
    let time = 0;
    let lastScreenUpdate = 0;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Update screen content at fixed interval
      if (Date.now() - lastScreenUpdate > 50) {
        updateScreen();
        lastScreenUpdate = Date.now();
      }

      // Smooth rotation towards mouse
      laptopGroup.rotation.y += (targetRotationY - laptopGroup.rotation.y) * 0.05;
      laptopGroup.rotation.x += (targetRotationX - laptopGroup.rotation.x) * 0.05;

      // Floating animation
      laptopGroup.position.y = Math.sin(time * 0.8) * 0.1;
      laptopGroup.rotation.z = Math.sin(time * 0.5) * 0.02;

      // Animate particles
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      // Animate screen glow
      glowMaterial.opacity = 0.08 + Math.sin(time * 2) * 0.04;

      // Pulse the screen light
      screenLight.intensity = 0.4 + Math.sin(time * 3) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full cursor-grab active:cursor-grabbing touch-none ${className}`}
      style={{ minHeight: '280px' }}
    />
  );
};

export default Laptop3D;