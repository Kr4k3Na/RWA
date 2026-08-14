export type ProductStateFilter = 'all' | 'new' | 'used';
export type SortOption = 'closing-soon' | 'price-asc' | 'price-desc' | 'most-bids';

export interface AuctionFilters {
  search: string;
  category: string | null; // null = sve kategorije
  state: ProductStateFilter;
  sortBy: SortOption;
}

export const DEFAULT_FILTERS: AuctionFilters = {
  search: '',
  category: null,
  state: 'all',
  sortBy: 'closing-soon',
};
