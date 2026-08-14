import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuctionFilters, DEFAULT_FILTERS, ProductStateFilter, SortOption } from '../../models/filter.model';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.css',
})
export class FilterPanel implements OnChanges {
  @Input() categories: string[] = [];
  @Output() filtersChange = new EventEmitter<AuctionFilters>();

  filters: AuctionFilters = { ...DEFAULT_FILTERS };

  ngOnChanges(changes: SimpleChanges): void {
    // Ako se lista kategorija naknadno učita (npr. sa API-ja), samo osveži input —
    // ne diramo trenutno izabrane filtere korisnika.
    if (changes['categories']) {
      // no-op, ostavljeno za buduću logiku ako zatreba
    }
  }

  onSearchChange(value: string): void {
    this.filters = { ...this.filters, search: value };
    this.emit();
  }

  onCategoryChange(category: string | null): void {
    this.filters = { ...this.filters, category };
    this.emit();
  }

  onStateChange(state: ProductStateFilter): void {
    this.filters = { ...this.filters, state };
    this.emit();
  }

  onSortChange(sortBy: SortOption): void {
    this.filters = { ...this.filters, sortBy };
    this.emit();
  }

  resetFilters(): void {
    this.filters = { ...DEFAULT_FILTERS };
    this.emit();
  }

  private emit(): void {
    this.filtersChange.emit(this.filters);
  }
}
