import { effect, inject } from '@angular/core';

import { SELECT_COMPETITION_DATA_FLAT } from '@app/constants';
import { LeagueService, RouteService } from '@app/services';
import { CompetitionUrl } from '@lib/models';

export class RouterView {
  routeService = inject(RouteService);
  leagueService = inject(LeagueService);

  routeEvent = effect(
    () => this.updateLeague(this.routeService.activeRoute()),
    { allowSignalWrites: true }
  );

  updateLeague(route: CompetitionUrl): void {
    const competitionData = SELECT_COMPETITION_DATA_FLAT.find(
      (d) => d.url === route.split('/')[0]
    );
    this.leagueService.setSelectedLeague(competitionData);
  }
}
