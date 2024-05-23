import { Match } from '../../models';

export const MATCH_EXAMPLES: Match[] = [
  {
    id: '1',
    homeTeam: 'FC Bayern München',
    awayTeam: '1. FC Köln',
    date: new Date('05/17/2024 20:30'),
    state: 'finished',
    result: { half_time: '1-0', full_time: '3-0' },
    priority: 'mid',
  },
  {
    id: '2',
    homeTeam: 'Borussia Dortmund',
    awayTeam: 'RB Leipzig',
    date: new Date('05/18/2024 13:30'),
    state: 'finished',
    result: { half_time: '1-1', full_time: '1-3' },
    priority: 'high',
  },
  {
    id: '3',
    homeTeam: 'Freiburg',
    awayTeam: 'Augsburg',
    date: new Date('05/18/2024 15:30'),
    state: 'upcoming',
    result: null,
    priority: 'low',
  },
  {
    id: '4',
    homeTeam: 'Bayer Leverkusen',
    awayTeam: 'St. Pauli',
    date: new Date('05/18/2024 15:30'),
    state: 'upcoming',
    result: null,
    priority: 'low',
  },
  {
    id: '5',
    homeTeam: 'Werder Bremen',
    awayTeam: 'Mainz 05',
    date: new Date('05/18/2024 15:30'),
    state: 'upcoming',
    result: null,
    priority: 'low',
  },
  {
    id: '6',
    homeTeam: 'Borussia Mönchengladbach',
    awayTeam: 'SV Darmstadt',
    date: new Date('05/18/2024 15:30'),
    state: 'upcoming',
    result: null,
    priority: 'low',
  },
  {
    id: '7',
    homeTeam: 'Leverkusen',
    awayTeam: '1899 Hoffenheim',
    date: new Date('05/18/2024 18:30'),
    state: 'upcoming',
    result: null,
    priority: 'high',
  },
  {
    id: '8',
    homeTeam: 'Union Berlin',
    awayTeam: 'Hamburger SV',
    date: new Date('05/18/2024 20:45'),
    state: 'upcoming',
    result: null,
    priority: 'mid',
  },
  {
    id: '9',
    homeTeam: 'VfB Stuttgart',
    awayTeam: 'Vfl Bochum',
    date: new Date('05/19/2024 18:30'),
    state: 'upcoming',
    result: null,
    priority: 'low',
  },
];

export const MATCH_EXAMPLES_2: Match[] = [
  {
    id: '10',
    homeTeam: 'FC Barcelona',
    awayTeam: 'Real Madrid',
    date: new Date('05/18/2024 16:00'),
    state: 'finished',
    result: { half_time: '1-2', full_time: '3-3' },
    priority: 'high',
  },
];