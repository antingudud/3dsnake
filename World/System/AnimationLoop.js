import { Clock } from "../../node_modules/three/build/three.module.js";

class AnimationLoop
{
    $camera;
    $scene;
    $renderer;
    $updatables = Array();
    $clock;

    constructor($camera, $scene, $renderer)
    {
        this.$camera = $camera;
        this.$scene = $scene;
        this.$renderer = $renderer;
        this.$clock = new Clock();
    }

    start()
    {
        this.$renderer.setAnimationLoop(() => {
            this.tick();
            this.$renderer.render(this.$scene, this.$camera);
        });
    }

    stop()
    {
        this.$renderer.setAnimationLoop(null);
    }

    tick()
    {
        const $tDelta = this.$clock.getDelta();
        for(const object of this.$updatables) {
            object.tick($tDelta);
        }
    }
}
export { AnimationLoop };