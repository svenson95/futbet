import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

import { OptimizedImageComponent } from '@app/components';
import { TeamNamePipe } from '@app/pipes';
import {
  CompetitionId,
  CompetitionUrl,
  FixtureDTO,
  logoFromAssets,
} from '@lib/models';

import { COMPETITION_DATA, COMPETITION_URL } from '@app/constants';
import { CompetitionFixtures } from '../../../../models';

@Component({
  selector: 'futbet-match-day-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    RouterModule,
    MatRippleModule,
    OptimizedImageComponent,
    TeamNamePipe,
  ],
  styles: `
    :host {
      @apply flex flex-col overflow-hidden border;
      border-color: var(--mat-standard-button-toggle-divider-color);
      border-radius: var(--mat-standard-button-toggle-shape);
    }
    .header { @apply flex px-4 py-3 gap-3 bg-white border-b-[1px]; }
    .header span { @apply text-fb-font-size-body-1; }
    ul { @apply w-full text-fb-font-size-body-2; }
    li { @apply bg-white; }
    li > a { @apply flex items-center sm:hover:bg-fb-color-green-1-light; }
    li:not(:last-of-type) { @apply border-b-[1px]; }
    li > section { @apply inline-flex flex-col; }
    .time { @apply justify-center min-w-[55px] py-[20px]; }
    .time, .result { @apply flex text-center; }
    .result { 
      @apply flex-col align-middle px-2; 
      border-left: 1px solid var(--mat-standard-button-toggle-divider-color);
      border-right: 1px solid var(--mat-standard-button-toggle-divider-color);
    }
    .teams { @apply align-middle px-3; }
    .teams > div { @apply flex items-center gap-2; }
  `,
  template: `
    <div class="header">
      <futbet-optimized-image
        [source]="
          'assets/images/country/' +
          competition().fixtures[0].league.id +
          '.svg'
        "
        alternate="country flag"
        width="16"
        height="12"
      />
      <span>{{ competition().name }}</span>
    </div>
    <ul>
      @for(item of competition().fixtures; track item.fixture.id) {
      <li>
        <a matRipple [routerLink]="linkToMatch(item)">
          <section class="time">
            <span>{{ item.fixture.date | date : 'HH:mm' }}</span>
          </section>
          <section class="result">
            <span>{{ item.score.fulltime.home }}</span>
            <span>{{ item.score.fulltime.away }}</span>
          </section>
          <section class="teams">
            <div>
              <futbet-optimized-image
                [source]="logoFromAssets(item.teams.home.id)"
                alternate="home logo"
                width="12"
                height="12"
              />
              <span>{{ item.teams.home.name | teamName }}</span>
            </div>
            <div>
              <futbet-optimized-image
                [source]="logoFromAssets(item.teams.away.id)"
                alternate="away logo"
                width="12"
                height="12"
              />
              <span>{{ item.teams.away.name | teamName }}</span>
            </div>
          </section>
        </a>
      </li>
      }
    </ul>
  `,
})
export class MatchDayListComponent {
  readonly routerLinks: Record<CompetitionId, CompetitionUrl> = COMPETITION_URL;

  readonly competition = input.required<CompetitionFixtures>();

  logoFromAssets = logoFromAssets;

  linkToMatch(i: FixtureDTO): string[] {
    const leagueUrl = COMPETITION_DATA.find(
      (c) => c.id === String(i.league.id)
    )?.url;
    if (!leagueUrl) throw new Error('Error in linkToMatch');
    const fixtureId = String(i.fixture.id);
    return ['/', 'leagues', leagueUrl, 'match', fixtureId];
  }
}
