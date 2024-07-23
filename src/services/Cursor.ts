import { TimelineMinutes, TimelineSteps } from '@/services/Time';

import Arrays from './Arrays';

export default class Scheduler {
  startHour = 9;
  endHour = 19;
  timelinePxHeight = 50;

  timelineStep: TimelineSteps = TimelineSteps.FiveMinutes;

  activeTime = '';
  activeObjectId = '';

  dragged = false;
  draggedStartTime = '';
  draggedEndTime = '';

  timelines: string[] = TimelineMinutes[TimelineSteps.FiveMinutes];

  startDrag(t1: string, t2: string): void {
    this.draggedStartTime = t1;
    this.draggedEndTime = t2;
    this.dragged = true;
  }

  endDrag(): void {
    this.activeTime = '';
    this.dragged = false;
  }
  setTimelineStep(step: TimelineSteps): void {
    this.timelineStep = step;
    this.setTimelines();
  }

  setTimelines(): void {
    this.timelines = TimelineMinutes[this.timelineStep];
  }

  getScheduleHeight() {
    return this.getHourHeight() * this.getHoursArr().length;
  }

  getHourHeight() {
    return this.timelinePxHeight * this.timelines.length;
  }

  getHoursArr(): number[] {
    return Arrays.GenerateNumsRange(this.startHour, this.endHour);
  }
}
