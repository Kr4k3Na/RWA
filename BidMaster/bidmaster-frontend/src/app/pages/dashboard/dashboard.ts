import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuctionLot } from '../../models/auction.model';
import { AuctionFilters, DEFAULT_FILTERS } from '../../models/filter.model';
import { LotService } from '../../services/lot.service';
import { BackgroundCanvasComponent } from '../../components/background-canvas/background-canvas';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { FilterPanel } from '../../components/filter-panel/filter-panel';
import { LotCardComponent } from '../../components/lot-card/lot-card';

@Component({
  selector: 'app-auctions',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundCanvasComponent,
    Header,
    Footer,
    FilterPanel,
    LotCardComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  allLots: AuctionLot[] = [];
  filteredLots: AuctionLot[] = [];
  categories: string[] = [];
  filters: AuctionFilters = { ...DEFAULT_FILTERS };

  private tickHandle?: ReturnType<typeof setInterval>;

  constructor(private lotService: LotService) {}

  ngOnInit(): void {
    this.allLots = this.lotService.lots();
    this.categories = this.lotService.categories();
    this.applyFilters();

    // Tajmeri idu dalje i na ovoj stranici, isto kao na početnoj.
    this.tickHandle = setInterval(() => {
      this.allLots = this.allLots.map((lot) => ({
        ...lot,
        closesInSeconds: Math.max(0, lot.closesInSeconds - 1),
      }));
      this.applyFilters();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.tickHandle) clearInterval(this.tickHandle);
  }

  onFiltersChange(filters: AuctionFilters): void {
    this.filters = filters;
    this.applyFilters();
  }

  trackByProductId(_: number, lot: AuctionLot): string {
    return lot.product.id;
  }

  private applyFilters(): void {
    const { search, category, state, sortBy } = this.filters;
    const query = search.trim().toLowerCase();

    let result = this.allLots.filter((lot) => {
      const matchesSearch =
        !query ||
        lot.product.title.toLowerCase().includes(query) ||
        lot.product.description.toLowerCase().includes(query);

      const matchesCategory = !category || lot.product.category === category;

      const matchesState = state === 'all' || lot.product.state === state;

      return matchesSearch && matchesCategory && matchesState;
    });

    result = this.sortLots(result, sortBy);

    this.filteredLots = result;
  }

  private sortLots(lots: AuctionLot[], sortBy: AuctionFilters['sortBy']): AuctionLot[] {
    const copy = [...lots];
    switch (sortBy) {
      case 'price-asc':
        return copy.sort((a, b) => a.currentBid - b.currentBid);
      case 'price-desc':
        return copy.sort((a, b) => b.currentBid - a.currentBid);
      case 'most-bids':
        return copy.sort((a, b) => (b.bidsCount ?? 0) - (a.bidsCount ?? 0));
      case 'closing-soon':
      default:
        return copy.sort((a, b) => a.closesInSeconds - b.closesInSeconds);
    }
  }
}
