import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuctionLot } from '../../models/auction.model';
import { LotCardComponent } from '../lot-card/lot-card';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-live-lots',
  standalone: true,
  imports: [CommonModule, LotCardComponent],
  templateUrl: './live-lots.html',
  styleUrl: './live-lots.css',
})
export class LiveLotsComponent implements OnInit, OnDestroy {
  lots: AuctionLot[] = [];

  private tickHandle?: ReturnType<typeof setInterval>;
  private bidBumpHandle?: ReturnType<typeof setInterval>;
  private reduceMotion = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.lots = this.productsService.lots();

    this.tickHandle = setInterval(() => this.tickTimers(), 1000);

    if (!this.reduceMotion) {
      this.bidBumpHandle = setInterval(() => {
        this.productsService.bumpRandomLot();
        this.lots = this.productsService.lots();
      }, 2600);
    }
  }

  ngOnDestroy(): void {
    if (this.tickHandle) clearInterval(this.tickHandle);
    if (this.bidBumpHandle) clearInterval(this.bidBumpHandle);
  }

  trackByProductId(_: number, lot: AuctionLot): string {
    return lot.product.id;
  }

  private tickTimers(): void {
    this.lots = this.lots.map((lot) => {
      let closesInSeconds = lot.closesInSeconds - 1;
      if (closesInSeconds < 0) closesInSeconds = 9 * 60 - 1; // reset like the original demo
      return { ...lot, closesInSeconds };
    });
  }
}
