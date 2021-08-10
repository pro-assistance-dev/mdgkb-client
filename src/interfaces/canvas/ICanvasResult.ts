import ICanvas from '@/interfaces/canvas/ICanvas';
import ICoordinates from '@/interfaces/canvas/ICoordinates';

export default interface ICanvasResult {
  coordinates: ICoordinates;
  canvas: ICanvas;
}
