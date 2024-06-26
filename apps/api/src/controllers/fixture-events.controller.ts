import { EventDTO } from '@lib/models';
import { FixtureEvents } from '../models';

export const getFixtureEventsById = async (req, res, next) => {
  const fixture = req.query.fixtureId;
  try {
    const docs = await FixtureEvents.find()
      .where('parameters')
      .equals({
        fixture,
      })
      .lean();

    if (docs.length === 0) return next(null);
    const doc = docs[0];
    const sortedEvents = sortEvents(doc.response);
    next({ ...doc, response: sortedEvents });
  } catch (error) {
    next({
      status: 'error happened',
      error,
    });
  }
};
export const time = (e: EventDTO) => e.time.elapsed + (e.time.extra ?? 0);
const sortEvents = (d: EventDTO[]) => d.sort((a, b) => time(b) - time(a));
