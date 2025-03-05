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

// 📌 Kamera beállítása
camera.position.set(0, 2000, 8000);
camera.lookAt(0, 0, 0);

// 📌 GLB modell betöltése (Most már működni fog!)
const loader = new THREE.GLTFLoader();
let model;

loader.load(
    'https://bazsamo.github.io/3dmodel/NKdynamic_v7.glb',  // 🔹 `.glb` fájl neve!
    function (gltf) {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        scene.add(model);
        console.log("✅ 3D modell betöltve:", model);

        // 🔹 Kiírjuk a komponensek neveit, hogy tudd, mit kell módosítani
        model.traverse(function (child) {
            console.log("📌 Komponens neve:", child.name);
        });
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% betöltve');
    },
    function (error) {
        console.error('❌ Hiba a GLB fájl betöltésekor:', error);
    }
);

// 📌 Dinamikus komponens méretezése a form adatai alapján
window.updateModel = function () {
    if (model) {
        let width = parseFloat(document.getElementById("widthInput").value);
        let height = parseFloat(document.getElementById("heightInput").value);

        model.traverse(function (child) {
            if (child.name.includes("DynamicComponent")) {  // 🔹 Cseréld le a valódi komponens névre!
                child.scale.set(width, height, width); 
                console.log(`📏 ${child.name} méretezése: Szélesség: ${width}, Magasság: ${height}`);
            }
        });
    }
};

// 📌 Animációs ciklus
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
