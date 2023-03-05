import { PerspectiveCamera } from "../../node_modules/three/build/three.module.js";

/**
 * Create a perspective camera at the Z = 5
 * @param {75}fov Field of View. Default value: 75
 * @param {1} aspect Aspect Ration. Default value: 1
 * @param {0.1} near Near clipping plane. Default value: 0.1
 * @param {100} far Far clipping plane. Default value: 100
 * @returns PerspectiveCamera
 */
function createCamera(fov = 75, aspect = 1, near = 0.1, far = 100)
{
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0,0,5);
    return camera;
}

export { createCamera };