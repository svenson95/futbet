import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { EvaluationsService } from '../../../../../services';

@Component({
  selector: 'futbet-match-evaluations',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  styles: `
    :host { @apply flex flex-col bg-white border-[1px] rounded-fb; }
    section { 
      @apply flex flex-col gap-3 p-5;

      &:first-of-type { @apply border-b-[1px]; }
      .header { @apply flex justify-between; }
      .section-hints { @apply flex gap-3 items-center text-fb-color-text-2; }
      .section-title { @apply text-fb-font-size-body-1; }
    }

    .section-hints, .today { @apply text-fb-font-size-small xs:text-fb-font-size-body-2; }

    .evaluation {
      @apply flex gap-5 text-fb-font-size-small xs:text-fb-font-size-body-2;

      .team { 
        @apply flex flex-1 gap-1 xs:gap-2; 

        &:first-of-type { @apply justify-end; }
      }

      .today { @apply self-center; }

      span {
        @apply w-[19px] h-[19px] xs:w-[24px] xs:h-[24px] flex items-center justify-center leading-[19px] xs:leading-[24px];

        &.loss, &.low { @apply bg-red-500 text-white; }
        &.draw, &.middle { @apply bg-gray-200; }
        &.win, &.high { @apply bg-green-500 text-white; }
      }
    }
  `,
  template: `
    <h3 class="match-section-title">FORM</h3>
    @if (evaluations()?.teams; as teams) {
    <div class="content">
      <section>
        <div class="header">
          <span class="section-title">Ergebnisse</span>
          <div class="section-hints">
            <span>Niederlage</span>
            <span>Unentschieden</span>
            <span>Sieg</span>
          </div>
        </div>
        <div class="evaluation">
          <div class="team">
            @for (result of teams.home.results.reverse(); track result) {
            <span [class]="result.toLowerCase()">
              @switch(result) { @case ("LOSS") {N} @case ("DRAW") {U} @case
              ("WIN") {S} }
            </span>
            }
          </div>

          <div class="today">Heute</div>

          <div class="team">
            @for (result of teams.away.results; track result) {
            <span [class]="result.toLowerCase()">
              @switch(result) { @case ("LOSS") {N} @case ("DRAW") {U} @case
              ("WIN") {S} }
            </span>
            }
          </div>
        </div>
      </section>

      <section>
        <div class="header">
          <span class="section-title">Performance</span>
          <div class="section-hints">
            <span>Schlecht</span>
            <span>Mittelmäßig</span>
            <span>Gut</span>
          </div>
        </div>
        <div class="evaluation">
          <div class="team">
            @for (performance of teams.home.performances.reverse(); track
            performance) {
            <span [class]="performance.toLowerCase()">
              @switch(performance) { @case ("LOW") {S} @case ("MIDDLE") {M}
              @case ("HIGH") {G} }
            </span>
            }
          </div>

          <div class="today">Heute</div>

          <div class="team">
            @for (performance of teams.away.performances; track performance) {
            <span [class]="performance.toLowerCase()">
              @switch(performance) { @case ("LOW") {S} @case ("MIDDLE") {M}
              @case ("HIGH") {G} }
            </span>
            }
          </div>
        </div>
      </section>
    </div>
    }
  `,
})
export class MatchEvaluationsComponent {
  es = inject(EvaluationsService);

  evaluations = this.es.evaluations;
}
