import * as Three from 'three';
import { LineSegments } from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import BuildingModel from './BuildingModel';

export default abstract class MapPainter {
  static GetEdge(b: BuildingModel): LineSegments {
    const edges = new Three.EdgesGeometry(b.getMesh().geometry);
    const line = new Three.LineSegments(edges, new Three.LineBasicMaterial({ color: 0x838385 }));
    line.scale.set(0.01, 0.01, 0.01);
    return line;
  }

  static GetCone(color: string): Three.Mesh {
    const geometry = new Three.ConeGeometry(0.05, -0.2, 32, 10, true);
    const material = new Three.MeshBasicMaterial({ color: color });
    const cone = new Three.Mesh(geometry, material);
    return cone;
  }
  static GetCylinder(color: string): Three.Mesh {
    const geometry = new Three.CylinderGeometry(0.005, 0.005, 0.32, 32);
    const material = new Three.MeshBasicMaterial({ color: color });
    const cylinder = new Three.Mesh(geometry, material);
    cylinder.position.set(0, -0.1, 0);
    return cylinder;
  }

  static GetHemisphere(color: string): Three.Mesh {
    const geometry = new Three.SphereGeometry(0.05, 32, 16, 0, 6.28, -1.57);
    const material = new Three.MeshBasicMaterial({ color: color });
    const hemisphere = new Three.Mesh(geometry, material);
    hemisphere.position.set(0, 0.1, 0);
    return hemisphere;
  }

  static GetLineFromPoints(points: Three.Vector3[]): Three.Line {
    const g = new Three.BufferGeometry().setFromPoints(points);
    const m = new Three.LineBasicMaterial({ color: 0xf3911c, linewidth: 20 });
    return new Three.Line(g, m);
  }

  static GetLabel(label: string): CSS2DObject {
    const div = document.createElement('div');
    div.className = 'label';
    div.textContent = label;

    // div.style.backgroundColor = 'transparent';

    const labelObj = new CSS2DObject(div);
    labelObj.position.set(0, 0.1, 0);
    labelObj.center.set(0, 1);
    return labelObj;
  }
}
