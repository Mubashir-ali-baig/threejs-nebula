import React, { Component } from 'react';
import * as THREE from 'three';
class ThreeScene extends Component{
  componentDidMount(){
    //const width = this.mount.clientWidth
    //const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.z = 4
    //ADD RENDERER
    //const canvas = document.querySelector('#c');
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    //this.renderer.setClearColor( 0xffffff, 1 );
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
    this.material = new THREE.MeshPhongMaterial({ color: 0xfd59d7     })
    this.cube = new THREE.Mesh(this.geometry, this.material)
    this.light = new THREE.PointLight(0xFFF00);
    this.light.position.set(10,0,25);
    this.scene.add(this.light);
    this.scene.add(this.cube)
    //this.x=1;
    //this.y=2;
this.start()
  }
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
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
   this.cube.rotation.x += 0.01
   this.cube.rotation.y -= 0.01
   this.cube.position.x -=0.01;
   //this.cube.translateZ(-0.1);
   //this.camera.translateZ(0.0001);
   

   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
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
export default ThreeScene