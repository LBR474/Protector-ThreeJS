
import * as THREE from 'https://cdn.skypack.dev/three@0.120.0';


const torusgeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusmaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const torus = new THREE.Mesh(torusgeometry, torusmaterial);
const x = 0;





export {torus};


//export {x};