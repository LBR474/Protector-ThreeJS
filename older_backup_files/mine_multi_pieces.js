
import * as THREE from '../build/three.module.js';

    import {OrbitControls} from '../examples/jsm/controls/OrbitControls.js';
    import {ConvexGeometry} from '../examples/jsm/geometries/ConvexGeometry.js';
    import * as BufferGeometryUtils from '../examples/jsm/utils/BufferGeometryUtils.js';
    import {Vector3} from '../src/math/Vector3.js';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);


    const x_vec = 0.011
    const y_vec = 0.011
    const z_vec = 0.011


    const vec_0 = new THREE.Vector3(0, y_vec, 0)
    const vec_1 = new THREE.Vector3(0, 0, z_vec)
    const vec_2 = new THREE.Vector3(-x_vec, 0, -z_vec)
    const vec_3 = new THREE.Vector3(x_vec, 0, -z_vec)

    const points_1 = []
    const points_2 = []
    const points_3 = []
    const points_4 = []


    points_1.push(vec_2, vec_1, vec_0)
    points_2.push(vec_0, vec_3, vec_2)
    points_3.push(vec_1, vec_3, vec_0)
    points_4.push(vec_2, vec_3, vec_1)

    let geometry_1 = new THREE.BufferGeometry().setFromPoints(points_1)
    let line_1 = new THREE.Mesh(geometry_1, new THREE.MeshBasicMaterial({color: 0xFF0000 }))

    let geometry_2 = new THREE.BufferGeometry().setFromPoints(points_2)
    let line_2 = new THREE.Mesh(geometry_2, new THREE.MeshBasicMaterial({color: 0xFF0000 }))

    let geometry_3 = new THREE.BufferGeometry().setFromPoints(points_3)
    let line_3 = new THREE.Mesh(geometry_3, new THREE.MeshBasicMaterial({color: 0xFF0000 }))

    let geometry_4 = new THREE.BufferGeometry().setFromPoints(points_4)
    let line_4 = new THREE.Mesh(geometry_4, new THREE.MeshBasicMaterial({color: 0xFF0000 }))

    const tetra = new THREE.Group();

    const red_mines_group = new THREE.Group();
    tetra.add(line_1, line_2, line_3, line_4);
tetra.scale.x = 0.5;
tetra.scale.y = 0.5;
tetra.scale.z = 0.5;


    const clone_array = []
    for (let index = 0; index < 25; index++) {
        clone_array.push(tetra.clone())
        //red_mines_group.add(clone_array[index])

    }
    console.log(clone_array[0])

    
    const vec_place_0 = new THREE.Vector3(0, 0, 0)
    const place_alter = 0.1
    let place_alter_mult = 0.11

    clone_array[0].position.set(vec_place_0.x, vec_place_0.y, vec_place_0.z);


    clone_array[1].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z + place_alter * place_alter_mult);

    clone_array[2].position.set(vec_place_0.x - place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

    clone_array[3].position.set(vec_place_0.x + place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

    place_alter_mult += 0.1

    clone_array[4].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z + place_alter * place_alter_mult);

    clone_array[5].position.set(vec_place_0.x - place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

    clone_array[6].position.set(vec_place_0.x + place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

    clone_array[7].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

    clone_array[8].position.set(vec_place_0.x - place_alter * place_alter_mult / 2,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z);

    clone_array[9].position.set(vec_place_0.x + place_alter * place_alter_mult / 2,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z);

    clone_array[10].position.set(vec_place_0.x, // centre pyramid row 3
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - 0.25);

    place_alter_mult += 0.1

    clone_array[11].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z + place_alter * place_alter_mult);

    clone_array[12].position.set(vec_place_0.x - place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

    clone_array[13].position.set(vec_place_0.x + place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

    clone_array[14].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

    clone_array[15].position.set(vec_place_0.x - place_alter * place_alter_mult / 2,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z);

    clone_array[16].position.set(vec_place_0.x + place_alter * place_alter_mult / 2,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z);

    clone_array[17].position.set(vec_place_0.x, // centre pyramid row 4
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - 0.25);

    place_alter_mult += 0.1

    clone_array[18].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z + place_alter * place_alter_mult);

    clone_array[19].position.set(vec_place_0.x - place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

    clone_array[20].position.set(vec_place_0.x + place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

    clone_array[21].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

    clone_array[22].position.set(vec_place_0.x - place_alter * place_alter_mult / 2,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z);

    clone_array[23].position.set(vec_place_0.x + place_alter * place_alter_mult / 2,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z);

    clone_array[24].position.set(vec_place_0.x, // centre pyramid row 4
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - 0.25);


    for (let index = 0; index < clone_array.length; index++) {

        scene.add(clone_array[index])
    }
		//scene.add(clone_array[0], clone_array[1], clone_array[2], clone_array[3], clone_array[4])




    // scene.background = new THREE.Color(0xFFFFFF)
    scene.background = new THREE.Color(0x000000)



    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);

			clone_array.forEach((element, ndx) => {

        // if (ndx == 0) {
        // 	element.position.y += 0.1;
        // } else if (ndx == 1){
        // 	element.position.z += 0.1;
        // } else if (ndx == 2) {
        // 	element.position.x -= 0.1;
        // } else if (ndx == 3) {
        // 	element.position.x += 0.1;
        // }

        // tetra_2.position.y += 0.01;
        // tetra_3.position.z += 0.01;
        // tetra_4.position.x -= 0.01;
    });

    renderer.render(scene, camera);
		};

    animate();
