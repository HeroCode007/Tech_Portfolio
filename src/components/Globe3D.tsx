import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GlobeProps {
  className?: string;
}

const Globe3D = ({ className = '' }: GlobeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 2.5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Globe group
    const globeGroup = new THREE.Group();
    globeRef.current = globeGroup;
    scene.add(globeGroup);

    // Colors
    const primaryColor = new THREE.Color(0x22c55e); // Green-500
    const secondaryColor = new THREE.Color(0x10b981); // Emerald-500
    const glowColor = new THREE.Color(0x4ade80); // Green-400

    // Create wireframe sphere (globe)
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframeSphere = new THREE.Mesh(sphereGeometry, wireframeMaterial);
    globeGroup.add(wireframeSphere);

    // Create latitude lines
    const createLatitudeLine = (radius: number, lat: number) => {
      const points = [];
      const segments = 64;
      const phi = (90 - lat) * (Math.PI / 180);
      const r = radius * Math.sin(phi);
      const y = radius * Math.cos(phi);
      
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(
          r * Math.cos(theta),
          y,
          r * Math.sin(theta)
        ));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: primaryColor, 
        transparent: true, 
        opacity: 0.3 
      });
      return new THREE.Line(geometry, material);
    };

    // Add latitude lines
    [-60, -30, 0, 30, 60].forEach(lat => {
      globeGroup.add(createLatitudeLine(1, lat));
    });

    // Create longitude lines
    const createLongitudeLine = (radius: number, lon: number) => {
      const points = [];
      const segments = 64;
      
      for (let i = 0; i <= segments; i++) {
        const phi = (i / segments) * Math.PI;
        const theta = lon * (Math.PI / 180);
        points.push(new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        ));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: primaryColor, 
        transparent: true, 
        opacity: 0.3 
      });
      return new THREE.Line(geometry, material);
    };

    // Add longitude lines
    for (let i = 0; i < 12; i++) {
      globeGroup.add(createLongitudeLine(1, i * 30));
    }

    // Create glowing dots at various locations (representing global connections)
    const locations = [
      { lat: 31.5, lon: 74.3, name: 'Lahore' }, // Your location
      { lat: 40.7, lon: -74.0, name: 'New York' },
      { lat: 51.5, lon: -0.1, name: 'London' },
      { lat: 35.6, lon: 139.6, name: 'Tokyo' },
      { lat: -33.8, lon: 151.2, name: 'Sydney' },
      { lat: 1.3, lon: 103.8, name: 'Singapore' },
      { lat: 55.7, lon: 37.6, name: 'Moscow' },
      { lat: 48.8, lon: 2.3, name: 'Paris' },
      { lat: 25.2, lon: 55.2, name: 'Dubai' },
      { lat: 37.5, lon: 127.0, name: 'Seoul' },
      { lat: 22.3, lon: 114.1, name: 'Hong Kong' },
      { lat: 19.0, lon: 72.8, name: 'Mumbai' },
      { lat: -23.5, lon: -46.6, name: 'São Paulo' },
      { lat: 34.0, lon: -118.2, name: 'Los Angeles' },
      { lat: 49.2, lon: -123.1, name: 'Vancouver' },
    ];

    const dotGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: glowColor });
    
    const dots: THREE.Mesh[] = [];
    
    locations.forEach((loc, index) => {
      const phi = (90 - loc.lat) * (Math.PI / 180);
      const theta = (loc.lon + 180) * (Math.PI / 180);
      
      const x = -Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);
      
      const dot = new THREE.Mesh(dotGeometry, dotMaterial.clone());
      dot.position.set(x, y, z);
      
      // Make Lahore dot larger and brighter
      if (index === 0) {
        dot.scale.setScalar(1.5);
        (dot.material as THREE.MeshBasicMaterial).color = new THREE.Color(0x86efac);
      }
      
      dots.push(dot);
      globeGroup.add(dot);
    });

    // Create connection arcs between Lahore and other cities
    const createArc = (start: { lat: number; lon: number }, end: { lat: number; lon: number }) => {
      const startPhi = (90 - start.lat) * (Math.PI / 180);
      const startTheta = (start.lon + 180) * (Math.PI / 180);
      const endPhi = (90 - end.lat) * (Math.PI / 180);
      const endTheta = (end.lon + 180) * (Math.PI / 180);

      const startVec = new THREE.Vector3(
        -Math.sin(startPhi) * Math.cos(startTheta),
        Math.cos(startPhi),
        Math.sin(startPhi) * Math.sin(startTheta)
      );

      const endVec = new THREE.Vector3(
        -Math.sin(endPhi) * Math.cos(endTheta),
        Math.cos(endPhi),
        Math.sin(endPhi) * Math.sin(endTheta)
      );

      const points = [];
      const segments = 50;
      
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const point = new THREE.Vector3().lerpVectors(startVec, endVec, t);
        
        // Add arc height
        const arcHeight = 1 + 0.3 * Math.sin(Math.PI * t);
        point.normalize().multiplyScalar(arcHeight);
        points.push(point);
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: secondaryColor,
        transparent: true,
        opacity: 0.4,
      });
      
      return new THREE.Line(geometry, material);
    };

    // Add arcs from Lahore to selected cities
    const lahore = locations[0];
    [1, 2, 3, 5, 8, 11].forEach(index => {
      const arc = createArc(lahore, locations[index]);
      globeGroup.add(arc);
    });

    // Create outer glow ring
    const ringGeometry = new THREE.RingGeometry(1.1, 1.15, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    globeGroup.add(ring);

    // Create particles around the globe
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: glowColor,
      size: 0.015,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    globeGroup.add(particles);

    // Initial rotation
    globeGroup.rotation.x = 0.3;
    globeGroup.rotation.y = -0.5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.3;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / height) * 2 + 1;
      
      targetRotationY = mouseX * 0.5;
      targetRotationX = 0.3 + mouseY * 0.2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Smooth rotation towards target
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.05;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.05;
      
      // Auto rotation
      globeGroup.rotation.y += 0.002;

      // Animate dots (pulse effect)
      dots.forEach((dot, index) => {
        const scale = 1 + 0.3 * Math.sin(time * 2 + index);
        if (index === 0) {
          dot.scale.setScalar(1.5 * scale);
        } else {
          dot.scale.setScalar(scale);
        }
      });

      // Animate particles
      particles.rotation.y += 0.001;

      // Animate ring
      ring.rotation.z += 0.005;

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
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      // Dispose geometries and materials
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
      className={`w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
};

export default Globe3D;
