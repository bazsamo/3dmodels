// 📌 Three.js jelenet létrehozása
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 20000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xeeeeee);
document.getElementById("3d-container").appendChild(renderer.domElement);

// 📌 Fények hozzáadása
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0, 1000, 2000);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 5, 5000);
pointLight.position.set(500, 500, 500);
scene.add(pointLight);

// 📌 Kamera beállítása (most távolabb)
camera.position.set(0, 5000, 10000);
camera.lookAt(0, 0, 0);

// 📌 GLB modell betöltése
const loader = new THREE.GLTFLoader();
let model;

loader.load(
    'https://bazsamo.github.io/3dmodel/NKdynamic_v7.glb',  // 🔹 `.glb` fájl neve!
    function (gltf) {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(10, 10, 10); // 🔹 Megnövelt méret
        scene.add(model);
        console.log("✅ 3D modell betöltve:", model);

        // 🔹 Ha hiányoznak az anyagok, adjunk alapértelmezett színt!
        model.traverse(function (child) {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xaaaaaa, // 🔹 Világosszürke (változtatható)
                    metalness: 0.3,
                    roughness: 0.6
                });
                child.material.side = THREE.DoubleSide; // 🔹 Mindkét oldal látható legyen
            }
        });
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% betöltve');
    },
    function (error) {
        console.error('❌ Hiba a GLB fájl betöltésekor:', error);
    }
);

// 📌 Animációs ciklus
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
