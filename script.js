// 📌 Three.js jelenet létrehozása
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 20000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xeeeeee); // 🔹 Világos háttér
document.getElementById("3d-container").appendChild(renderer.domElement);

// 📌 Erősebb fények hozzáadása
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0, 1000, 2000);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 5, 5000);
pointLight.position.set(500, 500, 500);
scene.add(pointLight);

// 📌 Kamera extrém távolra helyezése
camera.position.set(0, 2000, 8000); // 🔹 Most már garantáltan messze lesz!
camera.lookAt(0, 0, 0);

// 📌 OBJ modell betöltése
const loader = new THREE.OBJLoader();
let model;

loader.load(
    'https://bazsamo.github.io/3dmodel/NKdynamic_v7.obj',
    function (object) {
        model = object;
        model.position.set(0, 0, 0); // 🔹 Modell középre helyezése
        model.scale.set(1, 1, 1); // 🔹 Kisebb méret, hogy biztosan beleférjen a képbe

        model.traverse(function (child) {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0x777777, // 🔹 Világosszürke, hogy ne legyen túl világos
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

// 📌 Animációs ciklus (fix modell, nincs forgás)
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
