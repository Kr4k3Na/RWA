import { Component } from '@angular/core';
import { BackgroundCanvasComponent } from '../../components/background-canvas/background-canvas';
import { Header } from '../../components/header/header';
import { HeroComponent } from '../../components/hero/hero';
import { LiveLotsComponent } from '../../components/live-lots/live-lots';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works';
import { TrustBandComponent } from '../../components/trust-band/trust-band';
import { CtaBand } from '../../components/cta-band/cta-band';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-landing-page',
  imports: [
    BackgroundCanvasComponent,
    Header,
    HeroComponent,
    LiveLotsComponent,
    HowItWorksComponent,
    TrustBandComponent,
    CtaBand, Footer
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage { }
