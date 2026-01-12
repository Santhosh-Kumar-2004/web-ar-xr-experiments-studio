import { useEffect } from "react";
import * as THREE from "three";

function MarkerAR() {
  useEffect(() => {
    const startAR = async () => {
      const MindARThree =
        window?.MINDAR?.IMAGE?.MindARThree;
        console.log("window.MINDAR =", window.MINDAR);

      if (!MindARThree) {
        console.error("MindAR not loaded");
        return;
      }

      const mindarThree = new MindARThree({
        container: document.body,
        imageTargetSrc: "/markers/target.mind",
      });

      const { renderer, scene, camera } = mindarThree;

      // Light
      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      // Marker anchor (index 0)
      const anchor = mindarThree.addAnchor(0);

      // Cube
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const material = new THREE.MeshNormalMaterial();
      const cube = new THREE.Mesh(geometry, material);

      anchor.group.add(cube);

      await mindarThree.start();

      renderer.setAnimationLoop(() => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      });
    };

    startAR();

    return () => {
      // Optional cleanup later
    };
  }, []);

  return null;
}

export default MarkerAR;
