import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Layers, Box } from 'lucide-react';

export default function ThreeDViewer({ 
  modelType = 'water_bottle', 
  conceptTitle = 'AI Redesign Concept',
  palette = ['#0284C7', '#0D9488', '#334155'],
  highlights = []
}) {
  const mountRef = useRef(null);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeMaterial, setActiveMaterial] = useState('eco_tritan'); // eco_tritan, aluminum, recycled_polymer, wireframe
  const [activeAnnotation, setActiveAnnotation] = useState(0);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const groupRef = useRef(null);
  const materialsRef = useRef([]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight || 380;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    currentMount.innerHTML = '';
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x2dd4bf, 1.8);
    dirLight2.position.set(-5, -4, -3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2, 20);
    pointLight.position.set(0, 3, 4);
    scene.add(pointLight);

    // Root model group
    const rootGroup = new THREE.Group();
    groupRef.current = rootGroup;
    scene.add(rootGroup);

    // Create 3D Parametric Geometry based on modelType
    materialsRef.current = [];

    const createBottleModel = () => {
      // 1. Lower Bumper (Recycled Bio-Elastomer Base)
      const baseGeo = new THREE.CylinderGeometry(1.05, 1.0, 0.5, 32);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.7,
        metalness: 0.1
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = -1.8;
      rootGroup.add(baseMesh);
      materialsRef.current.push(baseMat);

      // 2. Main Bottle Body (Ergonomic contoured cylinder)
      const bodyPoints = [];
      for (let i = 0; i <= 20; i++) {
        const y = (i / 20) * 2.8 - 1.5;
        // Ergonomic indentation curve around center
        let radius = 1.0;
        if (y > -0.5 && y < 0.6) {
          radius = 0.88 + 0.12 * Math.cos((y - 0.05) * Math.PI * 1.8);
        }
        bodyPoints.push(new THREE.Vector2(radius, y));
      }
      const bodyGeo = new THREE.LatheGeometry(bodyPoints, 36);
      const bodyMat = new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.78,
        roughness: 0.15,
        transmission: 0.65,
        thickness: 0.8,
        reflectivity: 0.9,
        clearcoat: 1.0
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      rootGroup.add(bodyMesh);
      materialsRef.current.push(bodyMat);

      // 3. Ergonomic Hex-Grip Rings (Tactile ribs)
      for (let r = 0; r < 4; r++) {
        const ringGeo = new THREE.TorusGeometry(0.92, 0.035, 16, 36);
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0x0d9488,
          roughness: 0.4,
          metalness: 0.2
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        ringMesh.position.y = -0.2 + r * 0.22;
        rootGroup.add(ringMesh);
        materialsRef.current.push(ringMat);
      }

      // 4. Bottle Shoulder Taper
      const shoulderGeo = new THREE.CylinderGeometry(0.55, 1.0, 0.6, 32);
      const shoulderMat = new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.8,
        roughness: 0.2,
        transmission: 0.6
      });
      const shoulderMesh = new THREE.Mesh(shoulderGeo, shoulderMat);
      shoulderMesh.position.y = 1.6;
      rootGroup.add(shoulderMesh);
      materialsRef.current.push(shoulderMat);

      // 5. Modular Wide Mouth Neck
      const neckGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.35, 32);
      const neckMat = new THREE.MeshStandardMaterial({
        color: 0x0f766e,
        roughness: 0.3,
        metalness: 0.5
      });
      const neckMesh = new THREE.Mesh(neckGeo, neckMat);
      neckMesh.position.y = 2.05;
      rootGroup.add(neckMesh);
      materialsRef.current.push(neckMat);

      // 6. One-Touch Flip Cap & Safety Spout Assembly
      const capGeo = new THREE.CylinderGeometry(0.58, 0.58, 0.45, 32);
      const capMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.4,
        metalness: 0.3
      });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.position.y = 2.4;
      rootGroup.add(capMesh);
      materialsRef.current.push(capMat);

      // 7. Articulating Carry Loop Handle
      const handleGeo = new THREE.TorusGeometry(0.38, 0.08, 16, 24, Math.PI * 1.2);
      const handleMat = new THREE.MeshStandardMaterial({
        color: 0x14b8a6,
        roughness: 0.2,
        metalness: 0.4
      });
      const handleMesh = new THREE.Mesh(handleGeo, handleMat);
      handleMesh.position.set(0.35, 2.65, 0);
      handleMesh.rotation.z = -Math.PI / 4;
      rootGroup.add(handleMesh);
      materialsRef.current.push(handleMat);
    };

    const createGenericModel = () => {
      // Modular parametric physical product archetype
      const bodyGeo = new THREE.RoundedBoxGeometry ? new THREE.BoxGeometry(2, 2.4, 1.4) : new THREE.BoxGeometry(2, 2.4, 1.4);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.3,
        metalness: 0.4
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      rootGroup.add(bodyMesh);
      materialsRef.current.push(bodyMat);

      // Detail accents
      const accentGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.3, 32);
      const accentMat = new THREE.MeshStandardMaterial({
        color: 0x14b8a6,
        roughness: 0.2,
        metalness: 0.8
      });
      const accentMesh = new THREE.Mesh(accentGeo, accentMat);
      accentMesh.rotation.x = Math.PI / 2;
      accentMesh.position.z = 0.72;
      rootGroup.add(accentMesh);
      materialsRef.current.push(accentMat);
    };

    if (modelType.toLowerCase().includes('bottle') || modelType.toLowerCase().includes('water')) {
      createBottleModel();
    } else {
      createBottleModel(); // Default richly detailed model for showcase
    }

    // Interaction variables (Mouse drag rotation)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging || !rootGroup) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rootGroup.rotation.y += deltaX * 0.01;
      rootGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support for mobile
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging || !rootGroup || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      rootGroup.rotation.y += deltaX * 0.01;
      rootGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    dom.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging && rootGroup) {
        rootGroup.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize listener
    const handleResize = () => {
      if (!currentMount || !renderer || !camera) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight || 380;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelType]);

  // Handle wireframe & material change
  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      mat.wireframe = wireframe;
      if (activeMaterial === 'aluminum') {
        mat.color.setHex(0x94a3b8);
        mat.metalness = 0.85;
        mat.roughness = 0.2;
      } else if (activeMaterial === 'eco_tritan') {
        mat.color.setHex(0x0284c7);
        mat.metalness = 0.1;
        mat.roughness = 0.15;
      } else if (activeMaterial === 'forest_bio') {
        mat.color.setHex(0x059669);
        mat.metalness = 0.2;
        mat.roughness = 0.4;
      }
    });
  }, [wireframe, activeMaterial]);

  const annotations = [
    { title: "One-Touch Safety Spout", desc: "Dual lock mechanism prevents accidental bag leakage.", pos: "Top" },
    { title: "Articulating Carabiner Loop", desc: "Flush 180° pivot for hands-free backpack carry.", pos: "Cap" },
    { title: "Tactile Ergonomic Grips", desc: "Contoured channels prevent slipping during workout sets.", pos: "Mid-body" },
    { title: "Shock-Absorbing Bumper", desc: "Recycled bio-elastomer base cushions against hard drops.", pos: "Base" }
  ];

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl">
      {/* 3D Viewer Header */}
      <div className="px-5 py-3.5 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
            <Box className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-wide uppercase">
              Interactive 3D Architectural Mockup
            </h4>
            <p className="text-[11px] text-slate-400">
              Real-time WebGL inspection • Drag to rotate 360°
            </p>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center space-x-1 transition-all ${
              autoRotate 
                ? 'bg-teal-500/10 text-teal-300 border-teal-500/30' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
            <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
          </button>

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center space-x-1 transition-all ${
              wireframe 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>CAD Mesh</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 relative">
        <div className="lg:col-span-8 relative min-h-[380px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center cursor-grab active:cursor-grabbing">
          {/* WebGL Canvas Mount */}
          <div ref={mountRef} className="w-full h-[380px]" />

          {/* Interactive Material Preset Switcher Pill */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center space-x-1.5 p-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px]">
            <span className="text-slate-400 px-2 font-medium">Finish:</span>
            <button
              onClick={() => setActiveMaterial('eco_tritan')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMaterial === 'eco_tritan' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Tritan Cyan
            </button>
            <button
              onClick={() => setActiveMaterial('forest_bio')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMaterial === 'forest_bio' ? 'bg-emerald-500 text-slate-950 font-semibold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Bio-Green
            </button>
            <button
              onClick={() => setActiveMaterial('aluminum')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMaterial === 'aluminum' ? 'bg-slate-200 text-slate-950 font-semibold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Matte Alloy
            </button>
          </div>

          {/* Hint Overlay */}
          <div className="absolute top-4 right-4 z-10 text-[10px] text-slate-400 bg-slate-950/70 px-2 py-1 rounded border border-slate-800 pointer-events-none">
            Click & Drag to Inspect
          </div>
        </div>

        {/* Engineering Annotations Sidebar */}
        <div className="lg:col-span-4 p-5 bg-slate-950/50 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <h5 className="text-xs font-bold text-white tracking-wide uppercase">
                Redesign Engineering Callouts
              </h5>
            </div>

            <div className="space-y-2.5">
              {annotations.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveAnnotation(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    activeAnnotation === idx
                      ? 'bg-teal-500/10 border-teal-500/40 text-teal-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">
                      {item.title}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {item.pos}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CAD Disclaimer note */}
          <div className="mt-4 p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-[10px] text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300">Engineering Note: </span>
            This 3D view renders architectural redesign concepts. Production manufacturing requires final CAD/CAM toolpath validation.
          </div>
        </div>
      </div>
    </div>
  );
}
