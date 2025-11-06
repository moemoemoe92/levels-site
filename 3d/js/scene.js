/* ====================================
   3D Scene Manager
   مدير المشهد ثلاثي الأبعاد
   ==================================== */

class Scene3DManager {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cup = null;
        this.table = null;
        this.lights = [];
        this.particles = [];
        this.isAnimating = true;
        this.stats = {
            fps: 0,
            vertices: 0,
            triangles: 0
        };
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.init();
    }

    // Initialize 3D scene - تهيئة المشهد ثلاثي الأبعاد
    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createLights();
        this.createCoffeeCup();
        this.createTable();
        this.createParticles();
        this.createEnvironment();
        this.setupEventListeners();
        this.animate();
        this.hideLoading();
    }

    // Create scene - إنشاء المشهد
    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x2C3639);
        this.scene.fog = new THREE.Fog(0x2C3639, 10, 50);
    }

    // Create camera - إنشاء الكاميرا
    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 2, 5);
        this.camera.lookAt(0, 0, 0);
    }

    // Create renderer - إنشاء المُرندر
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
    }

    // Create lights - إنشاء الأضواء
    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);

        // Directional light (main)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        this.scene.add(directionalLight);
        this.lights.push(directionalLight);

        // Point light (accent)
        const pointLight = new THREE.PointLight(0xA27B5C, 0.5);
        pointLight.position.set(-3, 3, 3);
        this.scene.add(pointLight);
        this.lights.push(pointLight);

        // Hemisphere light (sky/ground)
        const hemisphereLight = new THREE.HemisphereLight(0xDCD7C9, 0x3F4E4F, 0.4);
        this.scene.add(hemisphereLight);
        this.lights.push(hemisphereLight);
    }

    // Create coffee cup - إنشاء كوب القهوة
    createCoffeeCup() {
        this.cup = new THREE.Group();

        // Cup body (cylinder with taper)
        const cupGeometry = new THREE.CylinderGeometry(1, 0.8, 2, 32);
        const cupMaterial = new THREE.MeshStandardMaterial({
            color: 0x8B4513,
            roughness: 0.3,
            metalness: 0.2,
            emissive: 0x442211,
            emissiveIntensity: 0.1
        });
        const cupBody = new THREE.Mesh(cupGeometry, cupMaterial);
        cupBody.position.y = 0;
        cupBody.castShadow = true;
        cupBody.receiveShadow = true;

        // Coffee liquid inside
        const liquidGeometry = new THREE.CircleGeometry(0.95, 32);
        const liquidMaterial = new THREE.MeshStandardMaterial({
            color: 0x3E2723,
            roughness: 0.1,
            metalness: 0.8,
            emissive: 0x3E2723,
            emissiveIntensity: 0.2
        });
        const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
        liquid.rotation.x = -Math.PI / 2;
        liquid.position.y = 1;

        // Cup handle (torus)
        const handleGeometry = new THREE.TorusGeometry(0.35, 0.12, 16, 100, Math.PI);
        const handleMaterial = new THREE.MeshStandardMaterial({
            color: 0x654321,
            roughness: 0.4,
            metalness: 0.2
        });
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.position.set(1.2, 0, 0);
        handle.rotation.z = Math.PI / 2;
        handle.castShadow = true;

        // Steam particles
        this.createSteam();

        // Add all parts to cup group
        this.cup.add(cupBody);
        this.cup.add(liquid);
        this.cup.add(handle);

        this.scene.add(this.cup);

        // Update stats
        this.stats.vertices += cupGeometry.attributes.position.count;
        this.stats.vertices += liquidGeometry.attributes.position.count;
        this.stats.vertices += handleGeometry.attributes.position.count;
    }

    // Create steam effect - إنشاء تأثير البخار
    createSteam() {
        const steamGeometry = new THREE.BufferGeometry();
        const steamMaterial = new THREE.PointsMaterial({
            color: 0xDCD7C9,
            size: 0.1,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const positions = [];
        for (let i = 0; i < 50; i++) {
            positions.push(
                (Math.random() - 0.5) * 0.5,
                1 + Math.random() * 0.5,
                (Math.random() - 0.5) * 0.5
            );
        }

        steamGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const steam = new THREE.Points(steamGeometry, steamMaterial);
        this.cup.add(steam);

        // Animate steam
        this.animateSteam(steam);
    }

    // Animate steam - تحريك البخار
    animateSteam(steam) {
        const positions = steam.geometry.attributes.position.array;
        let time = 0;

        const updateSteam = () => {
            if (!this.isAnimating) return;

            time += 0.01;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += 0.02; // Move up
                if (positions[i + 1] > 2.5) {
                    positions[i + 1] = 1;
                }
                // Add waviness
                positions[i] += Math.sin(time + i) * 0.001;
                positions[i + 2] += Math.cos(time + i) * 0.001;
            }
            steam.geometry.attributes.position.needsUpdate = true;
            requestAnimationFrame(updateSteam);
        };

        updateSteam();
    }

    // Create table - إنشاء الطاولة
    createTable() {
        const tableGeometry = new THREE.BoxGeometry(8, 0.3, 8);
        const tableMaterial = new THREE.MeshStandardMaterial({
            color: 0x3F4E4F,
            roughness: 0.6,
            metalness: 0.1
        });
        this.table = new THREE.Mesh(tableGeometry, tableMaterial);
        this.table.position.y = -1.5;
        this.table.receiveShadow = true;
        this.scene.add(this.table);

        this.stats.vertices += tableGeometry.attributes.position.count;
    }

    // Create floating particles - إنشاء الجزيئات العائمة
    createParticles() {
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 200;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;

            const color = new THREE.Color(0xA27B5C);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(particles);
        this.particles.push(particles);
    }

    // Create environment - إنشاء البيئة المحيطة
    createEnvironment() {
        // Add a subtle grid
        const gridHelper = new THREE.GridHelper(20, 20, 0xA27B5C, 0x3F4E4F);
        gridHelper.position.y = -1.65;
        gridHelper.material.opacity = 0.2;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
    }

    // Setup event listeners - إعداد مستمعي الأحداث
    setupEventListeners() {
        // Mouse move
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));

        // Mouse wheel
        window.addEventListener('wheel', (e) => this.onMouseWheel(e));

        // Window resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Touch events for mobile
        window.addEventListener('touchmove', (e) => this.onTouchMove(e));
        window.addEventListener('touchstart', (e) => this.onTouchStart(e));
    }

    // Mouse move handler - معالج حركة الماوس
    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.targetRotation.y = this.mouse.x * Math.PI / 2;
        this.targetRotation.x = this.mouse.y * Math.PI / 4;
    }

    // Mouse wheel handler - معالج عجلة الماوس
    onMouseWheel(event) {
        event.preventDefault();
        this.camera.position.z += event.deltaY * 0.01;
        this.camera.position.z = Math.max(2, Math.min(10, this.camera.position.z));
    }

    // Touch move handler - معالج حركة اللمس
    onTouchMove(event) {
        if (event.touches.length > 0) {
            this.mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

            this.targetRotation.y = this.mouse.x * Math.PI / 2;
            this.targetRotation.x = this.mouse.y * Math.PI / 4;
        }
    }

    // Touch start handler - معالج بداية اللمس
    onTouchStart(event) {
        event.preventDefault();
    }

    // Window resize handler - معالج تغيير حجم النافذة
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Animation loop - حلقة الرسوم المتحركة
    animate() {
        if (!this.isAnimating) return;

        requestAnimationFrame(() => this.animate());

        // Smooth rotation interpolation
        if (this.cup) {
            this.cup.rotation.y += (this.targetRotation.y - this.cup.rotation.y) * 0.05;
            this.cup.rotation.x += (this.targetRotation.x - this.cup.rotation.x) * 0.05;
            this.cup.rotation.y += 0.005; // Auto rotation
        }

        // Animate particles
        this.particles.forEach(particle => {
            particle.rotation.y += 0.001;
        });

        // Render scene
        this.renderer.render(this.scene, this.camera);

        // Update stats
        this.updateStats();
    }

    // Update stats - تحديث الإحصائيات
    updateStats() {
        const statsElement = document.getElementById('stats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="stat-item">FPS: <span class="stat-value">${Math.round(1000 / 16)}</span></div>
                <div class="stat-item">Vertices: <span class="stat-value">${this.stats.vertices}</span></div>
                <div class="stat-item">Camera Z: <span class="stat-value">${this.camera.position.z.toFixed(2)}</span></div>
            `;
        }
    }

    // Hide loading screen - إخفاء شاشة التحميل
    hideLoading() {
        setTimeout(() => {
            const loading = document.getElementById('loading');
            if (loading) {
                loading.classList.add('hidden');
                setTimeout(() => loading.remove(), 500);
            }
        }, 500);
    }

    // Control methods - طرق التحكم
    toggleAnimation() {
        this.isAnimating = !this.isAnimating;
        if (this.isAnimating) {
            this.animate();
        }
    }

    resetCamera() {
        this.camera.position.set(0, 2, 5);
        this.camera.lookAt(0, 0, 0);
    }

    toggleWireframe() {
        this.cup.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.wireframe = !child.material.wireframe;
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const sceneManager = new Scene3DManager();

    // Setup control buttons
    const pauseBtn = document.getElementById('pause-btn');
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            sceneManager.toggleAnimation();
            pauseBtn.textContent = sceneManager.isAnimating ? 'إيقاف مؤقت' : 'تشغيل';
        });
    }

    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            sceneManager.resetCamera();
        });
    }

    const wireframeBtn = document.getElementById('wireframe-btn');
    if (wireframeBtn) {
        wireframeBtn.addEventListener('click', () => {
            sceneManager.toggleWireframe();
        });
    }

    console.log('✅ 3D Scene initialized successfully!');
});
