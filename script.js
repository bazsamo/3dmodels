// 3D jelenet létrehozása
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3d-container").appendChild(renderer.domElement);

// Fények hozzáadása
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Kamera pozíció beállítása
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

// OBJ modell betöltése
const loader = new THREE.OBJLoader();
let model;

loader.load(
    'model.obj', // A fájl közvetlenül a GitHub Pages-ről töltődik be
    function (object) {
        model = object;
        model.scale.set(1, 1, 1); 
        model.position.set(0, 0, 0);
        scene.add(model);
        console.log("3D modell betöltve:", model);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% betöltve');
    },
    function (error) {
        console.error('Hiba az OBJ fájl betöltésekor:', error);
    }
);

// Modell frissítése a form adatok alapján
window.updateModel = function () {
    if (model) {
        let width = parseFloat(document.getElementById("widthInput").value);
        let height = parseFloat(document.getElementById("heightInput").value);
        model.scale.set(width, height, 1);
    }
};

// Animációs ciklus
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
