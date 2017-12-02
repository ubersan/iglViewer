import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import * as THREE from 'three';

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
      console.log(THREE);
  
    }
    
    ngOnInit(){
      this.container = this.elementRef.nativeElement;
      
      console.log(this.container);
  
      this.init();
    }
  
    init(){
      this.scene = new THREE.Scene();
      
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);
      
                      // camera
                      this.camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);
                      this.camera.position.set(30, 40, 60);
                      this.scene.add(this.camera);
      
                      // controls
                      var controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      
                      // lights
                      this.scene.add(new THREE.AmbientLight(0x222222));
                      this.scene.add(new THREE.PointLight(0xffffff, 1));
      
                      this.scene.add(new THREE.AxesHelper(20));
      
                      this.group = new THREE.Group();
                      this.scene.add(this.group);
      
                      var meshMaterial = new THREE.MeshLambertMaterial({
                          color: 0xff00dd,
                          opacity: 1.0,
                          transparent: false,
                          polygonOffset: true,
                          polygonOffsetFactor: 1, // positive value pushes polygon further away
                          polygonOffsetUnits: 1
                      });
      
                      var geometry = new THREE.Geometry();
      
                      // var Vrows = vResult[0][0];
                      // var Frows = vResult[0][1];
      
                      // for (var i = 1; i < Vrows + 1; ++i) {
                      //     var x = vResult[i][0] * 100;
                      //     var y = vResult[i][1] * 100;
                      //     var z = vResult[i][2] * 100;
      
                      //     geometry.vertices.push(new THREE.Vector3(x, y, z));
                      // }
      
                      // for (var i = Vrows + 1; i < Frows + Vrows + 1; ++i) {
                      //     var x = vResult[i][0];
                      //     var y = vResult[i][1];
                      //     var z = vResult[i][2];
      
                      //     geometry.faces.push(new THREE.Face3(x, y, z));
                      // }
      
                      // geometry.computeFaceNormals();
                      // geometry.computeVertexNormals();
      
                      // //var meshGeometry = new THREE.ConvexBufferGeometry(geometry.vertices);
      
                      // var mesh = new THREE.Mesh(geometry, meshMaterial);
                      // mesh.material.side = THREE.FrontSide;
                      // mesh.renderOrder = 0;
                      // this.group.add(mesh);
      
                      // // wireframe
                      // var geo = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
                      // var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 1 } );
                      // var wireframe = new THREE.LineSegments( geo, mat );
                      // mesh.add(wireframe);
      
                      // window.addEventListener('resize', onWindowResize, false);
      
     // this.render();
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
      this.cube.rotateX(0.01);
      this.cube.rotateY(0.01);
    }
  
  }