//Imports
import * as THREE from "./build/three.module.js";
import Master from "./class/Master.js";
import TouchControls from "./class/TouchControls.js";
import Models from "./class/Model.js";
import Lights from "./class/Lights.js";
import KeyListener from "./class/KeyListener.js";
import MouseMove from "./class/MouseMove.js";
import ScrollWindow from "./class/ScrollWindow.js";
import ModelMovement from "./class/ModelMovement.js";
import { htmlActionsListener } from "./class/HTMLActions.js";
import { calculateDistance } from "./class/Distances.js";
import { windowResizeListener } from "./class/WindowResize.js";
const username = "ccorreasdev";
const apiUrl = `https://api.github.com/users/${username}/repos`;

//Constants and variables
const canvas = document.querySelector("#canvas");
const loading = document.querySelector("#loading");
const projectsBtn = document.querySelector("#projects-btn");
const homeBtn = document.querySelector("#home-btn");
const infoBtn = document.querySelector("#info-btn");
const contactBtn = document.querySelector("#contact-btn");
const contentLayout = document.querySelector("#content-layout");
let master = new Master();
let touchControls = new TouchControls();
let models = new Models();
let lights = new Lights();
let keyListener = new KeyListener();
let modelMovement = new ModelMovement();
let mouseMove = new MouseMove();
let scrollWindow = new ScrollWindow();
let bgAnimationTo = false;

const init = async () => {
  //Init master - Camera, scene, lights, renderer...
  master.initCamera(60, window.innerWidth / window.innerHeight, 0.1, 4000);
  master.camera.position.set(0, 0, 0);
  master.camera.lookAt(0, 0, 0);
  master.initScene();

  lights.initLights(1, 1);

  master.scene.add(lights.getDirectionalLight());
  master.scene.add(lights.getAmbientLight());

  master.initRenderer();
  master.renderer.setPixelRatio(window.devicePixelRatio);
  master.renderer.setSize(window.innerWidth, window.innerHeight);

  canvas.appendChild(master.renderer.domElement);

  master.initOrbitControls();

  //Load 3D Models
  models = new Models();

  await models.loadModelGLTF("gaming_desktop").then((resolve) => {
    models.percentLoaded = 50;
  });

  console.log(models.getLoadedModels(0));
  //Add to scene 3D Models
  //   models
  //     .getLoadedModels(0)
  //     .mixer.clipAction(models.getLoadedModels(0).animations[0])
  //     .play();
  models.getLoadedModels(0).scale.set(1, 1, 1);
  models.getLoadedModels(0).position.x = 0;
  models.getLoadedModels(0).position.y = -2;
  models.getLoadedModels(0).position.z = -15;
  models.getLoadedModels(0).rotation.y = -128 / (Math.PI * 2);
  models.getLoadedModels(0).rotation.x = 2 / (Math.PI * 2);
  master.scene.add(models.getLoadedModels(0));

  //   models.getLoadedModels(1).scale.set(1, 1, 1);
  //   models.getLoadedModels(1).position.x = 0;
  //   models.getLoadedModels(1).position.y = 0;
  //   models.getLoadedModels(1).position.z = -200;
  //   models.getLoadedModels(1).rotation.y = 0;
  //   master.scene.add(models.getLoadedModels(1));

  windowResizeListener(master, models.getLoadedModels(0));

  //mouseMove.mouseMoveListener(models.getLoadedModels(0).model);
  scrollWindow.scrollListener();
  keyListener.init();
  //touchControls.initTouchControls(keyListener.getKeysPressed());
  htmlActionsListener(0);

  const width = window.innerWidth;
  const height = window.innerHeight;
  master.camera.aspect = width / height;
  master.camera.updateProjectionMatrix();
  master.renderer.setSize(width, height);

  //   if (width >= 1280) {
  //     models.getLoadedModels(0).scale.set(1, 1, 1);
  //   } else if (width >= 768) {
  //     models.getLoadedModels(0).scale.set(1, 1, 1);
  //   } else if (width >= 500) {
  //     models.getLoadedModels(0).scale.set(0.6, 0.6, 0.6);
  //   } else if (width >= 400) {
  //     models.getLoadedModels(0).scale.set(0.5, 0.5, 0.5);
  //   }
};

//Render scene
const render = () => {
  master.renderer.render(master.scene, master.camera);
};

//Animate scene
const animate = () => {
  requestAnimationFrame(animate);

  //Wait last model is loaded

  //Movement controller model 1 - Garden
  //modelMovement.moveModel(keyListener, models.getLoadedModels(0).model, 5);

  //Camera follow 3D model 1 - plane
  // let distance = 3.5;
  // const objectPosition = models.getLoadedModels(0).model.position;
  // const cameraPosition = new THREE.Vector3(
  //     objectPosition.x,
  //     objectPosition.y + 1.5,
  //     objectPosition.z - distance
  // );

  // master.camera.position.copy(cameraPosition);
  //master.camera.lookAt(objectPosition);

  //Animations mixer

  //Distances from other models
  //calculateDistance(master.camera.position, models.getLoadedModels(4).position, models.getLoadedModels(5).position);

  render();
};

init();
animate();

projectsBtn.addEventListener("click", (e) => {
  fetchRepos();
  console.log("Projects");
  contentLayout.classList.add("content__layout--active");
  gsap.to(master.camera.rotation, { duration: 1, x: 0, y: 0, z: 0 });
  gsap.to(master.camera.position, { duration: 1, x: -3, y: 1, z: -10 });
});

homeBtn.addEventListener("click", (e) => {
  console.log("Projects");
  contentLayout.classList.remove("content__layout--active");
  gsap.to(master.camera.rotation, { duration: 1, x: 0, y: 0, z: 0 });

  gsap.to(master.camera.position, { duration: 1, x: 0, y: 0, z: 0 });
});

infoBtn.addEventListener("click", (e) => {
  console.log("Projects");
  contentLayout.classList.remove("content__layout--active");
  gsap.to(master.camera.rotation, {
    duration: 1,
    x: 0,
    y: -8 / (Math.PI * 2),
    z: 0,
  });
  gsap.to(master.camera.position, { duration: 1, x: 0, y: 1, z: -14 });
});

contactBtn.addEventListener("click", (e) => {
  console.log("Projects");
  contentLayout.classList.remove("content__layout--active");
  gsap.to(master.camera.rotation, {
    duration: 1,
    x: 0,
    y: -10 / (Math.PI * 2),
    z: 0,
  });
  gsap.to(master.camera.position, { duration: 1, x: 0, y: 1, z: -20 });
});

const fetchRepos = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }
    const repos = await response.json();
    console.log(repos);
    let template = "";
    repos.forEach((repo) => {
      template += `<div class="repo__item">
       <a href="https://ccorreasdev.github.io/${repo.name}/">${repo.name}</a>
      
  </div>`;
    });

    contentLayout.innerHTML = template;
  } catch (error) {
    console.error("Error:", error);
  }
};
