import { TraderStats } from '../types';


// eyes - добавляем внешние api для получения любой информации (прочекать откуда еще можно брать стату)

export class Eyes {
  private baseUrl = 'https://polymarketanalytics.com/api';

  async getTraderStats(address: string): Promise<TraderStats | null> {
    const res = await fetch(`${this.baseUrl}/traders-tag-performance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchQuery: address, sortColumn: 'overall_gain', sortDirection: 'DESC', tag: 'Overall' })
    });
    const data = await res.json() as { data?: TraderStats[] };
    return data.data?.[0] || null;
  }
}
