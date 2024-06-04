import {
  CompetitionId,
  CompetitionLabel,
  CompetitionUrl,
} from './competition.model';

export interface SelectLeagueData {
  image: string;
  label: CompetitionLabel;
  id: CompetitionId;
  url: CompetitionUrl;
  size: number;
}
