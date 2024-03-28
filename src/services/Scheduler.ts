import Time, { TimelineMinutes, TimelineSteps } from '@/services/Time';

import Arrays from './Arrays';
import IWithId from './interfaces/IWithId';
interface IWithTimePeriod {
  startTime: string;
  endTime: string;
}
export default class Scheduler {
  startHour = 9;
  startHM = `${this.startHour}:00`;
  endHour = 19;
  endHM = `${this.endHour}:00`;

  timelinePxHeight = 50;

  timelineStep: TimelineSteps = TimelineSteps.FiveMinutes;

  timelines: string[] = TimelineMinutes[TimelineSteps.FiveMinutes];

  periodIsCorrect(t1: string, t2: string): boolean {
    return Time.GtOrEq(t1, this.startHM) && Time.GtOrEq(this.endHM, t2);
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

  timeIsFree(t1: string, t2: string, movedObjectId: string, scheduleItems: (IWithTimePeriod & IWithId)[]): boolean {
    return scheduleItems
      .filter((i: IWithId) => i.id !== movedObjectId)
      .every((i: IWithTimePeriod) => !Time.PeriodsIntersects(t1, t2, i.startTime, i.endTime));
  }

  sortByStartTime(scheduleItems: IWithTimePeriod[]): void {
    scheduleItems.sort((s1: IWithTimePeriod, s2: IWithTimePeriod) => Time.HMtoM(s1.startTime) - Time.HMtoM(s2.startTime));
  }
}
