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

  static GetMark(): Three.Mesh {
    const geometry = new Three.BoxGeometry(0.1, 0.1, 0.1);
    const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
    const mark = new Three.Mesh(geometry, material);
    return mark;
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
