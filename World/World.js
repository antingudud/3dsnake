import { createCamera } from './Component/camera.js';
import { createScene } from './Component/scene.js';
import { createCube } from './Component/cube.js';
import { createRenderer } from './System/renderer.js';
import { Resizer } from './System/Resizer.js';
import { createLights } from './Component/lights.js';
import { AnimationLoop } from './System/AnimationLoop.js';
import { BoxGeometry } from "../../node_modules/three/build/three.module.js";
import { Snake } from './Entity/Snake.js';

let $container;
let $scene;
let $renderer;
let $camera;
let $loop;

class World
{
    constructor(container)
    {
        $container = container;
        $scene = createScene();
        $renderer = createRenderer();
        $camera = createCamera();
        $loop = new AnimationLoop($camera, $scene, $renderer);
        $container.append($renderer.domElement);

        // const $cube = createCube();
        const $snake = new Snake([1,0], [0,0], $scene, new BoxGeometry, 0xFFFF00)
        const $light = createLights();
        $camera.position.z = 15;
        $light.position.set(10,10,10);

        $loop.$updatables.push($snake);

        $scene.add($light);

        window.onkeydown = (e) => {
            switch (e.key)
            {
                case 'w':
                    $snake.moveUpward();
                    break;
                case 'a':
                    $snake.moveLeft();
                    break;
                case 's':
                    $snake.moveDownward();
                    break;
                case 'd':
                    $snake.moveRight();
                    break;
                case 't':
                    $snake.addBody();
                    break;
            }
        }

        const $resizer = new Resizer($container, $camera, $renderer);
    }

    render()
    {
        $renderer.render($scene, $camera);
    }

    start()
    {
        $loop.start();
    }

    stop()
    {
        $loop.stop();
    }
}
export { World };