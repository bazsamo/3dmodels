// 📌 Three.js jelenet létrehozása
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xdddddd); // 🔹 Háttér világos szürke
document.getElementById("3d-container").appendChild(renderer.domElement);

// 📌 Erősebb fények hozzáadása
const ambientLight = new THREE.AmbientLight(0xffffff, 5); // 🔹 Erősebb alapfény
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(100, 200, 100);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 10, 1000);
pointLight.position.set(0, 300, 300);
scene.add(pointLight);

// 📌 Kamera beállítása
camera.position.set(0, 200, 500); // 🔹 Távolabb helyezzük a kamerát
camera.lookAt(0, 0, 0);

// 📌 OBJ modell betöltése
const loader = new THREE.OBJLoader();
let model;

loader.load(
    'https://bazsamo.github.io/3dmodel/NKdynamic_v7.obj',
    function (object) {
        model = object;
        model.position.set(0, 0, 0); // 🔹 Modell középre helyezése
        model.scale.set(10, 10, 10); // 🔹 Normál méret beállítása

        // 📌 Ha a modellnek nincs anyaga, fehér színt adunk neki
        model.traverse(function (child) {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xffffff, // 🔹 Fehér, hogy biztosan látszódjon
                    metalness: 0.1,
                    roughness: 0.8
                });
            }
        });

        scene.add(model);
        console.log("✅ 3D modell betöltve:", model);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% betöltve');
    },
    function (error) {
        console.error('❌ Hiba az OBJ fájl betöltésekor:', error);
    }
);

// 📌 Animációs ciklus (állandó renderelés)
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
