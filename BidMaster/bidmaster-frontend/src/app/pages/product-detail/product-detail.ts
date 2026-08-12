import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuctionLot } from '../../models/auction.model';
import { Footer } from '../../components/footer/footer';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Footer],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  lot: AuctionLot | null = null;
  notFound = false;

  activeImageIndex = 0;

  bidAmount: number | null = null;
  bidError: string | null = null;
  bidSuccess = false;

  minutes = 0;
  seconds = 0;

  private tickHandle?: ReturnType<typeof setInterval>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.notFound = true;
      return;
    }

    const lot = this.productsService.getLotByProductId(id);
    if (!lot) {
      this.notFound = true;
      return;
    }

    this.lot = lot;
    this.updateCountdown();
    this.bidAmount = this.minBidSuggestion;

    this.tickHandle = setInterval(() => {
      if (!this.lot) return;
      const closesInSeconds = Math.max(0, this.lot.closesInSeconds - 1);
      this.lot = { ...this.lot, closesInSeconds };
      this.updateCountdown();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.tickHandle) clearInterval(this.tickHandle);
  }

  get minBidSuggestion(): number {
    return this.lot ? this.lot.currentBid + 10 : 0;
  }

  get stateLabel(): string {
    return this.lot?.product.state === 'new' ? 'Novo' : 'Polovno';
  }

  selectImage(index: number): void {
    this.activeImageIndex = index;
  }

  submitBid(): void {
    if (!this.lot || this.bidAmount == null) return;

    if (this.bidAmount < this.minBidSuggestion) {
      this.bidError = `Ponuda mora biti najmanje €${this.minBidSuggestion.toLocaleString('de-DE')}.`;
      this.bidSuccess = false;
      return;
    }

    this.productsService.placeBid(this.lot.product.id, this.bidAmount);
    this.lot = this.productsService.getLotByProductId(this.lot.product.id) ?? this.lot;
    this.bidError = null;
    this.bidSuccess = true;
    this.bidAmount = this.minBidSuggestion;

    setTimeout(() => (this.bidSuccess = false), 2500);
  }

  private updateCountdown(): void {
    if (!this.lot) return;
    this.minutes = Math.floor(this.lot.closesInSeconds / 60);
    this.seconds = this.lot.closesInSeconds % 60;
  }
}
