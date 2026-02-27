// 3D Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({canvas:document.querySelector('#bg')});
renderer.setSize(window.innerWidth,window.innerHeight);

const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color:0x00ffff});
const torus = new THREE.Mesh(geometry,material);
scene.add(torus);

const light = new THREE.PointLight(0xffffff);
light.position.set(20,20,20);
scene.add(light);

camera.position.z=30;

function animate(){
requestAnimationFrame(animate);
torus.rotation.x+=0.01;
torus.rotation.y+=0.01;
renderer.render(scene,camera);
}
animate();

window.addEventListener("resize",()=>{
renderer.setSize(window.innerWidth,window.innerHeight);
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
});

// AUTO RUNNING GALLERY
const gallery = document.querySelector(".gallery");

function makeInfiniteScroll(){
const images = Array.from(gallery.children);
images.forEach(img=>{

});
}
makeInfiniteScroll();

let speed = 1;

function autoScroll(){
gallery.scrollLeft += speed;
if(gallery.scrollLeft >= gallery.scrollWidth/2){
gallery.scrollLeft = 0;
}
requestAnimationFrame(autoScroll);
}
autoScroll();

gallery.addEventListener("mouseenter",()=> speed=0);
gallery.addEventListener("mouseleave",()=> speed=1);

// MODAL
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementById("close");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");
const counter = document.getElementById("counter");

let currentIndex = 0;

function getImages(){
return Array.from(document.querySelectorAll("#memory .gallery img"));
}

function showImage(){
const images = getImages();
modalImg.src = images[currentIndex].src;
counter.textContent = (currentIndex+1)+" / "+images.length;
}

document.addEventListener("click",function(e){
if(e.target.matches("#memory .gallery img")){
const images = getImages();
currentIndex = images.indexOf(e.target);
showImage();
modal.style.display="flex";
}
});

function nextImage(){
const images = getImages();
currentIndex = (currentIndex+1)%images.length;
showImage();
}

function prevImage(){
const images = getImages();
currentIndex = (currentIndex-1+images.length)%images.length;
showImage();
}

rightArrow.addEventListener("click",nextImage);
leftArrow.addEventListener("click",prevImage);
closeBtn.addEventListener("click",()=> modal.style.display="none");