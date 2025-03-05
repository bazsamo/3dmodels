// 📌 Three.js jelenet létrehozása
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa); // 🔹 Háttérszín szürkére állítása, hogy ne fekete legyen
document.getElementById("3d-container").appendChild(renderer.domElement);

// 📌 Fények hozzáadása
const ambientLight = new THREE.AmbientLight(0xffffff, 5); // 🔹 Erősebb környezeti fény
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0, 500, 500);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 10, 1000);
pointLight.position.set(200, 300, 200);
scene.add(pointLight);

// 📌 Kamera beállítása
camera.position.set(0, 500, 1000); // 🔹 Távolabb helyezzük
camera.lookAt(0, 0, 0); // 🔹 A kamera a modell középpontját nézi

// 📌 OBJ modell betöltése
const loader = new THREE.OBJLoader();
let model;

loader.load(
    'https://bazsamo.github.io/3dmodel/NKdynamic_v7.obj',
    function (object) {
        model = object;
        model.position.set(0, 0, 0); // 🔹 Modell középre helyezése
        model.scale.set(100, 100, 100); // 🔹 Biztonság kedvéért egy alap méret

        // 📌 Ha a modellnek nincs anyaga, adjunk neki egy világos színt
        model.traverse(function (child) {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xffa500, // 🔹 Narancssárga, hogy biztosan lásd
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

// 📌 Animációs ciklus
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
