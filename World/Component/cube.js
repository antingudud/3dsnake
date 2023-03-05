import { MathUtils, BoxGeometry, MeshStandardMaterial, Mesh } from "../../node_modules/three/build/three.module.js";

function createCube()
{
    const geometry = new BoxGeometry(1,1,1);
    const material = new MeshStandardMaterial();
    const cube = new Mesh(geometry,material);
    const radianPerSecond = MathUtils.degToRad(30);
    
    cube.tick = (tDelta) => {
        cube.rotation.x += radianPerSecond * tDelta;
        cube.rotation.y += radianPerSecond * tDelta;
        cube.rotation.z += radianPerSecond * tDelta;
    }

    return cube
}
export { createCube };