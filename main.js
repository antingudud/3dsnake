import { World } from './World/World.js';

function main()
{
    const container = document.querySelector("#canvas-container");
    const world = new World(container);

    world.start();
}

main();