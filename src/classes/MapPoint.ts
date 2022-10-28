export default class MapPoint {
  eventTarget: EventTarget;

  constructor(i: EventTarget) {
    this.eventTarget = i;
  }

  getBuildingNumber(): string {
    const num = (this.eventTarget as HTMLElement).getAttribute('data-building');
    return num ?? '';
  }

  getEntranceNumber(): string {
    const num = (this.eventTarget as HTMLElement).getAttribute('data-entrance');
    return num ?? '';
  }
}
