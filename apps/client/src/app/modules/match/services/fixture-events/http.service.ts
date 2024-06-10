import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { EventsDTO, FixtureId } from '@lib/models';
import { environment } from '../../../../../environments/environment';

export abstract class HttpFixtureEventsService {
  abstract getFixtureEvents(id: FixtureId): Observable<EventsDTO | undefined>;
}

@Injectable()
export class AbstractedHttpFixtureEventsService extends HttpFixtureEventsService {
  BASE_URL = environment.api + 'fixture-events';
  http = inject(HttpClient);

  getFixtureEvents(id: FixtureId): Observable<EventsDTO | undefined> {
    const params = new HttpParams().set('fixtureId', String(id));
    return this.http
      .get<EventsDTO | null>(this.BASE_URL + '/get', {
        params,
      })
      .pipe(map((d) => d ?? undefined));
  }
}

export const HTTP_FIXTURE_EVENTS_SERVICE_PROVIDER = {
  provide: HttpFixtureEventsService,
  useClass: AbstractedHttpFixtureEventsService,
};
