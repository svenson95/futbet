import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DateString, TODAY } from '../../../models';
import { DateService } from '../../../services';

const dateValue = ['previous-day', 'next-day'] as const;
type DateValue = (typeof dateValue)[number];

// TODO: refactor to lib?
@Component({
  selector: 'futbet-week-toogle-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
  ],
  encapsulation: ViewEncapsulation.None,
  styles: `
    :host { @apply m-auto; }

    futbet-week-toogle-group mat-button-toggle.mat-button-toggle {
      @apply text-fb-font-size-body-2;

      &.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
        min-width: 36px;
        padding: 0 8px;
      }

      &:first-of-type, &:last-of-type {
        &.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
          padding: 0 2px;
        }
      }

      &.is-today {
        font-weight: 700;
      }
    }
  `,
  template: `
    <mat-button-toggle-group
      hideSingleSelectionIndicator
      [value]="selectedDay()"
    >
      <mat-button-toggle
        (click)="setDateTo('previous-day')"
        matTooltip="Zurück"
      >
        <mat-icon>keyboard_arrow_left</mat-icon>
      </mat-button-toggle>
      @for(day of weekdays(); track day) {
      <mat-button-toggle
        [value]="day"
        (click)="selectedDay.set(day)"
        [class.is-today]="isToday(day)"
      >
        {{ day | date : 'ccc' }}
      </mat-button-toggle>
      }
      <mat-button-toggle (click)="setDateTo('next-day')" matTooltip="Weiter">
        <mat-icon>keyboard_arrow_right</mat-icon>
      </mat-button-toggle>
    </mat-button-toggle-group>
  `,
})
export class DateBarWeekToggleGroupComponent {
  private readonly service = inject(DateService);

  readonly selectedDay = this.service.selectedDay;
  readonly weekdays = this.service.weekdays;

  isToday(day: DateString): boolean {
    return day === TODAY.toISOString();
  }

  setDateTo(value: DateValue): void {
    const d = new Date(this.selectedDay());
    const getDay = (v: number) => new Date(d.setDate(d.getDate() + v));
    const isPreviousDay = value === 'previous-day';
    const date = getDay(isPreviousDay ? -1 : +1).toISOString();
    this.selectedDay.set(date);
  }
}