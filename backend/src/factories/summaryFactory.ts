import { SummaryService } from '../services/summaryService';

export class SummaryFactory {
  static create(): SummaryService {
    return new SummaryService();
  }
}
