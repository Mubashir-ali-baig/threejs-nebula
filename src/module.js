import * as three from 'three';
let scene, camera, renderer;
export function init(){
    
    scene=new three.Scene();
    camera= new three.PerspectiveCamera(
        60,
        window.innerWidth/window.innerHeight,
        1,
        1000
    );
    camera.position.z=1;
    camera.rotation.x=1.16;
    camera.rotation.y=-0.12;
    camera.rotation.z=0.27;

    let ambient = new three.AmbientLight(0x555555);
    scene.add(ambient);
    renderer = new three.WebGLRenderer();

    renderer.setSize(window.innerWidth,window.innerHeight);
    scene.fog = new three.FogExp2(0x03544e,0.001);
    renderer.setClearColor(scene.fog.color);
    document.body.appendChild(renderer.domElement);
    //render();
}

function render()
{
 
 renderer.render(scene,camera);
 requestAnimationFrame(render);
 init()
}


