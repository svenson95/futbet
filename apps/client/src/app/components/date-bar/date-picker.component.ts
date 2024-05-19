import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  inject,
} from '@angular/core';
import {
  DateAdapter,
  NativeDateAdapter,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TODAY } from '../../models';
import { DateService } from '../../services';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1;
  }
}

const LAST_YEAR = new Date(TODAY.getFullYear() - 1, 0, 1);
const NEXT_YEAR = new Date(TODAY.getFullYear() + 1, 11, 31);

// TODO: refactor to lib?
@Component({
  selector: 'futbet-date-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTooltipModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
  styles: `
    :host {
      --mdc-icon-button-icon-color: var(--fb-color-green-1);
      --mat-icon-button-state-layer-color: var(--fb-color-green-1);
    }
  `,
  template: `
    <mat-datepicker-toggle
      matIconSuffix
      [for]="picker"
      matTooltip="Datum auswählen"
    ></mat-datepicker-toggle>
    <mat-form-field class="opacity-0 w-0 h-0">
      <input
        matInput
        [value]="selectedDay()"
        (dateChange)="selectedDay.set($event.value.toISOString())"
        [min]="minDate"
        [max]="maxDate"
        [matDatepicker]="picker"
      />
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
})
export class DateBarDatePickerComponent {
  private readonly service = inject(DateService);

  readonly selectedDay = this.service.selectedDay;

  readonly minDate = LAST_YEAR;
  readonly maxDate = NEXT_YEAR;
}
