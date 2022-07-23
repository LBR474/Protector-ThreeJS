

//import * as THREE from '../build/three.module.js';

var camera, scene, renderer;
			var mesh;

			init();
			animate();

			function init() {

				renderer = new THREE.WebGLRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 400;

				scene = new THREE.Scene();
                  var materials = [];

				var geometry = new THREE.IcosahedronGeometry( 100 );
                                 geometry.faceVertexUvs[0] = [];
                 for(var i = 0; i < geometry.faces.length; i++){      
                     
                     
                     geometry.faceVertexUvs[0].push([
							new THREE.Vector2( 0,0 ),
							new THREE.Vector2( 0,1 ),
							new THREE.Vector2( 1,1),
					
						]);
                     
                     
                     geometry.faces[i].materialIndex = i;
                     materials.push(createTexture(i, "#"+Math.random().toString(16).slice(2,8)));
                     
                 }    
				geometry.computeFaceNormals();
                
                geometry.dynamic = true;
                geometry.uvsNeedUpdate = true;	

				//var material = new THREE.MeshBasicMaterial( { color: 0x9955ee } );
              
                
                
				mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial(materials) );
				scene.add( mesh );
console.log(mesh)
				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				mesh.rotation.x += 0.005;
				mesh.rotation.y += 0.01;

				renderer.render( scene, camera );

			}

function createTexture(number,color) {	
				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				canvas.height = 40;
				canvas.width = 40;
				context.beginPath();
                  context.rect(0, 0, 40, 40);
                  context.fillStyle = color;
                  context.fill();
                  context.lineWidth = 7;
                  context.strokeStyle = 'black';
                  context.stroke();
    
				context.font = "15px Arial";
				
                context.fillStyle = '#333';
				context.fillText(number , 10, 20);
    
            
				
				
				
				// canvas contents will be used for a texture
				var texture = new THREE.Texture(canvas); 
				texture.needsUpdate = true;
				  
				var material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide, wireframe: false } );
				material.transparent = true;
				
				return material;
			}

