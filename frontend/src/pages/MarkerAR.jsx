import { useEffect } from "react";
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.esm.js";

function MarkerAR() {
  useEffect(() => {
    const startAR = async () => {
      const mindarThree = new MindARThree({
        container: document.body,
        imageTargetSrc: "/markers/targets.mind",
      });

      const { renderer, scene, camera } = mindarThree;

      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      const anchor = mindarThree.addAnchor(0);

      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshNormalMaterial()
      );

      anchor.group.add(cube);

      await mindarThree.start();

      renderer.setAnimationLoop(() => {
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      });
    };

    startAR();
  }, []);

  return null;
}

export default MarkerAR;
