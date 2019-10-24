import React, { Component } from 'react';
import Logo from "./smoke.png";
import Logo2 from "./stars.png";
import * as three from 'three';
import * as postprocessing from 'postprocessing';


let scene,cloud,camera,renderer,loader,composer,cloudGeo,cloudMaterial,cloudParticles=[];

class threeScene extends Component{
  componentDidMount(){
    this.init()
  }
  init = ()=>{
    //const width = this.mount.clientWidth
    //const height = this.mount.clientHeight
    //ADD SCENE
    scene = new three.Scene()
    
    //ADD CAMERA
    camera = new three.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    camera.position.z = 1;
    camera.rotation.x=1.16;
    camera.rotation.y=-0.12;
    camera.rotation.z=0.27;

    //ADDING LIGHTS

    let ambient = new three.AmbientLight(0x555555);
    scene.add(ambient);
    
    let directionalLight = new three.DirectionalLight(0xff8c19);
      directionalLight.position.set(0,0,1);
      scene.add(directionalLight);

      let orangeLight = new three.PointLight(0xcc6600,450,1.7);
      orangeLight.position.set(200,300,100);
      scene.add(orangeLight);

      let redLight = new three.PointLight(0xd8547e,50,450,1.7);
      redLight.position.set(100,300,100);
      scene.add(redLight);

      let blueLight = new three.PointLight(0x3677ac,50,450,1.7);
      blueLight.position.set(300,300,200);
      scene.add(blueLight);

    //ADD RENDERER
   
    renderer = new three.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    scene.fog=new three.FogExp2(0x03544e, 0.001);
    renderer.setClearColor(scene.fog.color);
    this.mount.appendChild(renderer.domElement)
    this.start()
    
    //TextureLOADER
    loader = new three.TextureLoader();
    loader.load(Logo,function(texture){
      cloudMaterial = new three.MeshLambertMaterial({
        map:texture,
        transparent:true
      }); 
      cloudGeo = new three.PlaneBufferGeometry(500,500);
   

    for(let p=0; p<50; p++) {
      cloud = new three.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random()*800 -400,
        500,
        Math.random()*500-500
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random()*2*Math.PI;
      cloud.material.opacity = 0.55;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
    loader.load(Logo2, function(texture){

      const textureEffect = new postprocessing.TextureEffect({
        blendFunction: postprocessing.BlendFunction.COLOR_DODGE,
        texture: texture
      });
      textureEffect.blendMode.opacity.value = 0.6;
      scene.add(textureEffect)
  //POSTPROCESSING
  
      const bloomEffect = new postprocessing.BloomEffect({
        blendFunction:postprocessing.BlendFunction.COLOR_DODGE,
        kernalSize: postprocessing.KernelSize.SMALL,
        luminanceThreshold:0.3,
        luminanceSmoothing: 0.75
      })
      bloomEffect.blendMode.opacity.value=1.5;
      
      let effectPass = new postprocessing.EffectPass(
        camera,
        bloomEffect,
        textureEffect
      );
      effectPass.renderToScreen = true;
      
  
      composer = new postprocessing.EffectComposer(renderer);
            composer.addPass(new postprocessing.RenderPass(scene, camera));
            composer.addPass(effectPass);
            scene.add(composer)      
  })
  
  })
      
  

window.addEventListener("resize", this.onWindowResize, false);
this.renderScene();
          
    
  


  }
  
    
  
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(renderer.domElement)
  }

onWindowResize=()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  
    
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
animate = () => {
   
   
  cloudParticles.forEach(p => {
    p.rotation.z -=0.001;
  });
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  renderer.render(scene, camera)
}
render(){
    return(
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default threeScene