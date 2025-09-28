export interface SearchRecord {
  id: string;
  keyword: string;
  marketplace: string;
  productType: string;
  sortOption: string;
  timestamp: number;
  url: string;
}

export interface PopularKeyword {
  keyword: string;
  count: number;
  lastSearched: number;
  marketplaces: string[];
  productTypes: string[];
}

const STORAGE_KEY = 'merchradar_analytics';

export class SearchAnalytics {
  private static getStoredData(): SearchRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private static saveData(records: SearchRecord[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.warn('Failed to save analytics data:', error);
    }
  }

  static trackSearch(
    keyword: string,
    marketplace: string,
    productType: string,
    sortOption: string,
    url: string
  ): void {
    if (!keyword.trim()) return;

    const record: SearchRecord = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      keyword: keyword.trim().toLowerCase(),
      marketplace,
      productType,
      sortOption,
      timestamp: Date.now(),
      url
    };

    const records = this.getStoredData();
    records.unshift(record); // Add to beginning

    // Keep only last 1000 searches to prevent storage bloat
    if (records.length > 1000) {
      records.splice(1000);
    }

    this.saveData(records);
  }

  static getSearchHistory(limit?: number): SearchRecord[] {
    const records = this.getStoredData();
    return limit ? records.slice(0, limit) : records;
  }

  static getPopularKeywords(limit: number = 10): PopularKeyword[] {
    const records = this.getStoredData();
    const keywordMap = new Map<string, PopularKeyword>();

    records.forEach(record => {
      const existing = keywordMap.get(record.keyword);
      if (existing) {
        existing.count++;
        existing.lastSearched = Math.max(existing.lastSearched, record.timestamp);
        if (!existing.marketplaces.includes(record.marketplace)) {
          existing.marketplaces.push(record.marketplace);
        }
        if (!existing.productTypes.includes(record.productType)) {
          existing.productTypes.push(record.productType);
        }
      } else {
        keywordMap.set(record.keyword, {
          keyword: record.keyword,
          count: 1,
          lastSearched: record.timestamp,
          marketplaces: [record.marketplace],
          productTypes: [record.productType]
        });
      }
    });

    return Array.from(keywordMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  static getSearchStats() {
    const records = this.getStoredData();
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

    return {
      total: records.length,
      today: records.filter(r => r.timestamp > oneDayAgo).length,
      thisWeek: records.filter(r => r.timestamp > oneWeekAgo).length,
      thisMonth: records.filter(r => r.timestamp > oneMonthAgo).length,
      uniqueKeywords: new Set(records.map(r => r.keyword)).size
    };
  }

  static exportToCsv(): string {
    const records = this.getStoredData();
    const headers = ['Keyword', 'Marketplace', 'Product Type', 'Sort Option', 'Search Date', 'URL'];
    const csvRows = [headers.join(',')];

    records.forEach(record => {
      const row = [
        `"${record.keyword}"`,
        `"${record.marketplace}"`,
        `"${record.productType}"`,
        `"${record.sortOption}"`,
        `"${new Date(record.timestamp).toISOString()}"`,
        `"${record.url}"`
      ];
      csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
  }

  static downloadCsv(): void {
    const csv = this.exportToCsv();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `merchradar-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  static clearData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}