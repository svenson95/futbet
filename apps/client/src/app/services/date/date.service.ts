import { DatePipe } from '@angular/common';
import {
  EffectRef,
  Injectable,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';

import {
  CalenderWeek,
  DateString,
  TODAY,
  createWeekDaysArray,
  getMondayFromWeek,
  moveItem,
} from '../../models';

export abstract class DateService {
  abstract selectedDay: WritableSignal<DateString>;
  abstract selectedDayEffect: EffectRef;
  abstract isToday: Signal<boolean>;
  abstract calenderWeek: WritableSignal<CalenderWeek>;
  abstract weekdays: Signal<DateString[]>;
  abstract getCalenderWeekFrom(day: DateString): CalenderWeek;
  abstract getWeekDays(calenderWeek: CalenderWeek): DateString[];
}

@Injectable()
export class AbstractedDateService extends DateService {
  selectedDay = signal<DateString>(TODAY.toISOString());

  selectedDayEffect = effect(
    () => {
      const weekOfDay = this.getCalenderWeekFrom(this.selectedDay());
      if (this.calenderWeek() !== weekOfDay) {
        this.calenderWeek.set(weekOfDay);
      }
    },
    { allowSignalWrites: true }
  );

  isToday = computed<boolean>(() => this.selectedDay() === TODAY.toISOString());

  calenderWeek = signal<CalenderWeek>(
    this.getCalenderWeekFrom(this.selectedDay())
  );

  weekdays = computed<DateString[]>(() =>
    this.getWeekDays(this.calenderWeek())
  );

  getCalenderWeekFrom(day: DateString): CalenderWeek {
    const datepipe = new DatePipe('de-DE');
    return Number(datepipe.transform(day, 'w'));
  }

  getWeekDays(calenderWeek: CalenderWeek): DateString[] {
    const monday = getMondayFromWeek(calenderWeek);
    const weekdays = createWeekDaysArray(monday);
    return moveItem(weekdays, 0, 6);
  }
}

export const DATE_SERVICE_PROVIDER = {
  provide: DateService,
  useClass: AbstractedDateService,
};
