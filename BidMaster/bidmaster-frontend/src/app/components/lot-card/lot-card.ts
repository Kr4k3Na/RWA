import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuctionLot } from '../../models/auction.model';


@Component({
  selector: 'app-lot-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lot-card.html',
  styleUrl: './lot-card.css',
})
export class LotCardComponent implements OnChanges {
  @Input({ required: true }) lot!: AuctionLot;

  flash = false;
  minutes = 0;
  seconds = 0;

  private previousBid: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lot']) {
      this.minutes = Math.floor(this.lot.closesInSeconds / 60);
      this.seconds = this.lot.closesInSeconds % 60;

      if (this.previousBid !== null && this.previousBid !== this.lot.currentBid) {
        this.flash = true;
        setTimeout(() => (this.flash = false), 500);
      }
      this.previousBid = this.lot.currentBid;
    }
  }

  get formattedBid(): string {
    return '€' + this.lot.currentBid.toLocaleString('de-DE');
  }

  get formattedTimer(): string {
    const m = String(this.minutes).padStart(2, '0');
    const s = String(this.seconds).padStart(2, '0');
    return `${m}:${s}`;
  }
}
