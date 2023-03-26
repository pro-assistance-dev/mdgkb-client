import ICanvas from '@/services/interfaces/canvas/ICanvas';
import ICoordinates from '@/services/interfaces/canvas/ICoordinates';

export default interface ICanvasResult {
  coordinates: ICoordinates;
  canvas: ICanvas;
}
