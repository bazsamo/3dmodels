// 📌 Three.js jelenet létrehozása
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 5000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xeeeeee); // 🔹 Enyhén szürke háttér
document.getElementById("3d-container").appendChild(renderer.domElement);

// 📌 Erősebb fények hozzáadása
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0, 500, 500);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 5, 1000);
pointLight.position.set(100, 200, 100);
scene.add(pointLight);

// 📌 Kamera távolabb helyezése
camera.position.set(0, 500, 2000); // 🔹 Extra távolság, hogy az egész modell látszódjon!
camera.lookAt(0, 0, 0);

// 📌 OBJ modell betöltése
const loader = new THREE.OBJLoader();
let model;

loader.load(
    'https://bazsamo.github.io/3dmodels/NKdynamic_v7.obj',
    function (object) {
        model = object;
        model.position.set(0, 0, 0); // 🔹 Modell középre helyezése
        model.scale.set(5, 5, 5); // 🔹 Modell méretének csökkentése

        // 📌 Ha a modellnek nincs anyaga, világosszürke színt kap
        model.traverse(function (child) {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0x777777, // 🔹 Világosszürke
                    metalness: 0.3,
                    roughness: 0.6
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

// 📌 Animációs ciklus (forgatás hozzáadása)
function animate() {
    requestAnimationFrame(animate);
    if (model) {
        model.rotation.y += 0.01; // 🔹 A modell lassan forog
    }
    renderer.render(scene, camera);
}
animate();
