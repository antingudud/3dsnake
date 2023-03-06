import { createCamera } from './Component/camera.js';
import { createScene } from './Component/scene.js';
import { createCube } from './Component/cube.js';
import { createRenderer } from './System/renderer.js';
import { Resizer } from './System/Resizer.js';
import { createLights } from './Component/lights.js';
import { AnimationLoop } from './System/AnimationLoop.js';
import { Object3D, Mesh, BoxGeometry, MeshStandardMaterial } from "../node_modules/three/build/three.module.js";
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

        const boardGroup = new Object3D();
        const boardSize = 25;
        for( let i=0; i<boardSize; i++)
        {
            for(let j=0; j<boardSize; j++)
            {
                const boardTile = new Mesh( new BoxGeometry(), new MeshStandardMaterial({wireframe: true}) );
                boardTile.scale.set(1,1,0.5);
                boardTile.position.x = i - boardSize / 2 + 0.5;
                boardTile.position.y = j - boardSize / 2 + 0.5;
                boardGroup.add(boardTile);
            }
        }
        $scene.add(boardGroup);
        // const $cube = createCube();
        const $snake = new Snake([1,0], [0,0],boardGroup, new BoxGeometry, 0xFFFF00)
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