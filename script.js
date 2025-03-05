// 📌 Three.js jelenet létrehozása
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff); // 🔹 Háttér fehérre állítása
document.getElementById("3d-container").appendChild(renderer.domElement);

// 📌 Fények hozzáadása (optimális világítás)
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(0, 300, 300);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 3, 500);
pointLight.position.set(100, 200, 100);
scene.add(pointLight);

// 📌 Kamera beállítása
camera.position.set(0, 100, 300); // 🔹 Kamera normális pozícióban
camera.lookAt(0, 0, 0); // 🔹 A kamera a modell középpontját nézi

// 📌 OBJ modell betöltése
const loader = new THREE.OBJLoader();
let model;

loader.load(
    'https://bazsamo.github.io/3dmodels/NKdynamic_v7.obj',
    function (object) {
        model = object;
        model.position.set(0, 0, -100); // 🔹 Modell a kamera elé
        model.scale.set(5, 5, 5); // 🔹 Kisebb méret

        // 📌 Ha a modellnek nincs anyaga, világos színt adunk neki
        model.traverse(function (child) {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xaaaaaa, // 🔹 Világos szürke (természetesebb)
                    metalness: 0.1,
                    roughness: 0.9
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
