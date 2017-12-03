import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import * as THREE from 'three';
//import {PerspectiveCamera, OrbitControls, ConvexGeometry, Detector} from 'three/build/three.module';

//declare function require<T>(module: string): T;
declare const require: (moduleId: string) => any;

(window as any).THREE = THREE;

// require("../../../../../three.js-master/examples/js/controls/OrbitControls");
// require("../../../../../three.js-master/examples/js/QuickHull");
// require("../../../../../three.js-master/examples/js/geometries/ConvexGeometry");
// require("../../../../../three.js-master/examples/js/Detector");
// require("../../../../../three.js-master/examples/js/libs/stats.min");

@Component({
  selector: 'app-canvas',
  templateUrl: './app-canvas.component.html',
  styleUrls: ['./app-canvas.component.css']
})
export class AppCanvasComponent implements OnInit{
  
    @ViewChild('container') elementRef: ElementRef;
    private container : HTMLElement;
  
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
  private group: THREE.Group;

    private cube : THREE.Mesh;
  
    constructor(){
      console.log("THREE: ", THREE);
  
    }
    
    ngOnInit(){
      this.container = this.elementRef.nativeElement;
      
      console.log(this.container);
  
      this.init();
    }
  
    init(){
      var OrbitControls = require('three-orbit-controls')(THREE)
      this.scene = new THREE.Scene();
      
      this.renderer = new THREE.WebGLRenderer( { antialias: true } );
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.setSize( window.innerWidth, window.innerHeight );
              document.body.appendChild( this.renderer.domElement );
      
              // camera
      
              this.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
              this.camera.position.set( 15, 20, 30 );
              this.scene.add( this.camera );
      
              // controls
      
              var controls = new OrbitControls( this.camera, this.renderer.domElement );
              controls.minDistance = 20;
              controls.maxDistance = 50;
              controls.maxPolarAngle = Math.PI / 2;
      
              this.scene.add( new THREE.AmbientLight( 0x222222 ) );
      
              // light
      
              var light = new THREE.PointLight( 0xffffff, 1 );
              this.camera.add( light );
      
              // helper
      
              this.scene.add( new THREE.AxesHelper( 20 ) );
      
              // textures
      
              // var loader = new THREE.TextureLoader();
              // var texture = loader.load('../../../../../three.js-master/examples/textures/sprites/disc.png');
      
              // this.group = new THREE.Group();
              // this.scene.add( this.group );
      
              // // points
      
              // var pointsGeometry = new THREE.DodecahedronGeometry( 10 );
      
              // for ( var i = 0; i < pointsGeometry.vertices.length; i ++ ) {
      
              //   //pointsGeometry.vertices[ i ].add( randomPoint().multiplyScalar( 2 ) ); // wiggle the points
      
              // }
      
              // var pointsMaterial = new THREE.PointsMaterial( {
      
              //   color: 0x0080ff,
              //   map: texture,
              //   size: 1,
              //   alphaTest: 0.5
      
              // } );
      
              // var points = new THREE.Points( pointsGeometry, pointsMaterial );
              // this.group.add( points );
      
              // // convex hull
      
              // var meshMaterial = new THREE.MeshLambertMaterial( {
              //   color: 0xffffff,
              //   opacity: 0.5,
              //   transparent: true
              // } );
      
              // var meshGeometry = new THREE.ConvexBufferGeometry( pointsGeometry.vertices );
      
              // var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
              // mesh.material.side = THREE.BackSide; // back faces
              // mesh.renderOrder = 0;
              // this.group.add( mesh );
      
              // var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
              // mesh.material.side = THREE.FrontSide; // front faces
              // mesh.renderOrder = 1;
              // this.group.add( mesh );

              this.render();
    }
  
    randomPoint() {
      
      return new THREE.Vector3( THREE.Math.randFloat( - 1, 1 ), THREE.Math.randFloat( - 1, 1 ), THREE.Math.randFloat( - 1, 1 ) );

    }

    onWindowResize() {

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize( window.innerWidth, window.innerHeight );

    }

    render(){
        
      let self: AppCanvasComponent = this;
      
      (function render(){
        requestAnimationFrame(render);
        self.renderer.render(self.scene, self.camera);

        self.animate();
      }());
      
    }

    animate(){
      //this.group.rotateX(0.01);
    }

  }