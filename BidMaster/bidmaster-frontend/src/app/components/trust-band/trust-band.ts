import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TrustStat {
  num: string;
  label: string;
}

@Component({
  selector: 'app-trust-band',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trust-band.html',
  styleUrl: './trust-band.css',
})
export class TrustBandComponent {
  stats: TrustStat[] = [
    { num: '48.000+', label: 'Zatvorenih aukcija' },
    { num: '96%', label: 'Lotova prodato na vreme' },
    { num: '12.500', label: 'Aktivnih licitatora' },
    { num: '0,4s', label: 'Kašnjenje ponude uživo' },
  ];
}
