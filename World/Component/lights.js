import { DirectionalLight  } from "../../node_modules/three/build/three.module.js";

/**
 * Create light object
 * @param {white} color
 * @param {8} intensity
 * @returns DirectionalLight
 */
function createLights(color = 'white', intensity = 8)
{
    const light = new DirectionalLight(color, intensity);
    return light;
}

export { createLights };