
import * as THREE from 'https://cdn.skypack.dev/three@0.120.0';    //const scene = new THREE.Scene();


import {
    scene,
    renderer,
    camera,
    pause,
    num_cubes_and_isos,
} from './GQ_level_two_module';

export {
    torus,
    particlesMesh,
    
};

//const { torus, particlesMesh } = points_objects_creator();


//function points_objects_creator() {



    const texloader = new THREE.TextureLoader();
    //const bgTexture = texloader.load('./images/red_dwarf_stars.png');
    const particle_red_pic = texloader.load('./images/tothian_mine_red_big_2D_1.png');
    const Tgeometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    const Tmaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02
    });
    const torus = new THREE.Points(Tgeometry, Tmaterial);

    // const particlesmaterial = new THREE.PointsMaterial({
    //     color: 0xFFFFFF,
    //     size: 3.35,
    //     // emissive: 'red',
    //     // emissiveIntensity: 7,
    //     //map: particle_red_pic,
    //     transparent: true
    // });


    // const particlesGeometry = new THREE.BufferGeometry();
    // const particlesCount = 5000;
    // const positionArray = new Float32Array(particlesCount * 3);

    // for (let index = 0; index < particlesCount * 3; index++) {
    //     positionArray[index] = ((Math.random() - 0.5) * 3100);

    // }


    // particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

    // //particlesGeometry.setAttribute('position', (0.1, 0.1, 0.1));
    // const particlesMesh = new THREE.Points(particlesGeometry,
    //     particlesmaterial);





    // //scene.background = new THREE.Color('black');

    
    const colorArray = [new THREE.Color(0xff0000), new THREE.Color(0x00ff00), new THREE.Color(0x0000ff)];
    const positions = [];
    const colors = [];

    for (let i = 0; i < 300; i++) {

        positions.push((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30);

        const clr = colorArray[Math.floor(Math.random() * colorArray.length)];

        colors.push(clr.r, clr.g, clr.b);

    }

    const particles_geometry = new THREE.BufferGeometry();
    particles_geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particles_geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const particles_material = new THREE.PointsMaterial({
        size: 14, vertexColors: true, depthTest: false, sizeAttenuation: false
    });

    const particlesMesh = new THREE.Points(particles_geometry, particles_material);


    //scene.add(torus);
    //scene.add(particlesMesh);
//     return { torus, particlesMesh };
// }

