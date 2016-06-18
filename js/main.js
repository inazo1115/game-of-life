/**
 * main
 */
(function() {

  /* init scene etc.*/
  var scene  = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera
      (75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  var life_closure = life();

  /* init mesh etc.*/
  var cubes = [
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], []
  ];
  for(var x = 0; x < SIZE_X; x++) {
    for(var y = 0; y < SIZE_Y; y++) {
      var geometry = new THREE.BoxGeometry(1, 1, 1);
      var material = new THREE.MeshBasicMaterial(
        {
          color: 0xe88fff,
          wireframe: true,
          wireframeLinewidth: 1
        });
      var cube = new THREE.Mesh(geometry, material);
      cube.position.x = x - (SIZE_X / 2) + 0.5;
      cube.position.y = y - (SIZE_Y / 2) + 0.5;
      cubes[x][y] = cube;
      scene.add(cube);
    }
  }

  /* start render and loop */
  (function() {

    function live_animation(cube) {
      cube.rotation.x += 0.5;
      cube.rotation.y += 1;
      if(cube.material.color.r > 0) cube.material.color.r -= 0.15;
      if(cube.scale.x < 5) {
        cube.scale.x *= 1.1;
        cube.scale.y *= 1.1;
        cube.scale.z *= 1.1;
      }
    }

    function death_animation(cube) {
      cube.rotation.x += 0.05;
      cube.rotation.y += 0.2;
      if(cube.material.color.r < 1) cube.material.color.r += 0.02;
      if(cube.scale.x > 0.8) {
        cube.scale.x *= 0.9;
        cube.scale.y *= 0.9;
        cube.scale.z *= 0.9;
      }
    }

    function render() {
      /* to next generation */
      global_counter++;
      field = life_closure();
      /* update camera */
      camera.position.x = Math.cos(to_radian(global_counter) * 0.1) * 10;
      camera.position.y = Math.sin(to_radian(global_counter) * 0.5) * 10;
      camera.position.z = Math.cos(to_radian(global_counter) * 0.2) * 20;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      requestAnimationFrame(render);
      /* update cubes */
      for(var x = 0; x < SIZE_X; x++) {
        for(var y = 0; y < SIZE_Y; y++) {
          (field[x][y]) ? live_animation(cubes[x][y]) : death_animation(cubes[x][y]);
        }
      }
      renderer.render(scene, camera);
    };
    render();
  })();
})();
