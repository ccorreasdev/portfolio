import Master from "./Master.js";

export const windowResizeListener = (master, model) => {
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    master.camera.aspect = width / height;
    master.camera.updateProjectionMatrix();
    master.renderer.setSize(width, height);

    if (width >= 1280) {
      model.scale.set(1, 1, 1);
    } else if (width >= 768) {
      model.scale.set(1, 1, 1);
    } else if (width >= 500) {
      model.scale.set(0.9, 0.9, 0.9);
    } else if (width >= 400) {
      model.scale.set(0.65, 0.65, 0.65);
    }
  });
};
