// 📌 Three.js jelenet létrehozása
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3d-container").appendChild(renderer.domElement);

// 📌 Fények hozzáadása
const ambientLight = new THREE.AmbientLight(0xffffff, 3); // 🔹 Erős környezeti fény
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 10, 1000);
pointLight.position.set(200, 200, 200);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(-200, 200, 200);
scene.add(directionalLight);

// 📌 Kamera pozíció beállítása
camera.position.set(0, 300, 600); // 🔹 Távolabb tesszük, hogy biztosan lásson valamit
camera.lookAt(0, 0, 0);

// 📌 OBJ modell betöltése
const loader = new THREE.OBJLoader();
let model;

loader.load(
    'https://bazsamo.github.io/3dmodels/NKdynamic_v7.obj', // 🔹 Ellenőrizd, hogy az OBJ elérhető-e!
    function (object) {
        model = object;
        model.position.set(0, 0, 0); // 🔹 Modell középre helyezése (méretezés nélkül)

        // 📌 Ha nincs anyag, alapértelmezett színt adunk neki
        model.traverse(function (child) {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xff0000, // 🔹 Piros szín, hogy biztosan lásd
                    metalness: 0.5,
                    roughness: 0.5
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
