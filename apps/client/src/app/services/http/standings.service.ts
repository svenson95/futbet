import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { DateString } from '@app/models';
import { CompetitionId, StandingsDTO } from '@lib/models';
import { environment } from '../../../environments/environment';

type StandingsParams = undefined | CompetitionId;

export abstract class HttpStandingsService {
  abstract getStandings(id: StandingsParams): Observable<StandingsDTO>;
  abstract getAllStandings(date: DateString): Observable<StandingsDTO[]>;
}

@Injectable()
export class AbstractedHttpStandingsService extends HttpStandingsService {
  BASE_URL = environment.api + 'standings';
  http = inject(HttpClient);

  getStandings(id: StandingsParams): Observable<StandingsDTO> {
    let params = new HttpParams();
    if (id) params = params.append('league', id);
    return this.http.get<StandingsDTO>(this.BASE_URL + '/get', {
      params,
    });
  }

  getAllStandings(date: DateString): Observable<StandingsDTO[]> {
    const toIso = new Date(date).toISOString().substring(0, 10);
    const params = new HttpParams().append('date', toIso);
    return this.http.get<StandingsDTO[]>(this.BASE_URL + '/get-top-five', {
      params,
    });
  }
}

export const HTTP_STANDINGS_SERVICE_PROVIDER = {
  provide: HttpStandingsService,
  useClass: AbstractedHttpStandingsService,
};
